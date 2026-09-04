import { allocOutputs, interpPolar } from './core/interpolate';
import { buildPlan, centroid, type MorphPlan } from './core/plan';
import { resampleIcon } from './core/resample';
import { serialize } from './core/serialize';
import { iconToCubics } from './core/normalize';
import { cubicsToPathD } from './core/serialize';
import type { IconInput } from './core/types';

/**
 * Coreografía a mano para pares específicos — mismo criterio que `curated-icons.ts` para iconos
 * individuales, aplicado a PARES de morph: cuando el algoritmo genérico produce una correspondencia
 * mediocre o directamente mala (ver `correspondenceIsPoor` en `morph-keyframes.ts`), unos pocos
 * pares de alto tráfico (toggles reales de UI: tema, copiar/listo, mostrar contraseña, notificar,
 * fijar, favorito, silenciar) tienen intención humana detrás en vez de forzar el genérico.
 *
 * Deliberadamente chico y a demanda — no es un patrón automático, cada entrada se agrega mirando
 * el par real. Tres formas de coreografía, según qué tan parecidas son las dos figuras:
 *
 * 1. `construirConSatelites` — hay UN cuerpo que sí corresponde bien (`sun`↔`moon`, `copy`↔`check`,
 *    `volume`↔`volume-off`): ese cuerpo morfea de verdad: el resto son "satélites" sin contraparte
 *    que se encogen/crecen hacia un punto fijo del borde final.
 * 2. `construirBaseConRaya` — el patrón `-off` más común de Lucide: la base NO cambia de forma en
 *    vuelo (partirla en piezas para el hueco de la raya da mal residuo incluso emparejando a mano —
 *    medido 0.48-0.70 en varios), solo crece una raya diagonal encima. El aterrizaje exacto (que ya
 *    hace `runMorph`/`createLiveMorph`) cambia al `d` real —CON el hueco— en el instante en que la
 *    raya ya lo tapa por completo, así que el salto es invisible.
 * 3. `construirSinCuerpo` — ninguna pieza de un lado corresponde razonablemente a ninguna del otro
 *    (`eye`↔`eye-closed`: un lente cerrado no es una versión deformada de un párpado, es OTRA
 *    figura): todo lo de origen converge al centro del lienzo, todo lo de destino emerge desde ahí.
 */

/**
 * `d` canónicos pegados como texto — NO se importan los iconos desde `glyphflow`. Este paquete
 * (`glyphflow/morph`) no depende del catálogo de iconos del entry point primario a propósito
 * (portabilidad: el motor funciona con CUALQUIER forma, nunca con nombres de icono) — acoplarlo por
 * unos pocos iconos rompería esa frontera. `resampleIcon` acepta un `d` suelto igual que acepta
 * `IconNode`, así que estas constantes alimentan el resto del archivo sin más.
 *
 * Generados una vez con `canonicalD()` sobre los datos reales de Lucide 1.31 — si el catálogo
 * cambia esta geometría en una actualización futura, `scripts/lucide-diff-report.mjs` lo marcaría
 * como CHANGED y este archivo dejaría de reconocer el par (cae al camino genérico, nunca revienta).
 */
const SUN_D =
  'M16 12C16 14.2091 14.2091 16 12 16C9.7909 16 8 14.2091 8 12C8 9.7909 9.7909 8 12 8C14.2091 8 16 9.7909 16 12ZM12 2C12 2.6667 12 3.3333 12 4M12 20C12 20.6667 12 21.3333 12 22M4.93 4.93C5.4 5.4 5.87 5.87 6.34 6.34M17.66 17.66C18.13 18.13 18.6 18.6 19.07 19.07M2 12C2.6667 12 3.3333 12 4 12M20 12C20.6667 12 21.3333 12 22 12M6.34 17.66C5.87 18.13 5.4 18.6 4.93 19.07M19.07 4.93C18.6 5.4 18.13 5.87 17.66 6.34';
