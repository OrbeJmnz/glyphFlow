/*
 * Motor "en vivo": requestAnimationFrame propio + Spring real, en vez de keyframes precalculados
 * de WAAPI. Estructura INSPIRADA en morphicons v1.7.0 `src/dom/index.ts` (MIT — ver
 * LICENSE-morphicons y NOTICE): no es vendorizado literal, es una reescritura sobre nuestras
 * propias primitivas ya vendorizadas en `core/`, sin la capa `PathEl` multi-framework, sin caches
 * por `WeakMap` y sin política de reduced-motion (eso lo decide `GfIconMorphComponent`, igual que
 * ya hace con `runMorph`). El porqué de cada recorte está en
 * `docs/superpowers/specs/2026-08-28-morph-live-render-design.md`.
 */

import { allocOutputs, interpPolar } from './core/interpolate';
import { buildPlan, type MorphPlan } from './core/plan';
import { resampleIcon } from './core/resample';
import { serialize } from './core/serialize';
import { Spring } from './core/spring';
import type { IconInput, Sampled } from './core/types';
import { canonicalD, correspondenceIsPoor, CROSSFADE_DIP_ESCALA, SPRING_PRESETS } from './morph-keyframes';
import type { SpringConfig, SpringPreset } from './morph-keyframes';
import { findCuratedMorph, type CuratedMorph } from './curated-morphs';

// ── Scheduler singleton ─────────────────────────────────────────────────────
// Un Set de tickers y un solo rAF compartido mientras exista al menos uno vivo — varias
// instancias `live` en pantalla a la vez no multiplican el costo (mismo patrón que morphicons).

type Ticker = (dt: number) => void;

const tickers = new Set<Ticker>();
let rafId = 0;
let ultimo = -1;

function loop(ts: number): void {
  const dt = ultimo < 0 ? 0 : Math.min(Math.max((ts - ultimo) / 1000, 0), 0.1);
  ultimo = ts;
  for (const tick of [...tickers]) tick(dt);
  if (tickers.size > 0) {
    rafId = requestAnimationFrame(loop);
  } else {
    rafId = 0;
    ultimo = -1;
  }
}

function agregarTicker(tick: Ticker): void {
  tickers.add(tick);
  if (rafId === 0) {
    ultimo = -1;
    rafId = requestAnimationFrame(loop);
  }
}

function quitarTicker(tick: Ticker): void {
  tickers.delete(tick);
  if (tickers.size === 0 && rafId !== 0) {
    cancelAnimationFrame(rafId);
    rafId = 0;
    ultimo = -1;
  }
}

// ── La instancia ─────────────────────────────────────────────────────────────

export interface LiveMorphOpts {
  /** Preset por nombre o `{k, c}` propio — mismo vocabulario que `runMorph`. */
  spring?: SpringPreset | SpringConfig;
  /** Igual que en `runMorph`: multiplica el reloj sin tocar la forma del resorte. Se lee UNA vez
   *  por llamada a `morphTo`, no reactivo a medio vuelo — mismo contrato que WAAPI. */
  durationScale?: number;
  /**
   * Se llama UNA vez cuando ESTA llamada a `morphTo` asienta — ya sea porque el resorte llegó a
   * reposo o porque `saltar()` la resolvió de un salto (sin `requestAnimationFrame`, o con
   * `durationScale<=0`). Una llamada posterior a `morphTo` reemplaza el callback pendiente: solo se
   * avisa el asentamiento de la transición MÁS RECIENTE pedida, igual que `runMorph` descarta el
   * `finished` de una animación interrumpida.
   */
  onSettle?: () => void;
}

export interface LiveMorph {
  /** Anima hacia el icono con física de resorte real. Interrumpible: a medio vuelo replanea desde
   *  la pose ACTUAL preservando la velocidad del resorte (`Spring.start()` la conserva, ver
   *  `core/spring.ts`). Sin `requestAnimationFrame` disponible (SSR), salta directo — igual que
   *  `set()`. */
  morphTo(icon: IconInput, opts?: LiveMorphOpts): void;
  /** Salta al icono sin animar: `d` canónico, sin frames. */
  set(icon: IconInput): void;
  /** Da de baja la instancia y su ticker. Llamadas posteriores son no-op. */
  destroy(): void;
}

function resolverResorte(s: SpringPreset | SpringConfig | undefined): { k: number; c: number } {
  if (!s) return SPRING_PRESETS.smooth;
  return typeof s === 'string' ? SPRING_PRESETS[s] : s;
}

