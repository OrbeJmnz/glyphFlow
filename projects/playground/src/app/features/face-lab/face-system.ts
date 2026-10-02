import {
  BOT_SHAPES,
  PALETTES,
  ROBOT_VISOR,
  catEar,
  catEarInner,
  mixHex,
  type PaletteId,
  type ShapeId,
} from './bot-shapes';

/**
 * El sistema facial del Face Lab, en tres piezas que no se conocen entre sí:
 *
 *     Shape (bot-shapes.ts)  +  FaceStyle (una receta)  +  Expression (qué hace cada ojo)
 *
 * Un solo dibujador (`renderBot`) lee la receta y la expresión y pinta sobre cualquier silueta.
 * Las 12 variantes son DATOS más un «pintor de ojo» cada una: la expresión decide el ESTADO del
 * ojo (abierto, feliz, cerrado, concentrado…) y el pintor decide cómo se ve ese estado en su
 * lenguaje. Así ninguna variante es una copia de otra con distinto color, y ninguna sabe en qué
 * forma está: lo único que una forma aporta es su contorno, su `faceY` y —para 10 Adaptive— sus
 * métricas medidas (`ShapeMetrics`).
 *
 * SIN Angular y sin DOM: el string que sale se prerenderiza igual en el servidor y en el navegador.
 */

export type FaceStyleId =
  | 'ethereal'
  | 'flat'
  | 'line'
  | 'pastel'
  | 'solid'
  | 'neu'
  | 'vibrant'
  | 'mask'
  | 'gel'
  | 'adaptive'
  | 'dark'
  | 'system';

export type ExpressionId =
  | 'neutral'
  | 'happy'
  | 'surprised'
  | 'wink'
  | 'thinking'
  | 'sad'
  | 'working'
  | 'success'
  | 'error'
  | 'sleeping';

/** El tema de la UI donde se pinta el bot. No es el del sitio: el lab prueba los dos. */
export type FaceTheme = 'light' | 'dark';

/** `sm` = 48 px o menos: se quitan los detalles finos y se engrosan los trazos. */
export type FaceLod = 'sm' | 'lg';

type EyeState = 'open' | 'wide' | 'happy' | 'wink' | 'closed' | 'think' | 'focus' | 'sad' | 'worry';
type MouthType =
  | 'dot'
  | 'dash'
  | 'soft'
  | 'smile'
  | 'o'
  | 'side'
  | 'tilde'
  | 'frown'
  | 'flat'
  | 'grin'
  | 'wavy'
  | 'sleep';
type FxKind = 'dots' | 'spark' | 'sweat' | 'z';
type BodyMode = 'std' | 'flat' | 'pastel' | 'neu' | 'vibrant' | 'dark';

/**
 * Cómo dibuja cada variante un ojo ABIERTO. Los estados cerrados (feliz, guiño, dormido) son
 * trazos curvos compartidos, salvo en las variantes de trazo, que los resuelven a su manera.
 */
type EyeKind =
  | 'haze'
  | 'dome'
  | 'stroke'
  | 'bead'
  | 'disc'
  | 'well'
  | 'slab'
  | 'pill'
  | 'lens'
  | 'slit'
  | 'notch';

/** Los tokens de color de una cara. Salen al SVG como `--face-*`. */
export interface FaceTokens {
  readonly primary: string;
  readonly secondary?: string;
  readonly accent: string;
  readonly glow: string;
  readonly opacity: number;
  readonly mask?: string;
  readonly cheek?: string;
}

export interface FaceStyle {
  readonly id: FaceStyleId;
  readonly n: string;
  readonly name: string;
  readonly eye: EyeKind;
  /** Ojo abierto (ancho × alto), media distancia entre ojos, boca, trazo, grosor de ojo cerrado. */
  readonly w: number;
  readonly h: number;
  readonly ex: number;
  readonly mouthW: number;
  readonly sw: number;
  readonly arc: number;
  /** La boca en reposo y la feliz: es donde más se nota el carácter de cada lenguaje. */
  readonly rest: MouthType;
  readonly joy: MouthType;
  /** Boca rellena (manchas) o de trazo (líneas). */
  readonly mouthFill?: boolean;
  /** Cómo se trata el cuerpo. Es parte de la hipótesis: Pastel o Vibrant no existen sin su cuerpo. */
  readonly body: BodyMode;
  /** Tokens para UI clara, UI oscura y el visor (siempre oscuro) del robot. */
  readonly tok: Readonly<Record<FaceTheme | 'visor', FaceTokens>>;
  /** Happy SIN cerrar los ojos: los aplasta hacia arriba (02 Flat, como pide su boceto). */
  readonly happyOpen?: boolean;
  readonly cheeks?: boolean;
  readonly accentMap?: boolean;
  readonly ambient?: boolean;
  readonly mask?: boolean;
  readonly adaptive?: boolean;
}

interface Expression {
  readonly L: EyeState;
  readonly R: EyeState;
  /** `rest` / `joy` = la boca de reposo o la feliz de cada variante. */
  readonly mouth: MouthType | 'rest' | 'joy';
  readonly look?: readonly [number, number];
  readonly fx?: FxKind;
}

export const EXPRESSIONS: Readonly<Record<ExpressionId, Expression>> = {
  neutral: { L: 'open', R: 'open', mouth: 'rest' },
  happy: { L: 'happy', R: 'happy', mouth: 'joy' },
  surprised: { L: 'wide', R: 'wide', mouth: 'o' },
  wink: { L: 'open', R: 'wink', mouth: 'joy' },
  thinking: { L: 'open', R: 'think', mouth: 'side', look: [3, -3], fx: 'dots' },
  sad: { L: 'sad', R: 'sad', mouth: 'frown', look: [0, 1.5] },
  working: { L: 'focus', R: 'focus', mouth: 'flat', look: [0, 1.5] },
  success: { L: 'happy', R: 'happy', mouth: 'grin', fx: 'spark' },
  error: { L: 'worry', R: 'worry', mouth: 'wavy', fx: 'sweat' },
  sleeping: { L: 'closed', R: 'closed', mouth: 'sleep', fx: 'z' },
};

export const EXPRESSION_ORDER = Object.keys(EXPRESSIONS) as ExpressionId[];

