import type { GfBotAgentEvent } from './agent';
import type { GfBotApi } from './create-bot';
import { FACES, type GfBotFaceId } from '../data/faces';
import { ACCX, FX_VARS, type GfBotAccXId, type GfBotFxId } from '../data/fx';
import type { GfKawaiiId } from '../data/kawaii';
import type { GfBotHatName } from '../data/hat-ids';
import type { MATERIALS, GfBotPaletteInput } from '../data/palettes';
import type { GfBotSleepRoutine, GfBotWorkRoutine } from '../data/routines';
import type { GfBotShape } from '../data/shape';
import type { GfBotState } from '../bot-state';
import type { GestureRun } from './lifecycle';
import { prefersReducedMotion } from './env';
import { resolveSpring, type BotSpring } from './spring';
import type { GfBotFeature, GfBotRestPose } from './pose';
import { botSkeleton } from './skeleton';
import { viewYaw, type GfBotView } from '../data/views';

/**
 * El CONTEXTO de un bot: todo lo que en el prototipo vivía como `let`/`var`/`const` dentro del
 * closure `createBot`, más las referencias al DOM. El closure se partió en funciones sueltas
 * (`blink(ctx)`, `hop(ctx)`…) para que cada gesto sea un export que el bundler pueda quitar; lo
 * único que comparten es este objeto.
 *
 * Reglas del contexto:
 * - **Mutable a propósito.** El prototipo reasigna estas variables desde cualquier rama (`subTimers
 *   = []`, `state = 'sleeping'`…); un objeto plano con campos es lo más fiel y lo más barato. Nada
 *   fuera del motor lo toca: el componente de F2 solo ve `GfBotApi`.
 * - **Un contexto = un bot.** Dos bots en una página no comparten nada (ni ids, ni timers).
 * - **Se crea solo en el navegador.** `createBotContext` escribe en `host`; en servidor el
 *   componente no lo llama (el esqueleto sí se puede prerenderizar: `botSkeleton`).
 */

/** Las dos bocas de reposo que se pueden elegir a mano: la pastilla neumórfica o la «w» del gato. */
export type GfBotMouthKind = 'pill' | 'w';

/** Materiales del cuerpo; `auto` = el de la forma. */
export type GfBotMaterialId = keyof typeof MATERIALS;

/** El contexto interno del bot que recibe cada gesto. Es opaco: se pasa tal cual a las herramientas de `gfBotKit`. */
/**
 * Lo que un gesto (o un manejador de `onAgentEvent`) puede tocar del bot: el contrato ESTABLE. Es lo que usan los 20 gestos del catálogo y nada
 * más: si uno de ellos necesitara algo fuera de esta lista no compilaría. Cambiar la forma de estos miembros es un cambio mayor.
 *
 * - `el`: los nodos del bot donde se anima (`hop` es la trayectoria, `clip` el cuerpo, `world` lo que está en el mundo, `fx` los efectos, `shadow` la sombra
 *   y `flip` la capa de efectos del flip).
 * - `hooks.act(ms)`: avisa que el gesto toma el cuerpo durante `ms` (despierta al bot y pausa su rutina).
 * - `reduce`: el usuario pidió menos movimiento; el gesto debe degradar a un saltito (`kit.motion.reducedHop`).
 * - `paused`, `view`, `pose.yaw`, `shape.{cy, faceY, top, R, half}` (la geometría de la forma), `svg`, `fe.eyeList` y `shapeAnims`: lo mínimo para medir y para no dejar animaciones colgadas.
 */
export interface GfBotGestureContext {
  readonly svg: SVGSVGElement;
  readonly reduce: boolean;
  readonly paused: boolean;
  readonly view: number;
  readonly pose: Readonly<Pick<GfBotRestPose, 'yaw'>>;
  readonly shape: Readonly<Pick<GfBotShape, 'cy' | 'faceY' | 'top' | 'R' | 'half'>>;
  readonly el: Readonly<Pick<BotElements, 'clip' | 'hop' | 'world' | 'fx' | 'shadow' | 'flip'>>;
  readonly fe: Readonly<Pick<BotFaceElements, 'eyeList'>>;
  readonly hooks: Readonly<Pick<BotHooks, 'act'>>;
  shapeAnims: Animation[];
}

/**
 * El contexto COMPLETO del motor, para los extras de primera mano (`glyphflow/bots/extras`). **No es estable**: cambia con el motor sin aviso. Se
 * llega a él desde `gfBotKit.internal`; si estás escribiendo un gesto propio usa `GfBotGestureContext`.
 */
