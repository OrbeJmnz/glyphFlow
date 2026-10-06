/**
 * Los datos de la página `/bots`: qué formas, qué pieles y qué gestos se ofrecen. Todo son ids de la
 * librería; los textos que ve el visitante viven en el scope de i18n `bots`.
 *
 * Aquí NO se importa nada de `glyphflow/bots`: son tablas, y así el spec de la página (y el generador
 * de código de abajo) se prueban sin arrastrar el motor.
 */

export type FormaId = 'ghost' | 'cat' | 'octopus' | 'tofu' | 'mochi' | 'robot';

export const FORMAS: readonly FormaId[] = ['ghost', 'cat', 'octopus', 'tofu', 'mochi', 'robot'];

/**
 * Las pieles que se ofrecen por forma (la librería trae más: son un recorte, no el catálogo). El robot
 * no ofrece pieles: su cuerpo es de material, no de piel.
 */
export const PIELES: Record<FormaId, readonly string[]> = {
  ghost: ['f1', 'f3', 'f4', 'f7', 'f9'],
  cat: ['g1', 'g2', 'g4', 'g7', 'g11'],
  octopus: ['o1', 'o2', 'o3', 'o5', 'o6'],
  tofu: ['neu', 'line', 'gel', 'pastel'],
  mochi: ['neu', 'line', 'gel', 'pastel'],
  robot: [],
};

export type GrupoGestos = 'saltos' | 'movimiento' | 'gel' | 'formas' | 'suelo';

export const GRUPOS: readonly GrupoGestos[] = ['saltos', 'movimiento', 'gel', 'formas', 'suelo'];

export interface GestoInfo {
  /** El nombre con que la librería lo expone: `bot.gesture('frontFlip')`. */
  id: string;
  grupo: GrupoGestos;
  /** Lo que dura por defecto (ms), el de `bots/README.md`. */
  ms: number;
}

/** Los 20 gestos, agrupados por lo que SE VE (no por cómo están hechos por dentro). */
export const GESTOS: readonly GestoInfo[] = [
  { id: 'frontFlip', grupo: 'saltos', ms: 1000 },
  { id: 'backflip', grupo: 'saltos', ms: 1100 },
  { id: 'doubleFlip', grupo: 'saltos', ms: 1400 },
  { id: 'superBounce', grupo: 'saltos', ms: 1500 },
  { id: 'sideCartwheel', grupo: 'saltos', ms: 1200 },
  { id: 'sideDodge', grupo: 'movimiento', ms: 800 },
  { id: 'ghostSwoop', grupo: 'movimiento', ms: 1600 },
  { id: 'spinSquash', grupo: 'movimiento', ms: 1000 },
  { id: 'tornadoSpin', grupo: 'movimiento', ms: 1300 },
  { id: 'jellyWobble', grupo: 'gel', ms: 1000 },
  { id: 'waveThroughBody', grupo: 'gel', ms: 1100 },
  { id: 'inflateRelease', grupo: 'gel', ms: 1200 },
  { id: 'stretchSnap', grupo: 'gel', ms: 700 },
  { id: 'scaredRecoil', grupo: 'gel', ms: 900 },
  { id: 'puddleMorph', grupo: 'formas', ms: 1800 },
  { id: 'ballMorph', grupo: 'formas', ms: 2000 },
  { id: 'jellyDrop', grupo: 'formas', ms: 1500 },
  { id: 'squishTeleport', grupo: 'formas', ms: 2000 },
  { id: 'peekPop', grupo: 'suelo', ms: 2400 },
  { id: 'diveEmerge', grupo: 'suelo', ms: 2600 },
];

/**
 * Los gestos ligeros que el avatar del chat hace por su cuenta mientras espera un mensaje: nada de saltos ni giros
 * grandes (eso es para cuando pasa algo). Con las caras kawaii que ya pone el motor en reposo (`wander`), el chat
 * se ve habitado y no un dibujo parado.
 */
export const GESTOS_SUELTOS: readonly string[] = ['stretchSnap', 'jellyWobble', 'inflateRelease', 'sideDodge', 'spinSquash'];

/** Cuánto espera el avatar entre un gesto suelto y el siguiente (ms): entre 6 y 11 s, para que se note vivo sin cansar. */
export const esperaVida = (azar: number): number => 6000 + Math.round(azar * 5000);

/** Elige uno de los gestos sueltos con un número al azar en [0, 1). */
export const gestoSuelto = (azar: number): string => GESTOS_SUELTOS[Math.min(GESTOS_SUELTOS.length - 1, Math.floor(azar * GESTOS_SUELTOS.length))];

export type EstadoBot = 'idle' | 'working' | 'sleeping';
export const ESTADOS: readonly EstadoBot[] = ['idle', 'working', 'sleeping'];

/**
 * Lo que pesa cada pieza, en KB gzip. MEDIDO por `npm run bundle-check` el 2026-10-06 (el caso de
 * cada fila está en `scripts/bundle-size-check.ts`), no estimado. Al publicar hay que volver a
 * medir y actualizarlo aquí: el sitio no puede decir un número que el CI ya no respalda.
 */
export const PESOS = {
  motor: 69.0,
  conForma: 76.3,
  conComponente: 84.7,
  porGesto: 1.7,
} as const;
