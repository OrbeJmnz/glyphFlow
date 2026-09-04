import { AnimatedIconDef, IconChoreography, MotionTrack } from './animated-icon.model';
import { CURATED_ICONS } from './curated-icons';
import {
  choreographyFingerprint,
  shapeFingerprint,
  shapesFingerprint,
  variantesPorFigura,
} from './curated-audit';
import { varianteDeHover } from './motion-runtime';
import lockFile from './curated-choreography.lock.json';
import iconNodes from 'lucide-static/icon-nodes.json';

/**
 * BARRIDO DE SANIDAD DE LOS CURADOS — que cada track siga apuntando a la figura que su
 * coreografía asume.
 *
 * Que el índice EXISTA ya se prueba en gf-icon.component.spec.ts. Aquí se cubre el fallo que ese
 * chequeo no ve y que ya costó caro (`calendar-clock`): la coreografía movía las figuras 0 y 1
 * dando por hecho que eran los pines del calendario, pero en ESE icono los pines son 1 y 4 — el 0
 * son las manecillas del reloj. Índices válidos, figuras existentes, tests en verde, y las
 * manecillas brincando fuera del reloj.
 *
 * No existe forma de leer la INTENCIÓN de una coreografía desde el código. Lo que sí se puede es
 * anclarla: `curated-choreography.lock.json` guarda la huella de la geometría contra la que se
 * escribió cada una. Si el dibujo se mueve debajo, esto truena y obliga a revisar los índices a
 * mano antes de correr `npm run curated:lock`. El lock no adivina — fuerza la revisión en el
 * momento exacto en que la suposición puede haberse roto.
 */

type Attrs = Record<string, string | number>;
const LUCIDE_NODES = iconNodes as unknown as Record<string, [string, Attrs][]>;
const LOCK = lockFile.icons as unknown as Record<string, string[]>;
const CURADOS = Object.entries(CURATED_ICONS) as [string, AnimatedIconDef][];

/** Todos los tracks de un icono, etiquetados para que el mensaje de error diga dónde buscar. */
function tracks(name: string, def: AnimatedIconDef): { donde: string; track: MotionTrack }[] {
  const out: { donde: string; track: MotionTrack }[] = [];
  for (const [variante, chor] of Object.entries(def.animations)) {
    if (chor.root) out.push({ donde: `${name}/${variante}/root`, track: chor.root });
    for (const [index, track] of Object.entries(chor.shapes ?? {})) {
      out.push({ donde: `${name}/${variante}/figura ${index}`, track });
    }
  }
  return out;
}

/**
 * Curados que llevan figuras que Lucide NO tiene. Se declaran una a una y con el motivo: el
 * catálogo es Lucide animado, y esa promesa solo aguanta si cada excepción está firmada.
 *
 * La condición para entrar aquí es dura y la verifica el propio test: la figura anexa va al final
 * y nace con `opacity: '0'`. O sea que el icono QUIETO sigue siendo idéntico al de Lucide y la
 * figura solo existe mientras dura el gesto. Una que se vea en reposo no cabe en esta lista.
 */