/** Un solo acento por expresión (05 Solid). Las demás expresiones no llevan ninguno. */
const ACCENT: Partial<Record<ExpressionId, string>> = {
  happy: '#FF5FA2',
  working: '#2EC8F0',
  success: '#22C57E',
  error: '#FF6F5E',
};

const tinta = (primary: string, visor: string, darkPrimary = primary): FaceStyle['tok'] => ({
  light: { primary, accent: primary, glow: 'transparent', opacity: 1 },
  dark: { primary: darkPrimary, accent: darkPrimary, glow: 'transparent', opacity: 1 },
  visor: { primary: visor, accent: visor, glow: 'transparent', opacity: 1 },
});

/*
 * Las 12 hipótesis. Cada una responde una pregunta distinta:
 *
 *   01 ¿y si la cara casi no tuviera borde?          07 ¿y si el cuerpo lleva el color y la cara no?
 *   02 ¿qué es lo mínimo que sigue leyéndose?        08 ¿y si la cara vive en una zona propia?
 *   03 ¿y si la cara fuera un glifo más?              09 ¿y si la cara estuviera DEBAJO de la piel?
 *   04 ¿cuánto calor aguanta sin volverse kawaii?     10 ¿y si la cara leyera la silueta?
 *   05 ¿y si el color fuera un solo acento?           11 ¿y si la cara fuera luz y no tinta?
 *   06 ¿y si la cara estuviera tallada?               12 ¿qué necesita una cara para ser SISTEMA?
 */
export const FACE_STYLES: readonly FaceStyle[] = [
  {
    // Ojos sin contorno: un degradado que se apaga hacia el borde, con un núcleo de luz arriba.
    id: 'ethereal',
    n: '01',
    name: 'Ethereal',
    eye: 'haze',
    w: 9,
    h: 17,
    ex: 18,
    mouthW: 7,
    sw: 2,
    arc: 3.6,
    rest: 'dash',
    joy: 'soft',
    body: 'std',
    tok: {
      light: {
        primary: '#271C80',
        secondary: '#5446C8',
        accent: '#B4A8FF',
        glow: '#FFFFFF',
        opacity: 0.88,
      },
      dark: {
        primary: '#211876',
        secondary: '#4E40BE',
        accent: '#C0B5FF',
        glow: '#EEEAFF',
        opacity: 0.9,
      },
      visor: {
        primary: '#D5CDFF',
        secondary: '#8B7CFF',
        accent: '#B9ADFF',
        glow: '#8B7CFF',
        opacity: 0.95,
      },
    },
  },
  {
    // Ojos en «D»: techo redondo, base plana. Feliz sin cerrarlos: se aplastan hacia arriba.
    id: 'flat',
    n: '02',
    name: 'Flat',
    eye: 'dome',
    w: 12,
    h: 17,
    ex: 19,
    mouthW: 11,
    sw: 3.4,
    arc: 5,
    rest: 'dot',
    joy: 'smile',
    mouthFill: true,
    body: 'flat',
    happyOpen: true,
    tok: tinta('#1D1930', '#EEF0FF', '#15112A'),
  },
  {
    // Un glifo: trazos de un solo grosor y puntas redondas, como los iconos de la librería.
    id: 'line',
    n: '03',
    name: 'Line',
    eye: 'stroke',
    w: 4,
    h: 15,
    ex: 18,
    mouthW: 12,
    sw: 3.4,
    arc: 3.4,
    rest: 'dash',
    joy: 'smile',
    body: 'std',
    tok: tinta('#262048', '#9FF3FF', '#1F1A40'),
  },
  {
    // Ojos casi redondos con DOS reflejos diminutos; mejillas bajas y apenas visibles.
    id: 'pastel',
    n: '04',
    name: 'Pastel',
    eye: 'bead',
    w: 12,
    h: 13,
    ex: 19,
    mouthW: 8,
    sw: 2.4,
    arc: 4.2,
    rest: 'soft',
    joy: 'smile',
    body: 'pastel',
    cheeks: true,
    tok: {
      light: {
        primary: '#2A2440',
        accent: '#2A2440',
        cheek: '#FF8DBD',
        glow: 'transparent',
        opacity: 1,
      },
      dark: {
        primary: '#221C38',
        accent: '#221C38',
        cheek: '#FF8DBD',
        glow: 'transparent',
        opacity: 1,
      },
      visor: {
        primary: '#F3F0FF',
        accent: '#F3F0FF',
        cheek: '#FF8DBD',
        glow: 'transparent',
        opacity: 1,
      },
    },
  },
  {
    // Discos índigo, perfectos. El color entra SOLO como una pieza gráfica que cambia por expresión.
    id: 'solid',
    n: '05',
    name: 'Solid',
    eye: 'disc',
    w: 13,
    h: 13,
    ex: 19,
    mouthW: 11,
    sw: 3.2,
    arc: 4.8,
    rest: 'soft',
    joy: 'smile',
    body: 'std',
    accentMap: true,
    tok: tinta('#211A6B', '#E4E0FF', '#1B155E'),
  },
  {
    // Cuencas talladas en el material (sombra arriba, filo de luz abajo) y la pupila adentro.
    id: 'neu',
    n: '06',
    name: 'Neumorphic',
    eye: 'well',
    w: 13,
    h: 15,
    ex: 20,
    mouthW: 11,
    sw: 3,
    arc: 4.4,
    rest: 'flat',
    joy: 'smile',
    body: 'neu',
    tok: {
      light: { primary: '#37315A', accent: '#37315A', glow: '#FFFFFF', opacity: 1 },
      dark: { primary: '#211C3A', accent: '#211C3A', glow: '#FFFFFF', opacity: 1 },
      visor: { primary: '#DCD8F0', accent: '#DCD8F0', glow: '#FFFFFF', opacity: 1 },
    },
  },
  {
    // Losas: rectángulos altos, casi cuadrados de esquina, de contraste máximo.
    id: 'vibrant',
    n: '07',
    name: 'Vibrant',
    eye: 'slab',
    w: 10.5,
    h: 17,
    ex: 19,
    mouthW: 10,
    sw: 3.6,
    arc: 5,
    rest: 'flat',
    joy: 'smile',
    body: 'vibrant',
    ambient: true,
    tok: tinta('#120F26', '#FFFFFF', '#0D0A20'),
  },
  {
    // Un arco grueso y abierto (no un rectángulo) cruza la cara: dentro viven ojos y boca.
    id: 'mask',
    n: '08',
    name: 'Mask',
    eye: 'pill',
    w: 7.5,
    h: 12,
    ex: 15,
    mouthW: 8,
    sw: 2.4,
    arc: 3.6,
    rest: 'soft',
    joy: 'smile',
    body: 'std',
    mask: true,
    tok: {
      light: {
        primary: '#F1EEFF',
        accent: '#9FF3FF',
        mask: '#1C1741',
        glow: '#FFFFFF',
        opacity: 1,
      },
      dark: { primary: '#E8E4FF', accent: '#9FF3FF', mask: '#13102D', glow: '#FFFFFF', opacity: 1 },
      visor: {
        primary: '#EEEBFF',
        accent: '#9FF3FF',
        mask: '#1D1842',
        glow: '#FFFFFF',
        opacity: 1,
      },
    },
  },
  {
    // Cada ojo lleva su propia lente de silicona encima: se ve el ojo, y la piel sobre él.
    id: 'gel',
    n: '09',
    name: 'Gel',
    eye: 'lens',
    w: 10,
    h: 13,
    ex: 19,
    mouthW: 9,
    sw: 2.6,
    arc: 4.2,
    rest: 'soft',
    joy: 'smile',
    body: 'std',
    tok: {
      light: { primary: '#231D4C', accent: '#231D4C', glow: '#FFFFFF', opacity: 0.86 },
      dark: { primary: '#1C1742', accent: '#1C1742', glow: '#DAD4FF', opacity: 0.88 },
      visor: { primary: '#DCD5FF', accent: '#DCD5FF', glow: '#8B7CFF', opacity: 0.92 },
    },
  },
  {
    // Cápsulas que se estiran, separan, bajan e INCLINAN según la silueta medida.
    id: 'adaptive',
    n: '10',
    name: 'Adaptive',
    eye: 'pill',
    w: 11,
    h: 16,
    ex: 20,
    mouthW: 10,
    sw: 2.8,
    arc: 4.6,
    rest: 'soft',
    joy: 'smile',
    body: 'std',
    adaptive: true,
    tok: tinta('#1C1834', '#F0EEFF', '#16122C'),
  },
  {
    // Rendijas de luz: un ojo lavanda y otro cian, con un halo que no llega a neón.
    id: 'dark',
    n: '11',
    name: 'Dark',
    eye: 'slit',
    w: 5.5,
    h: 16,
    ex: 17,
    mouthW: 9,
    sw: 2.2,
    arc: 3.6,
    rest: 'dash',
    joy: 'soft',
    body: 'dark',
    tok: {
      light: {
        primary: '#8B7CFF',
        secondary: '#70E7FF',
        accent: '#70E7FF',
        glow: '#8B7CFF',
        opacity: 1,
      },
      dark: {
        primary: '#8B7CFF',
        secondary: '#70E7FF',
        accent: '#70E7FF',
        glow: '#8B7CFF',
        opacity: 1,
      },
      visor: {
        primary: '#8B7CFF',
        secondary: '#70E7FF',
        accent: '#70E7FF',
        glow: '#8B7CFF',
        opacity: 1,
      },
    },
  },
  {
    // Cápsula con UN rasgo propio: la esquina interior de arriba cortada en diagonal, como el corte
    // de un glifo. Nada más: sin mejillas, sin brillos, sin color extra.
    id: 'system',
    n: '12',
    name: 'System',
    eye: 'notch',
    w: 11,
    h: 17,
    ex: 18,
    mouthW: 9,
    sw: 2.8,
    arc: 4.6,
    rest: 'soft',
    joy: 'smile',
    body: 'std',
    tok: tinta('#1A1636', '#F2F0FF', '#15112E'),
  },
];