export type GfBotInternalContext = BotContext;

/** Los juguetes (`toysExtra` de `glyphflow/bots/extras`): `play` pone el juguete `kind` en (x, y) y el bot juega con él. */
export interface GfBotToysExtra {
  play(ctx: GfBotInternalContext, kind: string, x: number, y: number): void;
}

/**
 * Los sombreros (`hatsExtra` de `glyphflow/bots/extras`). El motor no conoce su geometría ni su física: solo llama a estos
 * ganchos. `has` dice si existe el sombrero; `accs` da los accesorios que se le pegan a la forma; `bind` lo arma sobre la forma actual
 * y arranca su física; `kick` le da un empujón; `pulse` lo ilumina al celebrar; `sync` pega su sombra al cuerpo.
 */
export interface GfBotHatsExtra {
  has(key: string): boolean;
  accs(key: string, sh: GfBotShape): NonNullable<GfBotShape['acc']>;
  bind(ctx: GfBotInternalContext): void;
  kick(ctx: GfBotInternalContext, up?: number, side?: number): void;
  pulse(ctx: GfBotInternalContext): void;
  sync(ctx: GfBotInternalContext): void;
}

/**
 * Las rutinas de `working` y `sleeping` (`routinesExtra` de `glyphflow/bots/extras`): las seis de trabajo con sus variantes y las
 * nueve de sueño. `play` corre la rutina `name` del estado `state` y devuelve su etiqueta legible (`typing · tapping`, `counting sheep`).
 * Sin ellas el motor solo respira (y entrecierra los ojos trabajando): no hay rotación, ni `setRoutine()`, ni `onRoutine`.
 */
export interface GfBotRoutinesExtra {
  play(ctx: GfBotInternalContext, state: 'working' | 'sleeping', name: GfBotWorkRoutine | GfBotSleepRoutine): string;
}

/** Lo que se le pasa a `createBot({ extras })` o a `<gf-bot [extras]>`. */
export interface GfBotExtras {
  toys?: GfBotToysExtra;
  hats?: GfBotHatsExtra;
  routines?: GfBotRoutinesExtra;
}

/**
 * Un gesto extra: una función que recibe el contexto y arma su movimiento con `gfBotKit`. Puede devolver
 * cuánto dura (ms): así se le puede encadenar algo detrás (ver `withLanding` en `glyphflow/bots/gestures`).
 */
export type GfBotGesture = (ctx: GfBotGestureContext) => void | number;

/** `{ nombre: gesto }`. Se pasa en `createBot({ gestures })` o en el input `[gestures]` de `<gf-bot>`. */
export type GfBotGesturePack = Readonly<Record<string, GfBotGesture>>;

