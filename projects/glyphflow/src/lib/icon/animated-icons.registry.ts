import { AnimatedIconDef, IconChoreography, MotionTrack } from './animated-icon.model';
import { SHAPES } from './animated-icons.shapes';

/**
 * Registro de iconos animados: aquí vive el CRITERIO (qué se mueve, cuándo y con qué desfase).
 * La geometría, que es solo copiar, vive en `animated-icons.shapes.ts`.
 *
 * Paths: **Lucide** (ISC) — los mismos que renderiza el resto de la app.
 * Coreografías: las de `bell`, `check`, `refresh-cw`, `search`, `settings` están portadas de
 * Animate UI (MIT + Commons Clause); el resto son de la casa, construidas con el mismo vocabulario.
 *
 * Regla que ordena todo el archivo: **si dos figuras se mueven igual y al mismo tiempo, no hay
 * coreografía, hay un bloque.** El desfase es lo que se siente vivo.
 */

// ── Vocabulario de movimiento ────────────────────────────────────────────────

const EASE = 'ease-in-out';
/** Spring sobreamortiguado (ζ≈1): sin rebote, un expo-out es fiel y WAAPI no tiene springs. */
const SPRING_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

const rotateSeq = (deg: number[]): Keyframe[] => deg.map((d) => ({ transform: `rotate(${d}deg)` }));
const scaleSeq = (s: number[]): Keyframe[] => s.map((v) => ({ transform: `scale(${v})` }));
const moveXSeq = (x: number[]): Keyframe[] => x.map((v) => ({ transform: `translateX(${v}px)` }));
const moveYSeq = (y: number[]): Keyframe[] => y.map((v) => ({ transform: `translateY(${v}px)` }));

interface TrackOpts {
  delay?: number;
  easing?: string;
  origin?: string;
  fill?: FillMode;
}

/**
 * Un track con `delay` SIEMPRE lleva `fill: 'backwards'`: sin él, la figura se ve en su estado
 * final durante la espera y salta a su estado inicial cuando por fin le toca. Ese parpadeo es el
 * error clásico de las animaciones escalonadas y aquí se cierra de fábrica, no icono por icono.
 */
const track = (keyframes: Keyframe[], duration: number, o: TrackOpts = {}): MotionTrack => ({
  keyframes,
  options: {
    duration,
    easing: o.easing ?? EASE,
    ...(o.delay ? { delay: o.delay, fill: o.fill ?? 'backwards' } : o.fill ? { fill: o.fill } : {}),
  },
  ...(o.origin ? { origin: o.origin } : {}),
});

/** Aparecer desde nada — ondas, chispas, destellos. */
const burst = (): Keyframe[] => [
  { transform: 'scale(0.3)', opacity: '0' },
  { transform: 'scale(1.12)', opacity: '1' },
  { transform: 'scale(1)', opacity: '1' },
];

/** Trazo que se dibuja. El componente pone `pathLength="1"`, por eso el dash va en 0-1. */
const strokeDraw = (): Keyframe[] => [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' },
];

/**
 * Variante `draw` universal. NO se escribe a mano: el componente mide cada figura y dibuja de la
 * más larga a la más corta, con velocidad de pluma constante (ver `AutoDraw`). Escrita a mano, el
 * contorno del reloj y la manecilla tardaban lo mismo — y eso se ve a saltos.
 */
const DRAW: IconChoreography = { autoDraw: {} };

/** Arma la definición y le cuelga la variante `draw` (a menos que se escriba una a mano). */
const icon = (key: string, animations: Record<string, IconChoreography>): AnimatedIconDef => {
  const shapes = SHAPES[key];
  if (!shapes) throw new Error(`animated-icon: faltan las figuras de "${key}" en SHAPES`);
  return { shapes, animations: { draw: DRAW, ...animations } };
};

/** Estado que se sostiene mientras dure el hover y se devuelve al salir (no un tic de ida y vuelta). */
const held = (keyframes: Keyframe[], duration: number, o: TrackOpts = {}): IconChoreography => ({
  root: track(keyframes, duration, { easing: SPRING_OUT, fill: 'forwards', ...o }),
  reverseOnLeave: true,
});

// ── Catálogo ─────────────────────────────────────────────────────────────────