export const FACE_BY_ID = Object.fromEntries(FACE_STYLES.map((v) => [v.id, v])) as Record<
  FaceStyleId,
  FaceStyle
>;

export interface ShapeMetrics {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly bandTop: number;
  readonly centroid: number;
  readonly rows: readonly (readonly [number, number])[];
}

export function widthAt(m: ShapeMetrics, y: number): number {
  let best = m.rows[0];
  for (const r of m.rows) if (Math.abs(r[0] - y) < Math.abs(best[0] - y)) best = r;
  return best[1];
}

/** Métricas desde filas (y, ancho). Pura: la medición con DOM vive en `shape-metrics.ts`. */
export function metricsFromRows(
  rows: readonly (readonly [number, number])[],
  box: { x: number; y: number; w: number; h: number },
): ShapeMetrics {
  const maxW = Math.max(...rows.map((r) => r[1]));
  const bandTop = (rows.find((r) => r[1] >= maxW * 0.96) ?? rows[0])[0];
  const area = rows.reduce((s, r) => s + r[1], 0);
  const centroid = rows.reduce((s, r) => s + r[0] * r[1], 0) / area;
  return { ...box, bandTop, centroid, rows };
}

interface Layout {
  fx: number;
  fy: number;
  ew: number;
  eh: number;
  ex: number;
  mGap: number;
  /** Inclinación de los ojos en grados (solo 10 Adaptive): siguen cómo se abre o se cierra la silueta. */
  tilt: number;
  robot: boolean;
}

/** Dónde va la cara. Fijo para todas las variantes, CALCULADO para 10 Adaptive. */
function layout(v: FaceStyle, key: ShapeId, lod: FaceLod, m: ShapeMetrics | undefined): Layout {
  const sh = BOT_SHAPES[key];
  const robot = sh.skin === 'robot';
  let fy = sh.faceY;
  let ew = v.w;
  let eh = v.h;
  let ex = v.ex;
  let mGap = 8.5;
  let tilt = 0;
  if (v.adaptive) {
    if (robot) {
      ex = 19;
      eh = 15;
      ew = 11;
    } else if (m) {
      const aspect = m.h / m.w;
      ew = v.w * (1.12 - 0.5 * (aspect - 1)); // forma ancha → ojos más anchos
      eh = v.h * (0.92 + 0.6 * (aspect - 1)); // forma alta → ojos más verticales
      fy = 0.5 * m.bandTop + 0.5 * m.centroid; // la cara baja hacia donde está la masa
      ex = Math.max(13, Math.min(27, widthAt(m, fy) * 0.19)); // la separación sigue el ancho real
      // Si la silueta se abre hacia abajo (gota), los ojos se inclinan hacia adentro arriba.
      tilt = Math.max(-9, Math.min(9, (widthAt(m, fy + 14) - widthAt(m, fy - 14)) * 0.3));
      mGap = 6 + m.h * 0.02;
    }
  }
  if (robot) eh = Math.min(eh, 17);
  if (lod === 'sm') {
    ew *= 1.7;
    eh *= 1.4;
    ex *= 1.18;
  }
  return { fx: 100, fy, ew, eh, ex, mGap, tilt, robot };
}