/** Opciones con las que se crea un bot. En el prototipo la forma era una clave; ahora es el OBJETO. */
export interface GfBotOptions {
  /** La forma. Se pasa el objeto (`mochiShape`…) para que el bundler quite las que no se usan. */
  shape: GfBotShape;
  /** Una paleta de serie, `auto` para la de la forma, o una propia (`['#luz', '#medio', '#sombra']`). */
  palette?: GfBotPaletteInput;
  material?: GfBotMaterialId | 'auto';
  /** Piel (`neu`, `gel`, `g1`, `o2`…). Por defecto `neu`. */
  mochi?: string;
  /** Estilo de cara; `null`/`neu` = la propia de la forma. */
  face?: GfBotFaceId | null;
  /** Efecto de contorno (glow, pixel, glitch, bug). */
  fx?: GfBotFxId | null;
  /** Sombrero o accesorio extra (halo, gafas…). `null` = ninguno. */
  hat?: GfBotHatName | GfBotAccXId | null;
  /** Boca de reposo elegida a mano; `auto` = la de la forma. */
  mouthk?: GfBotMouthKind | 'auto';
  /** Desde dónde se mira al bot (vista de reposo): una con nombre o un giro en radianes. Por defecto, de frente. */
  view?: GfBotView | number;
  /**
   * Extras opt-in de `glyphflow/bots/extras`: `{ toys, hats, routines }` (los juguetes de `bot.toy()`, los sombreros y las rutinas de `working` y `sleeping`). Sin ellos el bot no los carga ni
   * los paga. Se leen al crear el bot: no cambian después.
   */
  extras?: GfBotExtras;
  /**
   * Cuánto se mueven los gestos de este bot por defecto: 1 = como están escritos, 0 = apenas se separan del reposo, 2 = el doble (se acota a 0–2).
   * Cada llamada puede pisarlo: `bot.gesture('frontFlip', { intensity: 0.5 })`. Se lee al crear el bot.
   */
  intensity?: number;
  /** Gestos extra: un objeto `{ nombre: gesto }` de `glyphflow/bots/gestures` (o los tuyos). Cada uno sale como `bot.nombre()` y como `bot.gesture('nombre')`. */
  gestures?: GfBotGesturePack;
  /**
   * El agente cambió de paso. Se llama DESPUÉS de que el motor hizo lo suyo, con el bot y su contexto, para que se pueda reaccionar
   * con un gesto (`bot.gesture('frontFlip')`): ver `agentReactions` en `glyphflow/bots/gestures`. Si devuelve la duración (ms) de un gesto
   * que puso en marcha, `done` y `error` no añaden su propio brinco o temblor encima.
   */
  onAgentEvent?: (ev: GfBotAgentEvent, bot: GfBotApi, ctx: GfBotGestureContext) => number | void;
  /** En reposo hace cositas por su cuenta (fidgets, caras kawaii). */
  wander?: boolean;
  /** Solo anima mientras hay hover (mini-bots de galería). */
  hoverOnly?: boolean;
  /** Avisan al dueño de lo que el bot decide solo. `label` es el nombre de la rutina; `null` = terminó. */
  onRoutine?: (state: GfBotState, label: string | null) => void;
  onStateChange?: (state: GfBotState) => void;
  onWake?: () => void;
}

/** Las luces del cuerpo que `lit()` anima por nombre. */
export interface BotLights {
  key: SVGElement;
  sheen: SVGElement;
  rl: SVGElement;
  rr: SVGElement;
  rt: SVGElement;
  rb: SVGElement;
  lift: SVGElement;
  dim: SVGElement;
  mood: SVGElement;
  gloss: SVGElement;
}

/** Pista que los gestos le dan a las caras kawaii (`kCue` en el prototipo); las que llegan juntas se combinan. */
export interface GfBotCue {
  eye?: string | null;
  which?: number[];
  mouth?: string;
  show?: boolean;
  ms?: number;
}

export interface BotHooks {
  cue: (cue: GfBotCue) => void;
  /**
   * Un gesto avisa que va a durar `ms`: la máquina de estados despierta al bot, pausa la rutina y deja
   * la cara limpia. `keepKawaii` es para los gestos que ponen su PROPIA cara kawaii justo después: así no
   * se suelta (y no parpadea la cara base entre dos kawaii). Los demás sueltan la kawaii activa.
   */
  act: (ms: number, keepKawaii?: boolean) => void;
  /** Quita la cara kawaii activa con un fundido corto. Lo instala el corte kawaii. */
  kawaiiRelease: () => void;
  /**
   * El agente cambió de paso (`thinking`, `done`…): avisa a `opts.onAgentEvent` y devuelve cuánto dura (ms) el gesto que
   * ese manejador puso en marcha, o 0 si ninguno. Con un gesto en marcha, las escenas de `done` y `error` dejan de hacer su
   * propio brinco o temblor para no pelearse con él.
   */
  agentReact: (ev: GfBotAgentEvent) => number;
  /** Las caras kawaii vuelven a decidir si toca una (al cambiar de estado). Lo instala el corte kawaii. */
  kawaiiIdleTick: () => void;
  /** Despertar con cara de recién despierto (bostezo, estirón…). Lo instala el corte kawaii. */
  kawaiiWake: () => void;
}

/** Referencias que salen del esqueleto: existen desde que se crea el bot y no cambian de forma. */
export interface BotElements {
  hop: SVGGraphicsElement;
  breath: SVGGraphicsElement;
  flip: SVGElement;
  light: SVGElement;
  face: SVGElement;
  /** El `<path>` de la silueta (`clipPath`): la forma se cambia con su `d`. */
  clip: SVGElement;
  accBack: SVGElement;
  accFront: SVGElement;
  shadow: SVGElement;
  dots: SVGElement;
  dotList: SVGElement[];
  fx: SVGElement;
  fxIn: SVGElement;
  fxOut: SVGElement;
  fxBack: SVGElement;
  hatShadow: SVGElement;
  hatShadowWrap: SVGGraphicsElement;
  toys: SVGElement;
  thought: SVGElement;
  thoughtList: SVGElement[];
  spinner: SVGElement;
  z: SVGElement;
  world: SVGElement;
  L: BotLights;
}