const MOON_D =
  'M20.985 12.486C20.7239 17.3235 16.6804 21.0863 11.8366 20.9994C6.9929 20.9125 3.087 17.007 2.9996 12.1633C2.9121 7.3195 6.6745 3.2757 11.512 3.014C11.917 2.992 12.129 3.474 11.914 3.817C10.4332 6.1863 10.7837 9.2641 12.7593 11.2397C14.7349 13.2153 17.8127 13.5658 20.182 12.085C20.526 11.87 21.007 12.081 20.985 12.486';
const COPY_D =
  'M10 8C13.3333 8 16.6667 8 20 8C21.1046 8 22 8.8954 22 10C22 13.3333 22 16.6667 22 20C22 21.1046 21.1046 22 20 22C16.6667 22 13.3333 22 10 22C8.8954 22 8 21.1046 8 20C8 16.6667 8 13.3333 8 10C8 8.8954 8.8954 8 10 8ZM4 16C2.9 16 2 15.1 2 14C2 10.6667 2 7.3333 2 4C2 2.9 2.9 2 4 2C7.3333 2 10.6667 2 14 2C15.1 2 16 2.9 16 4';
const CHECK_D =
  'M20 6C16.3333 9.6667 12.6667 13.3333 9 17C7.3333 15.3333 5.6667 13.6667 4 12';
const VOLUME_D =
  'M11 4.702C10.9996 4.4172 10.8278 4.1606 10.5647 4.0516C10.3015 3.9427 9.9986 4.0028 9.797 4.204C8.669 5.3317 7.541 6.4593 6.413 7.587C6.1492 7.8524 5.7902 8.0011 5.416 8C4.6107 8 3.8053 8 3 8C2.4477 8 2 8.4477 2 9C2 11 2 13 2 15C2 15.5523 2.4477 16 3 16C3.8053 16 4.6107 16 5.416 16C5.7902 15.9989 6.1492 16.1476 6.413 16.413C7.5407 17.541 8.6683 18.669 9.796 19.797C9.9976 19.999 10.3012 20.0596 10.5649 19.9503C10.8286 19.841 11.0004 19.5835 11 19.298C11 14.4327 11 9.5673 11 4.702Z';
const VOLUME_OFF_D =
  'M16 9C16.5044 9.6723 16.8311 10.461 16.95 11.293M19.364 5.636C21.9814 8.2519 22.7308 12.2034 21.253 15.596M2 2C8.6667 8.6667 15.3333 15.3333 22 22M7 7C6.8043 7.1957 6.6087 7.3913 6.413 7.587C6.1492 7.8524 5.7902 8.0011 5.416 8C4.6107 8 3.8053 8 3 8C2.4477 8 2 8.4477 2 9C2 11 2 13 2 15C2 15.5523 2.4477 16 3 16C3.8053 16 4.6107 16 5.416 16C5.7902 15.9989 6.1492 16.1476 6.413 16.413C7.5407 17.541 8.6683 18.669 9.796 19.797C9.9976 19.999 10.3012 20.0596 10.5649 19.9503C10.8286 19.841 11.0004 19.5835 11 19.298C11 16.532 11 13.766 11 11M9.828 4.172C10.0241 3.9752 10.3196 3.916 10.5763 4.0223C10.833 4.1285 11.0003 4.3791 11 4.657C11 4.8857 11 5.1143 11 5.343';
const EYE_D =
  'M2.062 12.348C1.9787 12.1235 1.9787 11.8765 2.062 11.652C3.722 7.6269 7.646 5.0006 12 5.0006C16.354 5.0006 20.278 7.6269 21.938 11.652C22.0213 11.8765 22.0213 12.1235 21.938 12.348C20.278 16.3731 16.354 18.9994 12 18.9994C7.646 18.9994 3.722 16.3731 2.062 12.348M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z';
const EYE_OFF_D =
  'M10.733 5.076C15.5201 4.5055 20.1012 7.1936 21.938 11.651C22.0213 11.8755 22.0213 12.1225 21.938 12.347C21.5705 13.238 21.0848 14.0755 20.494 14.837M14.084 14.158C12.9069 15.2949 11.0357 15.2787 9.8785 14.1215C8.7213 12.9643 8.7051 11.0931 9.842 9.916M17.479 17.499C14.7949 19.0889 11.5525 19.4345 8.5936 18.4459C5.6348 17.4573 3.2513 15.2321 2.062 12.348C1.9787 12.1235 1.9787 11.8765 2.062 11.652C2.9486 9.5019 4.5087 7.6972 6.508 6.509M2 2C8.6667 8.6667 15.3333 15.3333 22 22';
