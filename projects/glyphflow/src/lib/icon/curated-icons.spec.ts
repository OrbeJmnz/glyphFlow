import { AnimatedIconDef, IconChoreography, MotionTrack } from './animated-icon.model';
import { CURATED_ICONS } from './curated-icons';
import { shapeFingerprint, shapesFingerprint, variantesPorFigura } from './curated-audit';
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
});
