import { FACES, type GfBotFaceId } from '../data/faces';
import { ACCX, FX_VARS, type GfBotAccXId, type GfBotFxId } from '../data/fx';
import { HATS, type GfBotHatId } from '../data/hats';
import type { MATERIALS, GfBotPaletteId } from '../data/palettes';
import type { GfBotShape } from '../data/shape';
import type { GfBotState } from '../bot-state';
import { prefersReducedMotion } from './env';
import type { GfBotFeature, GfBotPose } from './pose';
import { botSkeleton } from './skeleton';

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
 *
 * Campos que faltan a propósito, y quién los trae: `stream` y `AGENT_*` (agente, corte 7), `drag`/
 * `endDrag` (interacción, corte 6), `pGest`/`pAnim` (brazos del pulpo, corte 6), `kQ` (cola kawaii,
 * corte 4). Sus tipos dependen de código que aún no está portado; declararlos ahora sería poner
 * `unknown` y mentir con la forma.
 */

/** Las dos bocas de reposo que se pueden elegir a mano: la pastilla neumórfica o la «w» del gato. */
export type GfBotMouthKind = 'pill' | 'w';

/** Materiales del cuerpo; `auto` = el de la forma. */
export type GfBotMaterialId = keyof typeof MATERIALS;

/** Opciones con las que se crea un bot. En el prototipo la forma era una clave; ahora es el OBJETO. */
export interface GfBotOptions {
  /** La forma. Se pasa el objeto (`mochiShape`…) para que el bundler quite las que no se usan. */
  shape: GfBotShape;
  /** Clave de `PALETTES`, o `auto` para la de la forma. */
  palette?: GfBotPaletteId | 'auto';
  material?: GfBotMaterialId | 'auto';
  /** Piel (`neu`, `gel`, `g1`, `o2`…). Por defecto `neu`. */
  mochi?: string;
  /** Estilo de cara; `null`/`neu` = la propia de la forma. */
  face?: GfBotFaceId | null;
  /** Efecto de contorno (glow, pixel, glitch, bug). */
  fx?: GfBotFxId | null;
  /** Sombrero o accesorio extra (halo, gafas…). `null` = ninguno. */
  hat?: GfBotHatId | GfBotAccXId | null;
  /** Boca de reposo elegida a mano; `auto` = la de la forma. */
  mouthk?: GfBotMouthKind | 'auto';
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

/** Referencias que salen del esqueleto: existen desde que se crea el bot y no cambian de forma. */
export interface BotElements {
  hop: SVGElement;
  breath: SVGElement;
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
  hatShadowWrap: SVGElement;
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
  eyes: SVGElement | null;
  eyeList: SVGElement[];
  closed: SVGElement[];
  happy: SVGElement[];
  squeeze: SVGElement[];
  bubble: SVGElement | null;
  browA: SVGElement[];
  browS: SVGElement[];
  tears: SVGElement[];
  sweat: SVGElement | null;
  faceFx: SVGElement | null;
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

/** Lo que el sombrero necesita medir cada cuadro (se arma en `hatBind`). */
export interface BotHatElements {
  anchor: SVGElement | null;
  sdyn: SVGElement | null;
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

/** Rutinas que el dueño puede fijar: `null` = que el bot elija por turnos. */
export interface BotFixedRoutines {
  working: string | null;
  sleeping: string | null;
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
  /** `querySelector` / `querySelectorAll` sobre el SVG de este bot. */
  q(selector: string): SVGElement | null;
  qa(selector: string): SVGElement[];
  readonly el: BotElements;
  /** Rasgos de la forma actual; se reasignan en `buildShape`. */
  fe: BotFaceElements;

  // ---- Forma, piel y color ----
  shape: GfBotShape;
  /** Nombre de la forma para `data-shape` (el CSS de las pieles y los fx se engancha a él). */
  shapeId: string;
  pose: Required<GfBotPose>;
  /** Estilo de cara elegido a mano; `null` = la propia de la forma (el que elija el usuario manda). */
  faceStyle: GfBotFaceId | null;
  mochiVar: string;
  fxVar: GfBotFxId | null;
  accX: GfBotAccXId | null;
  paletteKey: GfBotPaletteId | 'auto';
  materialKey: GfBotMaterialId | 'auto';
  /** Elementos que giran con la pose (`.yaw`, silueta, caras laterales, luz, accesorios), en el orden de `POSE_SLOTS`. */
  poseEls: SVGElement[];
  feats: GfBotFeature[];
  /** Animaciones propias de la forma (onda del fantasma, tentáculos del pulpo); se cancelan al cambiarla. */
  shapeAnims: Animation[];
  shapeTimer: ReturnType<typeof setInterval> | null;

