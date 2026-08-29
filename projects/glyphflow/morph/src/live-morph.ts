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
import { canonicalD, SPRING_PRESETS } from './morph-keyframes';
import type { SpringConfig, SpringPreset } from './morph-keyframes';

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

  el.setAttribute('d', canonicalD(iconoInicial));

  const pintar = (t: number): void => {
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
    spring.x = 1;
    spring.v = 0;
    el.setAttribute('d', canonicalD(objetivo));
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
    plan = buildPlan(partida, resampleIcon(icon));
    out = allocOutputs(plan);
    cerrados = plan.items.map((it) => it.closed);
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
        saltar(icon); // SSR / sin DOM: sin rAF no hay a dónde volar
        return;
      }
      const s = opts?.durationScale ?? 1;
      if (!(s > 0)) {
        // 0, negativo o NaN: no hay reloj que integrar — mismo criterio que WAAPI, donde
        // `duration * 0` aterriza instantáneo. `!(s > 0)` atrapa también NaN sin un caso aparte.
        saltar(icon);
        return;
      }
      const { k, c } = resolverResorte(opts?.spring);
      spring.config(k, c);
      escala = s;
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