/**
 * Referencias que dependen de la FORMA: `buildShape` las rehace cada vez que se cambia de forma o
 * de piel. Antes de la primera construcción las listas están vacías y los singletons son `null`;
 * después nunca vuelven a serlo, salvo `mflow`/`mhalo`, que solo existen en las pieles de color
 * pintado (Gel, App, Etéreo, Pastel).
 */
export interface BotFaceElements {
  eyes: SVGElement;
  eyeList: SVGElement[];
  closed: SVGElement[];
  happy: SVGElement[];
  squeeze: SVGElement[];
  bubble: SVGElement;
  browA: SVGElement[];
  browS: SVGElement[];
  tears: SVGElement[];
  sweat: SVGElement;
  faceFx: SVGElement;
  cheeks: SVGElement[];
  line: SVGElement[];
  half: SVGElement[];
  ring: SVGElement[];
  cross: SVGElement[];
  mouths: SVGElement[];
  ants: SVGElement[];
  antTips: SVGElement[];
  mflow: SVGElement | null;
  mhalo: SVGElement | null;
}

/** Punto del arrastre gomoso: posición y velocidad del cuerpo (el resorte que persigue al dedo). */
export interface GfBotGoo {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/** Cómo se deforma el cuerpo al jalarlo: estirón vertical, torcedura de la punta, inclinación, desplazamiento y ensanche. */
export interface GfBotGooShape {
  sy: number;
  shear: number;
  lean: number;
  tx: number;
  sx: number;
}

/** Un arrastre en curso: lo que hizo el dedo (vueltas, sacudidas, tiempo estirado) decide cómo reacciona al soltarlo. */
export interface BotDrag {
  eyes: Animation[];
  g: GfBotGoo;
  tgt: { x: number; y: number };
  prev: { x: number; y: number };
  t0: number;
  raf: number;
  peak: number;
  flips: number;
  lastSx: number;
  turn: number;
  lastAng: number | null;
  held: number;
  dizzy: boolean;
  maxUp: number;
  path: number;
  pvx?: number;
  sag?: number;
  d?: GfBotGooShape;
}

/** Lo que el sombrero necesita medir cada cuadro (se arma en `hatBind`). */
export interface BotHatElements {
  anchor: SVGGraphicsElement | null;
  sdyn: SVGGraphicsElement | null;
  dyn: SVGElement[];
  tips: SVGElement[];
  /** Punto de anclaje en coordenadas del viewBox. */
  ax: number;
  ay: number;
}

/** Resorte del sombrero: ángulo, desplazamiento vertical y la última medida de la coronilla. */
export interface BotHatPhysics {
  th: number;
  vth: number;
  oy: number;
  voy: number;
  px: number | null;
  py: number;
  pa: number;
  pvx: number;
  pvy: number;
  pva: number;
  t: number;
  /** De qué lado se ladea al caer (±1); cada brinco lo vuelve a sortear. */
  side: number;
}

/** Deformación de la nube al moverse (inclinación y estirón con retraso). */
export interface BotCloudPhysics {
  px: number | null;
  py: number;
  vx: number;
  vy: number;
  /** Último ángulo del cuerpo y su velocidad suavizada (giros de baile, rueda…). */
  pa: number;
  va: number;
  lean: number;
  st: number;
}

/** La hoja que se escribe mientras llegan tokens del agente: el documento, el cursor y los renglones. */
export interface BotStream {
  doc: SVGElement;
  x0: number;
  y0: number;
  caret: SVGElement;
  lines: SVGElement[];
  /** Ancho ya escrito del renglón actual. */
  x: number;
  box: SVGElement;
}

/** Rutinas que el dueño puede fijar: `null` = que el bot elija por turnos. */
export interface BotFixedRoutines {
  working: GfBotWorkRoutine | null;
  sleeping: GfBotSleepRoutine | null;
}

export interface BotContext {
  /** Prefijo único de este bot: cuelga de él cada `id` del esqueleto (`b1-body`…). */
  readonly id: string;
  readonly host: HTMLElement;
  readonly svg: SVGSVGElement;
  readonly opts: GfBotOptions;
  /**
   * `prefers-reduced-motion` MEDIDO al crear el bot. El prototipo lo evaluaba al cargar el módulo;
   * aquí es por bot, y en servidor nunca se llega a preguntar.
   */
  readonly reduce: boolean;
  /** Resorte de los saltos y poses (ver `spring.ts`), resuelto al crear el bot. */
  readonly spring: BotSpring;
  /**
   * Ganchos que el motor rellena según qué módulos estén cargados; mientras no, no hacen nada. `cue`
   * avisa a las caras kawaii de que pasó algo en los ojos o la boca; `act` lo instala la máquina de
   * estados. Existen para romper ciclos de imports: los gestos no pueden importar a quien los llama.
   */
  hooks: BotHooks;
  /** `querySelector` / `querySelectorAll` sobre el SVG de este bot. */
  q(selector: string): SVGElement | null;
  qa(selector: string): SVGElement[];
  readonly el: BotElements;
  /** Rasgos de la forma actual; se reasignan en `buildShape`. */
  fe: BotFaceElements;

