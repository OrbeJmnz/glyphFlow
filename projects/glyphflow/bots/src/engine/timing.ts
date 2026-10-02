import type { BotContext } from './context';

/**
 * Los tres primitivos de tiempo que todo gesto usa. Los tres dejan su rastro EN el contexto
 * (`subTimers`, `subAnims`, `running`) y por eso `clearRoutine`/`stopLoops`/`pause` pueden cancelar
 * lo que un gesto dejó vivo sin que el gesto tenga que acordarse de registrarse.
 */

/**
 * Programa `fn` y guarda el timer en `bag` (por defecto `ctx.subTimers`, el de la rutina en curso).
 * Un bag propio sirve para lo que debe sobrevivir a un cambio de rutina (`lookTimers`, `toyTimers`).
 *
 * `bag` se lee al LLAMAR, no al crear el contexto: el prototipo reasigna `subTimers = []` al limpiar
 * y un default evaluado antes apuntaría al arreglo viejo.
 */
export function later(
  ctx: BotContext,
  fn: () => void,
  ms: number,
  bag: ReturnType<typeof setTimeout>[] = ctx.subTimers,
): ReturnType<typeof setTimeout> {
  const timer = setTimeout(fn, ms);
  bag.push(timer);
  return timer;
}

/** Animación en bucle infinito, anotada en `subAnims` para que se corte al cambiar de rutina. */
export function loop(
  ctx: BotContext,
  node: Element,
  frames: Keyframe[],
  options: KeyframeAnimationOptions,
): Animation {
  const anim = node.animate(frames, { iterations: Infinity, ...options });
  ctx.subAnims.push(anim);
  return anim;
}

/**
 * Relevo de pose: el primer cuadro es la pose computada ACTUAL del nodo, no el cuadro 0. Sin esto,
 * re-disparar un gesto sobre uno que sigue corriendo salta de golpe al inicio. Cancela la
 * animación anterior del mismo nodo (una por nodo) y deja la nueva en `ctx.running`.
 *
 * Muta `frames[0]` — igual que el prototipo; quien llama pasa un arreglo recién armado.
 */
export function play(
  ctx: BotContext,
  node: SVGElement,
  frames: Keyframe[],
  options: KeyframeAnimationOptions,
): Animation {
  const cur = getComputedStyle(node).transform;
  ctx.running.get(node)?.cancel();
  // `||` y no `??`: un nodo desmontado o sin renderizar devuelve '' (no 'none'), y un `transform: ''`
  // en un keyframe se ignora en silencio y el relevo arranca en un cuadro sin pose.
  frames[0] = { ...frames[0], transform: cur || 'none' };
  const anim = node.animate(frames, options);
  ctx.running.set(node, anim);
  anim.onfinish = () => {
    if (ctx.running.get(node) === anim) ctx.running.delete(node);
  };
  return anim;
}
