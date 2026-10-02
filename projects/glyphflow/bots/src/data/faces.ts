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
  minimal: { label: 'Modern minimal', eye: 'oval', cheeks: true, mouth: true },
  geo: { label: 'Soft geometric', eye: 'pill', cheeks: false, mouth: true, cross: true },
  glyph: { label: 'Glyph line', eye: 'line', cheeks: false, mouth: true },
  screen: {
    label: 'Digital screen',
    eye: 'pixel',
    cheeks: false,
    mouth: true,
    cross: true,
    screen: true,
  },
  nomouth: { label: 'No mouth', eye: 'oval', cheeks: false, mouth: false },
  neu: { label: 'Neumorphic', eye: 'nrect', cheeks: false, mouth: true, mouthBase: 'pill' },
  neuNoMouth: { label: 'Neumorphic, no mouth', eye: 'nrect', cheeks: false, mouth: false },
  tofu: {
    label: 'Tofu',
    eye: 'nrect',
    cheeks: false,
    mouth: true,
    mouthBase: 'pill',
    hidden: true,
  },
  night: { label: 'Night', eye: 'nrect', cheeks: false, mouth: true, hidden: true },
  cat: { label: 'Cat', eye: 'nrect', cheeks: false, mouth: true, hidden: true },
  ghost: {
    label: 'Ghost',
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
  neu: 'Neumorphic',
  line: 'Line',
  gel: 'Gel',
  app: 'App',
  ether: 'Ethereal',
  flat: 'Flat',
  pastel: 'Pastel',
  solid: 'Accents',
  n1: 'Jelly',
  n2: 'Cloud',
  n3: 'Neon',
  n4: 'Aurora',
  n5: 'Cobalt',
  n6: 'Pearl',
  n7: 'Vibrant',
  n8: 'Mask',
  n9: 'Crystal',
  n10: 'Prism',
} as const;

export type GfMochiVariant = keyof typeof MOCHI_VARS;

/** Las de noche (`n1`…`n10`) están pensadas para fondo oscuro. */
export const isMochiNight = (v: string): boolean => /^n\d+$/.test(v);