  // ---- Forma, piel y color ----
  /** La forma actual (`shape.id` va a `data-shape`: el CSS de las pieles y los fx se engancha a él). */
  shape: GfBotShape;
  pose: GfBotRestPose;
  /** Giro de REPOSO (radianes): la vista. `baseFor` lo incluye, así que lo que resetea la pose vuelve a él. */
  view: number;
  /** Estilo de cara elegido a mano; `null` = la propia de la forma (el que elija el usuario manda). */
  faceStyle: GfBotFaceId | null;
  mochiVar: string;
  fxVar: GfBotFxId | null;
  accX: GfBotAccXId | null;
  paletteKey: GfBotPaletteInput;
  materialKey: GfBotMaterialId | 'auto';
  /** Elementos que giran con la pose (`.yaw`, silueta, caras laterales, luz, accesorios), en el orden de `POSE_SLOTS`. */
  poseEls: SVGElement[];
  /** Los `<use>` de la silueta (trazos de las pieles): copias que hay que animar aparte; ver `outlines.ts`. */
  outlines: SVGElement[];
  feats: GfBotFeature[];
  /** Animaciones propias de la forma (onda del fantasma, tentáculos del pulpo); se cancelan al cambiarla. */
  shapeAnims: Animation[];
  shapeTimer: ReturnType<typeof setInterval> | null;

  // ---- Sombrero y física ----
  hatKey: string | null;
  /** Los sombreros, si se pasó `extras.hats`. Sin ellos `hatKey` siempre es `null`. */
  hats: GfBotHatsExtra | null;
  /** Las rutinas de trabajo y sueño, si se pasó `extras.routines`. */
  routines: GfBotRoutinesExtra | null;
  hatEls: BotHatElements | null;
  hatRaf: number;
  hatCache: { sh: GfBotShape; key: string; out: GfBotShape } | null;
  hatPhys: BotHatPhysics;
  cloudRaf: number;
  cloudPhys: BotCloudPhysics;

  // ---- Estado y rutinas ----
  state: GfBotState;
  routineIdx: number;
  /** Rutinas fijadas por el dueño, por estado. */
  fixedRoutine: BotFixedRoutines;
  /** Qué variante de cada rutina/juguete tocó la última vez (para no repetir). */
  variantIdx: Record<string, number>;
  toyIdx: Record<string, number>;
  /** Animaciones y timers del gesto en curso; `stopLoops`/`clearRoutine` los vacían. */
  subAnims: Animation[];
  subTimers: ReturnType<typeof setTimeout>[];
  lookTimers: ReturnType<typeof setTimeout>[];
  zTimer: ReturnType<typeof setInterval> | null;
  sleepTimer: ReturnType<typeof setTimeout> | null;
  /** La animación de relevo viva de cada nodo (ver `play`). */
  running: Map<Element, Animation>;
  /** `false` hasta que termina de construirse; `setShape` no reinicia rutinas antes. */
  ready: boolean;

  // ---- Boca ----
  mouthPref: GfBotMouthKind | null;
  mouthBase: string;
  mouthT: ReturnType<typeof setTimeout> | null;

