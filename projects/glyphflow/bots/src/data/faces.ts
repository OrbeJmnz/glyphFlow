/**
 * Estilos de cara: el mismo cuerpo, varias maneras de dibujar ojos y boca. Aplican a todas las
 * formas. Datos puros; el dibujo vive en el motor.
 */
export type GfBotEyeStyle = 'oval' | 'pill' | 'line' | 'pixel' | 'nrect';

export interface GfBotFaceStyle {
  /** Nombre para mostrar (español, solo para la documentación en español). */
  label: string;
  eye: GfBotEyeStyle;
  cheeks: boolean;
  mouth: boolean;
  /** Dibuja una cruz en el ojo (> <) cuando se aprieta. */
  cross?: boolean;
  /** Cara de pantalla: tinte cian y resplandor. */
  screen?: boolean;
  /** Boca de partida si la forma no pide otra. */
  mouthBase?: 'pill';
  /** Caras que no se ofrecen sueltas: vienen atadas a una familia de formas. */
  hidden?: boolean;
}

export const FACES = {
  minimal: { label: 'Minimalista moderno', eye: 'oval', cheeks: true, mouth: true },
  geo: { label: 'Geométrico soft', eye: 'pill', cheeks: false, mouth: true, cross: true },
  glyph: { label: 'Línea tipo glifo', eye: 'line', cheeks: false, mouth: true },
  screen: {
    label: 'Pantalla digital',
    eye: 'pixel',
    cheeks: false,
    mouth: true,
    cross: true,
    screen: true,
  },
  nomouth: { label: 'Sin boca', eye: 'oval', cheeks: false, mouth: false },
  neu: { label: 'Neumórfico', eye: 'nrect', cheeks: false, mouth: true, mouthBase: 'pill' },
  neuNoMouth: { label: 'Neumórfico sin boca', eye: 'nrect', cheeks: false, mouth: false },
  tofu: {
    label: 'Tofu',
    eye: 'nrect',
    cheeks: false,
    mouth: true,
    mouthBase: 'pill',
    hidden: true,
  },
  night: { label: 'Noche', eye: 'nrect', cheeks: false, mouth: true, hidden: true },
  cat: { label: 'Gato', eye: 'nrect', cheeks: false, mouth: true, hidden: true },
  ghost: {
    label: 'Fantasma',
    eye: 'nrect',
    cheeks: false,
    mouth: true,
    mouthBase: 'pill',
    hidden: true,
  },
} as const satisfies Record<string, GfBotFaceStyle>;

export type GfBotFaceId = keyof typeof FACES;

/** Pieles del Mochi: la MISMA forma y la misma cara, varios tratamientos de color y luz. */
export const MOCHI_VARS = {
  neu: 'Neumórfico',
  line: 'Línea',
  gel: 'Gel',
  app: 'App',
  ether: 'Etéreo',
  flat: 'Plano',
  pastel: 'Pastel',
  solid: 'Acentos',
  n1: 'Jalea',
  n2: 'Nube',
  n3: 'Neón',
  n4: 'Aurora',
  n5: 'Cobalto',
  n6: 'Perla',
  n7: 'Vibrante',
  n8: 'Máscara',
  n9: 'Cristal',
  n10: 'Prisma',
} as const;

export type GfMochiVariant = keyof typeof MOCHI_VARS;

/** Las de noche (`n1`…`n10`) están pensadas para fondo oscuro. */
export const isMochiNight = (v: string): boolean => /^n\d+$/.test(v);