const f = (n: number) => +n.toFixed(2);
const cap = (cx: number, cy: number, w: number, h: number, a = '', rx = Math.min(w, h) / 2) =>
  `<rect x="${f(cx - w / 2)}" y="${f(cy - h / 2)}" width="${f(w)}" height="${f(h)}" rx="${f(rx)}" ${a}/>`;
const oval = (cx: number, cy: number, w: number, h: number, a = '') =>
  `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(w / 2)}" ry="${f(h / 2)}" ${a}/>`;
/** `d < 0` = ∩ (feliz), `d > 0` = ∪ (cerrado). */
const arc = (cx: number, cy: number, w: number, d: number, a = '') =>
  `<path d="M${f(cx - w / 2)} ${f(cy)} Q${f(cx)} ${f(cy + d * 2)} ${f(cx + w / 2)} ${f(cy)}" fill="none" stroke-linecap="round" ${a}/>`;
const line = (x1: number, y1: number, x2: number, y2: number, a = '') =>
  `<path d="M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}" fill="none" stroke-linecap="round" ${a}/>`;

/** El «D» de 02 Flat: techo redondo, base plana. */
function dome(cx: number, cy: number, w: number, h: number, a: string): string {
  const r = w / 2;
  const top = cy - h / 2;
  const bot = cy + h / 2;
  const k = Math.min(1.6, h / 6);
  return `<path d="M${f(cx - r)} ${f(bot - k)} V${f(top + r)} A${f(r)} ${f(r)} 0 0 1 ${f(cx + r)} ${f(top + r)} V${f(bot - k)} Q${f(cx + r)} ${f(bot)} ${f(cx + r - k)} ${f(bot)} H${f(cx - r + k)} Q${f(cx - r)} ${f(bot)} ${f(cx - r)} ${f(bot - k)} Z" ${a}/>`;
}

/** La cápsula de 12 System, con la esquina interior de arriba cortada en diagonal. */
function notch(cx: number, cy: number, w: number, h: number, side: -1 | 1, a: string): string {
  const r = w / 2;
  const top = cy - h / 2;
  const bot = cy + h / 2;
  const s = side > 0 ? 0 : 1; // sentido de los arcos: el ojo derecho y el izquierdo son espejo
  const xo = cx + side * r; // lado de afuera
  const xi = cx - side * r; // lado de adentro, el del corte
  if (h <= w + 1) return oval(cx, cy, w, h, a); // aplastado (concentrado) ya no cabe el corte
  return `<path d="M${f(xo)} ${f(top + r)} A${f(r)} ${f(r)} 0 0 ${s} ${f(cx)} ${f(top)} L${f(xi)} ${f(top + r * 1.55)} V${f(bot - r)} A${f(r)} ${f(r)} 0 0 ${s} ${f(xo)} ${f(bot - r)} Z" ${a}/>`;
}

interface EyeParts {
  /** Lo que no parpadea: cuencas, halos. */
  under?: string;
  /** Lo que parpadea. */
  g: string;
  /** Lo que queda ENCIMA del ojo y tampoco parpadea: la lente de 09 Gel. */
  over?: string;
}

const wrap = (p: EyeParts, open: boolean, tilt = 0, cx = 0, cy = 0) =>
  `<g class="fl-eye"${open ? ' data-open=""' : ''}${tilt ? ` transform="rotate(${f(tilt)} ${f(cx)} ${f(cy)})"` : ''}>${p.under ?? ''}<g class="fl-blink">${p.g}</g>${p.over ?? ''}</g>`;

interface Ctx {
  v: FaceStyle;
  c: Layout;
  u: string;
  sm: boolean;
  theme: FaceTheme;
}

/** El color de un ojo. 11 Dark es el único que usa uno distinto por lado. */
const eyeColor = (v: FaceStyle, side: -1 | 1) =>
  v.eye === 'slit' && side > 0 ? 'var(--face-secondary)' : 'var(--face-primary)';

/** Pinta el ojo ABIERTO de cada lenguaje, al tamaño que la expresión le pida. */
function paintOpen(x: Ctx, cx: number, cy: number, w: number, h: number, side: -1 | 1): EyeParts {
  const { v, u, sm } = x;
  const fill = `style="fill:${eyeColor(v, side)}"`;
  switch (v.eye) {
    case 'haze':
      if (sm) return { g: oval(cx, cy, w, h, fill) };
      return {
        g:
          oval(cx, cy, w * 1.4, h * 1.25, `fill="url(#${u}-haze)"`) +
          oval(
            cx,
            cy - h * 0.22,
            w * 0.36,
            h * 0.24,
            'style="fill:var(--face-glow)" opacity=".55"',
          ),
      };
    case 'dome':
      return { g: dome(cx, cy, w, h, fill) };
    case 'bead':
      return {
        g:
          oval(cx, cy, w, h, fill) +
          (sm
            ? ''
            : `<circle class="fl-spec" cx="${f(cx + w * 0.2)}" cy="${f(cy - h * 0.2)}" r="${f(Math.min(w, h) * 0.17)}" fill="#fff" opacity=".92"/>` +
              `<circle class="fl-spec" cx="${f(cx - w * 0.2)}" cy="${f(cy + h * 0.2)}" r="${f(Math.min(w, h) * 0.08)}" fill="#fff" opacity=".55"/>`),
      };
    case 'disc':
      return { g: oval(cx, cy, w, h, fill) };
    case 'well':
      if (sm) return { g: oval(cx, cy, w, h, fill) };
      return {
        under:
          oval(
            cx,
            cy,
            w * 1.55,
            h * 1.4,
            `fill="#000" opacity="${x.theme === 'dark' ? 0.2 : 0.1}" filter="url(#${u}-inset)"`,
          ) +
          arc(
            cx,
            cy + h * 0.5,
            w * 1.2,
            h * 0.14,
            'stroke="#fff" stroke-opacity=".55" stroke-width="1.3"',
          ),
        g: oval(cx, cy + h * 0.06, w * 0.82, h * 0.82, fill),
      };
    case 'slab':
      return { g: cap(cx, cy, w, h, fill, Math.min(w, h) * 0.26) };
    case 'lens':
      return {
        g: `<g filter="url(#${u}-gelblur)" opacity=".85">${oval(cx, cy, w, h, fill)}</g>`,
        over: sm
          ? ''
          : oval(
              cx,
              cy - h * 0.05,
              w * 1.9,
              h * 1.55,
              `fill="url(#${u}-lens)" stroke="#fff" stroke-opacity=".72" stroke-width="1"`,
            ) +
            `<path d="M${f(cx - w * 0.62)} ${f(cy - h * 0.25)} Q${f(cx - w * 0.3)} ${f(cy - h * 0.72)} ${f(cx + w * 0.2)} ${f(cy - h * 0.66)}" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="1.6" stroke-linecap="round"/>`,
      };
    case 'slit':
      return {
        under: sm
          ? ''
          : cap(
              cx,
              cy,
              w * 2.4,
              h * 1.15,
              `style="fill:${eyeColor(v, side)}" opacity=".32" filter="url(#${u}-halo)"`,
            ),
        g: cap(cx, cy, w, h, fill),
      };
    case 'notch':
      return { g: notch(cx, cy, w, h, side, fill) };
    case 'pill':
    case 'stroke':
      return { g: cap(cx, cy, w, h, fill) };
  }
}