const EYE_CLOSED_D =
  'M15 18C14.7593 16.9167 14.5187 15.8333 14.278 14.75M2 8C3.533 12.2009 7.5281 14.9959 12 14.9959C16.4719 14.9959 20.467 12.2009 22 8M20 15C19.4247 14.3167 18.8493 13.6333 18.274 12.95M4 15C4.5753 14.3167 5.1507 13.6333 5.726 12.95M9 18C9.2407 16.9167 9.4813 15.8333 9.722 14.75';
const BELL_D =
  'M10.268 21C10.6253 21.6188 11.2855 21.9999 12 21.9999C12.7145 21.9999 13.3747 21.6188 13.732 21M3.262 15.326C2.9951 15.6185 2.926 16.041 3.0857 16.4034C3.2455 16.7658 3.604 16.9997 4 17C9.3333 17 14.6667 17 20 17C20.396 17.0001 20.7547 16.7666 20.9149 16.4045C21.0751 16.0424 21.0065 15.6199 20.74 15.327C19.41 13.956 18 12.499 18 8C18 4.6863 15.3137 2 12 2C8.6863 2 6 4.6863 6 8C6 12.499 4.589 13.956 3.262 15.326';
const BELL_OFF_D =
  'M10.268 21C10.6253 21.6188 11.2855 21.9999 12 21.9999C12.7145 21.9999 13.3747 21.6188 13.732 21M17 17C12.6667 17 8.3333 17 4 17C3.604 17.0001 3.2453 16.7666 3.0851 16.4045C2.9249 16.0424 2.9935 15.6199 3.26 15.327C4.59 13.956 6 12.499 6 8C5.9999 7.4098 6.0868 6.8228 6.258 6.258M2 2C8.6667 8.6667 15.3333 15.3333 22 22M8.668 3.01C10.5089 1.7807 12.8772 1.6649 14.8292 2.7087C16.7813 3.7525 18.0001 5.7864 18 8C18 10.687 18.77 12.653 19.707 14.05';
const PIN_D =
  'M12 17C12 18.6667 12 20.3333 12 22M9 10.76C8.9996 11.5189 8.5697 12.2123 7.89 12.55C7.2967 12.85 6.7033 13.15 6.11 13.45C5.4303 13.7877 5.0004 14.4811 5 15.24C5 15.4933 5 15.7467 5 16C5 16.5523 5.4477 17 6 17C10 17 14 17 18 17C18.5523 17 19 16.5523 19 16C19 15.7467 19 15.4933 19 15.24C18.9996 14.4811 18.5697 13.7877 17.89 13.45C17.2967 13.15 16.7033 12.85 16.11 12.55C15.4303 12.2123 15.0004 11.5189 15 10.76C15 9.5067 15 8.2533 15 7C15 6.4477 15.4477 6 16 6C17.1046 6 18 5.1046 18 4C18 2.8954 17.1046 2 16 2C13.3333 2 10.6667 2 8 2C6.8954 2 6 2.8954 6 4C6 5.1046 6.8954 6 8 6C8.5523 6 9 6.4477 9 7C9 8.2533 9 9.5067 9 10.76Z';
const PIN_OFF_D =
  'M12 17C12 18.6667 12 20.3333 12 22M15 9.34C15 8.56 15 7.78 15 7C15 6.4477 15.4477 6 16 6C17.1046 6 18 5.1046 18 4C18 2.8954 17.1046 2 16 2C13.2967 2 10.5933 2 7.89 2M2 2C8.6667 8.6667 15.3333 15.3333 22 22M9 9C9 9.5867 9 10.1733 9 10.76C8.9996 11.5189 8.5697 12.2123 7.89 12.55C7.2967 12.85 6.7033 13.15 6.11 13.45C5.4303 13.7877 5.0004 14.4811 5 15.24C5 15.4933 5 15.7467 5 16C5 16.5523 5.4477 17 6 17C9.6667 17 13.3333 17 17 17';