/** Crea la instancia sobre un `<path>` y pinta el icono inicial. */
export function createLiveMorph(el: SVGPathElement, iconoInicial: IconInput): LiveMorph {
  const spring = new Spring();
  let objetivo = iconoInicial;
  let reposo = true; // el `d` del elemento es el canónico de `objetivo`
  let plan: MorphPlan | null = null;
  let out: Float64Array[] | null = null;
  let cerrados: boolean[] | null = null;
  let volando = false;
  let muerta = false;
  let escala = 1;
  // La figura que se usó como ORIGEN del plan actual, y si ese plan ya pintó al menos un frame.
  // Sin esto, interrumpir dos veces seguidas sin que corra ningún tick (una pestaña oculta no
  // corre rAF; dos cambios de `[icon]` en el mismo ciclo de detección) hacía que `figuraActual()`
  // leyera `out` — los Float64Array en CERO de `allocOutputs`, nunca pintados — y replaneara
  // desde un buffer vacío en vez de la figura real.
  let fuente: Sampled[] | null = null;
  let pintado = false;
  // Fallback cuando `correspondenceIsPoor`: swap de `d` con un fundido de opacidad, en vez de
  // interpolar puntos que no corresponden entre sí. Mismo criterio que `morphKeyframes` — ver
  // `correspondenceIsPoor` — para que los dos motores no diverjan en cuándo activarlo.
  let fundido: { origenD: string; destinoD: string } | null = null;
  // Prioridad máxima (ver curated-morphs.ts): coreografía a mano para pares específicos. Solo se
  // intenta arrancando en reposo — mid-vuelo la pose en pantalla ya no es la forma original, y la
  // coreografía curada no sabe posar nada que no sea sol(0)/luna(1) exactos.
  let curado: CuratedMorph | null = null;
  /** El `onSettle` de la llamada a `morphTo` EN CURSO. Se limpia al consumirse, así que una llamada
   *  interrumpida a medio vuelo simplemente pierde el suyo — nunca se avisa un asentamiento que no
   *  ocurrió para esa transición. */
  let alAsentar: (() => void) | undefined;

  el.setAttribute('d', canonicalD(iconoInicial));

  const pintar = (t: number): void => {
    if (curado) {
      el.setAttribute('d', curado.pose(Math.min(1, Math.max(0, t))));
      pintado = true;
      return;
    }
    if (fundido) {
      const dip = Math.sin(Math.PI * Math.min(1, Math.max(0, t)));
      el.setAttribute('d', t < 0.5 ? fundido.origenD : fundido.destinoD);
      el.style.opacity = String(1 - dip);
      el.style.transform = `scale(${1 - CROSSFADE_DIP_ESCALA * dip})`;
      pintado = true;
      return;
    }
    if (!plan || !out || !cerrados) return;
    interpPolar(plan, t, out);
    el.setAttribute('d', serialize(out, cerrados));
    pintado = true;
  };

  const detener = (): void => {
    if (!volando) return;
    volando = false;
    quitarTicker(tick);
  };

  const asentar = (): void => {
    reposo = true;
    plan = null;
    out = null;
    cerrados = null;
    fuente = null;
    pintado = false;
    fundido = null;
    curado = null;
    spring.x = 1;
    spring.v = 0;
    el.setAttribute('d', canonicalD(objetivo));
    // Sin esto, un icono que voló en modo fundido queda con opacidad/escala del último frame en
    // vez de volver al estilo que le imponga el consumidor (CSS, otro `[style]`, etc).
    el.style.opacity = '';
    el.style.transform = '';
    const cb = alAsentar;
    alAsentar = undefined;
    cb?.();
  };

  const tick: Ticker = (dt) => {
    const asentado = spring.step(dt / escala);
    pintar(spring.x);
    if (asentado) {
      detener();
      asentar();
    }
  };

  /** La figura actual como fuente del PRÓXIMO plan: el icono en reposo, los buffers ya pintados (N
   *  puntos por subpath, listos para servir de origen sin volver a muestrear el `d`), o —si nada
   *  pintó todavía— la MISMA fuente que se usó para construir el plan en curso, porque en pantalla
   *  sigue esa figura, no el destino a medio calcular. */
  const figuraActual = (): Sampled[] => {
    if (reposo || !plan || !out || !pintado) return fuente ?? resampleIcon(objetivo);
    const p = plan;
    return out.map((buf, i) => ({ pts: Float64Array.from(buf), closed: p.items[i].closed }));
  };

  const replanear = (icon: IconInput): void => {
    const partida = reposo ? resampleIcon(objetivo) : figuraActual();
    const curadoNuevo = reposo ? findCuratedMorph(objetivo, icon) : null;
    if (curadoNuevo) {
      curado = curadoNuevo;
      fundido = null;
      plan = null;
      out = null;
      cerrados = null;
    } else {
      curado = null;
      const nuevoPlan = buildPlan(partida, resampleIcon(icon));
      if (correspondenceIsPoor(nuevoPlan)) {
        // La pose EN PANTALLA ahora, no el icono completo de origen: si esto nace de una
        // interrupción a medio vuelo (geométrico o ya en fundido), el fundido nuevo parte de lo que
        // se ve, mismo criterio que usa el motor horneado al interrumpir.
        fundido = { origenD: el.getAttribute('d') ?? canonicalD(objetivo), destinoD: canonicalD(icon) };
        plan = null;
        out = null;
        cerrados = null;
      } else {
        fundido = null;
        plan = nuevoPlan;
        out = allocOutputs(plan);
        cerrados = plan.items.map((it) => it.closed);
      }
    }
    fuente = partida;
    pintado = false;
    objetivo = icon;
    reposo = false;
  };

  const saltar = (icon: IconInput): void => {
    detener();
    objetivo = icon;
    asentar();
  };

  return {
    morphTo(icon, opts) {
      if (muerta) return;
      if (icon === objetivo && (reposo || volando)) return; // ya está ahí / ya en camino
      if (typeof requestAnimationFrame !== 'function') {
        alAsentar = opts?.onSettle;
        saltar(icon); // SSR / sin DOM: sin rAF no hay a dónde volar
        return;
      }
      const s = opts?.durationScale ?? 1;
      if (!(s > 0)) {
        // 0, negativo o NaN: no hay reloj que integrar — mismo criterio que WAAPI, donde
        // `duration * 0` aterriza instantáneo. `!(s > 0)` atrapa también NaN sin un caso aparte.
        alAsentar = opts?.onSettle;
        saltar(icon);
        return;
      }
      const { k, c } = resolverResorte(opts?.spring);
      spring.config(k, c);
      escala = s;
      alAsentar = opts?.onSettle;
      replanear(icon);
      spring.start(); // conserva velocidad si venía volando
      if (!volando) {
        volando = true;
        agregarTicker(tick);
      }
    },
    set(icon) {
      if (muerta) return;
      saltar(icon);
    },
    destroy() {
      detener();
      muerta = true;
      plan = null;
      out = null;
      cerrados = null;
    },
  };
}