export const ANIMATED_ICONS: Record<string, AnimatedIconDef> = {
  /** Cuerpo 0.9s y badajo 1.1s: ese desfase ES el efecto (portado de Animate UI). */
  bell: icon('bell', {
    default: {
      root: track(rotateSeq([0, 20, -10, 10, -5, 3, 0]), 900, { origin: 'top center' }),
      shapes: { 0: track(moveXSeq([0, -6, 5, -5, 4, -3, 2, 0]), 1100) },
    },
  }),

  /** Campana con ondas: repica y las ondas salen DESPUÉS del primer golpe, no junto con él. */
  'bell-ring': icon('bell-ring', {
    default: {
      root: track(rotateSeq([0, 18, -12, 9, -5, 0]), 900, { origin: 'top center' }),
      shapes: {
        0: track(moveXSeq([0, -5, 4, -3, 2, 0]), 1050),
        1: track(burst(), 650, { delay: 140 }),
        3: track(burst(), 650, { delay: 140 }),
      },
    },
  }),

  /** Palomita: se dibuja mientras crece 10% y regresa (portado de Animate UI). */
  check: icon('check', {
    default: {
      shapes: {
        0: {
          keyframes: [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'scale(1)' },
            {
              strokeDasharray: '1',
              strokeDashoffset: '0.5',
              opacity: '0.5',
              transform: 'scale(1.1)',
            },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)' },
          ],
          options: { duration: 600, easing: EASE },
          origin: '12px 11.5px',
        },
      },
    },
  }),

  /** Toast de error/advertencia: el círculo se dibuja y el signo aparece después. */
  'circle-alert': icon('circle-alert', {
    default: {
      root: track(rotateSeq([0, -6, 5, -3, 0]), 600),
      shapes: {
        1: track(burst(), 400, { delay: 220 }),
        2: track(burst(), 400, { delay: 340 }),
      },
    },
  }),

  /** Toast de éxito: primero el círculo, luego la palomita. Nunca al mismo tiempo. */
  'circle-check': icon('circle-check', {
    default: {
      shapes: {
        0: track(strokeDraw(), 450),
        1: track(strokeDraw(), 400, { delay: 280 }),
      },
    },
  }),

  /** Toast de error: el círculo se dibuja y la equis se tacha en dos tiempos. */
  'circle-x': icon('circle-x', {
    default: {
      shapes: {
        0: track(strokeDraw(), 450),
        1: track(strokeDraw(), 260, { delay: 300 }),
        2: track(strokeDraw(), 260, { delay: 420 }),
      },
    },
  }),

  /** Copiar: la hoja de enfrente se desliza y vuelve — el gesto de sacar una copia. */
  copy: icon('copy', {
    default: {
      shapes: {
        0: track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.5px, -1.5px)' },
            { transform: 'translate(0, 0)' },
          ],
          600,
        ),
      },
    },
  }),

  /** Calendario: las dos anillas rebotan escalonadas, el cuerpo quieto. */
  calendar: icon('calendar', {
    default: {
      shapes: {
        0: track(moveYSeq([0, -1.5, 0]), 500),
        1: track(moveYSeq([0, -1.5, 0]), 500, { delay: 90 }),
      },
    },
  }),

  /** Empujoncito hacia donde lleva. Sostenido mientras dure el hover. */
  'chevron-right': icon('chevron-right', {
    default: held(moveXSeq([0, 3]), 320),
  }),

  /** Igual que el chevron pero de regreso: la flecha de "volver". */
  'arrow-left': icon('arrow-left', {
    default: held(moveXSeq([0, -3]), 320),
  }),

  /** Descargar: el asta y la punta bajan juntas; la bandeja no se mueve (es el piso). */
  download: icon('download', {
    default: {
      shapes: {
        0: track(moveYSeq([0, 2, 0]), 550),
        2: track(moveYSeq([0, 2, 0]), 550),
      },
    },
  }),

  /** Parpadeo. Aplastar en Y con el origen al centro lee como párpado. */
  eye: icon('eye', {
    default: {
      root: track(
        [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.1)' }, { transform: 'scaleY(1)' }],
        450,
        { origin: 'center' },
      ),
    },
  }),

  /** Ocultar: se tacha. Solo la diagonal se dibuja, el ojo ya estaba ahí. */
  'eye-off': icon('eye-off', {
    default: { shapes: { 3: track(strokeDraw(), 420) } },
  }),

  /** Anónimo: se toca el sombrero y los lentes aparecen. */
  'hat-glasses': icon('hat-glasses', {
    default: {
      shapes: {
        1: track(
          [
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: 'translateY(-1.5px) rotate(-8deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          650,
          { origin: '12px 11px' },
        ),
        3: track(burst(), 450, { delay: 180 }),
        4: track(burst(), 450, { delay: 260 }),
      },
    },
  }),

  /** Latido doble (como el de verdad) y el electro trazándose encima. */
  'heart-pulse': icon('heart-pulse', {
    default: {
      root: track(scaleSeq([1, 1.12, 1, 1.08, 1]), 900, { origin: 'center' }),
      shapes: { 1: track(strokeDraw(), 700, { delay: 150 }) },
    },
  }),

  /** Galería: las dos láminas se separan tantito — se nota que son DOS. */
  images: icon('images', {
    default: {
      shapes: {
        1: track(moveXSeq([0, -1.5, 0]), 600),
        3: track(moveXSeq([0, 1.5, 0]), 600),
      },
    },
  }),

  /** Toast informativo: círculo primero, la "i" después. */
  info: icon('info', {
    default: {
      shapes: {
        0: track(strokeDraw(), 450),
        1: track(burst(), 380, { delay: 260 }),
        2: track(burst(), 380, { delay: 360 }),
      },
    },
  }),

  /** Spinner. Va lineal a propósito: con `[loop]` no se debe notar el corte entre vueltas. */
  'loader-circle': icon('loader-circle', {
    default: {
      root: track(rotateSeq([0, 360]), 900, { easing: 'linear', origin: 'center' }),
    },
  }),

  /** Abrir: el arco se levanta y el cuerpo da un tirón. */
  lock: icon('lock', {
    default: {
      shapes: {
        0: track(moveYSeq([0, 0.8, 0]), 500, { delay: 120 }),
        1: track(moveYSeq([0, -1.8, 0]), 500),
      },
    },
  }),

  /** Correo: el sobre da un golpecito y la solapa se traza. */
  mail: icon('mail', {
    default: {
      root: track(scaleSeq([1, 1.06, 1]), 500, { origin: 'center' }),
      shapes: { 0: track(strokeDraw(), 500, { delay: 120 }) },
    },
  }),

  /** Clic: el cursor se hunde y las chispas salen DESPUÉS del golpe. Si salen juntas, no es clic. */
  'mouse-pointer-click': icon('mouse-pointer-click', {
    default: {
      shapes: {
        4: track(scaleSeq([1, 0.85, 1]), 400, { origin: '10px 10px' }),
        0: track(burst(), 420, { delay: 200 }),
        1: track(burst(), 420, { delay: 240 }),
        2: track(burst(), 420, { delay: 280 }),
        3: track(burst(), 420, { delay: 320 }),
      },
    },
  }),

  /** Escribir: el lápiz recorre su propia diagonal. */
  pencil: icon('pencil', {
    default: {
      root: track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(1.5px, -1.5px)' },
          { transform: 'translate(-1px, 1px)' },
          { transform: 'translate(0, 0)' },
        ],
        700,
      ),
    },
  }),

  /** Agregar: golpe seco. `turn` es la otra lectura, la de "+ que se vuelve ✕". */
  plus: icon('plus', {
    default: {
      root: track(scaleSeq([1, 1.25, 1]), 400, { easing: SPRING_OUT, origin: 'center' }),
    },
    turn: held(rotateSeq([0, 90]), 350, { origin: 'center' }),
  }),

  /** `default` es de ESTADO: gira 45° y se queda; al salir el puntero regresa (portado). */
  'refresh-cw': icon('refresh-cw', {
    default: held(rotateSeq([0, 45]), 450, { origin: 'center' }),
    rotate: {
      root: track(rotateSeq([0, 360]), 700, { easing: SPRING_OUT, origin: 'center' }),
    },
  }),

  /** Guardar: se hunde como un botón físico. */
  save: icon('save', {
    default: {
      root: track(scaleSeq([1, 0.9, 1]), 420, { easing: SPRING_OUT, origin: 'center' }),
    },
  }),

  /** Sacudida desde el mango; `find` la pasea como si buscara (ambas portadas). */
  search: icon('search', {
    default: {
      root: track(rotateSeq([0, 17, -10, 5, -1, 0]), 800, { origin: 'bottom right' }),
    },
    find: {
      root: track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(-15%, 0)' },
          { transform: 'translate(0, -15%)' },
          { transform: 'translate(0, 0)' },
        ],
        1000,
      ),
    },
  }),

  /** Encontrado: primero la lupa, luego la palomita. El orden cuenta la historia. */
  'search-check': icon('search-check', {
    default: {
      shapes: {
        1: track(strokeDraw(), 450),
        2: track(strokeDraw(), 300, { delay: 200 }),
        0: track(strokeDraw(), 380, { delay: 380 }),
      },
    },
  }),

  /** Búsqueda desactivada: la diagonal cae al final. */
  'search-slash': icon('search-slash', {
    default: {
      shapes: {
        1: track(strokeDraw(), 450),
        2: track(strokeDraw(), 300, { delay: 200 }),
        0: track(strokeDraw(), 320, { delay: 380 }),
      },
    },
  }),

  /** Sin resultados: la lupa se dibuja, la equis se tacha y el conjunto se sacude. */
  'search-x': icon('search-x', {
    default: {
      root: track(rotateSeq([0, 6, -5, 3, 0]), 700, { delay: 380, origin: 'bottom right' }),
      shapes: {
        2: track(strokeDraw(), 450),
        3: track(strokeDraw(), 300, { delay: 200 }),
        0: track(strokeDraw(), 260, { delay: 380 }),
        1: track(strokeDraw(), 260, { delay: 480 }),
      },
    },
  }),

  /** Enviar: se va, y regresa desde el lado contrario. El truco es que no vuelve por donde salió. */
  send: icon('send', {
    default: {
      root: track(
        [
          { transform: 'translate(0, 0)', opacity: '1' },
          { transform: 'translate(6px, -6px)', opacity: '0' },
          { transform: 'translate(-5px, 5px)', opacity: '0' },
          { transform: 'translate(0, 0)', opacity: '1' },
        ],
        800,
      ),
    },
  }),

  /** Media vuelta en dos tiempos; `rotate` gira parejo (bueno con `loop`). Portadas. */
  settings: icon('settings', {
    default: {
      root: track(rotateSeq([0, 90, 180]), 1250, { origin: 'center' }),
    },
    rotate: {
      root: track(rotateSeq([0, 360]), 2000, { easing: 'linear', origin: 'center' }),
    },
  }),

  /** Protegido: el escudo primero, la palomita después. */
  'shield-check': icon('shield-check', {
    default: {
      root: track(scaleSeq([1, 1.08, 1]), 500, { origin: 'center' }),
      shapes: { 1: track(strokeDraw(), 420, { delay: 260 }) },
    },
  }),

  /** Destellos: la estrella grande respira y las chiquitas titilan a destiempo. */
  sparkles: icon('sparkles', {
    default: {
      shapes: {
        0: track(scaleSeq([1, 1.15, 1]), 700, { origin: '12px 12px' }),
        1: track(burst(), 450, { delay: 140 }),
        2: track(burst(), 450, { delay: 200 }),
        3: track(burst(), 450, { delay: 300 }),
      },
    },
  }),

  /** Borrar: la tapa se levanta girando desde su extremo izquierdo. */
  trash: icon('trash', {
    default: {
      shapes: {
        0: track(
          [
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: 'translateY(-1.5px) rotate(-12deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          600,
          { origin: '3px 6px' },
        ),
        2: track(
          [
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: 'translateY(-1.5px) rotate(-12deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          600,
          { origin: '3px 6px' },
        ),
      },
    },
  }),

  /**
   * Igual que `trash` pero además el contenido cae 80ms después. ADAPTADO: el original de Animate
   * UI interpola el atributo `d` (path morph), que no es confiable entre navegadores.
   */
  'trash-2': icon('trash-2', {
    default: {
      shapes: {
        0: track(moveYSeq([0, 1.5, 0]), 520, { delay: 80 }),
        1: track(moveYSeq([0, 1.5, 0]), 520, { delay: 120 }),
        3: track(
          [
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: 'translateY(-1.5px) rotate(-12deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          600,
          { origin: '3px 6px' },
        ),
        4: track(
          [
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: 'translateY(-1.5px) rotate(-12deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          600,
          { origin: '3px 6px' },
        ),
      },
    },
  }),

  /** Advertencia: se sacude y el signo aparece al final. */
  'triangle-alert': icon('triangle-alert', {
    default: {
      root: track(rotateSeq([0, -5, 4, -3, 0]), 600),
      shapes: {
        1: track(burst(), 400, { delay: 220 }),
        2: track(burst(), 400, { delay: 340 }),
      },
    },
  }),

  /** Subir: asta y punta van hacia arriba; la bandeja se queda. */
  upload: icon('upload', {
    default: {
      shapes: {
        0: track(moveYSeq([0, -2, 0]), 550),
        2: track(moveYSeq([0, -2, 0]), 550),
      },
    },
  }),

  /** Persona: la cabeza asoma tantito. */
  user: icon('user', {
    default: {
      shapes: { 1: track(moveYSeq([0, -1.2, 0]), 500) },
      root: track(scaleSeq([1, 1.05, 1]), 500, { origin: 'center' }),
    },
  }),

  /** Apretar: la llave gira y regresa. */
  wrench: icon('wrench', {
    default: {
      root: track(rotateSeq([0, -18, 12, 0]), 700, { origin: 'center' }),
    },
  }),

  /** Cerrar: gira 90° y se sostiene mientras el puntero siga encima. */
  x: icon('x', {
    default: held(rotateSeq([0, 90]), 350, { origin: 'center' }),
  }),

  // ── 2ª tanda: lo que más se usa en la app ──────────────────────────────────

  /** Documento: las líneas de texto se escriben una tras otra. */
  'file-text': icon('file-text', {
    default: {
      shapes: {
        2: track(strokeDraw(), 220),
        3: track(strokeDraw(), 240, { delay: 90 }),
        4: track(strokeDraw(), 240, { delay: 180 }),
      },
    },
  }),

  /** Monitor encendiéndose: el parpadeo del tubo, no un fundido parejo. */
  monitor: icon('monitor', {
    default: {
      shapes: {
        0: track(
          [
            { opacity: '1' },
            { opacity: '0.35' },
            { opacity: '1' },
            { opacity: '0.6' },
            { opacity: '1' },
          ],
          600,
        ),
      },
    },
  }),

  /** Paquete que aterriza. */
  package: icon('package', {
    default: {
      root: track(moveYSeq([0, -2.5, 0]), 550, { easing: SPRING_OUT }),
    },
  }),

  /** Historial: todo gira en REVERSA — es el gesto de rebobinar. */
  history: icon('history', {
    default: {
      root: track(rotateSeq([0, -22, 0]), 700, { origin: 'center' }),
      shapes: { 2: track(rotateSeq([0, -70, 0]), 800, { origin: '12px 12px' }) },
    },
  }),

  /** Playera colgada meciéndose desde los hombros. */
  shirt: icon('shirt', {
    default: {
      root: track(rotateSeq([0, 4, -3, 2, 0]), 750, { origin: 'top center' }),
    },
  }),

  /** Carpeta que se abre y levanta. */
  'folder-open': icon('folder-open', {
    default: {
      root: track(moveYSeq([0, -1.8, 0]), 520, { easing: SPRING_OUT }),
    },
  }),

  /** Despega y vuelve a entrar por el otro lado. */
  plane: icon('plane', {
    default: {
      root: track(
        [
          { transform: 'translate(0, 0)', opacity: '1' },
          { transform: 'translate(7px, -7px)', opacity: '0' },
          { transform: 'translate(-6px, 6px)', opacity: '0' },
          { transform: 'translate(0, 0)', opacity: '1' },
        ],
        850,
      ),
    },
  }),

  /** Globo girando: achicar el meridiano en X lee como rotación sin deformar nada. */
  globe: icon('globe', {
    default: {
      shapes: {
        1: track(
          [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.15)' }, { transform: 'scaleX(1)' }],
          1100,
          { origin: '12px 12px' },
        ),
      },
    },
  }),

  /** Llave girando sobre su anillo, no sobre el centro del lienzo. */
  key: icon('key', {
    default: {
      root: track(rotateSeq([0, -20, 0]), 700, { origin: '7.5px 15.5px' }),
    },
  }),

  /** Equipo: el de adelante saluda y el de atrás aparece después. */
  users: icon('users', {
    default: {
      shapes: {
        3: track(moveYSeq([0, -1.2, 0]), 500),
        1: track(burst(), 450, { delay: 160 }),
        2: track(burst(), 450, { delay: 220 }),
      },
    },
  }),

  /** Camión que avanza CON las llantas girando. Sin las llantas, patina. */
  truck: icon('truck', {
    default: {
      root: track(moveXSeq([0, 1.5, 0]), 900),
      shapes: {
        3: track(rotateSeq([0, 360]), 900, { easing: 'linear', origin: '7px 18px' }),
        4: track(rotateSeq([0, 360]), 900, { easing: 'linear', origin: '17px 18px' }),
      },
    },
  }),

  /** Pin que cae y se clava. */
  'map-pin': icon('map-pin', {
    default: {
      root: track(moveYSeq([-4, 0, -1.5, 0]), 650, { easing: SPRING_OUT }),
    },
  }),

  /** Abrir fuera: la flecha se sale de la caja. */
  'external-link': icon('external-link', {
    default: {
      shapes: {
        0: track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(2px, -2px)' },
            { transform: 'translate(0, 0)' },
          ],
          550,
        ),
        1: track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(2px, -2px)' },
            { transform: 'translate(0, 0)' },
          ],
          550,
        ),
      },
    },
  }),

  /** Portafolio: se levanta del asa. */
  briefcase: icon('briefcase', {
    default: {
      shapes: { 0: track(moveYSeq([0, -1.2, 0]), 500) },
    },
  }),

  /** Libro que se abre. */
  'book-open': icon('book-open', {
    default: {
      shapes: {
        1: track([{ transform: 'scaleX(0.9)' }, { transform: 'scaleX(1)' }], 500, {
          origin: '12px 12px',
        }),
      },
    },
  }),

  /** Vibración de celular: corta y nerviosa, no un mecidito. */
  smartphone: icon('smartphone', {
    default: {
      root: track(rotateSeq([0, -3, 3, -2, 2, 0]), 450),
    },
  }),

  /** Timbrando. */
  phone: icon('phone', {
    default: {
      root: track(rotateSeq([0, -12, 10, -8, 6, 0]), 800, { origin: 'center' }),
    },
  }),

  /** Ticket que sale de la impresora. */
  receipt: icon('receipt', {
    default: {
      root: track(moveYSeq([-2.5, 0]), 500, { easing: SPRING_OUT }),
      shapes: { 0: track(strokeDraw(), 400, { delay: 180 }) },
    },
  }),

  /** Deshacer: gira al revés que `refresh-cw`. */
  'rotate-ccw': icon('rotate-ccw', {
    default: {
      root: track(rotateSeq([0, -360]), 800, { easing: SPRING_OUT, origin: 'center' }),
    },
  }),

  /** Carrito rodando con las ruedas girando. */
  'shopping-cart': icon('shopping-cart', {
    default: {
      root: track(moveXSeq([0, 1.5, 0]), 800),
      shapes: {
        0: track(rotateSeq([0, 360]), 800, { easing: 'linear', origin: '8px 21px' }),
        1: track(rotateSeq([0, 360]), 800, { easing: 'linear', origin: '19px 21px' }),
      },
    },
  }),

  /** Billete que se voltea. */
  banknote: icon('banknote', {
    default: {
      root: track(
        [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.8)' }, { transform: 'scaleX(1)' }],
        600,
        {
          origin: 'center',
        },
      ),
    },
  }),

  /** Corona que se posa. */
  crown: icon('crown', {
    default: {
      root: track(moveYSeq([-2.5, 0, -1, 0]), 650, { easing: SPRING_OUT }),
    },
  }),

  /** Sol: los rayos brotan uno por uno mientras el astro gira despacio. */
  sun: icon('sun', {
    default: {
      root: track(rotateSeq([0, 45]), 900, { origin: 'center' }),
      shapes: {
        1: track(burst(), 380, { delay: 0 }),
        2: track(burst(), 380, { delay: 45 }),
        3: track(burst(), 380, { delay: 90 }),
        4: track(burst(), 380, { delay: 135 }),
        5: track(burst(), 380, { delay: 180 }),
        6: track(burst(), 380, { delay: 225 }),
        7: track(burst(), 380, { delay: 270 }),
        8: track(burst(), 380, { delay: 315 }),
      },
    },
  }),

  /** Luna que se recuesta. */
  moon: icon('moon', {
    default: {
      root: track(rotateSeq([0, -18, 0]), 700, { origin: 'center' }),
    },
  }),

  /** Chispazo: parpadeo eléctrico, irregular a propósito. */
  zap: icon('zap', {
    default: {
      root: track(
        [
          { opacity: '1', transform: 'scale(1)' },
          { opacity: '0.25', transform: 'scale(0.94)' },
          { opacity: '1', transform: 'scale(1.12)' },
          { opacity: '0.6', transform: 'scale(1)' },
          { opacity: '1', transform: 'scale(1)' },
        ],
        550,
        { origin: 'center' },
      ),
    },
  }),

  /** Manecillas dando la vuelta; la carátula quieta. */
  clock: icon('clock', {
    default: {
      shapes: { 1: track(rotateSeq([0, 360]), 1200, { origin: '12px 12px' }) },
    },
  }),

  /** Foco prendiendo. */
  lightbulb: icon('lightbulb', {
    default: {
      shapes: {
        0: track(
          [
            { opacity: '0.45', transform: 'scale(0.96)' },
            { opacity: '1', transform: 'scale(1.08)' },
            { opacity: '1', transform: 'scale(1)' },
          ],
          600,
          { origin: '12px 14px' },
        ),
      },
    },
  }),

  /** Obturador: solo el lente se cierra y abre. */
  camera: icon('camera', {
    default: {
      shapes: {
        1: track(scaleSeq([1, 0.65, 1]), 420, { origin: '12px 13px' }),
      },
    },
  }),

  /** Pastel: las velitas titilan a destiempo, como las de verdad. */
  cake: icon('cake', {
    default: {
      shapes: {
        6: track(burst(), 420),
        7: track(burst(), 420, { delay: 110 }),
        8: track(burst(), 420, { delay: 220 }),
      },
    },
  }),

  /** Prohibido: primero el círculo, luego el tajo. */
  ban: icon('ban', {
    default: {
      shapes: {
        0: track(strokeDraw(), 450),
        1: track(strokeDraw(), 280, { delay: 300 }),
      },
    },
  }),

  /** Arroba: se traza la espiral desde afuera. */
  'at-sign': icon('at-sign', {
    default: {
      shapes: {
        1: track(strokeDraw(), 500),
        0: track(strokeDraw(), 400, { delay: 220 }),
      },
    },
  }),

  /** Salir: la flecha se va por la puerta. */
  'log-out': icon('log-out', {
    default: {
      shapes: {
        0: track(moveXSeq([0, 2.5, 0]), 550),
        1: track(moveXSeq([0, 2.5, 0]), 550),
      },
    },
  }),

  /** Filtrar: el embudo se comprime y suelta. */
  funnel: icon('funnel', {
    default: {
      root: track(
        [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.88)' }, { transform: 'scaleY(1)' }],
        500,
        {
          origin: 'top center',
        },
      ),
    },
  }),

  // ── 3ª tanda: el resto de lo que la app usa a diario ──────────────────────

  /** Electro: el trazo ES la animación, y lento a propósito para que se lea el pulso. */
  activity: icon('activity', {
    default: { autoDraw: { speed: 45 } },
  }),

  /** Despertador sonando: campanas y patas se sacuden juntas. */
  'alarm-clock': icon('alarm-clock', {
    default: {
      root: track(rotateSeq([0, -8, 7, -5, 3, 0]), 600, { origin: 'center' }),
    },
  }),

  /** Ventana: los tres puntos de la barra de título se encienden en orden. */
  'app-window': icon('app-window', {
    default: {
      shapes: {
        1: track(burst(), 380),
        2: track(burst(), 380, { delay: 80 }),
        3: track(burst(), 380, { delay: 160 }),
      },
    },
  }),

  /** Verificado: la insignia late y la palomita entra después. */
  'badge-check': icon('badge-check', {
    default: {
      shapes: {
        0: track(scaleSeq([1, 1.08, 1]), 450, { origin: '12px 12px' }),
        1: track(strokeDraw(), 380, { delay: 220 }),
      },
    },
  }),

  'chevron-down': icon('chevron-down', { default: held(moveYSeq([0, 3]), 320) }),
  'chevron-left': icon('chevron-left', { default: held(moveXSeq([0, -3]), 320) }),
  'chevron-up': icon('chevron-up', { default: held(moveYSeq([0, -3]), 320) }),

  /** Ordenar: las dos flechas se separan — el gesto de "esto se puede mover". */
  'chevrons-up-down': icon('chevrons-up-down', {
    default: {
      shapes: {
        0: track(moveYSeq([0, -1.5, 0]), 500),
        1: track(moveYSeq([0, 1.5, 0]), 500),
      },
    },
  }),

  /** Agregar: el círculo se traza y la cruz aparece dentro. */
  'circle-plus': icon('circle-plus', {
    default: {
      shapes: {
        0: track(strokeDraw(), 450),
        1: track(burst(), 350, { delay: 260 }),
        2: track(burst(), 350, { delay: 320 }),
      },
    },
  }),

  /** Ayuda: el signo de interrogación llega al final, que es lo que se mira. */
  'circle-question-mark': icon('circle-question-mark', {
    default: {
      shapes: {
        0: track(strokeDraw(), 450),
        1: track(burst(), 380, { delay: 260 }),
        2: track(burst(), 380, { delay: 380 }),
      },
    },
  }),

  /** Revisado: la palomita se dibuja sobre la tabla. */
  'clipboard-check': icon('clipboard-check', {
    default: { shapes: { 2: track(strokeDraw(), 420, { delay: 150 }) } },
  }),

  /** Contacto: la cabeza asoma. */
  contact: icon('contact', {
    default: { shapes: { 3: track(moveYSeq([0, -1.2, 0]), 500) } },
  }),

  /** Procesador trabajando: pulso eléctrico, no un rebote mecánico. */
  cpu: icon('cpu', {
    default: {
      shapes: {
        12: track([{ opacity: '1' }, { opacity: '0.4' }, { opacity: '1' }], 700),
        13: track([{ opacity: '1' }, { opacity: '0.4' }, { opacity: '1' }], 700, { delay: 150 }),
      },
    },
  }),

  /** Pasar la tarjeta. */
  'credit-card': icon('credit-card', {
    default: {
      root: track(moveXSeq([0, 2.5, 0]), 600),
      shapes: { 1: track(strokeDraw(), 400, { delay: 150 }) },
    },
  }),

  /** Base de datos: los discos se asientan de arriba hacia abajo. */
  database: icon('database', {
    default: {
      shapes: {
        0: track(moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT }),
        1: track(moveYSeq([-1.5, 0]), 450, { delay: 90, easing: SPRING_OUT }),
        2: track(moveYSeq([-1.5, 0]), 450, { delay: 180, easing: SPRING_OUT }),
      },
    },
  }),

  /** Los tres puntitos de "cargando", en orden izquierda → derecha (índices 2, 0, 1). */
  ellipsis: icon('ellipsis', {
    default: {
      shapes: {
        2: track(moveYSeq([0, -2, 0]), 500),
        0: track(moveYSeq([0, -2, 0]), 500, { delay: 120 }),
        1: track(moveYSeq([0, -2, 0]), 500, { delay: 240 }),
      },
    },
  }),

  /** Archivo validado. */
  'file-check': icon('file-check', {
    default: { shapes: { 2: track(strokeDraw(), 400, { delay: 180 }) } },
  }),

  /** Archivo rechazado: la equis se tacha en dos tiempos. */
  'file-x': icon('file-x', {
    default: {
      shapes: {
        2: track(strokeDraw(), 260, { delay: 180 }),
        3: track(strokeDraw(), 260, { delay: 300 }),
      },
    },
  }),

  /** Fork: del nodo de abajo brotan las dos ramas. */
  'git-fork': icon('git-fork', {
    default: {
      shapes: {
        0: track(scaleSeq([1, 1.15, 1]), 400, { origin: '12px 18px' }),
        1: track(burst(), 420, { delay: 200 }),
        2: track(burst(), 420, { delay: 280 }),
      },
    },
  }),

  /** El birrete que se avienta al aire. */
  'graduation-cap': icon('graduation-cap', {
    default: {
      root: track(
        [
          { transform: 'translateY(0) rotate(0deg)' },
          { transform: 'translateY(-3px) rotate(-10deg)' },
          { transform: 'translateY(0) rotate(0deg)' },
        ],
        650,
        { easing: SPRING_OUT, origin: 'center' },
      ),
    },
  }),

  /** Disco duro leyendo: el foquito parpadea. */
  'hard-drive': icon('hard-drive', {
    default: {
      shapes: { 2: track([{ opacity: '1' }, { opacity: '0.25' }, { opacity: '1' }], 500) },
    },
  }),

  /** Credencial: la foto asoma. */
  'id-card': icon('id-card', {
    default: { shapes: { 3: track(moveYSeq([0, -1.2, 0]), 500) } },
  }),

  /** Bandeja de entrada: algo cae adentro. */
  inbox: icon('inbox', {
    default: { shapes: { 0: track(moveYSeq([-2.5, 0]), 500, { easing: SPRING_OUT }) } },
  }),

  /** Teclado: las teclas se pulsan en cascada. Es "escribiendo", no "teclado bonito". */
  keyboard: icon('keyboard', {
    default: {
      shapes: {
        0: track(burst(), 300),
        1: track(burst(), 300, { delay: 45 }),
        2: track(burst(), 300, { delay: 90 }),
        3: track(burst(), 300, { delay: 135 }),
        4: track(burst(), 300, { delay: 180 }),
        5: track(burst(), 300, { delay: 225 }),
        6: track(burst(), 300, { delay: 270 }),
        7: track(burst(), 300, { delay: 315 }),
      },
    },
  }),

  /** Banco: las columnas se levantan una por una. */
  landmark: icon('landmark', {
    default: {
      shapes: {
        1: track(moveYSeq([2, 0]), 420, { easing: SPRING_OUT }),
        2: track(moveYSeq([2, 0]), 420, { delay: 80, easing: SPRING_OUT }),
        3: track(moveYSeq([2, 0]), 420, { delay: 160, easing: SPRING_OUT }),
      },
    },
  }),

  /** Idiomas: se traza, que es lo que hace un alfabeto. */
  languages: icon('languages', {
    default: { autoDraw: { speed: 60 } },
  }),

  /** Laptop abriéndose. */
  laptop: icon('laptop', {
    default: {
      shapes: {
        0: track([{ transform: 'scaleY(0.85)' }, { transform: 'scaleY(1)' }], 450, {
          easing: SPRING_OUT,
          origin: '12px 16px',
        }),
      },
    },
  }),

  /** Capas separándose: la de arriba sube, la de abajo baja. */
  layers: icon('layers', {
    default: {
      shapes: {
        0: track(moveYSeq([0, -1.8, 0]), 550),
        2: track(moveYSeq([0, 1.2, 0]), 550),
      },
    },
  }),

  /** Tablero armándose, tarjeta por tarjeta. */
  'layout-dashboard': icon('layout-dashboard', {
    default: {
      shapes: {
        0: track(burst(), 350),
        1: track(burst(), 350, { delay: 80 }),
        2: track(burst(), 350, { delay: 160 }),
        3: track(burst(), 350, { delay: 240 }),
      },
    },
  }),

  /** Igual que el tablero pero en diagonal. */
  'layout-grid': icon('layout-grid', {
    default: {
      shapes: {
        0: track(burst(), 350),
        1: track(burst(), 350, { delay: 70 }),
        2: track(burst(), 350, { delay: 140 }),
        3: track(burst(), 350, { delay: 210 }),
      },
    },
  }),

  /** Libros que se acomodan. */
  library: icon('library', {
    default: {
      shapes: {
        0: track(rotateSeq([0, -6, 0]), 500, { origin: 'bottom left' }),
        1: track(rotateSeq([0, 5, 0]), 500, { delay: 90, origin: 'bottom left' }),
      },
    },
  }),

  /** Los dos eslabones se juntan. */
  link: icon('link', {
    default: {
      shapes: {
        0: track(moveXSeq([0, 1.2, 0]), 500),
        1: track(moveXSeq([0, -1.2, 0]), 500),
      },
    },
  }),

  'link-2': icon('link-2', {
    default: {
      shapes: {
        0: track(moveXSeq([0, 1.2, 0]), 500),
        1: track(moveXSeq([0, -1.2, 0]), 500),
      },
    },
  }),

  /** Desligar: los eslabones se separan y las chispitas saltan. */
  unlink: icon('unlink', {
    default: {
      shapes: {
        0: track(moveXSeq([0, -2, 0]), 550),
        1: track(moveXSeq([0, 2, 0]), 550),
        2: track(burst(), 380, { delay: 200 }),
        3: track(burst(), 380, { delay: 240 }),
        4: track(burst(), 380, { delay: 280 }),
        5: track(burst(), 380, { delay: 320 }),
      },
    },
  }),

  /** Lista: las viñetas caen en orden. */
  list: icon('list', {
    default: {
      shapes: {
        3: track(burst(), 320),
        4: track(burst(), 320, { delay: 90 }),
        5: track(burst(), 320, { delay: 180 }),
      },
    },
  }),

  /** Pendientes que se van palomeando. */
  'list-checks': icon('list-checks', {
    default: {
      shapes: {
        0: track(strokeDraw(), 300),
        1: track(strokeDraw(), 300, { delay: 160 }),
      },
    },
  }),

  minus: icon('minus', {
    default: {
      root: track(scaleSeq([1, 1.25, 1]), 400, { easing: SPRING_OUT, origin: 'center' }),
    },
  }),

  /** Red: los nodos se conectan de arriba hacia abajo. */
  network: icon('network', {
    default: {
      shapes: {
        0: track(burst(), 350),
        1: track(burst(), 350, { delay: 140 }),
        2: track(burst(), 350, { delay: 200 }),
      },
    },
  }),

  /** Paleta: los colores aparecen uno por uno. */
  palette: icon('palette', {
    default: {
      shapes: {
        1: track(burst(), 380),
        2: track(burst(), 380, { delay: 80 }),
        3: track(burst(), 380, { delay: 160 }),
        4: track(burst(), 380, { delay: 240 }),
      },
    },
  }),

  /** Play: el empujón de arrancar. */
  play: icon('play', {
    default: {
      root: track(
        [
          { transform: 'scale(1) translateX(0)' },
          { transform: 'scale(1.15) translateX(1px)' },
          { transform: 'scale(1) translateX(0)' },
        ],
        420,
        { easing: SPRING_OUT, origin: 'center' },
      ),
    },
  }),

  /** Escaneo: las esquinas primero, luego los módulos. */
  'qr-code': icon('qr-code', {
    default: {
      shapes: {
        0: track(burst(), 320),
        1: track(burst(), 320, { delay: 70 }),
        2: track(burst(), 320, { delay: 140 }),
        3: track(burst(), 300, { delay: 220 }),
        4: track(burst(), 300, { delay: 260 }),
        5: track(burst(), 300, { delay: 300 }),
        6: track(burst(), 300, { delay: 340 }),
        7: track(burst(), 300, { delay: 380 }),
      },
    },
  }),

  /** Pergamino desenrollándose. */
  'scroll-text': icon('scroll-text', {
    default: {
      root: track([{ transform: 'scaleY(0.85)' }, { transform: 'scaleY(1)' }], 500, {
        easing: SPRING_OUT,
        origin: 'top center',
      }),
    },
  }),

  /** Servidor: los indicadores parpadean desfasados. */
  server: icon('server', {
    default: {
      shapes: {
        2: track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 550),
        3: track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 550, { delay: 180 }),
      },
    },
  }),

  shield: icon('shield', {
    default: {
      root: track(scaleSeq([1, 1.1, 1]), 480, { easing: SPRING_OUT, origin: 'center' }),
    },
  }),

  /** Escudo con alerta: late y el signo aparece. */
  'shield-alert': icon('shield-alert', {
    default: {
      root: track(rotateSeq([0, -5, 4, 0]), 550, { origin: 'center' }),
      shapes: {
        1: track(burst(), 380, { delay: 200 }),
        2: track(burst(), 380, { delay: 300 }),
      },
    },
  }),

  /** Protección apagada: el tajo cae al final. */
  'shield-off': icon('shield-off', {
    default: { shapes: { 2: track(strokeDraw(), 380, { delay: 220 }) } },
  }),

  /** Bolsa colgando que se mece desde las asas. */
  'shopping-bag': icon('shopping-bag', {
    default: {
      root: track(rotateSeq([0, 5, -4, 2, 0]), 700, { origin: 'top center' }),
    },
  }),

  /** Etiqueta que pende de su ojal. */
  tag: icon('tag', {
    default: {
      root: track(rotateSeq([0, 8, -6, 3, 0]), 700, { origin: '7.5px 7.5px' }),
    },
  }),

  warehouse: icon('warehouse', {
    default: {
      root: track(moveYSeq([-2, 0]), 500, { easing: SPRING_OUT }),
    },
  }),

  /** Flujo: nodo → conexión → nodo. En ese orden, que es de lo que trata un flujo. */
  workflow: icon('workflow', {
    default: {
      shapes: {
        0: track(burst(), 350),
        1: track(strokeDraw(), 400, { delay: 220 }),
        2: track(burst(), 350, { delay: 480 }),
      },
    },
  }),

  /** Acercar: la lente late y el signo aparece. */
  'zoom-in': icon('zoom-in', {
    default: {
      shapes: {
        0: track(scaleSeq([1, 1.1, 1]), 450, { origin: '11px 11px' }),
        2: track(burst(), 320, { delay: 180 }),
        3: track(burst(), 320, { delay: 220 }),
      },
    },
  }),

  'zoom-out': icon('zoom-out', {
    default: {
      shapes: {
        0: track(scaleSeq([1, 0.9, 1]), 450, { origin: '11px 11px' }),
        2: track(burst(), 320, { delay: 180 }),
      },
    },
  }),

  /** Favorito: gira y crece de un golpe. */
  star: icon('star', {
    default: {
      root: track(
        [
          { transform: 'rotate(0deg) scale(1)' },
          { transform: 'rotate(36deg) scale(1.2)' },
          { transform: 'rotate(0deg) scale(1)' },
        ],
        600,
        { easing: SPRING_OUT, origin: 'center' },
      ),
    },
  }),

  // ── 4ª tanda: cobertura total del inventario ──────────────────────────────
  // Nombres CANÓNICOS de Lucide. Los que la app escribe distinto entran por `ICON_ALIASES`.

  /** Cámara que barre la escena. */
  cctv: icon('cctv', {
    default: { root: track(rotateSeq([0, -10, 8, 0]), 750, { origin: 'center' }) },
  }),

  'arrow-right': icon('arrow-right', { default: held(moveXSeq([0, 3]), 320) }),

  /** Gráfica: las barras crecen desde su base, de la más alta a la más baja. */
  'chart-column': icon('chart-column', {
    default: {
      shapes: {
        2: track([{ transform: 'scaleY(0.15)' }, { transform: 'scaleY(1)' }], 500, {
          easing: SPRING_OUT,
          origin: '0px 17px',
        }),
        1: track([{ transform: 'scaleY(0.15)' }, { transform: 'scaleY(1)' }], 500, {
          delay: 90,
          easing: SPRING_OUT,
          origin: '0px 17px',
        }),
        3: track([{ transform: 'scaleY(0.15)' }, { transform: 'scaleY(1)' }], 500, {
          delay: 180,
          easing: SPRING_OUT,
          origin: '0px 17px',
        }),
      },
    },
  }),

  /** Edificio: las ventanas se van prendiendo. */
  building: icon('building', {
    default: {
      shapes: {
        1: track(burst(), 350),
        2: track(burst(), 350, { delay: 70 }),
        3: track(burst(), 350, { delay: 140 }),
        4: track(burst(), 350, { delay: 210 }),
        5: track(burst(), 350, { delay: 280 }),
      },
    },
  }),

  'building-2': icon('building-2', {
    default: {
      shapes: {
        1: track(burst(), 350),
        2: track(burst(), 350, { delay: 90 }),
        3: track(burst(), 350, { delay: 180 }),
      },
    },
  }),

  /** Cable: se traza como lo que es, un tendido. */
  cable: icon('cable', { default: { autoDraw: { speed: 55 } } }),

  circle: icon('circle', {
    default: { root: track(scaleSeq([1, 1.15, 1]), 450, { origin: 'center' }) },
  }),

  command: icon('command', {
    default: { root: track(scaleSeq([1, 1.12, 1]), 420, { easing: SPRING_OUT, origin: 'center' }) },
  }),

  /** Editar: la pluma recorre su trazo sobre la hoja. */
  'square-pen': icon('square-pen', {
    default: {
      shapes: {
        1: track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.5px, -1.5px)' },
            { transform: 'translate(-1px, 1px)' },
            { transform: 'translate(0, 0)' },
          ],
          700,
        ),
      },
    },
  }),

  pen: icon('pen', {
    default: {
      root: track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(1.5px, -1.5px)' },
          { transform: 'translate(-1px, 1px)' },
          { transform: 'translate(0, 0)' },
        ],
        700,
      ),
    },
  }),

  /** La pluma escribe y el renglón aparece detrás de ella. */
  'pen-line': icon('pen-line', {
    default: {
      shapes: {
        0: track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.5px, -1.5px)' },
            { transform: 'translate(0, 0)' },
          ],
          600,
        ),
        1: track(strokeDraw(), 400, { delay: 200 }),
      },
    },
  }),

  file: icon('file', {
    default: { root: track(moveYSeq([-2, 0]), 480, { easing: SPRING_OUT }) },
  }),

  'file-check-corner': icon('file-check-corner', {
    default: { shapes: { 2: track(strokeDraw(), 400, { delay: 180 }) } },
  }),

  /** Hoja de cálculo: las celdas se llenan en cascada. */
  'file-spreadsheet': icon('file-spreadsheet', {
    default: {
      shapes: {
        3: track(burst(), 300, { delay: 60 }),
        4: track(burst(), 300, { delay: 140 }),
        5: track(burst(), 300, { delay: 220 }),
      },
    },
  }),

  'file-badge': icon('file-badge', {
    default: { shapes: { 3: track(burst(), 420, { delay: 150 }) } },
    /** Los renglones se hunden distinto y el sello se aprieta después: el papel cede, el sello sella. */
    chida: {
      shapes: {
        1: track(moveYSeq([0, 1.95, 0]), 500),
        2: track(moveYSeq([0, 0.45, 0]), 500),
        3: track(scaleSeq([1, 0.95, 1]), 420, { delay: 150 }),
      },
    },
  }),

  'file-exclamation-point': icon('file-exclamation-point', {
    default: {
      root: track(rotateSeq([0, -4, 3, 0]), 550),
      shapes: { 2: track(burst(), 380, { delay: 200 }) },
    },
  }),

  /** Voltear horizontal: se voltea de verdad (scaleX negativo), no se sacude. */
  'square-centerline-dashed-horizontal': icon('square-centerline-dashed-horizontal', {
    default: {
      root: track(
        [{ transform: 'scaleX(1)' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(1)' }],
        900,
        { origin: 'center' },
      ),
    },
  }),

  'square-centerline-dashed-vertical': icon('square-centerline-dashed-vertical', {
    default: {
      root: track(
        [{ transform: 'scaleY(1)' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(1)' }],
        900,
        { origin: 'center' },
      ),
    },
  }),

  /** Agarradera: los puntos se cimbran por filas — invita a arrastrar. */
  'grip-vertical': icon('grip-vertical', {
    default: {
      shapes: {
        1: track(moveXSeq([0, 1.2, 0]), 450),
        4: track(moveXSeq([0, 1.2, 0]), 450),
        0: track(moveXSeq([0, 1.2, 0]), 450, { delay: 90 }),
        3: track(moveXSeq([0, 1.2, 0]), 450, { delay: 90 }),
        2: track(moveXSeq([0, 1.2, 0]), 450, { delay: 180 }),
        5: track(moveXSeq([0, 1.2, 0]), 450, { delay: 180 }),
      },
    },
  }),

  hash: icon('hash', {
    default: {
      shapes: {
        0: track(moveXSeq([0, 1, 0]), 450),
        1: track(moveXSeq([0, -1, 0]), 450),
        2: track(moveYSeq([0, 1, 0]), 450, { delay: 80 }),
        3: track(moveYSeq([0, -1, 0]), 450, { delay: 80 }),
      },
    },
  }),

  house: icon('house', {
    default: { root: track(moveYSeq([-2.5, 0]), 500, { easing: SPRING_OUT }) },
  }),

  /** Foto: sale el sol y luego el paisaje. */
  image: icon('image', {
    default: {
      shapes: {
        1: track(burst(), 400, { delay: 100 }),
        2: track(strokeDraw(), 450, { delay: 220 }),
      },
    },
  }),

  /** Sin imagen: el tajo cae al final. */
  'image-off': icon('image-off', {
    default: { shapes: { 0: track(strokeDraw(), 400, { delay: 220 }) } },
  }),

  /** Menú de tres puntos, de arriba hacia abajo (índices 1, 0, 2). */
  'ellipsis-vertical': icon('ellipsis-vertical', {
    default: {
      shapes: {
        1: track(moveXSeq([0, 1.5, 0]), 450),
        0: track(moveXSeq([0, 1.5, 0]), 450, { delay: 110 }),
        2: track(moveXSeq([0, 1.5, 0]), 450, { delay: 220 }),
      },
    },
  }),

  mouse: icon('mouse', {
    default: { root: track(moveYSeq([0, 1.5, 0]), 420, { easing: SPRING_OUT }) },
  }),

  /** Navegación: se lanza hacia adelante. */
  navigation: icon('navigation', {
    default: {
      root: track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(2px, -2px)' },
          { transform: 'translate(0, 0)' },
        ],
        550,
        { easing: SPRING_OUT },
      ),
    },
  }),

  /** Buscar en paquetería: la lupa late sobre la caja. */
  'package-search': icon('package-search', {
    default: { shapes: { 5: track(scaleSeq([1, 1.2, 1]), 500, { origin: '18.5px 16.5px' }) } },
  }),

  /** Imprimiendo: la hoja sale. */
  printer: icon('printer', {
    default: { shapes: { 2: track(moveYSeq([-2.5, 0]), 550, { easing: SPRING_OUT }) } },
  }),

  'rotate-cw': icon('rotate-cw', {
    default: { root: track(rotateSeq([0, 360]), 800, { easing: SPRING_OUT, origin: 'center' }) },
  }),

  /** Router: la señal sale del aparato hacia afuera. */
  router: icon('router', {
    default: {
      shapes: {
        4: track(burst(), 400, { delay: 100 }),
        5: track(burst(), 400, { delay: 220 }),
      },
    },
  }),

  tablet: icon('tablet', {
    default: { root: track(rotateSeq([0, -3, 3, -2, 2, 0]), 450) },
  }),

  triangle: icon('triangle', {
    default: { root: track(scaleSeq([1, 1.12, 1]), 450, { easing: SPRING_OUT, origin: 'center' }) },
  }),

  /** Tele encendiéndose: parpadeo de tubo. */
  tv: icon('tv', {
    default: {
      shapes: {
        1: track(
          [
            { opacity: '1' },
            { opacity: '0.3' },
            { opacity: '1' },
            { opacity: '0.6' },
            { opacity: '1' },
          ],
          600,
        ),
      },
    },
  }),

  /** Subir a la nube: la flecha se va para arriba. */
  'cloud-upload': icon('cloud-upload', {
    default: { shapes: { 2: track(moveYSeq([0, -2, 0]), 550) } },
  }),

  /** Usuario validado: la palomita se dibuja al final. */
  'user-check': icon('user-check', {
    default: {
      shapes: {
        2: track(moveYSeq([0, -1, 0]), 450),
        0: track(strokeDraw(), 400, { delay: 200 }),
      },
    },
  }),

  'user-minus': icon('user-minus', {
    default: {
      shapes: {
        1: track(moveYSeq([0, -1, 0]), 450),
        2: track(burst(), 380, { delay: 180 }),
      },
    },
  }),

  'user-plus': icon('user-plus', {
    default: {
      shapes: {
        1: track(moveYSeq([0, -1, 0]), 450),
        2: track(burst(), 380, { delay: 180 }),
        3: track(burst(), 380, { delay: 240 }),
      },
    },
  }),

  'user-x': icon('user-x', {
    default: {
      shapes: {
        1: track(moveYSeq([0, -1, 0]), 450),
        2: track(strokeDraw(), 260, { delay: 200 }),
        3: track(strokeDraw(), 260, { delay: 300 }),
      },
    },
  }),

  /**
   * Configurar usuario: la cabeza asoma y el engrane late. Los índices NO son intercambiables —
   * 10 es la cabeza (9,7) y 9 el engrane (18,15); al revés, la cabeza escala respecto a un pivote
   * que le queda a media figura de distancia y sale volando.
   */
  'user-cog': icon('user-cog', {
    default: {
      shapes: {
        10: track(moveYSeq([0, -1, 0]), 450),
        9: track(scaleSeq([1, 1.15, 1]), 500, { delay: 150, origin: '18px 15px' }),
      },
    },
  }),

  /** Wifi conectando: del punto hacia afuera, arco por arco. */
  wifi: icon('wifi', {
    default: {
      shapes: {
        0: track(burst(), 320),
        3: track(burst(), 380, { delay: 130 }),
        2: track(burst(), 380, { delay: 260 }),
        1: track(burst(), 380, { delay: 390 }),
      },
    },
  }),

  type: icon('type', { default: { autoDraw: { speed: 60 } } }),

  webhook: icon('webhook', { default: { autoDraw: { speed: 55 } } }),

  /** Encender: el arco se traza y el botón prende. */
  power: icon('power', {
    default: {
      shapes: {
        1: track(strokeDraw(), 500),
        0: track(burst(), 380, { delay: 280 }),
      },
    },
  }),

  /** Llaves que se abren. */
  braces: icon('braces', {
    default: {
      shapes: {
        0: track(moveXSeq([0, -1.5, 0]), 500),
        1: track(moveXSeq([0, 1.5, 0]), 500),
      },
    },
  }),

  /** Panel: el divisor se desliza. */
  'panel-left': icon('panel-left', {
    default: { shapes: { 1: track(moveXSeq([0, 2, 0]), 500) } },
  }),

  /** Cerrar panel: la flecha empuja hacia la izquierda y se sostiene. */
  'panel-left-close': icon('panel-left-close', {
    // `reverseOnLeave` aplica a TODA la coreografía, no solo al root: por eso basta con el track
    // de la flecha, sin un root vacío de relleno.
    default: {
      shapes: {
        2: track(moveXSeq([0, -2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  }),

  /** Fecha confirmada: las anillas rebotan y la palomita se dibuja. */
  'calendar-check': icon('calendar-check', {
    default: {
      shapes: {
        0: track(moveYSeq([0, -1.5, 0]), 500),
        1: track(moveYSeq([0, -1.5, 0]), 500, { delay: 90 }),
        4: track(strokeDraw(), 400, { delay: 260 }),
      },
    },
  }),

  /** Fecha con hora: el reloj late después de las anillas. */
  'calendar-clock': icon('calendar-clock', {
    default: {
      shapes: {
        0: track(moveYSeq([0, -1.5, 0]), 500),
        1: track(moveYSeq([0, -1.5, 0]), 500, { delay: 90 }),
        5: track(scaleSeq([1, 1.15, 1]), 500, { delay: 220, origin: '16px 16px' }),
      },
    },
  }),

  /** Los días se van llenando, renglón por renglón. */
  'calendar-days': icon('calendar-days', {
    default: {
      shapes: {
        4: track(burst(), 280, { delay: 60 }),
        5: track(burst(), 280, { delay: 110 }),
        6: track(burst(), 280, { delay: 160 }),
        7: track(burst(), 280, { delay: 240 }),
        8: track(burst(), 280, { delay: 290 }),
        9: track(burst(), 280, { delay: 340 }),
      },
    },
  }),

  /** Mapa desdoblándose. */
  map: icon('map', {
    default: {
      root: track([{ transform: 'scaleX(0.88)' }, { transform: 'scaleX(1)' }], 500, {
        easing: SPRING_OUT,
        origin: 'center',
      }),
    },
  }),

  facebook: icon('facebook', {
    default: { root: track(scaleSeq([1, 1.12, 1]), 420, { easing: SPRING_OUT, origin: 'center' }) },
  }),

  /** Instagram: el lente late y el flash destella. */
  instagram: icon('instagram', {
    default: {
      shapes: {
        1: track(scaleSeq([1, 1.12, 1]), 450, { origin: '12px 12px' }),
        2: track(burst(), 350, { delay: 200 }),
      },
    },
  }),

  linkedin: icon('linkedin', {
    default: {
      shapes: {
        0: track(burst(), 380),
        1: track(burst(), 380, { delay: 100 }),
        2: track(burst(), 380, { delay: 180 }),
      },
    },
  }),

  /** El pájaro alza el vuelo. */
  twitter: icon('twitter', {
    default: {
      root: track(
        [
          { transform: 'translate(0, 0) rotate(0deg)' },
          { transform: 'translate(2px, -2px) rotate(-8deg)' },
          { transform: 'translate(0, 0) rotate(0deg)' },
        ],
        650,
        { easing: SPRING_OUT, origin: 'center' },
      ),
    },
  }),

  /**
   * Llave redonda girando sobre su anillo. Ojo: el anillo de ésta está ARRIBA A LA DERECHA, no
   * abajo a la izquierda como en `key` — con el pivote de la otra, la llave gira desde la punta.
   */
  'key-round': icon('key-round', {
    default: { root: track(rotateSeq([0, -20, 0]), 700, { origin: '16.5px 7.5px' }) },
  }),

  /** Infinito: lento a propósito, el chiste es ver el trazo completar el lazo. */
  infinity: icon('infinity', {
    default: { autoDraw: { speed: 38 } },
  }),

  square: icon('square', {
    default: { root: track(scaleSeq([1, 1.12, 1]), 420, { easing: SPRING_OUT, origin: 'center' }) },
  }),

  /** Volumen: las ondas salen del cono, de la chica a la grande. */
  'volume-2': icon('volume-2', {
    default: {
      shapes: {
        1: track(burst(), 380, { delay: 80 }),
        2: track(burst(), 380, { delay: 200 }),
      },
    },
  }),
};

/** Nombres disponibles — útil para catálogos/demos sin exponer el registro completo. */
export const ANIMATED_ICON_NAMES = Object.keys(ANIMATED_ICONS);

/**
 * Nombres VIEJOS de Lucide que la app sigue usando en sus templates. Lucide los renombró y
 * `lucide-angular` los resuelve por alias, pero este registro guarda el nombre nuevo — sin este
 * mapa, `<app-animated-icon name="alert-triangle">` no pintaría nada y nadie sabría por qué.
 *
 * Solo van renombramientos REALES (mismo glifo). Si el dibujo cambió, no es alias: es otro icono.
 */
export const ICON_ALIASES: Record<string, string> = {
  'alert-triangle': 'triangle-alert',
  'alert-circle': 'circle-alert',
  'check-circle': 'circle-check',
  'x-circle': 'circle-x',
  'help-circle': 'circle-question-mark',
  'plus-circle': 'circle-plus',
  'more-horizontal': 'ellipsis',
  'loader-2': 'loader-circle',
  filter: 'funnel',
  // Renombramientos que trae esta versión de Lucide y que la app aún escribe a la antigua.
  'bar-chart-3': 'chart-column',
  edit: 'square-pen',
  'edit-2': 'pen',
  'edit-3': 'pen-line',
  'file-check-2': 'file-check-corner',
  'file-warning': 'file-exclamation-point',
  'flip-horizontal': 'square-centerline-dashed-horizontal',
  'flip-vertical': 'square-centerline-dashed-vertical',
  home: 'house',
  'more-vertical': 'ellipsis-vertical',
  'upload-cloud': 'cloud-upload',
};

/** Resuelve alias → nombre canónico del registro. */
export function resolveIconName(name: string): string {
  return ICON_ALIASES[name] ?? name;
}