const STAR_D =
  'M11.525 2.295C11.6144 2.1144 11.7985 2.0001 12 2.0001C12.2015 2.0001 12.3856 2.1144 12.475 2.295C13.245 3.8547 14.015 5.4143 14.785 6.974C15.0939 7.5991 15.6901 8.0327 16.38 8.134C18.102 8.386 19.824 8.638 21.546 8.89C21.7457 8.9189 21.9116 9.0587 21.974 9.2506C22.0364 9.4425 21.9845 9.6531 21.84 9.794C20.5947 11.0067 19.3493 12.2193 18.104 13.432C17.6038 13.9194 17.3754 14.6216 17.493 15.31C17.787 17.0233 18.081 18.7367 18.375 20.45C18.4103 20.6496 18.3286 20.8519 18.1645 20.971C18.0005 21.0901 17.7829 21.1053 17.604 21.01C16.0647 20.2007 14.5253 19.3913 12.986 18.582C12.3683 18.2577 11.6307 18.2577 11.013 18.582C9.474 19.3913 7.935 20.2007 6.396 21.01C6.2171 21.1047 6 21.0893 5.8363 20.9702C5.6726 20.8512 5.591 20.6493 5.626 20.45C5.9197 18.737 6.2133 17.024 6.507 15.311C6.6251 14.6223 6.3966 13.9195 5.896 13.432C4.6507 12.2197 3.4053 11.0073 2.16 9.795C2.0143 9.6543 1.9616 9.4428 2.0241 9.2502C2.0866 9.0575 2.2534 8.9174 2.454 8.889C4.1757 8.6373 5.8973 8.3857 7.619 8.134C8.3097 8.0335 8.9068 7.5998 9.216 6.974C9.9857 5.4143 10.7553 3.8547 11.525 2.295Z';
const STAR_OFF_D =
  'M10.344 4.688C10.7377 3.8903 11.1313 3.0927 11.525 2.295C11.6144 2.1144 11.7985 2.0001 12 2.0001C12.2015 2.0001 12.3856 2.1144 12.475 2.295C13.245 3.8547 14.015 5.4143 14.785 6.974C15.0935 7.5995 15.6899 8.0332 16.38 8.134C18.102 8.386 19.824 8.638 21.546 8.89C21.7457 8.9189 21.9116 9.0587 21.974 9.2506C22.0364 9.4425 21.9845 9.6531 21.84 9.794C20.761 10.8447 19.682 11.8953 18.603 12.946M17.945 17.945C18.0883 18.78 18.2317 19.615 18.375 20.45C18.4103 20.6496 18.3286 20.8519 18.1645 20.971C18.0005 21.0901 17.7829 21.1053 17.604 21.01C16.0647 20.2007 14.5253 19.3913 12.986 18.582C12.3684 18.2573 11.6306 18.2573 11.013 18.582C9.474 19.3913 7.935 20.2007 6.396 21.01C6.2171 21.1047 6 21.0893 5.8363 20.9702C5.6726 20.8512 5.591 20.6493 5.626 20.45C5.9197 18.737 6.2133 17.024 6.507 15.311C6.6255 14.6222 6.3969 13.9193 5.896 13.432C4.6507 12.2197 3.4053 11.0073 2.16 9.795C2.0143 9.6543 1.9616 9.4428 2.0241 9.2502C2.0866 9.0575 2.2534 8.9174 2.454 8.889C4.1757 8.6373 5.8973 8.3857 7.619 8.134C7.7532 8.1044 7.8865 8.0714 8.019 8.035M2 2C8.6667 8.6667 15.3333 15.3333 22 22';