/** Un ojo: un estado × un lenguaje. */
function eye(x: Ctx, st: EyeState, side: -1 | 1): string {
  const { v, c, u, sm } = x;
  const { ew, eh } = c;
  const cx = c.fx + side * c.ex;
  const cy = c.fy;
  const arcW = v.arc * (sm ? 1.7 : 1);
  const sw = v.sw * (sm ? 1.9 : 1);
  const tilt = side * -c.tilt;
  const stroke = (w: number) => `style="stroke:${eyeColor(v, side)}" stroke-width="${f(w)}"`;

  if (v.eye === 'stroke') {
    // 03 Line: todo es trazo; la expresión deforma el trazo.
    const L = eh / 2;
    let g: string;
    if (st === 'open') g = line(cx, cy - L, cx, cy + L, stroke(sw));
    else if (st === 'wide')
      g = `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(eh * 0.34)}" fill="none" ${stroke(sw)}/>`;
    else if (st === 'happy' || st === 'wink') g = arc(cx, cy + 2, eh * 0.9, -eh * 0.28, stroke(sw));
    else if (st === 'closed') g = arc(cx, cy, eh * 0.9, eh * 0.2, stroke(sw));
    else if (st === 'think')
      g = line(cx - eh * 0.4, cy - 2, cx + eh * 0.4, cy - 2, stroke(sw)); // «— |»
    else if (st === 'focus') g = line(cx - eh * 0.4, cy + 2, cx + eh * 0.4, cy + 2, stroke(sw));
    else if (st === 'sad')
      g =
        line(
          cx - side * eh * 0.35,
          cy - L * 0.75,
          cx + side * eh * 0.35,
          cy - L * 0.2,
          stroke(sw),
        ) + line(cx, cy - L * 0.2, cx, cy + L * 0.8, stroke(sw));
    else
      g =
        line(cx, cy - L * 0.45, cx, cy + L * 0.7, stroke(sw)) +
        line(
          cx - side * eh * 0.3,
          cy - L * 1.25,
          cx + side * eh * 0.3,
          cy - L * 1.5,
          stroke(sw * 0.8),
        );
    return wrap({ g }, st === 'open' || st === 'think');
  }

  // Estados cerrados: un trazo curvo en el color del ojo. 02 Flat es feliz SIN cerrarlos.
  if (st === 'wink' || st === 'closed' || (st === 'happy' && !v.happyOpen)) {
    const g =
      st === 'closed'
        ? arc(cx, cy + eh * 0.05, ew * 1.35, eh * 0.18, stroke(arcW))
        : arc(cx, cy + eh * 0.12, ew * 1.35, -eh * 0.3, stroke(arcW));
    return wrap({ g }, false, tilt, cx, cy);
  }

  // Estados abiertos: el mismo pintor con otras medidas.
  const medidas: Record<
    'open' | 'wide' | 'think' | 'focus' | 'happy' | 'sad' | 'worry',
    [number, number, number]
  > = {
    open: [1, 1, 0],
    wide: [1.14, 1.14, 0],
    think: [0.9, 0.8, 0.08],
    focus: [1.05, 0.58, 0.2],
    happy: [1.04, 0.62, -0.12], // solo 02 Flat llega aquí
    sad: [0.96, 0.92, 0.05],
    worry: [0.96, 0.92, 0.05],
  };
  const [kw, kh, kdy] = medidas[st];
  const p = paintOpen(x, cx, cy + eh * kdy, ew * kw, eh * kh, side);
  if (st === 'sad' || st === 'worry') {
    // Un párpado inclinado recorta la esquina de afuera (triste) o apenas la de adentro (preocupado).
    const sad = st === 'sad';
    const top = cy - eh / 2 - 2;
    const id = `${u}-lid${side}`;
    const y1 = top + eh * (sad ? 0.05 : 0.2);
    const y2 = top + eh * (sad ? 0.55 : 0.3);
    const [yl, yr] = side < 0 ? [sad ? y2 : y1, sad ? y1 : y2] : [sad ? y1 : y2, sad ? y2 : y1];
    p.g =
      `<clipPath id="${id}"><path d="M${f(cx - ew * 1.2)} ${f(yl)} L${f(cx + ew * 1.2)} ${f(yr)} V${f(cy + eh)} H${f(cx - ew * 1.2)} Z"/></clipPath>` +
      `<g clip-path="url(#${id})">${p.g}</g>`;
  }
  return wrap(p, true, tilt, cx, cy);
}

