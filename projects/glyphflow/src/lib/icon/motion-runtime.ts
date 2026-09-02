/**
 * Piezas de runtime del motor de animación. Puras y sin Angular, para poder probarlas: jsdom no
 * implementa Web Animations API, así que la única forma de verificar esta lógica es aislándola del
 * `element.animate()` que nunca va a existir en el test.
 *
 * INTERNO — NO va en `public-api.ts`, igual que `curated-audit.ts`. Vive aparte del componente
 * justo por eso: `max-icon.component.ts` SÍ se re-exporta, así que cualquier helper declarado ahí
 * se volvería API pública sin que nadie lo decidiera.
 */

/**
 * A dónde se degrada un `linear()` cuando el navegador no lo entiende: exactamente el
 * `cubic-bezier` que `SPRING_OUT` era antes de volverse un resorte real. Se pierde el rebote, no
 * el icono.
 */
export const EASING_FALLBACK = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** Cache de la detección. `undefined` = todavía no se preguntó. */
let soportaLinear: boolean | undefined;

/** Solo para los tests: olvida la detección cacheada. */
export function resetSoporteLinear(): void {
  soportaLinear = undefined;
}

/**
 * Un `easing` que el navegador no puede parsear NO degrada en silencio: `element.animate()` tira
 * `TypeError` y se lleva el render por delante. Por eso los presets `linear()` pasan siempre por
 * aquí antes de llegar a WAAPI.
 *
 * `linear()` es Chrome 113+, Safari 17.4+ y Firefox 129+, y el rango de peers admite Angular 20,
 * que soporta navegadores anteriores a eso. La detección corre UNA vez por documento (un `div`
 * desechable), no una vez por animación.
 */
export function easingSeguro(easing: string | undefined): string | undefined {
  if (!easing?.startsWith('linear(')) return easing;
  if (soportaLinear === undefined) {
    try {
      document.createElement('div').animate(null, { duration: 1, easing: 'linear(0, 1)' });
      soportaLinear = true;
    } catch {
      soportaLinear = false;
    }
  }
  return soportaLinear ? easing : EASING_FALLBACK;
}

/**
 * Reescribe una lista de keyframes para que arranque en el estado ACTUAL de la figura en vez de en
 * su pose base — la mitad del relevo (ver `GfIconComponent.run`).
 *
 * Cómo: se tira el keyframe 0 y los demás CONSERVAN su offset original (`(i+1)/n`). Al no haber
 * keyframe en el offset 0, WAAPI construye uno implícito con el valor subyacente del elemento, que
 * es justo lo que `commitStyles()` acaba de escribir en el style inline. El primer tramo dura lo
 * mismo que duraba, así que el ritmo de la coreografía no se deforma — que es la diferencia entre
 * un relevo y un atajo.
 *
 * Devuelve `null` cuando no es seguro y hay que cortar en seco:
 * - **offsets a mano** (3 tracks curados los traen): reescribirlos cambiaría la coreografía.
 * - **menos de 3 keyframes**: tirar uno deja una curva sin forma. Aquí caen los trazos
 *   (`strokeDraw`), que además no necesitan relevo: arrancan invisibles, no hay pose que entregar.
 */
export function conRelevo(keyframes: Keyframe[]): Keyframe[] | null {
  if (keyframes.length < 3) return null;
  if (keyframes.some((k) => k.offset !== undefined && k.offset !== null)) return null;
  const n = keyframes.length - 1;
  return keyframes.slice(1).map((k, i) => ({ ...k, offset: (i + 1) / n }));
}


/**
 * Qué variante dispara el hover cuando el consumidor no fijó `animation`.
 *
 * **Se elige por POSICIÓN, no por nombre**: con 3 o más, la TERCERA. El orden del catálogo es
 * `draw`, `default`, y luego la especial del icono (`rotate`, `find`, `turn`…), que es la más
 * expresiva. Hoy son 1095 de los 1767 iconos los que dependen de ese orden.
 *
 * **Lo que fije el consumidor gana entero, `'default'` incluido.** El único centinela de "no lo
 * fijó" es `undefined`. Antes se descartaba también el string `'default'`, porque el input del
 * componente lo traía como valor inicial y no había forma de separar los dos casos; el precio era
 * que `default` fuera la única variante que nadie podía pedir. Se cerró quitando el inicializador.
 *
 * Vive aquí, y no como getter del componente, porque el lock de coreografía TIENE que hacerse la
 * misma pregunta. Copiarla allí serían dos implementaciones de la misma regla divergiendo en
 * silencio, y el precio de esa divergencia es que el lock diga verde mientras el gesto cambió.
 */
export function varianteDeHover(
  animations: Record<string, unknown> | undefined,
  animation?: string,
): string {
  if (animation) return animation;
  const variantes = Object.keys(animations ?? {});
  return variantes.length >= 3 ? variantes[2] : 'default';
}
