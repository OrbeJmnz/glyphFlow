import type { BotContext } from './context';

/**
 * Contornos animados.
 *
 * Varias pieles dibujan su trazo (línea, halo, brillo de borde, glow) con un `<use href="#id-cs">`
 * que apunta a la silueta del cuerpo. Un `<use>` es una COPIA de la silueta: sigue los cambios de
 * atributos del original pero NO hereda ni sus transiciones CSS ni las animaciones de la Web
 * Animations API. El cuerpo giraba, se aplastaba y ondulaba mientras el contorno se quedaba quieto
 * (o pegaba un salto al terminar). Medido en Chromium: con `d` animado a un cuadrado de 80 de ancho,
 * el `<use>` seguía midiendo 132.
 *
 * Y no basta con animar el `<use>` mismo: `d` no es una propiedad suya, solo de `<path>`. Por eso
 * cada `<use>` de la silueta se convierte en un `<path>` equivalente (mismos atributos: relleno,
 * trazo, filtro, máscara…) con su propio `d`, y recibe LO MISMO que la silueta —el `d`, el
 * `transform` de la pose, su transición y cada animación— en el mismo instante. Todo pasa por aquí
 * para que ningún gesto se olvide de uno.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';
const MARCA = 'data-gf-outline';

const esUsoDeLaSilueta = (n: Element): boolean => (n.getAttribute('href') ?? '').endsWith('-cs');

/**
 * Convierte los `<use>` de la silueta en `<path>` y recolecta todos los contornos. Se llama dentro
 * de `buildShape`, cuando ya están todas las capas (pieles, fx, accesorios) y la transición de la
 * silueta. Es idempotente: una segunda llamada solo vuelve a recolectar.
 */
export function collectOutlines(ctx: BotContext): void {
  const { clip } = ctx.el;
  const d = clip.getAttribute('d') ?? '';
  for (const uso of ctx.qa('use').filter(esUsoDeLaSilueta)) {
    const path = clip.ownerDocument.createElementNS(SVG_NS, 'path');
    for (const a of Array.from(uso.attributes)) {
      if (a.name !== 'href' && a.name !== 'xlink:href') path.setAttribute(a.name, a.value);
    }
    path.setAttribute('d', d);
    path.setAttribute(MARCA, '');
    uso.replaceWith(path);
  }
  ctx.outlines = ctx.qa(`[${MARCA}]`);
  for (const o of ctx.outlines) {
    o.style.transformOrigin = clip.style.transformOrigin;
    o.style.transition = clip.style.transition;
    o.style.transform = clip.style.transform;
  }
}

/** Copia el `transform` que la pose le puso a la silueta a todos sus contornos (con su transición). */
export function syncOutlineTransform(ctx: BotContext, transform: string): void {
  for (const o of ctx.outlines) o.style.transform = transform;
}

/** Copia el `d` de la silueta a los contornos (la ruta de Safari lo fija a mano, sin animaciones). */
export function syncOutlineD(ctx: BotContext, d: string): void {
  for (const o of ctx.outlines) o.setAttribute('d', d);
}

/**
 * Anima los contornos igual que `anim` animó la silueta. Si la animación de la silueta se cancela
 * (la reemplaza otra, cambia la forma, se destruye el bot), las gemelas se cancelan con ella.
 */
export function twinAnimation(
  ctx: BotContext,
  anim: Animation,
  frames: Keyframe[],
  options: KeyframeAnimationOptions,
): void {
  // Sin Web Animations (jsdom, navegadores muy viejos) no hay nada que copiar: el motor entero
  // depende de ellas, esto solo evita que los contornos sean el primer sitio que truena.
  const twins = ctx.outlines.flatMap((o) => (typeof o.animate === 'function' ? [o.animate(frames, options)] : []));
  if (!twins.length) return;
  // Síncrono: el evento `cancel` se entrega en el SIGUIENTE fotograma, y el motor cancela originales
  // por muchos caminos (`getAnimations().forEach(a => a.cancel())`, relevo de pose, cambio de rutina).
  // `getAnimations()` devuelve el mismo objeto, así que sombrear `cancel` en la instancia los cubre todos.
  const cancelar = anim.cancel.bind(anim);
  anim.cancel = () => {
    for (const t of twins) t.cancel();
    cancelar();
  };
  // Respaldo para lo que no pase por `cancel()` (el elemento sale del DOM, se reemplaza el efecto).
  anim.addEventListener?.('cancel', () => twins.forEach((t) => t.cancel()), { once: true });
}

/** Anima la silueta y sus contornos a la vez. Devuelve la animación de la silueta. */
export function animateShape(
  ctx: BotContext,
  frames: Keyframe[],
  options: KeyframeAnimationOptions,
): Animation {
  const anim = ctx.el.clip.animate(frames, options);
  twinAnimation(ctx, anim, frames, options);
  return anim;
}