const HEART_D =
  'M2 9.5C2 7.2219 3.4044 5.1797 5.5316 4.3644C7.6588 3.5491 10.0684 4.1295 11.591 5.824C11.6969 5.9372 11.845 6.0015 12 6.0015C12.155 6.0015 12.3031 5.9372 12.409 5.824C13.9271 4.1182 16.3426 3.5302 18.4749 4.3475C20.6071 5.1647 22.0109 7.2165 22 9.5C22 11.79 20.5 13.5 19 15C17.1693 16.771 15.3387 18.542 13.508 20.313C13.1311 20.7459 12.5863 20.996 12.0123 20.9996C11.4383 21.0033 10.8904 20.7601 10.508 20.332C8.672 18.5547 6.836 16.7773 5 15C3.5 13.5 2 11.8 2 9.5';
const HEART_OFF_D =
  'M10.5 4.893C10.9027 5.1544 11.2695 5.4674 11.591 5.824C11.6969 5.9372 11.845 6.0015 12 6.0015C12.155 6.0015 12.3031 5.9372 12.409 5.824C13.9271 4.1182 16.3426 3.5302 18.4749 4.3475C20.6071 5.1647 22.0109 7.2165 22 9.5C22 11.372 20.998 12.856 19.813 14.155M16.967 16.967C15.814 18.0823 14.661 19.1977 13.508 20.313C13.1311 20.7459 12.5863 20.996 12.0123 20.9996C11.4383 21.0033 10.8904 20.7601 10.508 20.332C8.672 18.5547 6.836 16.7773 5 15C3.5 13.5 2 11.8 2 9.5C2.0001 7.5364 3.0471 5.7219 4.747 4.739M2 2C8.6667 8.6667 15.3333 15.3333 22 22';

/** El único trazo que agrega TODO `-off` de Lucide, siempre igual — de esquina a esquina del lienzo. */
const RAYA_D = 'M2 2L22 22';

/** Centro del lienzo — todos los iconos de este catálogo son 24×24, mismo supuesto que ya usa
 *  `LADO_VIEWBOX` en `morph-keyframes.ts`. */
const CENTRO_LIENZO: readonly [number, number] = [12, 12];

/** Mismo criterio de "identidad de una forma" que ya usa el resto del motor (`canonicalD`). */
function canonicalDDeIcono(icono: IconInput): string {
  return cubicsToPathD(iconToCubics(icono));
}

export interface CuratedMorph {
  plan: MorphPlan;
  pose(t: number): string;
}

/** Un `MorphPlan` vacío para las coreografías que no matchean geometría 1:1 (`construirBaseConRaya`,
 *  `construirSinCuerpo`) — `pasosAdaptativos` lo lee bien igual (sin items, cae al piso `STEPS_MIN`,
 *  correcto: no hay rotación real que seguir de cerca). */
const PLAN_VACIO: MorphPlan = { items: [], n: 0, quality: { residual: 0, fragmentation: 1 } };

/** Un subpath SIN destino propio: se retrae hacia un punto fijo del borde final. */
interface Satelite {
  pts: Float64Array;
  closed: boolean;
  destino: readonly [number, number];
}

/** Punto del array `borde` (pares x,y) más cercano en ÁNGULO (desde `centro`) a `angulo`. */
function puntoMasCercanoEnAngulo(
  borde: Float64Array,
  centro: readonly [number, number],
  angulo: number,
): readonly [number, number] {
  const n = borde.length / 2;
  let mejor = 0;
  let mejorDelta = Infinity;
  for (let i = 0; i < n; i++) {
    const ang = Math.atan2(borde[2 * i + 1] - centro[1], borde[2 * i] - centro[0]);
    let delta = Math.abs(ang - angulo);
    if (delta > Math.PI) delta = 2 * Math.PI - delta;
    if (delta < mejorDelta) {
      mejorDelta = delta;
      mejor = i;
    }
  }
  return [borde[2 * mejor], borde[2 * mejor + 1]];
}