const FIGURAS_ANEXAS: Record<string, number> = {
  // Al separarse las dos mitades, el cajón de abajo queda sin borde superior — Lucide no se lo
  // dibuja porque con la tapa puesta no se ve. Esta arista lo cierra mientras está abierto.
  archive: 1,
  // Las seis monedas y `phone` llevan las figuras del gesto de AnimateIcons: cada moneda repasa
  // su propio trazo con una copia que se dibuja encima, y `phone` expande un halo. Ninguna la
  // dibuja Lucide, así que nacen con `opacity: '0'` y solo existen mientras dura la variante —
  // por eso `runAutoDraw` también las salta y el trazo de `draw` sigue siendo el del icono.
  euro: 3,
  'georgian-lari': 4,
  'indian-rupee': 5,
  'japanese-yen': 3,
  phone: 1,
  'pound-sterling': 4,
  'russian-ruble': 2,
  // Guías de relleno de la tanda 5, mismo mecanismo que las monedas.
  'eye-off': 1,
  info: 1,
  repeat: 2,
  webhook: 3,
  // Guías de relleno de la tanda 6.
  'audio-waveform': 1,
  bolt: 1,
  'hand-coins': 3,
  signpost: 2,
  wind: 3,
  // Guías de relleno y estelas: ninguna la dibuja Lucide, todas nacen con `opacity: '0'`.
  'chevron-down': 1,
  // `spark`: figuras que el icono emite y que Lucide no dibuja.
  bell: 2,
  flame: 2,
  hammer: 3,
  heart: 1,
  lightbulb: 3,
  'trash-2': 3,
  'volume-2': 1,
  zap: 2,
  // Estelas del `dart`: la copia que sale disparada y se apaga.
  'arrow-down': 2,
  'arrow-down-left': 2,
  'arrow-down-right': 2,
  'arrow-down-up': 4,
  'arrow-left': 2,
  'arrow-left-right': 4,
  'arrow-right': 2,
  'arrow-up': 2,
  'arrow-up-down': 4,
  'arrow-up-left': 2,
  'arrow-up-right': 2,
  'calendar-arrow-down': 2,
  'calendar-arrow-up': 2,
  'chevrons-down': 2,
  'chevrons-left': 2,
  'chevrons-left-right': 2,
  'chevrons-left-right-ellipsis': 2,
  'chevrons-right': 2,
  'chevrons-right-left': 2,
  'chevrons-up': 2,
  'clipboard-pen': 1,
  code: 2,
  'folder-pen': 1,
  'key-round': 2,
  layers: 3,
  'list-chevrons-up-down': 5,
  'arrow-right-left': 2,
  'arrow-down-0-1': 1,
  'arrow-down-1-0': 1,
  'arrow-down-to-dot': 1,
  'arrow-up-0-1': 1,
  'arrow-up-1-0': 1,
  'arrow-up-from-dot': 1,
  'arrow-down-a-z': 1,
  'arrow-down-narrow-wide': 1,
  'arrow-down-wide-narrow': 1,
  'arrow-down-z-a': 1,
  'arrow-up-a-z': 1,
  'arrow-up-narrow-wide': 1,
  'arrow-up-wide-narrow': 1,
  'arrow-up-z-a': 1,
  'chevron-first': 1,
  'chevron-last': 1,
  'chevrons-down-up': 2,
  'chevrons-up-down': 2,
  'circle-arrow-out-down-left': 1,
  'circle-arrow-out-down-right': 1,
  'circle-arrow-out-up-left': 1,
  'circle-arrow-out-up-right': 1,
  'square-arrow-out-down-left': 1,
  'square-arrow-out-down-right': 1,
  'square-arrow-out-up-left': 1,
  'square-arrow-out-up-right': 1,
  'square-arrow-down-left': 1,
  'square-arrow-down-right': 1,
  'square-arrow-up-left': 1,
  'square-arrow-up-right': 1,
  'square-arrow-right-enter': 1,
  'square-arrow-right-exit': 1,
  'arrow-big-down': 1,
  'arrow-big-down-dash': 1,
  'arrow-big-left': 1,
  'arrow-big-left-dash': 1,
  'arrow-big-right': 1,
  'arrow-big-right-dash': 1,
  'arrow-big-up': 1,
  'arrow-big-up-dash': 1,
  'arrow-down-from-line': 1,
  'arrow-down-to-line': 1,
  'arrow-left-from-line': 1,
  'arrow-left-to-line': 1,
  'arrow-right-from-line': 1,
  'arrow-right-to-line': 1,
  'arrow-up-from-line': 1,
  'arrow-up-to-line': 1,
  'arrows-up-from-line': 2,
  'circle-arrow-down': 1,
  'circle-arrow-left': 1,
  'circle-arrow-right': 1,
  'circle-arrow-up': 1,
  'square-arrow-down': 1,
  'square-arrow-left': 1,
  'square-arrow-right': 1,
  'square-arrow-up': 1,
  'log-in': 1,
  'log-out': 1,
  'pen-line': 1,
  play: 1,
  'reply-all': 2,
  search: 2,
  shuffle: 2,
  'sliders-horizontal': 3,
  'square-pen': 1,
  'user-round-pen': 1,
  'chevron-left': 1,
  'chevron-right': 1,
  'chevron-up': 1,
};

