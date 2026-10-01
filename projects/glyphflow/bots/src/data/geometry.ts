import type { GfBotAccessory } from '../engine/pose';

/**
 * Geometría suelta que comparten varias formas: la onda de la sábana del fantasma, las orejas del
 * gato, el tornillo del robot y el «squircle». Todo son funciones puras que devuelven un `d` de
 * SVG o la descripción de un accesorio — sin DOM.
 */

/** Un accesorio con su dibujo: `draw(x, y, id)` devuelve el SVG ya posicionado en (x, y). */
export interface GfBotAccessoryDef extends GfBotAccessory {
  draw: (x: number, y: number, id: string) => string;
}

/** Sábana del fantasma. `a` = amplitud de la onda del borde, de 9 a -9. */
export const ghostWave = (a: number): string => {
  let d = 'M44 108 C44 72 70 48 100 48 C130 48 156 72 156 108 V164';
  const xs = [156, 137, 119, 100, 81, 63, 44];
  for (let i = 1; i < xs.length; i++) {
    d += ` Q${(xs[i - 1] + xs[i]) / 2} ${(164 + (i % 2 ? 1 : -1) * a).toFixed(2)} ${xs[i]} 164`;
  }
  return d + ' Z';
};

/** Las dos fases extremas de la onda: `ph` falso = 9, verdadero = -9. */
export const ghostPath = (ph: boolean | number): string => ghostWave(ph ? -9 : 9);

/** Oreja de gato. `side`: -1 izquierda, 1 derecha. */
export const catEar = (side: number): GfBotAccessoryDef => ({
  p: [side * 36, -40, 30],
  up: [side * 0.4, -0.9, 0.15],
  n: [side * 0.4, -0.35, 0.85],
  draw: (x, y, p) =>
    `<path d="M${x - 16} ${y + 6} Q${x - 9} ${y - 16} ${x - 2} ${y - 30} Q${x + 2} ${y - 34} ${x + 6} ${y - 28} Q${x + 13} ${y - 12} ${x + 16} ${y + 6} Z" fill="url(#${p}-body)" data-paint/>`,
});

/** Lo rosa de adentro de la oreja: solo se ve cuando la oreja mira hacia nosotros (de espaldas, no). */
export const catEarInner = (side: number): GfBotAccessoryDef => ({
  ...catEar(side),
  faceOnly: true,
  draw: (x, y) =>
    `<path d="M${x - 8} ${y - 2} Q${x - 4} ${y - 13} ${x + 1} ${y - 23} Q${x + 6} ${y - 12} ${x + 8} ${y - 2} Z" fill="#FF8FAE" opacity=".6"/>`,
});

/**
 * Tornillo lateral: un disco que mira hacia afuera; de frente se ve de canto y al girar se ve
 * completo. Lleva una luz cian, no una oreja.
 */
export const bolt = (side: number, w = 60, dy = 2): GfBotAccessoryDef => ({
  p: [side * w, dy, 0],
  up: [0, -1, 0],
  n: [side, 0, 0],
  fixed: true,
  minW: 0.45,
  draw: (x, y) =>
    `<rect class="rled-base" x="${x - 4}" y="${y - 9}" width="8" height="18" rx="4"/><rect class="rled" x="${x - 2}" y="${y - 6}" width="4" height="12" rx="2"/>`,
});

/**
 * «Squircle»: cubo muy redondeado, con los lados apenas convexos y la base más redonda que el
 * techo (`nBot` > `nTop` la redondea más). Se interpola con Catmull-Rom → Bézier cúbicas para que
 * el contorno salga liso, sin facetas.
 */
export function squircle(
  cx: number,
  cy: number,
  a: number,
  b: number,
  nTop: number,
  nBot: number,
): string {
  const N = 72;
  const pts: (readonly [number, number])[] = [];
  for (let i = 0; i < N; i++) {
    const t = ((i / N) * Math.PI * 2);
    const c = Math.cos(t);
    const s = Math.sin(t);
    const n = s > 0 ? nBot : nTop;
    pts.push([
      cx + a * Math.sign(c) * Math.pow(Math.abs(c), 2 / n),
      cy + b * Math.sign(s) * Math.pow(Math.abs(s), 2 / n),
    ]);
  }
  const P = (k: number) => pts[(k + N) % N];
  let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < N; i++) {
    const [p0, p1, p2, p3] = [P(i - 1), P(i), P(i + 1), P(i + 2)];
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(2)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(2)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(2)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d + ' Z';
}