/**
 * Un cuerpo principal (`origen[indiceCuerpo]`, emparejado 1:1 con el único subpath de `destino`)
 * más N satélites (el resto de los subpaths de `origen`) que no tienen destino propio.
 *
 * Los satélites se retraen hacia un punto DEL BORDE FINAL — no un punto suelto en el vacío (dejaría
 * un resto visible con `stroke-linecap`/`linejoin` redondo), y tampoco el borde EN MOVIMIENTO
 * mientras el cuerpo interpola (primera versión de este archivo): perseguir un ancla que se mueve es
 * casi imperceptible encogiendo —el satélite arranca grande, un temblor chico no se nota— pero muy
 * visible CRECIENDO: un satélite recién nacido es chico, así que el mismo temblor absoluto del ancla
 * es una fracción mucho más grande de su tamaño. Fijar el punto usando el destino YA CONOCIDO
 * (`plan.items[0].bO`, la forma de destino en su orientación final — mismo dato que `interpPolar`
 * produce en t=1, sin tener que llamarlo) arregla las dos direcciones a la vez, no solo la peor.
 *
 * `destino` se asume de UN solo subpath.
 */
/**
 * Reparto del reloj cuando el gesto se cuenta en DOS ACTOS en vez de hacer todo a la vez.
 *
 * `satelite` es la fracción de `t` en la que los satélites terminan de retraerse; `cuerpo`, aquella
 * en la que el cuerpo empieza a morfear. **Se solapan a propósito**: sin solape se leen como dos
 * animaciones pegadas con una costura en medio, no como un gesto con dos tiempos.
 *
 * Sin esto (el default) los dos comparten `t` y ocurren simultáneamente, que es como nacieron los
 * curados. No se escalona por gusto: solo donde hacerlo a la vez esconde la mitad del gesto.
 */
interface Escalonado {
  readonly satelite: number;
  readonly cuerpo: number;
}

const acotar01 = (x: number): number => (x < 0 ? 0 : x > 1 ? 1 : x);

function construirConSatelites(
  origenD: string,
  indiceCuerpo: number,
  destinoD: string,
  escalonado?: Escalonado,
): CuratedMorph {
  const origen = resampleIcon(origenD);
  const destino = resampleIcon(destinoD);
  const cuerpoOrigen = origen[indiceCuerpo];
  const centro = centroid(cuerpoOrigen.pts);

  const plan = buildPlan([cuerpoOrigen], destino);
  const cuerpoOut = allocOutputs(plan);
  const cuerpoCerrado = plan.items[0].closed;
  const bordeFinal = plan.items[0].bO;

  const satelites: Satelite[] = origen
    .filter((_, i) => i !== indiceCuerpo)
    .map((s) => {
      const c = centroid(s.pts);
      const angulo = Math.atan2(c[1] - centro[1], c[0] - centro[0]);
      return { pts: s.pts, closed: s.closed, destino: puntoMasCercanoEnAngulo(bordeFinal, centro, angulo) };
    });

  function pose(t: number): string {
    // Cada acto con su propio reloj. Sin `escalonado` los dos son `t` y no cambia nada.
    const tCuerpo = escalonado ? acotar01((t - escalonado.cuerpo) / (1 - escalonado.cuerpo)) : t;
    const tSatelite = escalonado ? acotar01(t / escalonado.satelite) : t;

    interpPolar(plan, tCuerpo, cuerpoOut);
    const salidas: Float64Array[] = [cuerpoOut[0]];
    const cerrados = [cuerpoCerrado];
    for (const sat of satelites) {
      const [bx, by] = sat.destino;
      const n = sat.pts.length / 2;
      const encogido = new Float64Array(sat.pts.length);
      for (let i = 0; i < n; i++) {
        encogido[2 * i] = sat.pts[2 * i] + (bx - sat.pts[2 * i]) * tSatelite;
        encogido[2 * i + 1] = sat.pts[2 * i + 1] + (by - sat.pts[2 * i + 1]) * tSatelite;
      }
      salidas.push(encogido);
      cerrados.push(sat.closed);
    }
    return serialize(salidas, cerrados);
  }

  return { plan, pose };
}

/**
 * Patrón `-off` de Lucide: base intacta + una raya diagonal que crece encima.
 *
 * La base NUNCA cambia de forma en vuelo. La alternativa —partirla a mano en las mismas piezas que
 * trae el `-off` real— se midió y no rinde: hasta emparejando cada pieza por separado (no solo la
 * figura entera contra las dos a la vez) el residuo se queda en 0.48-0.70, porque un lazo CERRADO
 * no tiene una correspondencia razonable con un ARCO ABIERTO — son topológicamente distintos, no una
 * simple deformación. Mantener la base quieta y solo crecer la raya evita ese problema de raíz.
 *
 * Funciona porque la ÚNICA diferencia real entre la base y su `-off` es un hueco microscópico donde
 * la raya la cruza — y para cuando `runMorph`/`createLiveMorph` aterrizan en el `d` canónico real
 * (CON el hueco), la raya ya está trazada completa exactamente ahí encima. El salto es invisible.
 */
