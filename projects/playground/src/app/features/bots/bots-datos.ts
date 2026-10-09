/**
 * Los datos de la página `/bots`: qué formas, qué pieles y qué gestos se ofrecen. Todo son ids de la
 * librería; los textos que ve el visitante viven en el scope de i18n `bots`.
 *
 * Aquí NO se importa nada de `glyphflow/bots`: son tablas, y así el spec de la página (y el generador
 * de código de abajo) se prueban sin arrastrar el motor.
 */

export type FormaId = 'ghost' | 'cat' | 'octopus' | 'tofu' | 'mochi' | 'robot';

/** En el orden en que se ofrecen (lista lateral y selector del escenario). */
export const FORMAS: readonly FormaId[] = ['ghost', 'octopus', 'mochi', 'tofu', 'cat', 'robot'];

/**
 * Las pieles que se ofrecen por forma (la librería trae más: son un recorte, no el catálogo). El robot
 * no ofrece pieles: su cuerpo es de material, no de piel.
 */
export const PIELES: Record<FormaId, readonly string[]> = {
  ghost: ['f1', 'f3', 'f4', 'f7', 'f9', 'x-sunset'],
  cat: ['g1', 'g2', 'g4', 'g7', 'g11', 'x-sunset'],
  octopus: ['o1', 'o2', 'o3', 'o5', 'o6', 'x-sunset'],
  tofu: ['neu', 'line', 'gel', 'pastel', 'x-sunset'],
  mochi: ['neu', 'line', 'gel', 'pastel', 'x-sunset'],
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

/**
 * El nombre CSS de la duración de un gesto: `--gf-bot-<id>-duration` (README de `glyphflow/bots`). Es el kebab del id, salvo el
 * mortal frontal, que la librería llama `flip`.
 */
export const cssDeGesto = (id: string): string => (id === 'frontFlip' ? 'flip' : id.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`));

/** Las velocidades que ofrece el reproductor del escenario (1 = como están escritos los gestos). */
export const VELOCIDADES: readonly number[] = [0.5, 1, 2];

/**
 * Las variables CSS que hacen que cada gesto dure `ms / velocidad`. Es el mecanismo público de la librería (no hay un `speed`): puestas
 * en un ancestro del bot, el motor las lee al arrancar el gesto. Sobre 4 s o bajo 300 ms el motor las acota, y por eso lo que se
 * muestra como duración sale del handle del gesto (`handle.ms`), no de esta cuenta.
 */
export const duracionesA = (velocidad: number): Record<string, string> =>
  Object.fromEntries(GESTOS.map((g) => [`--gf-bot-${cssDeGesto(g.id)}-duration`, `${Math.round(g.ms / velocidad)}ms`]));

export type EstadoBot = 'idle' | 'working' | 'sleeping';
export const ESTADOS: readonly EstadoBot[] = ['idle', 'working', 'sleeping'];

export type ExpresionId = 'normal' | 'happy' | 'surprised' | 'thinking' | 'wink' | 'sad' | 'success' | 'error' | 'sleeping';

export interface ExpresionInfo {
  id: ExpresionId;
  /** La cara kawaii fija con que se dibuja su miniatura (ids de `glyphflow/bots`; el robot no tiene cara kawaii). */
  cara: string | null;
  /** La boca que la acompaña en el robot, que no tiene cara kawaii (`GfBotMouthKind`). */
  boca: string | null;
}

/** Los estados de expresión de la franja: lo que se ve en cada miniatura. Lo que hace el bot grande al pulsarlos lo decide `BotsEstado.expresar`. */
export const EXPRESIONES: readonly ExpresionInfo[] = [
  { id: 'normal', cara: null, boca: null },
  { id: 'happy', cara: 'happy', boca: 'wide' },
  { id: 'surprised', cara: 'amazed', boca: 'o' },
  { id: 'thinking', cara: 'uneasy', boca: 'flat' },
  { id: 'wink', cara: 'wink', boca: 'smile' },
  { id: 'sad', cara: 'crying', boca: 'frown' },
  { id: 'success', cara: 'content', boca: 'open' },
  { id: 'error', cara: 'error', boca: 'wavy' },
  { id: 'sleeping', cara: 'drowsy', boca: 'flat' },
];

/**
 * Lo que pesa cada pieza, en KB gzip. MEDIDO por `npm run bundle-check` (el caso de cada fila está en `scripts/bundle-size-check.ts`)
 * y COMPARADO por él con estos números: si el motor cambia de peso y aquí no se actualiza, el CI falla. `primerGesto` y `todosExtras`
 * son diferencias contra «motor y una forma»; `gestoExtra`, el costo de un segundo gesto sobre el primero.
 */
export const PESOS = {
  motor: 49.5,
  conForma: 57.2,
  conComponente: 65.4,
  primerGesto: 7.4,
  gestoExtra: 0.3,
  todosExtras: 26.7,
  adaptadoresIa: 0.6,
} as const;
