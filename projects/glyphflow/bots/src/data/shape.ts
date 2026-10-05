import type { GfBotAccessory, GfBotModel } from '../engine/pose';
import type { GfBotFaceId } from './faces';
import type { GfBotHeadMetrics } from './hats';
import type { MATERIALS } from './palettes';

/**
 * Una forma de bot: su silueta, cómo se comporta en 3D, dónde van los ojos y la boca, y qué lleva
 * pegado (orejas, antena, copete…). Cada forma es un módulo suelto —`mochiShape`, `gatoShape`…— y
 * el consumidor pasa el OBJETO que quiere: así quien usa solo el pulpo no paga el gato.
 *
 * Las medidas están en unidades del viewBox (200 × 212).
 */

/** Un accesorio fijo a la forma. `draw` recibe la posición ya proyectada y la piel actual (`v`). */
export interface GfBotShapeAccessory extends GfBotAccessory {
  /** Copete del Mochi: se pinta con la piel actual. */
  tuft?: boolean;
  /** Es un sombrero: el motor le aplica la física del resorte (ver `hatStep`). */
  hat?: boolean;
  draw: (x: number, y: number, id: string, v: string) => string;
}

/** Cómo se acomoda un sombrero que se ajusta al cuerpo (audífonos, visera, casco). */
export interface GfBotBodyFit {
  k: number;
  y: number;
}

/** Cabeza donde se asienta el sombrero (extiende las medidas con la curvatura). */
export interface GfBotHead extends GfBotHeadMetrics {
  angle: number;
}

/** Fx por forma: texto SVG que se monta dentro, encima o detrás de la silueta. */
export type GfBotShapeFx = (id: string) => string;

export interface GfBotShape {
  /**
   * Nombre estable de la forma (`mochi`, `octopus`, `nCloud`…). Sale en `data-shape` y el CSS de las
   * pieles se engancha a él; el motor también ramifica por él (`octopus`, `nCloud`). No se reutiliza.
   */
  id: string;
  label: string;
  /** Familia de pieles que le corresponden. */
  family?: 'ghost' | 'cat' | 'octopus';
  /** Clave de la paleta (`PALETTES`). */
  palette: string;
  /** Material del cuerpo; sin esto, plástico. Ninguna forma de serie lo fija. */
  material?: keyof typeof MATERIALS;
  /** Cuerpo 3D: esfera, cilindro o caja redondeada. */
  model: GfBotModel;
  /** Radio (esfera/cilindro). */
  R?: number;
  /** Semilado y radio de esquina (caja). */
  half?: number;
  round?: number;
  /** Centro vertical y altura de los ojos; `top` = coronilla. */
  cy: number;
  faceY: number;
  top?: number;
  sideW?: number;

  // Silueta
  /** Contorno (`d` de SVG). */
  d?: string;
  /** Segunda fase del contorno animado (onda del borde). */
  d2?: string;
  /** Fotogramas del contorno animado y su duración/easing. */
  dKeys?: readonly string[];
  dDur?: number;
  dEase?: string;
  /** Contorno en el instante `u` (0…1): para motores que no animan `d` con CSS. */
  dAt?: (u: number) => string;

  // Cara
  skin?: string;
  faceStyle?: GfBotFaceId;
  mouth?: string;
  baseMouth?: string;
  eyeDx?: number;
  eyeW?: number;
  eyeH?: number;
  eyeR?: number;
  mouthDy?: number;
  mouthW?: number;
  mouthH?: number;
  halfW?: number;
  halfH?: number;
  pillW?: number;
  pillH?: number;
  cheek?: number;
  /** Piel de Mochi con que arranca esta forma. */
  mochiDefault?: string;

  // Pose
  /** Profundidad del cuerpo / su ancho (ver `GfBotPoseShape.depth`). Sin esto la forma gira como una esfera. */
  depth?: number;
  tilt?: number;
  float?: boolean;
  floatAmp?: number;
  floatDur?: number;
  /** Física propia de la nube: lóbulos `[cx, cy, r, fase]`. */
  cloudPhys?: boolean;
  lobes?: readonly (readonly [number, number, number, number])[];

  // Sombreros
  hatAt?: number;
  hatK?: number;
  hatX?: number;
  head?: GfBotHead;
  bodyFit?: GfBotBodyFit;

  // Accesorios y capas
  acc?: readonly GfBotShapeAccessory[];
  footPaint?: string;
  footArc?: string;
  fxIn?: GfBotShapeFx;
  fxOut?: GfBotShapeFx;
  fxBack?: GfBotShapeFx;

  // Banderas
  /** Ya no se ofrece suelta; sigue existiendo por compatibilidad (y el robot la usa de cuerpo). */
  retired?: boolean;
  /** Variante de Noche. */
  night?: boolean;
  /** Variante de Noche con silueta propia. */
  promoted?: boolean;
  /** Forma de la que el robot toma el cuerpo. */
  body?: string;
}
