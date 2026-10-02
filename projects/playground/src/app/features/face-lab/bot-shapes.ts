/**
 * Las siluetas de los bots, sin cara. Es la MISMA geometría del prototipo de Glyph Bots (el motor
 * `createBot`, que hoy vive fuera del repo): mismos `d`, mismas paletas, mismo `faceY`. Aquí se
 * trae solo lo que la cara necesita saber de la forma — el contorno, dónde está su "frente" y su
 * color —, no el motor 3D ni las rutinas.
 *
 * SIN Angular a propósito: son datos y funciones puras, así que se prueban en Node y se
 * prerenderizan sin `window`.
 */

export type ShapeId =
  'huevo' | 'circulo' | 'cubo' | 'pildora' | 'robot' | 'gota' | 'fantasma' | 'gato';

export type PaletteId =
  | 'lavanda'
  | 'caramelo'
  | 'cielo'
  | 'menta'
  | 'agua'
  | 'niebla'
  | 'mandarina'
  | 'coral'
  | 'acero'
  | 'ambar';

/** Claro → medio → sombra. El cuerpo se pinta con los tres. */
export type Palette = readonly [string, string, string];

export interface BotShape {
  /** Contorno en un viewBox de 200×200. */
  readonly d: string;
  /** Color propio de la forma cuando el control de color está en «auto». */
  readonly palette: PaletteId;
  /** Altura de la línea de los ojos, en unidades del viewBox. */
  readonly faceY: number;
  /** Techo de la silueta (lo usa la antena del robot). */
  readonly top: number;
  readonly skin?: 'cat' | 'robot';
}

export const PALETTES: Record<PaletteId, Palette> = {
  lavanda: ['#D6CBFF', '#7C5CFF', '#33228F'],
  caramelo: ['#F8CF98', '#D9784A', '#8A3A22'],
  cielo: ['#C4E4FF', '#3E8BFF', '#13398F'],
  menta: ['#B8F7DD', '#1FBF8F', '#08594A'],
  agua: ['#C2FBFF', '#1FC3E6', '#0A557A'],
  niebla: ['#FFFFFF', '#DAD7EC', '#8581A6'],
  mandarina: ['#FFD9AD', '#FF8A3D', '#9C3A07'],
  coral: ['#FFC0A8', '#F2542D', '#8C220C'],
  acero: ['#FBFAFF', '#D9D5E8', '#8C86A6'],
  ambar: ['#FFE3A3', '#F5A524', '#8A4F00'],
};

/** Mezcla lineal de dos `#rrggbb`. `t = 0` → `a`, `t = 1` → `b`. */
export function mixHex(a: string, b: string, t: number): string {
  const canal = (hex: string, i: number) => parseInt(hex.slice(1 + i, 3 + i), 16);
  return (
    '#' +
    [0, 2, 4]
      .map((i) =>
        Math.round(canal(a, i) * (1 - t) + canal(b, i) * t)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  );
}

/** Cubo muy redondeado: lados apenas convexos, la base más redonda que el techo. */
function squircle(
  cx: number,
  cy: number,
  a: number,
  b: number,
  nTop: number,
  nBot: number,
): string {
  const N = 72;
  const pts: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const n = s > 0 ? nBot : nTop;
    pts.push([
      cx + a * Math.sign(c) * Math.pow(Math.abs(c), 2 / n),
      cy + b * Math.sign(s) * Math.pow(Math.abs(s), 2 / n),
    ]);
  }
  // Catmull-Rom → Bézier cúbicas: contorno liso, sin facetas.
  const P = (k: number) => pts[(k + N) % N];
  const f = (n: number) => n.toFixed(2);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < N; i++) {
    const [p0, p1, p2, p3] = [P(i - 1), P(i), P(i + 1), P(i + 2)];
    d +=
      ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)}` +
      ` ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + ' Z';
}

/** La sábana del fantasma, con su onda de abajo. */
function ghost(a = 9): string {
  let d = 'M44 108 C44 72 70 48 100 48 C130 48 156 72 156 108 V164';
  const xs = [156, 137, 119, 100, 81, 63, 44];
  for (let i = 1; i < xs.length; i++)
    d += ` Q${(xs[i - 1] + xs[i]) / 2} ${164 + (i % 2 ? 1 : -1) * a} ${xs[i]} 164`;
  return d + ' Z';
}

const CUBO = squircle(100, 112, 61, 59, 3.4, 3);

export const BOT_SHAPES: Record<ShapeId, BotShape> = {
  huevo: {
    palette: 'lavanda',
    faceY: 106,
    top: 44,
    d: 'M101 44 C137 44 165 68 165.5 103 C166 137 147 171.5 100 172 C54 172 34 138 35 103 C36 68 65 44 101 44 Z',
  },
  circulo: {
    palette: 'caramelo',
    faceY: 113,
    top: 58,
    d: 'M100 58 C141 57 170.5 79 171 115 C171.5 147 146 172 100 172 C54 172 29 147 29.5 115 C30 79 59 58.5 100 58 Z',
  },
  cubo: { palette: 'cielo', faceY: 110, top: 53, d: CUBO },
  pildora: {
    palette: 'menta',
    faceY: 104,
    top: 40,
    d: 'M100 40 A45 45 0 0 1 145 85 V127 A45 45 0 0 1 55 127 V85 A45 45 0 0 1 100 40 Z',
  },
  // El robot toma el cuerpo del cubo y le pone visor y antena.
  robot: { palette: 'acero', faceY: 110, top: 53, d: CUBO, skin: 'robot' },
  gota: {
    palette: 'agua',
    faceY: 126,
    top: 36,
    d: 'M100 36 C116 64 160 92 160 128 C160 158 134 176 100 176 C66 176 40 158 40 128 C40 92 84 64 100 36 Z',
  },
  fantasma: { palette: 'niebla', faceY: 100, top: 48, d: ghost() },
  gato: {
    palette: 'mandarina',
    faceY: 114,
    top: 62,
    d: 'M36 118 A64 56 0 1 0 164 118 A64 56 0 1 0 36 118 Z',
    skin: 'cat',
  },
};

/** El orden en que se comparan. Es el mismo del selector de formas del prototipo. */
export const SHAPE_ORDER: readonly ShapeId[] = [
  'huevo',
  'circulo',
  'cubo',
  'pildora',
  'robot',
  'gota',
  'fantasma',
  'gato',
];

/** Oreja del gato, de frente: `x, y` es su base. */
export function catEar(x: number, y: number, fill: string): string {
  return `<path d="M${x - 16} ${y + 6} Q${x - 9} ${y - 16} ${x - 2} ${y - 30} Q${x + 2} ${y - 34} ${x + 6} ${y - 28} Q${x + 13} ${y - 12} ${x + 16} ${y + 6} Z" fill="${fill}"/>`;
}

export function catEarInner(x: number, y: number): string {
  return `<path d="M${x - 8} ${y - 2} Q${x - 4} ${y - 13} ${x + 1} ${y - 23} Q${x + 6} ${y - 12} ${x + 8} ${y - 2} Z" fill="#FF8FAE" opacity=".6"/>`;
}

/** El visor del robot: la zona oscura donde vive su cara. */
export const ROBOT_VISOR = { x: 52, w: 96, h: 52, rx: 25 } as const;
