/**
 * Estados largos del bot y las rutinas que se turnan dentro de cada uno.
 *
 * Los nombres de las rutinas son los del prototipo (en español). La API pública usará nombres en
 * inglés; el mapa vive en el motor, no aquí, para que esta tabla se compare tal cual con el original.
 */
import type { GfBotState } from '../bot-state';

/** Etiqueta y color del indicador de cada estado. */
export const STATE_LABEL: Readonly<Record<GfBotState, readonly [string, string]>> = {
  idle: ['Reposo', '#2FBF71'],
  working: ['Trabajando', '#F5A524'],
  sleeping: ['Dormido', '#8C8CA8'],
};

export const ROUTINES = { working:['escribiendo','pensando','analizando','creando','planeando','cargando'], sleeping:['profundo','roncando','cabeceo','soñando','burbuja','contando','sonambulo','casiCae','noche'] } as const;

export type GfBotWorkRoutine = (typeof ROUTINES)["working"][number];
export type GfBotSleepRoutine = (typeof ROUTINES)["sleeping"][number];