function mouth(x: Ctx, type: MouthType): string {
  const { v, c, sm } = x;
  const w = v.mouthW * (sm ? 1.25 : 1);
  const sw = v.sw * (sm ? 1.9 : 1);
  const cx = c.fx;
  const y = c.fy + c.eh / 2 + c.mGap + (sm ? 1 : 0);
  const col = 'var(--face-primary)';
  const st = `style="stroke:${col}" stroke-width="${f(sw)}"`;
  const fl = `style="fill:${col}"`;
  const trazo = v.eye === 'stroke' || v.eye === 'slit';
  switch (type) {
    case 'dot':
      return `<circle cx="${cx}" cy="${f(y + 1)}" r="${f(w * 0.17)}" ${fl}/>`;
    case 'dash':
      return line(cx - w * 0.34, y + 1, cx + w * 0.34, y + 1, st);
    case 'soft':
      return arc(cx, y, w * 0.85, w * 0.13, st);
    case 'smile':
      return arc(cx, y, w * 1.05, w * 0.24, st);
    case 'o':
      return trazo
        ? `<ellipse cx="${cx}" cy="${f(y + 2)}" rx="${f(w * 0.28)}" ry="${f(w * 0.34)}" fill="none" ${st}/>`
        : `<ellipse cx="${cx}" cy="${f(y + 2)}" rx="${f(w * 0.27)}" ry="${f(w * 0.34)}" ${fl}/>`;
    case 'side':
      return trazo ? mouth(x, 'tilde') : line(cx + 1, y + 1.5, cx + w * 0.55, y, st);
    case 'tilde':
      return `<path d="M${f(cx - w * 0.45)} ${f(y + 1)} q${f(w * 0.22)} -3 ${f(w * 0.45)} 0 t${f(w * 0.45)} 0" fill="none" stroke-linecap="round" ${st}/>`;
    case 'frown':
      return arc(cx, y + 3, w * 0.8, -w * 0.14, st);
    case 'flat':
      return line(cx - w * 0.28, y + 1, cx + w * 0.28, y + 1, st);
    case 'grin':
      return trazo || v.mouthFill === false
        ? arc(cx, y, w * 1.2, w * 0.3, st)
        : `<path d="M${f(cx - w * 0.55)} ${f(y - 1)} Q${cx} ${f(y - 2)} ${f(cx + w * 0.55)} ${f(y - 1)} Q${f(cx + w * 0.45)} ${f(y + w * 0.55)} ${cx} ${f(y + w * 0.55)} Q${f(cx - w * 0.45)} ${f(y + w * 0.55)} ${f(cx - w * 0.55)} ${f(y - 1)} Z" ${fl}/>`;
    case 'wavy':
      return `<path d="M${f(cx - w * 0.5)} ${f(y + 2)} q${f(w * 0.25)} -3 ${f(w * 0.5)} 0 t${f(w * 0.5)} 0" fill="none" stroke-linecap="round" ${st}/>`;
    case 'sleep':
      return `<ellipse cx="${cx}" cy="${f(y + 1)}" rx="${f(w * 0.14)}" ry="${f(w * 0.12)}" ${fl} opacity=".75"/>`;
  }
}

/** 05 Solid: la única pieza de color, distinta en cada expresión que la lleva. */
function accent(x: Ctx, expr: ExpressionId): string {
  const { c } = x;
  if (expr === 'happy')
    return `<circle class="fl-accent" cx="${f(c.fx + c.ex + c.ew * 0.2)}" cy="${f(c.fy + c.eh / 2 + 5)}" r="3.4" style="fill:var(--face-accent)"/>`;
  if (expr === 'working')
    return `<rect class="fl-accent" x="${f(c.fx - c.ex - c.ew / 2)}" y="${f(c.fy + c.eh / 2 + 2.5)}" width="${f(c.ex * 2 + c.ew)}" height="2.4" rx="1.2" style="fill:var(--face-accent)"/>`;
  return '';
}

/** Los efectos de cada expresión. Desaparecen en tamaños chicos. */
function fx(kind: FxKind, x: Ctx): string {
  const { c, v } = x;
  const px = f(c.fx + c.ex + c.ew / 2 + 10);
  const py = f(c.fy - c.eh / 2 - 14);
  const estrella = `M${px} ${py - 6} Q${px + 1} ${py - 1} ${px + 6} ${py} Q${px + 1} ${py + 1} ${px} ${py + 6} Q${px - 1} ${py + 1} ${px - 6} ${py} Q${px - 1} ${py - 1} ${px} ${py - 6} Z`;
  switch (kind) {
    case 'spark':
      return `<g class="fl-fx fl-spark" style="fill:var(--face-accent)"><path d="${estrella}"/><path transform="translate(${f(-2 * c.ex - 22)} 10) scale(.6)" transform-origin="${px} ${py}" d="${estrella}"/></g>`;
    case 'sweat':
      return `<path class="fl-fx fl-sweat" ${v.accentMap ? 'style="fill:var(--face-accent)"' : 'fill="#7CC8FF"'} d="M${px - 2} ${py + 2} q4 5 0 9 q-4 -4 0 -9 Z" opacity=".9"/>`;
    case 'z':
      return `<g class="fl-fx fl-z" fill="none" style="stroke:var(--face-primary)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity=".6"><path d="M${px - 2} ${py} h6 l-6 6 h6"/><path d="M${px + 6} ${py - 9} h4 l-4 4 h4" opacity=".7"/></g>`;
    case 'dots':
      return `<g class="fl-fx fl-dots" style="fill:var(--face-primary)" opacity=".55"><circle cx="${px - 4}" cy="${py + 4}" r="1.6"/><circle cx="${px + 1}" cy="${py - 1}" r="2.1"/><circle cx="${px + 7}" cy="${py - 7}" r="2.8"/></g>`;
  }
}

function bodyColors(
  key: ShapeId,
  pal: PaletteId | 'auto',
  mode: BodyMode,
  theme: FaceTheme,
): [string, string, string] {
  let [c1, c2, c3] = PALETTES[pal === 'auto' ? BOT_SHAPES[key].palette : pal];
  if (mode === 'pastel') {
    c1 = mixHex(c1, '#FFFFFF', 0.45);
    c2 = mixHex(c2, '#FFFFFF', 0.58);
    c3 = mixHex(c3, '#FFFFFF', 0.5);
  }
  if (mode === 'vibrant') {
    c1 = mixHex(c1, c2, 0.2);
    c3 = mixHex(c3, '#000000', 0.12);
  }
  if (mode === 'dark') {
    c1 = mixHex(c2, '#2A2548', 0.55);
    c2 = mixHex(c3, '#15122B', 0.45);
    c3 = mixHex(c3, '#05040C', 0.7);
  }
  if (mode === 'neu') {
    const b = mixHex(c1, c2, 0.4);
    c1 = mixHex(b, '#FFFFFF', 0.3);
    c2 = b;
    c3 = mixHex(b, c3, 0.3);
  }
  // En UI oscura el cuerpo baja el brillo sin invertir nada.
  if (theme === 'dark' && mode !== 'dark') {
    c1 = mixHex(c1, c2, 0.22);
    c3 = mixHex(c3, '#000000', 0.22);
  }
  return [c1, c2, c3];
}