function construirBaseConRaya(baseD: string): CuratedMorph {
  const base = resampleIcon(baseD);
  const raya = resampleIcon(RAYA_D)[0];

  function pose(t: number): string {
    const salidas: Float64Array[] = base.map((s) => s.pts);
    const cerrados = base.map((s) => s.closed);
    const n = raya.pts.length / 2;
    const creciendo = new Float64Array(raya.pts.length);
    for (let i = 0; i < n; i++) {
      creciendo[2 * i] = CENTRO_LIENZO[0] + (raya.pts[2 * i] - CENTRO_LIENZO[0]) * t;
      creciendo[2 * i + 1] = CENTRO_LIENZO[1] + (raya.pts[2 * i + 1] - CENTRO_LIENZO[1]) * t;
    }
    salidas.push(creciendo);
    cerrados.push(false);
    return serialize(salidas, cerrados);
  }

  return { plan: PLAN_VACIO, pose };
}

/**
 * Sin cuerpo compartido: ninguna pieza de un lado tiene una correspondencia razonable con ninguna
 * del otro (un lente de ojo abierto no es una versión deformada de una línea de párpado cerrado —
 * son formas distintas, no la misma forma vista de otro ángulo). Todo lo de `origen` converge hacia
 * el centro del lienzo; todo lo de `destino` emerge desde ahí. Es una coreografía con intención
 * (el icono "se recoge" y el nuevo "aparece" desde el mismo punto), no un fundido plano de opacidad.
 */
function construirSinCuerpo(origenD: string, destinoD: string): CuratedMorph {
  const origen = resampleIcon(origenD);
  const destino = resampleIcon(destinoD);

  function encogerHaciaCentro(pts: Float64Array, t: number): Float64Array {
    const n = pts.length / 2;
    const out = new Float64Array(pts.length);
    for (let i = 0; i < n; i++) {
      out[2 * i] = pts[2 * i] + (CENTRO_LIENZO[0] - pts[2 * i]) * t;
      out[2 * i + 1] = pts[2 * i + 1] + (CENTRO_LIENZO[1] - pts[2 * i + 1]) * t;
    }
    return out;
  }

  function crecerDesdeCentro(pts: Float64Array, t: number): Float64Array {
    const n = pts.length / 2;
    const out = new Float64Array(pts.length);
    for (let i = 0; i < n; i++) {
      out[2 * i] = CENTRO_LIENZO[0] + (pts[2 * i] - CENTRO_LIENZO[0]) * t;
      out[2 * i + 1] = CENTRO_LIENZO[1] + (pts[2 * i + 1] - CENTRO_LIENZO[1]) * t;
    }
    return out;
  }

  function pose(t: number): string {
    const salidas: Float64Array[] = [
      ...origen.map((s) => encogerHaciaCentro(s.pts, t)),
      ...destino.map((s) => crecerDesdeCentro(s.pts, t)),
    ];
    const cerrados = [...origen.map((s) => s.closed), ...destino.map((s) => s.closed)];
    return serialize(salidas, cerrados);
  }

  return { plan: PLAN_VACIO, pose };
}

interface EntradaCurada {
  origenD: string;
  destinoD: string;
  construir: () => CuratedMorph;
  cache: CuratedMorph | null;
}

/**
 * El registro completo. Agregar un par nuevo es una decisión aparte (mirando el par real, con su
 * geometría real medida) — no un efecto colateral de tocar este archivo por otro motivo.
 */
