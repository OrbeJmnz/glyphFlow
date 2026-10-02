/**
 * Estados largos del bot y las rutinas que se turnan dentro de cada uno.
 *
 * Los nombres están en inglés (el prototipo los traía en español: `escribiendo` → `typing`,
 * `sonambulo` → `sleepwalking`…). Las pruebas de paridad contra el prototipo traducen con el mapa.
 */
import type { GfBotState } from '../bot-state';

/** Etiqueta y color del indicador de cada estado. */
export const STATE_LABEL: Readonly<Record<GfBotState, readonly [string, string]>> = {
  idle: ['Idle', '#2FBF71'],
  working: ['Working', '#F5A524'],
  sleeping: ['Sleeping', '#8C8CA8'],
};

export const ROUTINES = { working:['typing','thinking','analyzing','creating','planning','loading'], sleeping:['deep','snoring','nodding','dreaming','bubble','counting','sleepwalking','nearFall','night'] } as const;

export type GfBotWorkRoutine = (typeof ROUTINES)["working"][number];
export type GfBotSleepRoutine = (typeof ROUTINES)["sleeping"][number];