interface BodyParts {
  defs: string;
  back: string;
  body: string;
}

function body(
  key: ShapeId,
  pal: PaletteId | 'auto',
  v: FaceStyle,
  theme: FaceTheme,
  u: string,
  lod: FaceLod,
  m: ShapeMetrics | undefined,
): BodyParts {
  const sh = BOT_SHAPES[key];
  const mode = v.body;
  const [c1, c2, c3] = bodyColors(key, pal, mode, theme);
  // Sin métricas (prerender) se usa una caja aproximada: solo mueve el halo y la sombra.
  const box = m ?? { x: 36, y: sh.top, w: 128, h: 172 - sh.top };
  let defs = '';
  let back = '';
  let b = '';
  if (mode === 'flat')
    defs += `<linearGradient id="${u}-body"><stop offset="0" stop-color="${mixHex(c1, c2, 0.55)}"/></linearGradient>`;
  else if (mode === 'neu')
    defs += `<linearGradient id="${u}-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset=".55" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></linearGradient>`;
  else if (mode === 'vibrant')
    defs += `<linearGradient id="${u}-body" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="${mixHex(c1, '#FFFFFF', 0.1)}"/><stop offset=".45" stop-color="${c2}"/><stop offset="1" stop-color="${mixHex(c3, '#FF3DA8', 0.35)}"/></linearGradient>`;
  else
    defs += `<radialGradient id="${u}-body" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="${c1}"/><stop offset=".55" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></radialGradient>`;
  defs += `<clipPath id="${u}-clip"><path d="${sh.d}"/></clipPath>`;
  defs += `<filter id="${u}-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>`;

  if (v.ambient && lod !== 'sm') {
    defs += `<filter id="${u}-amb" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>`;
    back += `<ellipse cx="100" cy="${f(box.y + box.h * 0.55)}" rx="${f(box.w * 0.62)}" ry="${f(box.h * 0.55)}" fill="${c2}" opacity="${theme === 'dark' ? 0.5 : 0.38}" filter="url(#${u}-amb)"/>`;
  }
  back += `<ellipse class="fl-shadow" cx="100" cy="${f(box.y + box.h + 7)}" rx="${f(box.w * 0.36)}" ry="5" fill="${theme === 'dark' ? '#000' : '#2A1F5C'}" opacity="${theme === 'dark' ? 0.45 : 0.16}"/>`;

  if (sh.skin === 'cat')
    for (const side of [-1, 1]) {
      const x = 100 + side * 36;
      b += catEar(x, 78, `url(#${u}-body)`) + (mode === 'flat' ? '' : catEarInner(x, 78));
    }
  if (sh.skin === 'robot') {
    const t = sh.top;
    b += `<rect x="95" y="${t - 3}" width="10" height="5" rx="2.5" fill="${mixHex(c2, c3, 0.5)}"/><path d="M100 ${t - 1} Q103.5 ${t - 8} 102.5 ${t - 15}" stroke="${mixHex(c2, c3, 0.6)}" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="102.5" cy="${t - 18}" r="4.2" fill="#7FE9FF"/>`;
  }
  b += `<path d="${sh.d}" fill="url(#${u}-body)"/>`;
  // Brillo superior suave. Flat y Neumorphic no lo llevan: es justo lo que exploran quitar.
  if (mode !== 'flat' && mode !== 'neu' && lod !== 'sm')
    b += `<g clip-path="url(#${u}-clip)"><ellipse cx="${f(100 - box.w * 0.16)}" cy="${f(box.y + box.h * 0.2)}" rx="${f(box.w * 0.26)}" ry="${f(box.h * 0.12)}" fill="#fff" opacity="${mode === 'dark' ? 0.07 : mode === 'pastel' ? 0.3 : 0.2}" filter="url(#${u}-soft)"/></g>`;
  if (mode === 'neu')
    b += `<path d="${sh.d}" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="2" clip-path="url(#${u}-clip)" transform="translate(-1.2 -1.2)"/>`;
  if (mode === 'dark')
    b += `<path d="${sh.d}" fill="none" stroke="${mixHex(c2, '#8B7CFF', 0.5)}" stroke-opacity=".5" stroke-width="1.4"/>`;
  if (sh.skin === 'robot') {
    const { x, w, h, rx } = ROBOT_VISOR;
    defs += `<linearGradient id="${u}-visor" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1B2244"/><stop offset="1" stop-color="#0E1229"/></linearGradient>`;
    b += `<rect x="${x}" y="${sh.faceY - h / 2}" width="${w}" height="${h}" rx="${rx}" fill="url(#${u}-visor)"/><rect x="${x + 6}" y="${sh.faceY - h / 2 + 3}" width="${w - 12}" height="10" rx="5" fill="#fff" opacity=".07"/>`;
  }
  return { defs, back, body: b };
}

export interface RenderOptions {
  readonly shape: ShapeId;
  readonly face: FaceStyleId;
  readonly expr: ExpressionId;
  readonly palette?: PaletteId | 'auto';
  readonly theme?: FaceTheme;
  readonly lod?: FaceLod;
  /** Prefijo único para los `id` de `<defs>`: dos SVG en la misma página no pueden compartirlos. */
  readonly uid: string;
}

/** Los tokens de color que recibe una cara, ya resueltos para su superficie. */
export function resolveTokens(
  v: FaceStyle,
  shape: ShapeId,
  theme: FaceTheme,
  expr: ExpressionId,
): FaceTokens {
  const surf = BOT_SHAPES[shape].skin === 'robot' ? 'visor' : theme;
  const t = v.tok[surf];
  const acento = v.accentMap ? ACCENT[expr] : undefined;
  return acento ? { ...t, accent: acento } : t;
}