const REGISTRO: EntradaCurada[] = [
  // sol→luna: el círculo central (índice 0) es el cuerpo; los 8 rayos son satélites.
  {
    origenD: SUN_D,
    destinoD: MOON_D,
    construir: () => construirConSatelites(SUN_D, 0, MOON_D),
    cache: null,
  },
  // copy→check: la "L" de atrás (índice 1) es el cuerpo — ya tiene residual sano (0.286) contra la
  // V de check. El cuadrado de adelante (índice 0, cerrado) es el satélite.
  {
    origenD: COPY_D,
    destinoD: CHECK_D,
    /*
     * ESCALONADO, único del registro. Copiar es dos cosas —la hoja de encima se va, lo que queda
     * se vuelve palomita— y hacerlas a la vez las esconde: se leía como "algo pequeño cambió", sin
     * que se pudiera decir qué. En dos tiempos el gesto se cuenta.
     *
     * El cuadrado sale primero y el cuerpo espera: medido, la "L" (trazo ABIERTO) va a la palomita
     * con residual 0.286, mientras que el cuadrado (bucle CERRADO) daría 0.676 — casi el umbral de
     * fundido. Cerrado → abierto es el caso duro del motor, así que la pieza que sobrevive tiene
     * que ser la L, no el cuadrado.
     */
    construir: () => construirConSatelites(COPY_D, 1, CHECK_D, { satelite: 0.45, cuerpo: 0.35 }),
    cache: null,
  },
  // volume-off→volume: el cuerpo del parlante (índice 3 de volume-off) es prácticamente idéntico al
  // único trazo de volume — los otros 4 (ondas de sonido cortadas + raya + arco chico) son satélites.
  {
    origenD: VOLUME_OFF_D,
    destinoD: VOLUME_D,
    construir: () => construirConSatelites(VOLUME_OFF_D, 3, VOLUME_D),
    cache: null,
  },
  // Patrón "-off" — base intacta, raya creciendo. Medido: forzar la base a partirse en las piezas
  // reales del "-off" da 0.48-0.70 de residuo aun emparejando cada pieza a mano.
  { origenD: EYE_D, destinoD: EYE_OFF_D, construir: () => construirBaseConRaya(EYE_D), cache: null },
  { origenD: BELL_D, destinoD: BELL_OFF_D, construir: () => construirBaseConRaya(BELL_D), cache: null },
  { origenD: PIN_D, destinoD: PIN_OFF_D, construir: () => construirBaseConRaya(PIN_D), cache: null },
  { origenD: STAR_D, destinoD: STAR_OFF_D, construir: () => construirBaseConRaya(STAR_D), cache: null },
  { origenD: HEART_D, destinoD: HEART_OFF_D, construir: () => construirBaseConRaya(HEART_D), cache: null },
  // eye→eye-closed: NO es el patrón "-off" (sin raya, diseño de párpado + pestañas totalmente
  // distinto) — ninguna pieza corresponde razonablemente a ninguna otra (medido: 0.70-0.89 aun
  // probando las combinaciones más parecidas). Converge/emerge desde el centro del lienzo.
  {
    origenD: EYE_D,
    destinoD: EYE_CLOSED_D,
    construir: () => construirSinCuerpo(EYE_D, EYE_CLOSED_D),
    cache: null,
  },
];

/**
 * `null` si el par no tiene coreografía curada — el llamador cae al camino genérico (geométrico
 * adaptativo o fundido) sin más. La dirección inversa (destino→origen) reproduce la MISMA
 * coreografía leída al revés (`pose(1 - t)`), igual que `roundTrip` reusa la trayectoria de ida en
 * vez de recalcular.
 */
export function findCuratedMorph(origen: IconInput, destino: IconInput): CuratedMorph | null {
  const dOrigen = canonicalDDeIcono(origen);
  const dDestino = canonicalDDeIcono(destino);
  for (const entrada of REGISTRO) {
    if (dOrigen === entrada.origenD && dDestino === entrada.destinoD) {
      entrada.cache ??= entrada.construir();
      return entrada.cache;
    }
    if (dOrigen === entrada.destinoD && dDestino === entrada.origenD) {
      entrada.cache ??= entrada.construir();
      const base = entrada.cache;
      return { plan: base.plan, pose: (t: number) => base.pose(1 - t) };
    }
  }
  return null;
}