describe('Barrido de sanidad — los 180 curados', () => {
  /**
   * PRIMERO y sin lock: esto se para sobre el estado ACTUAL del catálogo, no sobre un diff contra
   * un archivo histórico. Si el lock se borrara mañana, este chequeo sigue teniendo la misma
   * fuerza — y si algo aquí truena, lo de abajo ni vale la pena leerlo.
   *
   * `gf-icon.component.spec.ts` prueba lo mismo sobre los 1767 (índice definido); esta versión es
   * de los curados y además exige que el índice sea un entero en rango, que ningún bloque
   * `shapes` quede vacío y que ninguna variante se quede sin UN SOLO índice válido — el caso en
   * que la coreografía existe pero no mueve ninguna figura de este icono.
   */
  it('todo índice referenciado existe en las figuras de ESE icono', () => {
    const problemas: string[] = [];
    for (const [name, def] of CURADOS) {
      for (const [variante, chor] of Object.entries(def.animations) as [string, IconChoreography][]) {
        if (!chor.shapes) continue;
        const indices = Object.keys(chor.shapes);
        if (indices.length === 0) {
          problemas.push(`${name}/${variante}: bloque \`shapes\` vacío — o anima algo o se borra`);
          continue;
        }
        let validos = 0;
        for (const raw of indices) {
          const i = Number(raw);
          if (!Number.isInteger(i) || i < 0 || i >= def.shapes.length) {
            problemas.push(
              `${name}/${variante}: el track apunta a la figura ${raw}, y el icono tiene ` +
                `${def.shapes.length} (índices válidos 0-${def.shapes.length - 1})`,
            );
          } else {
            validos++;
          }
        }
        if (validos === 0) {
          problemas.push(
            `${name}/${variante}: ni un solo índice válido — la coreografía no mueve ninguna figura de este icono`,
          );
        }
      }
    }
    expect(problemas).toEqual([]);
  });

  it('el lock cubre exactamente los iconos curados', () => {
    const problemas: string[] = [];
    for (const [name] of CURADOS) {
      if (!LOCK[name]) {
        problemas.push(`${name}: es curado pero no está en el lock — corre \`npm run curated:lock\``);
      }
    }
    for (const name of Object.keys(LOCK)) {
      if (!CURATED_ICONS[name]) {
        problemas.push(`${name}: está en el lock pero ya no es curado — corre \`npm run curated:lock\``);
      }
    }
    expect(problemas).toEqual([]);
  });

  it('la geometría no se movió debajo de una coreografía ya escrita', () => {
    const problemas: string[] = [];
    for (const [name, def] of CURADOS) {
      const anclado = LOCK[name];
      if (!anclado) continue; // ya truena en el test de cobertura del lock
      const actual = shapesFingerprint(def.shapes);
      const animadas = variantesPorFigura(def);

      if (anclado.length !== actual.length) {
        problemas.push(
          `${name}: el lock tiene ${anclado.length} figuras y ahora hay ${actual.length} — los ` +
            `índices se recorrieron, TODA la coreografía necesita revisión ` +
            `(anima ${[...animadas.keys()].sort((a, b) => a - b).join(', ') || 'ninguna'})`,
        );
        continue;
      }

      for (let i = 0; i < actual.length; i++) {
        if (anclado[i] === actual[i]) continue;
        const quien = animadas.get(i);
        problemas.push(
          quien
            ? `${name}: la figura ${i} (${def.shapes[i].tag}) cambió Y la anima ${quien.join(', ')} — ` +
              `revisa que el track siga apuntando a lo que la coreografía asume, LUEGO ` +
              `\`npm run curated:lock\``
            : `${name}: la figura ${i} (${def.shapes[i].tag}) cambió (no la anima nadie) — si es ` +
              `intencional, \`npm run curated:lock\``,
        );
      }
    }
    expect(problemas).toEqual([]);
  });

  it('la geometría curada sigue siendo 1:1 con Lucide, figura por figura y en orden', () => {
    // El otro lado de la misma moneda: el lock caza "cambiaste el dibujo", esto caza "Lucide lo
    // cambió y tú no". Antes solo lo veía `npm run lucide:diff`, que nadie corre en CI.
    const problemas: string[] = [];
    for (const [name, def] of CURADOS) {
      const nodos = LUCIDE_NODES[name];
      if (!nodos) {
        problemas.push(`${name}: curado sin nombre vigente en Lucide — ¿renombre? ver ICON_ALIASES`);
        continue;
      }
      // Las anexas van al FINAL y no se comparan; las de Lucide se siguen comparando todas, así
      // que la excepción no abre un hueco: si Lucide cambia el dibujo real, esto lo caza igual.
      const anexas = FIGURAS_ANEXAS[name] ?? 0;
      if (nodos.length !== def.shapes.length - anexas) {
        problemas.push(
          `${name}: Lucide tiene ${nodos.length} figuras, el curado ${def.shapes.length}` +
            (anexas ? ` (${anexas} anexa(s) declarada(s))` : ''),
        );
        continue;
      }
      for (let i = nodos.length; i < def.shapes.length; i++) {
        if (def.shapes[i].opacity !== '0') {
          problemas.push(`${name}[${i}]: figura anexa que SÍ se ve en reposo — Lucide no la dibuja`);
        }
      }
      const propias = shapesFingerprint(def.shapes);
      for (let i = 0; i < nodos.length; i++) {
        const [tag, attrs] = nodos[i];
        if (shapeFingerprint(tag, attrs) !== propias[i]) {
          problemas.push(`${name}[${i}]: geometría distinta a Lucide actual — revisar a mano`);
        }
      }
    }
    expect(problemas).toEqual([]);
  });

  it('ningún track con delay se queda sin fill (el parpadeo de la animación escalonada)', () => {
    // `track()` lo pone de fábrica; esto cubre los tracks escritos a mano con `options` crudas.
    const problemas: string[] = [];
    for (const [name, def] of CURADOS) {
      for (const { donde, track } of tracks(name, def)) {
        if (track.options.delay && !track.options.fill) {
          problemas.push(`${donde}: tiene delay pero no fill — se ve en su pose final durante la espera`);
        }
      }
    }
    expect(problemas).toEqual([]);
  });

  it('toda coreografía con reverseOnLeave sostiene su pose final', () => {
    // `reverseOnLeave` reproduce en reversa al salir el puntero. Sin un track que sostenga
    // (`fill: 'forwards'`), la pose se pierde al terminar y no hay de dónde regresar.
    const problemas: string[] = [];
    for (const [name, def] of CURADOS) {
      for (const [variante, chor] of Object.entries(def.animations) as [string, IconChoreography][]) {
        if (!chor.reverseOnLeave) continue;
        const sostiene = [chor.root, ...Object.values(chor.shapes ?? {})].some(
          (t) => t?.options.fill === 'forwards' || t?.options.fill === 'both',
        );
        if (!sostiene) {
          problemas.push(`${name}/${variante}: reverseOnLeave sin ningún track con fill forwards`);
        }
      }
    }
    expect(problemas).toEqual([]);
  });

  it('todo track tiene duración positiva y al menos dos keyframes', () => {
    const problemas: string[] = [];
    for (const [name, def] of CURADOS) {
      for (const { donde, track } of tracks(name, def)) {
        const d = track.options.duration;
        if (typeof d !== 'number' || !(d > 0)) problemas.push(`${donde}: duración inválida (${String(d)})`);
        if (track.keyframes.length < 2) problemas.push(`${donde}: ${track.keyframes.length} keyframe(s)`);
      }
    }
    expect(problemas).toEqual([]);
  });

  it('el transform-origin en unidades de usuario cae dentro del viewBox', () => {
    // En figuras hijas el componente fija `transform-box: view-box`, así que un `origin` en px va
    // en unidades del viewBox (0-24), NO en píxeles de pantalla ni en porcentaje del elemento.
    // Un valor fuera de rango es un origen copiado de otro sistema de coordenadas.
    const problemas: string[] = [];
    for (const [name, def] of CURADOS) {
      const [, , w, h] = (def.viewBox ?? '0 0 24 24').split(/\s+/).map(Number);
      for (const { donde, track } of tracks(name, def)) {
        if (!track.origin) continue;
        const valores = [...track.origin.matchAll(/(-?[\d.]+)px/g)].map((m) => Number(m[1]));
        // El margen es generoso a propósito: un pivote justo afuera de la figura es legítimo
        // (un péndulo, una órbita); 120 en un lienzo de 24 no lo es nunca.
        const limite = 2 * Math.max(w, h);
        for (const v of valores) {
          if (v < -limite || v > limite) {
            problemas.push(`${donde}: origin "${track.origin}" fuera del viewBox ${w}x${h}`);
          }
        }
      }
    }
    expect(problemas).toEqual([]);
  });

  it('ningún curado es un generado disfrazado', () => {
    // "El draw automático" tiene UNA sola definición en todo el repo: la constante `DRAW` que
    // `icon()` le cuelga a cada icono (choreography.ts) — la misma que recibe cada línea que
    // emite el generador, porque escribe `icon(shapes, {})` y nada más. Por eso este test no
    // re-describe qué es un draw vacío (eso sería una segunda definición que puede desviarse):
    // compara el `default` contra la variante `draw` de ESE MISMO icono, ya materializada.
    // Idénticos = el default no aporta intención y el icono pertenece a generated-icons.ts.
    // Un `autoDraw` con parámetros afinados (`{ speed: 45 }`) difiere del draw y se queda.
    const problemas: string[] = [];
    for (const [name, def] of CURADOS) {
      const porDefecto = def.animations['default'];
      const draw = def.animations['draw'];
      if (!porDefecto || !draw) continue; // la ausencia ya truena en gf-icon.component.spec.ts
      if (JSON.stringify(porDefecto) === JSON.stringify(draw)) {
        problemas.push(
          `${name}: su default es idéntico a la variante draw — o le escribes coreografía o se va a generated-icons.ts`,
        );
      }
    }
    expect(problemas).toEqual([]);
  });

  /*
   * El gesto de hover se elige por POSICIÓN: `varianteDeHover()` toma la TERCERA clave de
   * `animations`. Son 1095 de los 1767 iconos cuyo movimiento al pasar el puntero depende del
   * ORDEN en que están escritas sus variantes, no de cómo se llaman.
   *
   * Eso lo hacía invisible para todo lo que vigila el catálogo: reordenar dos variantes le
   * cambia el gesto al usuario sin mover un solo keyframe, y typecheck, lint, `motion-lint` y
   * `curated:lock:check` salían los cuatro verdes. Es la cicatriz de `calendar-clock` —índices
   * válidos, movimiento equivocado— pero sobre mil iconos.
   *
   * Estos dos tests son el ancla. El primero fija la regla; el segundo prueba que la huella de
   * coreografía SE MUEVE ante un reordenamiento puro, que es lo único que convierte al lock en
   * una red de verdad para esto.
   */
  it('el gesto de hover es el primer nombre propio, y `animation` manda sobre él', () => {
    const g = {}; // una coreografía cualquiera; aquí solo importan los NOMBRES
    const auto = { autoReveal: {} }; // el `reveal` que `icon()` le cuelga a los 1767
    const autoF = { autoFlicker: {} }; // el `flicker` que `icon()` le cuelga a los 1767

    // Sin segundo argumento — el consumidor no fijó `animation` — manda el primer nombre que no
    // sea `draw`, `default` ni el `reveal`/`flicker` genéricos.
    expect(varianteDeHover({ draw: g, default: g, spin: g, hold: g })).toBe('spin');
    expect(varianteDeHover({ draw: g, default: g })).toBe('default');
    expect(varianteDeHover({})).toBe('default');

    // El `reveal` GENÉRICO no le roba el hover a nadie: lo tienen los 1767, así que no es el gesto
    // de ninguno. Sin este descarte, los 672 iconos que solo traían `draw`+`default` pasaban de su
    // gesto curado a una materialización genérica, en silencio y sin un test en rojo.
    expect(varianteDeHover({ draw: g, default: g, reveal: auto })).toBe('default');
    expect(varianteDeHover({ draw: g, default: g, spin: g, reveal: auto })).toBe('spin');

    // Mismo descarte para el `flicker` GENÉRICO, mismo motivo: lo tienen los 1767 también.
    expect(varianteDeHover({ draw: g, default: g, flicker: autoF })).toBe('default');
    expect(varianteDeHover({ draw: g, default: g, spin: g, flicker: autoF })).toBe('spin');
    expect(varianteDeHover({ draw: g, default: g, reveal: auto, flicker: autoF })).toBe('default');

    // Pero el CURADO a mano sí cuenta: no trae `autoReveal`, y quien lo escribió lo hizo porque el
    // genérico no le servía (`bolt`, `audio-waveform`, las monedas).
    expect(varianteDeHover({ draw: g, default: g, reveal: g })).toBe('reveal');
    // …y aun así no se adelanta al gesto propio del icono, porque `icon()` respeta la posición que
    // le dio su autor. Es la cicatriz de `eye-off`, que perdía su `alert`.
    expect(varianteDeHover({ draw: g, default: g, alert: g, reveal: g })).toBe('alert');

    // Lo que fije el consumidor gana, y eso INCLUYE 'default'.
    //
    // La última línea afirmaba `.toBe('spin')` hasta el 2026-09-02: no era una regla, era el hoyo
    // de API escrito como test. `@Input() animation` arrancaba en `'default'`, así que el string
    // había que descartarlo para poder distinguirlo de "no lo fijó" — y el efecto era que
    // `default` fuese la única variante imposible de pedir. Hoy el centinela es `undefined`.
    expect(varianteDeHover({ draw: g, default: g, spin: g }, 'hold')).toBe('hold');
    expect(varianteDeHover({ draw: g, default: g, spin: g }, 'default')).toBe('default');
  });

  it('reordenar variantes mueve la huella, aunque no cambie ni un keyframe', () => {
    const gesto: IconChoreography = { shapes: { 0: { keyframes: [], options: { duration: 1 } } } };
    const shapes = [{ tag: 'path' as const, d: 'M0 0h1' }];
    const antes = choreographyFingerprint({
      shapes,
      animations: { draw: gesto, default: gesto, spin: gesto, hold: gesto },
    });
    const despues = choreographyFingerprint({
      shapes,
      animations: { draw: gesto, default: gesto, hold: gesto, spin: gesto },
    });
    expect(antes['@hover']).toBe('spin');
    expect(despues['@hover']).toBe('hold');
    expect(antes).not.toEqual(despues);
  });
});