/** El bot completo: Shape + FaceStyle + Expression → un `<svg>` autocontenido. */
export function renderBot(o: RenderOptions, m?: ShapeMetrics): string {
  const v = FACE_BY_ID[o.face];
  const E = EXPRESSIONS[o.expr];
  const theme = o.theme ?? 'light';
  const lod = o.lod ?? 'lg';
  const u = o.uid;
  const sm = lod === 'sm';
  const c = layout(v, o.shape, lod, m);
  const bd = body(o.shape, o.palette ?? 'auto', v, theme, u, lod, m);
  const T = resolveTokens(v, o.shape, theme, o.expr);
  const x: Ctx = { v, c, u, sm, theme };

  // Los tokens de la cara. Color y geometría salen de la receta; el SVG solo lee variables.
  const vars =
    `--face-primary:${T.primary};--face-secondary:${T.secondary ?? T.primary};--face-accent:${T.accent};` +
    `--face-glow:${T.glow};--face-opacity:${T.opacity};--face-eye-width:${f(c.ew)};--face-eye-height:${f(c.eh)};` +
    `--face-eye-gap:${f(c.ex * 2)};--face-mouth-width:${v.mouthW};--face-stroke-width:${v.sw}` +
    (T.mask ? `;--face-mask:${T.mask}` : '') +
    (T.cheek ? `;--face-cheek:${T.cheek}` : '');

  let defs = bd.defs;
  defs += `<filter id="${u}-feather" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation=".45"/></filter>`;
  if (v.eye === 'haze')
    defs += `<radialGradient id="${u}-haze"><stop offset="0" style="stop-color:var(--face-primary)"/><stop offset=".62" style="stop-color:var(--face-secondary)" stop-opacity=".85"/><stop offset="1" style="stop-color:var(--face-secondary)" stop-opacity="0"/></radialGradient>`;
  if (v.eye === 'well')
    defs += `<filter id="${u}-inset" x="-50%" y="-50%" width="200%" height="200%"><feOffset dy="1.6"/><feGaussianBlur stdDeviation="1.1" result="o"/><feComposite in="SourceAlpha" in2="o" operator="out" result="in"/><feFlood flood-color="#000" flood-opacity=".6"/><feComposite in2="in" operator="in" result="sh"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="sh"/></feMerge></filter>`;
  if (v.eye === 'lens') {
    defs += `<filter id="${u}-gelblur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation=".55"/></filter>`;
    defs += `<linearGradient id="${u}-lens" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".62"/><stop offset=".6" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#fff" stop-opacity=".22"/></linearGradient>`;
  }
  if (v.eye === 'slit')
    defs += `<filter id="${u}-halo" x="-100%" y="-60%" width="300%" height="220%"><feGaussianBlur stdDeviation="2.6"/></filter>`;

  const mouthY = c.fy + c.eh / 2 + c.mGap;
  let under = '';
  if (v.eye === 'haze' && !sm && !c.robot) {
    // 01: una bruma clara donde vive la cara, para que se sienta DENTRO del material.
    under += `<ellipse cx="${c.fx}" cy="${f(c.fy + 4)}" rx="${f(c.ex * 1.9)}" ry="${f(c.eh * 1.3)}" style="fill:var(--face-glow)" opacity="${theme === 'dark' ? 0.1 : 0.17}" filter="url(#${u}-soft)"/>`;
  }
  if (v.mask && !c.robot) {
    // 08: un arco grueso y ABIERTO. Su largo se recorta al ancho real de la silueta, si se midió.
    const grosor = mouthY - c.fy + c.eh / 2 + (sm ? 10 : 13);
    const yc = (c.fy - c.eh / 2 + mouthY + 3) / 2;
    const disponible = m ? widthAt(m, yc) * 0.86 : 999;
    const largo = Math.max(8, Math.min(c.ex * 2 + c.ew + 6, disponible - grosor));
    const arco = `M${f(c.fx - largo / 2)} ${f(yc - 2)} Q${c.fx} ${f(yc + 6)} ${f(c.fx + largo / 2)} ${f(yc - 2)}`;
    under += `<path class="fl-mask" d="${arco}" fill="none" stroke-linecap="round" style="stroke:var(--face-mask)" stroke-width="${f(grosor)}" opacity=".94"/>`;
    if (!sm)
      under += `<path d="${arco}" fill="none" stroke-linecap="round" stroke="#fff" stroke-opacity=".08" stroke-width="${f(grosor * 0.22)}" transform="translate(0 ${f(-grosor * 0.3)})"/>`;
  }
  if (v.cheeks && !sm && !c.robot && o.expr !== 'sleeping' && o.expr !== 'error') {
    const alfa = o.expr === 'happy' || o.expr === 'success' ? 0.3 : 0.18;
    for (const s of [-1, 1])
      under += `<ellipse class="fl-cheek" cx="${f(c.fx + s * (c.ex + 8))}" cy="${f(c.fy + c.eh / 2 + 5)}" rx="7" ry="3" style="fill:var(--face-cheek)" opacity="${alfa}" filter="url(#${u}-feather)"/>`;
  }

  const eyes = eye(x, E.L, -1) + eye(x, E.R, 1);
  const tipo = E.mouth === 'rest' ? v.rest : E.mouth === 'joy' ? v.joy : E.mouth;
  let boca = mouth(x, tipo);
  if (v.eye === 'lens') boca = `<g filter="url(#${u}-gelblur)" opacity=".85">${boca}</g>`;
  const extra = v.accentMap && !sm ? accent(x, o.expr) : '';
  const efecto = E.fx && !sm ? fx(E.fx, x) : '';
  const look = E.look ?? [0, 0];
  const cara = `<g class="fl-face" style="opacity:var(--face-opacity)">${under}<g class="fl-look" style="--dx:${look[0]};--dy:${look[1]}">${eyes}${boca}${extra}</g>${efecto}</g>`;
  // `sm` recorta el viewBox a la silueta: a 24 px no sobra ni un pixel para margen.
  const viewBox = sm ? '22 30 156 156' : '0 14 200 180';
  return `<svg class="flx" viewBox="${viewBox}" data-face="${o.face}" data-expr="${o.expr}" data-shape="${o.shape}" data-lod="${lod}" style="${vars}" aria-hidden="true" focusable="false"><defs>${defs}</defs>${bd.back}<g class="fl-bodywrap">${bd.body}${cara}</g></svg>`;
}