  // ---- Caras kawaii ----
  exprAnims: Animation[];
  kIdleT: ReturnType<typeof setTimeout> | null;
  kIdleKey: GfKawaiiId | null;
  kBag: GfKawaiiId[];
  kTmpT: ReturnType<typeof setTimeout> | null;
  kSeqId: number;
  kWakeForce: string | null;
  kLockUntil: number;
  kHeldKey: string | null;
  /** Pistas de ojos/boca que llegaron en el mismo instante: se combinan y se resuelven al siguiente tick. */
  kQ: GfBotCue | null;
  /** Brazos del pulpo: gestos pedidos este tick y la animación del contorno que los dibuja. */
  pGest: Partial<Record<'L' | 'R', { deg: number[]; ms: number }>> | null;
  pAnim: Animation | null;

  // ---- Interacción ----
  /** Un arrastre en curso (`null` si nadie lo tiene agarrado). */
  drag: BotDrag | null;
  /**
   * Fuerza una reacción concreta en vez de elegirla al azar: `poke` (una de las 9) o `spin` (una de las 5).
   * El prototipo lo leía de `window.__pokeV`/`window.__spinV` «solo para pruebas»; aquí es un campo explícito.
   */
  force: { poke?: string; spin?: string };
  pokes: number;
  pokeT: ReturnType<typeof setTimeout> | null;
  dragging: boolean;
  /** El agente está cerrando su escena (`done`/`error`): la rutina de trabajo no se reanuda aunque un gesto la haya pausado. */
  closing: boolean;
  lastPokeV: string;
  lastPokeAt: number;
  lastDragEnd: number;
  lastTouchAt: number;

  // ---- Agente ----
  /** La hoja abierta mientras el agente escribe; `null` fuera de ese estado. */
  stream: BotStream | null;

  // ---- Juguetes ----
  toyN: number;
  toyTimers: ReturnType<typeof setTimeout>[];

  // ---- Ciclo de vida de los gestos (ver `lifecycle.ts`) ----
  /** El gesto en curso, con su propia bolsa de timers. */
  run: GestureRun | null;
  /** Los gestos que esperan turno (`policy: 'queue'`). */
  runQueue: (() => void)[];
  /** El regreso a reposo al cerrar el agente. Tiene dueño propio: ni un gesto ni un juguete lo borran por accidente. */
  closeT: ReturnType<typeof setTimeout> | null;

