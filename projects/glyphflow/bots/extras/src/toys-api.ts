import type { GfBotToysExtra } from 'glyphflow/bots';
import { toy } from './toys';
import { TOYS, type GfBotToy, type GfBotToyBehavior } from './toys-data';

const FAMILIAS: readonly GfBotToyBehavior[] = ['ball', 'star', 'treat'];

/** Lo que hace falta para definir un juguete propio. */
export interface GfBotToyInput {
  /** Cómo se llama (sale en `onRoutine`: «mi juguete · headbutts»). */
  label: string;
  /** Radio aproximado en unidades del viewBox (el bot mide 200). Define dónde cae y a qué altura lo juega. Entre 4 y 40. */
  r: number;
  /** El SVG del objeto, centrado en (0,0) con radio ≈ `r`. `id` es un prefijo único para sus degradados y máscaras. Usa los tokens `var(--bot-primary)`… para heredar el color del bot. */
  draw: (id: string) => string;
  /** La coreografía con la que juega el bot (por defecto `ball`). Ver `GfBotToyBehavior`. */
  behavior?: GfBotToyBehavior;
}

/**
 * Define un juguete propio: un dibujo que elige una de las tres coreografías del bot (`ball`, `star`, `treat`). La coreografía propia, cuadro a cuadro, todavía
 * no se puede escribir: se elige una familia. Con `treat` el dibujo se envuelve solo en la máscara de mordiscos (no tienes que dibujarla).
 * Un juguete mal definido falla aquí, no cuando el bot intenta jugar con él.
 */
export function defineToy(def: GfBotToyInput): GfBotToy {
  const behavior = def.behavior ?? 'ball';
  if (typeof def.label !== 'string' || !def.label.trim()) throw new Error('glyphflow/bots: un juguete necesita `label`');
  if (typeof def.r !== 'number' || !Number.isFinite(def.r) || def.r < 4 || def.r > 40) throw new Error(`glyphflow/bots: el radio del juguete «${def.label}» debe estar entre 4 y 40`);
  if (typeof def.draw !== 'function') throw new Error(`glyphflow/bots: el juguete «${def.label}» necesita \`draw\``);
  if (!FAMILIAS.includes(behavior)) throw new Error(`glyphflow/bots: el juguete «${def.label}» tiene una coreografía desconocida (${String(behavior)}); usa ${FAMILIAS.join(', ')}`);
  if (behavior !== 'treat') return { label: def.label, r: def.r, draw: def.draw, behavior };
  // `treat`: la coreografía muerde un grupo `.bites` que una máscara recorta del dibujo; aquí se arma para quien define el juguete
  const m = def.r + 5;
  return {
    label: def.label,
    r: def.r,
    behavior,
    draw: (id) =>
      `<mask id="${id}-bm" maskUnits="userSpaceOnUse" x="${-m}" y="${-m}" width="${2 * m}" height="${2 * m}"><rect x="${-m}" y="${-m}" width="${2 * m}" height="${2 * m}" fill="#fff"/><g class="bites" fill="#000"></g></mask>` +
      `<g mask="url(#${id}-bm)">${def.draw(id)}</g>`,
  };
}

/**
 * Arma los juguetes de un catálogo: `createToysExtra({ miPelota })`, o mezclando con los de serie (`{ ...TOYS, miPelota }` o `{ ball: toyBall, miPelota }`).
 * Se pasa en `extras: { toys }` y se pone con `bot.toy('miPelota', x, y)`: el nombre del objeto es el id.
 */
export function createToysExtra(toys: Readonly<Record<string, GfBotToy>>): GfBotToysExtra {
  return { play: (ctx, kind, x, y) => toy(ctx, kind, x, y, toys) };
}

/** Los tres juguetes de serie: `star`, `ball`, `cookie`. */
export const toysExtra: GfBotToysExtra = /* @__PURE__ */ createToysExtra(TOYS);