  // ---- Sombrero y física ----
  hatKey: GfBotHatId | null;
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
  kIdleKey: string | null;
  kBag: string[];
  kTmpT: ReturnType<typeof setTimeout> | null;
  kSeqId: number;
  kWakeForce: string | null;
  kLockUntil: number;
  kHeldKey: string | null;

  // ---- Interacción ----
  pokes: number;
  pokeT: ReturnType<typeof setTimeout> | null;
  dragging: boolean;
  lastPokeV: string;
  lastPokeAt: number;
  lastDragEnd: number;
  lastTouchAt: number;

  // ---- Juguetes ----
  toyN: number;
  toyTimers: ReturnType<typeof setTimeout>[];

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
function need(svg: SVGSVGElement, selector: string): SVGElement {
  const node = svg.querySelector<SVGElement>(selector);
  if (!node) throw new Error(`glyphflow/bots: el esqueleto no trae «${selector}»`);
  return node;
}

/** Caras vacías: lo que hay antes de la primera construcción de forma. */
export const emptyFaceElements = (): BotFaceElements => ({
  eyes: null, eyeList: [], closed: [], happy: [], squeeze: [], bubble: null,
  browA: [], browS: [], tears: [], sweat: null, faceFx: null, cheeks: [], line: [], half: [],
  ring: [], cross: [], mouths: [], ants: [], antTips: [], mflow: null, mhalo: null,
});

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
    hop: need(svg, '.hop'), breath: need(svg, '.breath'), flip: need(svg, '.flip'),
    light: need(svg, '.light'), face: need(svg, '.face'), clip: need(svg, '.clipShape'),
    accBack: need(svg, '.accBack'), accFront: need(svg, '.accFront'), shadow: need(svg, '.shadow'),
    dots: need(svg, '.dots'), dotList: qa('.dot'), fx: need(svg, '.fx'),
    fxIn: need(svg, '.shapeFxIn'), fxOut: need(svg, '.shapeFxOut'), fxBack: need(svg, '.shapeFxBack'),
    hatShadow: need(svg, '.hatShadow'), hatShadowWrap: need(svg, '.hatShadowWrap'),
    toys: need(svg, '.toys'), thought: need(svg, '.thought'), thoughtList: qa('.thought circle'),
    spinner: need(svg, '.spinner'), z: need(svg, '.zlayer'), world: need(svg, '.world'),
    L: {
      key: need(svg, '.key'), sheen: need(svg, '.sheen'), rl: need(svg, '.rl'), rr: need(svg, '.rr'),
      rt: need(svg, '.rt'), rb: need(svg, '.rb'), lift: need(svg, '.lift'), dim: need(svg, '.dim'),
      mood: need(svg, '.mood'), gloss: need(svg, '.gloss'),
    },
  };

  return {
    id, host, svg, opts, reduce: prefersReducedMotion(), q, qa, el, fe: emptyFaceElements(),

    shape: opts.shape,
    shapeId: '',
    pose: { yaw: 0, pitch: 0, roll: 0 },
    faceStyle: opts.face && Object.hasOwn(FACES, opts.face) ? opts.face : null,
    mochiVar: opts.mochi || 'neu',
    fxVar: opts.fx && Object.hasOwn(FX_VARS, opts.fx) ? opts.fx : null,
    accX: hat && Object.hasOwn(ACCX, hat) ? (hat as GfBotAccXId) : null,
    paletteKey: opts.palette || 'auto',
    materialKey: opts.material || 'auto',
    poseEls: [],
    feats: [],
    shapeAnims: [],
    shapeTimer: null,

    hatKey: hat && Object.hasOwn(HATS, hat) ? (hat as GfBotHatId) : null,
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

    pokes: 0,
    pokeT: null,
    dragging: false,
    lastPokeV: '',
    lastPokeAt: 0,
    lastDragEnd: 0,
    lastTouchAt: 0,

    toyN: 0,
    toyTimers: [],

    paused: false,
    pending: null,
    inView: true,
    hoverHold: !!opts.hoverOnly,
  };
}
