import type { GfBotInternalContext as BotContext, GfBotHatsExtra } from 'glyphflow/bots';
import { hatAccs } from './hat-accs';
import { hatShadowSync } from './hat-shadow';
import { createHatPhysics, hatKick } from './hat-physics';
import { HATS, type GfBotHat } from './hats-data';

/** Un destello al celebrar: el material del sombrero sube de brillo un instante. */
function hatPulse(ctx: BotContext) { if (!ctx.hatKey || ctx.reduce) return; ctx.qa('.hmat').forEach(n => n.animate([{ filter:'brightness(1) saturate(1)' }, { filter:'brightness(1.12) saturate(1.2)', offset:.3 }, { filter:'brightness(1) saturate(1)' }], { duration:900, easing:'ease-out' })); }

/** Lo que hace falta para definir un sombrero propio: el dibujo; la física tiene valores por defecto. */
export interface GfBotHatInput extends Omit<GfBotHat, 'up' | 'k' | 'sway' | 'lift' | 'tip' | 'label'> {
  label?: string;
  /** Cuánto suben los efectos de encima (puntos, burbujas, Z) para no taparse. Por defecto 0. */
  up?: number;
  /** Rigidez del resorte. Por defecto .12 (más alto = más seco). */
  k?: number;
  /** Cuánto se mece de lado. Por defecto .8. */
  sway?: number;
  /** Cuánto se levanta al caer. Por defecto .9. */
  lift?: number;
  /** Cuánto exagera la punta. Por defecto 1. */
  tip?: number;
}

/**
 * Define un sombrero propio. Se dibuja en un marco local donde (0,0) es la coronilla y hacia arriba es `y` negativo; con `draw` (una capa) o con `back` y
 * `front` (detrás y delante del cuerpo, con `layered: true`). Lo que no pongas de la física toma un valor por defecto sensato. Sin dibujo, falla al definirlo.
 */
export function defineHat(def: GfBotHatInput): GfBotHat {
  if (!def.draw && !def.front && !def.back) throw new Error(`glyphflow/bots: el sombrero «${def.label ?? 'sin nombre'}» no define \`draw\` ni \`front\`/\`back\``);
  return { label: 'Custom', up: 0, k: 0.12, sway: 0.8, lift: 0.9, tip: 1, ...def };
}

/**
 * Arma los sombreros de un catálogo: `createHatsExtra({ miGorro })` o mezclando con los de serie (`{ ...HATS, miGorro }`). Quien pasa solo los suyos (o
 * unos pocos de serie sueltos, `hatWizard`) paga solo esos. Se pasa en `extras: { hats }`; el nombre del objeto es el id (`hat="miGorro"`).
 */
export function createHatsExtra(hats: Readonly<Record<string, GfBotHat>>): GfBotHatsExtra {
  const { hatBind } = createHatPhysics(hats);
  return {
    has: (key) => Object.hasOwn(hats, key),
    accs: (key, sh) => hatAccs(hats, key, sh),
    bind: hatBind,
    kick: hatKick,
    pulse: hatPulse,
    sync: hatShadowSync,
  };
}

/** Los 16 sombreros del catálogo, con su física. */
export const hatsExtra: GfBotHatsExtra = /* @__PURE__ */ createHatsExtra(HATS);