  // ---- Pausa ----
  paused: boolean;
  /** Lo que se pidió mientras estaba en pausa; se ejecuta al reanudar. */
  pending: (() => void) | null;
  inView: boolean;
  hoverHold: boolean;
}

let uid = 0;

/** Prefijo nuevo para un bot (`b1`, `b2`…). Contador del módulo: dos bots nunca comparten ids. */
export const nextBotId = (): string => 'b' + ++uid;

/** Un elemento que el esqueleto TIENE que traer: si falta, se rompió el contrato, no es un caso normal. */
function need<T extends SVGElement = SVGElement>(svg: SVGSVGElement, selector: string): T {
  const node = svg.querySelector<T>(selector);
  if (!node) throw new Error(`glyphflow/bots: el esqueleto no trae «${selector}»`);
  return node;
}

/** Caras vacías: lo que hay antes de la primera construcción de forma. */
export const emptyFaceElements = (): BotFaceElements => {
  const loose = (): SVGElement => document.createElementNS('http://www.w3.org/2000/svg', 'g');
  return {
    eyes: loose(), eyeList: [], closed: [], happy: [], squeeze: [], bubble: loose(),
    browA: [], browS: [], tears: [], sweat: loose(), faceFx: loose(), cheeks: [], line: [], half: [],
    ring: [], cross: [], mouths: [], ants: [], antTips: [], mflow: null, mhalo: null,
  };
};

/**
 * Monta el esqueleto en `host` y devuelve el contexto con el estado inicial que fijan las
 * opciones. NO construye la forma, ni la cara, ni arranca nada: eso es `setShape`.
 *
 * @param id Prefijo de ids. Por defecto uno nuevo; el componente de F2 lo pasa explícito para que el
 *   servidor y el cliente pinten los mismos `id` y la hidratación no los vea distintos.
 */
export function createBotContext(
  host: HTMLElement,
  opts: GfBotOptions,
  id: string = nextBotId(),
): BotContext {
  host.innerHTML = botSkeleton(id);
  const svg = host.querySelector('svg');
  if (!svg) throw new Error('glyphflow/bots: el esqueleto no produjo un <svg>');
  const q = (selector: string) => svg.querySelector<SVGElement>(selector);
  const qa = (selector: string) => [...svg.querySelectorAll<SVGElement>(selector)];

  const hat = opts.hat ?? null;
  const el: BotElements = {
    hop: need<SVGGraphicsElement>(svg, '.hop'), breath: need<SVGGraphicsElement>(svg, '.breath'), flip: need(svg, '.flip'),
    light: need(svg, '.light'), face: need(svg, '.face'), clip: need(svg, '.clipShape'),
    accBack: need(svg, '.accBack'), accFront: need(svg, '.accFront'), shadow: need(svg, '.shadow'),
    dots: need(svg, '.dots'), dotList: qa('.dot'), fx: need(svg, '.fx'),
    fxIn: need(svg, '.shapeFxIn'), fxOut: need(svg, '.shapeFxOut'), fxBack: need(svg, '.shapeFxBack'),
    hatShadow: need(svg, '.hatShadow'), hatShadowWrap: need<SVGGraphicsElement>(svg, '.hatShadowWrap'),
    toys: need(svg, '.toys'), thought: need(svg, '.thought'), thoughtList: qa('.thought circle'),
    spinner: need(svg, '.spinner'), z: need(svg, '.zlayer'), world: need(svg, '.world'),
    L: {
      key: need(svg, '.key'), sheen: need(svg, '.sheen'), rl: need(svg, '.rl'), rr: need(svg, '.rr'),
      rt: need(svg, '.rt'), rb: need(svg, '.rb'), lift: need(svg, '.lift'), dim: need(svg, '.dim'),
      mood: need(svg, '.mood'), gloss: need(svg, '.gloss'),
    },
  };

  return {
    id, host, svg, opts, reduce: prefersReducedMotion(), spring: resolveSpring(), hooks: { cue: () => undefined, act: () => undefined, kawaiiRelease: () => undefined, agentReact: () => 0, kawaiiIdleTick: () => undefined, kawaiiWake: () => undefined }, q, qa, el, fe: emptyFaceElements(),

    shape: opts.shape,
    view: viewYaw(opts.view),
    pose: { yaw: viewYaw(opts.view), pitch: 0, roll: 0 },
    faceStyle: opts.face && Object.hasOwn(FACES, opts.face) ? opts.face : null,
    mochiVar: opts.mochi || 'neu',
    fxVar: opts.fx && Object.hasOwn(FX_VARS, opts.fx) ? opts.fx : null,
    accX: hat && Object.hasOwn(ACCX, hat) ? (hat as GfBotAccXId) : null,
    paletteKey: opts.palette || 'auto',
    materialKey: opts.material || 'auto',
    poseEls: [],
    outlines: [],
    feats: [],
    shapeAnims: [],
    shapeTimer: null,

    hats: opts.extras?.hats ?? null,
    routines: opts.extras?.routines ?? null,
    hatKey: hat && opts.extras?.hats?.has(hat) ? hat : null,
    hatEls: null,
    hatRaf: 0,
    hatCache: null,
    hatPhys: { th: 0, vth: 0, oy: 0, voy: 0, px: null, py: 0, pa: 0, pvx: 0, pvy: 0, pva: 0, t: 0, side: 1 },
    cloudRaf: 0,
    cloudPhys: { px: null, py: 0, vx: 0, vy: 0, pa: 0, va: 0, lean: 0, st: 0 },

    state: 'idle',
    routineIdx: 0,
    fixedRoutine: { working: null, sleeping: null },
    variantIdx: {},
    toyIdx: {},
    subAnims: [],
    subTimers: [],
    lookTimers: [],
    zTimer: null,
    sleepTimer: null,
    running: new Map(),
    ready: false,

    mouthPref: opts.mouthk && opts.mouthk !== 'auto' ? opts.mouthk : null,
    mouthBase: 'smile',
    mouthT: null,

    exprAnims: [],
    kIdleT: null,
    kIdleKey: null,
    kBag: [],
    kTmpT: null,
    kSeqId: 0,
    kWakeForce: null,
    kLockUntil: 0,
    kHeldKey: null,
    kQ: null,
    pGest: null,
    pAnim: null,

    drag: null,
    force: {},
    pokes: 0,
    pokeT: null,
    dragging: false,
    closing: false,
    lastPokeV: '',
    lastPokeAt: 0,
    lastDragEnd: 0,
    lastTouchAt: 0,

    stream: null,

    toyN: 0,
    toyTimers: [],
    run: null,
    runQueue: [],
    closeT: null,

    paused: false,
    pending: null,
    inView: true,
    hoverHold: !!opts.hoverOnly,
  };
}
