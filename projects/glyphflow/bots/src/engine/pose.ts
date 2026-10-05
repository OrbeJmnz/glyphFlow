/**
 * Proyección 3D del bot, portada tal cual de `poseState` del prototipo (artifact v68).
 *
 * Es una función PURA: recibe la forma, la pose y los puntos de anclaje y devuelve un `transform`
 * + `opacity` por cada capa del SVG. Cero DOM, cero `window` — por eso se prerenderiza igual en el
 * servidor y se puede probar sin navegador. El orden del arreglo de salida ES el contrato con el
 * componente (ver `POSE_SLOTS`): quien pinta aplica `out[i]` al elemento `i` sin preguntar.
 */

/** Giro y cabeceo en radianes; `roll` en GRADOS (es lo que consume `rotate()` de CSS). */
export interface GfBotPose {
  /** Giro horizontal (rad). */
  yaw?: number;
  /** Cabeceo (rad); positivo = la cara baja. */
  pitch?: number;
  /** Inclinación en el plano (grados). */
  roll?: number;
  /**
   * Deformación del cuerpo (squash y stretch) A LO LARGO DE SU PROPIO EJE: se aplica antes del giro,
   * así que con el cuerpo boca abajo sigue estirándose de la cabeza a la falda y no en vertical de
   * pantalla. También la siguen los accesorios (un sombrero se sienta sobre una cabeza estirada).
   * 1 = sin deformar.
   */
  sx?: number;
  sy?: number;
  /**
   * Deformación de la CARA, aparte de la del cuerpo: ojos y boca se deforman menos para que no se
   * vuelvan una mancha (cuerpo 0.84 → cara ~0.94). 1 = sin deformar.
   */
  fx?: number;
  fy?: number;
}

/** Cómo se comporta el cuerpo en 3D: esfera, cilindro o caja redondeada. */
export type GfBotModel = 'sphere' | 'cyl' | 'box';

/** La pose de REPOSO de un bot: giro, cabeceo e inclinación. La deformación (`sx`…) solo existe mientras dura un gesto. */
export type GfBotRestPose = Required<Pick<GfBotPose, "yaw" | "pitch" | "roll">>;

/** Un accesorio fuera de la silueta (orejas, antena…): un punto 3D y hacia dónde apunta. */
export interface GfBotAccessory {
  /** Posición respecto al centro de la silueta. */
  p: readonly [number, number, number];
  /** Dirección «arriba» del accesorio. */
  up: readonly [number, number, number];
  /** Normal de la superficie donde se apoya (para saber cuándo se ve de canto). */
  n?: readonly [number, number, number];
  /** No gira con la pose (p. ej. el tornillo lateral del robot). */
  fixed?: boolean;
  /** Ancho mínimo al verlo de canto (0–1). */
  minW?: number;
  /** Solo se ve cuando la normal mira hacia el espectador. */
  faceOnly?: boolean;
  /** Copia delante Y detrás del cuerpo (sombrero en capas). */
  layered?: boolean;
  /** Siempre encima del cuerpo. */
  frontOnly?: boolean;
  /** Siempre detrás (orejas del gato). */
  backOnly?: boolean;
  /** Entra por delante poco a poco: `[desde, ancho]` en profundidad. */
  fade?: readonly [number, number];
}

/** Lo mínimo que `projectPose` necesita saber de una forma. */
export interface GfBotPoseShape {
  /** Centro vertical de la silueta. */
  cy: number;
  model: GfBotModel;
  /** Radio (esfera y cilindro). */
  R?: number;
  /**
   * Profundidad del cuerpo en proporción a su ancho (solo esfera). Sin esto el cuerpo es una esfera
   * perfecta y al girar su silueta no cambia: solo se mueve la cara sobre un cuerpo que no gira, que en
   * una forma irregular (fantasma, gato, pulpo) se ve plano. Con `depth < 1` es un elipsoide aplanado
   * —un fantasma delgado, un gato achatado—: al girar la silueta se estrecha hasta `depth` de su ancho
   * a los 90° y los rasgos de la cara recorren menos camino, como en un cuerpo con volumen de verdad.
   * Con `depth = 1` equivale a la esfera.
   */
  depth?: number;
  /** Semilado (caja). */
  half?: number;
  /** Radio de esquina (caja). */
  round?: number;
  acc?: readonly GfBotAccessory[];
}

/** Un rasgo de la cara anclado a un punto del lienzo (x, y en unidades del viewBox). */
export interface GfBotFeature {
  x: number;
  y: number;
}

/** Qué se aplica a una capa del SVG en un instante de la pose. */
export interface GfBotLayerFrame {
  transform: string;
  opacity?: number;
}

const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));
const f2 = (n: number): string => (+n).toFixed(2);
const f3 = (n: number): string => (+n).toFixed(3);

/**
 * Posiciones fijas del arreglo que devuelve `projectPose`, a continuación de los `feats.length`
 * rasgos. El componente las usa para no depender de números mágicos.
 */
export const POSE_SLOTS = [
  'body',
  'sideYawLight',
  'sideYawDark',
  'sidePitchLight',
  'sidePitchDark',
  'face',
  'gloss',
  'accBackLayer',
  'accFrontLayer',
] as const;

/**
 * Salida: `[...rasgos, ...POSE_SLOTS, ...accesoriosAtrás, ...accesoriosAdelante]`.
 * Los accesorios se parten en dos copias para poder pasar «por detrás» o «por delante» del cuerpo.
 */
export function projectPose(
  sh: GfBotPoseShape,
  pose: GfBotPose,
  feats: readonly GfBotFeature[],
): GfBotLayerFrame[] {
  const { yaw = 0, pitch = 0, roll = 0, sx: dx = 1, sy: dy = 1, fx = 1, fy = 1 } = pose;
  // La deformación se escribe solo si existe: sin ella el texto del transform es el de siempre.
  const squash = (a: number, b: number): string => (a === 1 && b === 1 ? '' : ` scale(${f3(a)},${f3(b)})`);
  const cy = sh.cy;
  const cY = Math.cos(yaw),
    sY = Math.sin(yaw),
    cP = Math.cos(pitch),
    sP = Math.sin(pitch);
  const rot = (x: number, y: number, z: number): [number, number, number] => {
    const x1 = x * cY + z * sY;
    const z1 = -x * sY + z * cY;
    return [x1, y * cP + z1 * sP, -y * sP + z1 * cP];
  };
  const R = sh.R ?? 0;
  const half = sh.half ?? 0;
  const round = sh.round ?? 0;
  const k = sh.depth ?? 1;

  const out: GfBotLayerFrame[] = feats.map((f) => {
    const dx = f.x - 100;
    const dy = f.y - cy;
    let p: [number, number, number];
    let n: [number, number, number];
    if (sh.model === 'sphere') {
      // Elipsoide de radio R en x/y y `k·R` en z (k = 1 es la esfera del prototipo, idéntica). La
      // normal del elipsoide es (dx, dy, dz/k²): con k = 1 es la de la esfera.
      const dz = k * Math.sqrt(Math.max(R * R - dx * dx - dy * dy, 1));
      const L = Math.hypot(dx, dy, dz / (k * k));
      p = [dx, dy, dz];
      n = [dx / L, dy / L, dz / (k * k) / L];
    } else if (sh.model === 'cyl') {
      const dz = Math.sqrt(Math.max(R * R - dx * dx, 1));
      p = [dx, dy, dz];
      n = [dx / R, 0, dz / R];
    } else {
      p = [dx, dy, half];
      n = [0, 0, 1];
    }
    const [X, Y] = rot(...p);
    const [nx, ny, nz] = rot(...n);
    const sx = Math.max(Math.sqrt(Math.max(0, 1 - nx * nx)), 0.02);
    const sy = Math.max(Math.sqrt(Math.max(0, 1 - ny * ny)), 0.02);
    return {
      transform: `translate(${f2(100 + X - f.x)}px,${f2(cy + Y - f.y)}px) scale(${f3(sx)},${f3(sy)})`,
      opacity: +f3(clamp01((nz - 0.04) / 0.18)),
    };
  });

  // Silueta: la esfera casi no cambia; el cubo se ensancha en diagonal; el cilindro se achata al
  // verlo desde arriba.
  let sx = 1;
  let sy = 1;
  const aY = Math.abs(sY),
    aYc = Math.abs(cY),
    aP = Math.abs(sP),
    aPc = Math.abs(cP);
  if (sh.model === 'box') {
    const k = (c: number, s: number) => ((half - round) * (c + s) + round) / half;
    sx = k(aYc, aY);
    sy = k(aPc, aP);
  }
  if (sh.model === 'cyl') sy = aPc + aP * ((2 * R) / 130);
  if (sh.model === 'sphere') {
    if (sh.depth === undefined) sy = 1 - 0.05 * aP;
    else {
      // Silueta de un elipsoide de profundidad `k`: el semiancho proyectado al girar `ψ` es
      // √(cos²ψ + k²·sin²ψ) del de frente. Para el cabeceo, igual con el semialto.
      sx = Math.sqrt(aYc * aYc + k * k * aY * aY);
      sy = Math.sqrt(aPc * aPc + k * k * aP * aP);
    }
  }
  out.push({ transform: `rotate(${f2(roll)}deg) scale(${f3(sx * dx)},${f3(sy * dy)})` });

  // Caras laterales (solo cajas). Cada cara es un degradado que se DESVANECE hacia la vecina: la
  // esquina redondeada es una curva, no una arista, así que la luz cambia poco a poco.
  const hidden: GfBotLayerFrame = { transform: `translate(100px,${cy}px) scale(.001,.001)`, opacity: 0 };
  let yw = hidden,
    yb = hidden,
    pw = hidden,
    pb = hidden;
  if (sh.model === 'box') {
    const r2 = half * Math.SQRT2 * 0.9;
    const F = round * 2.2 + 16;
    const wrap = (t: string) =>
      `translate(100px,${cy}px) rotate(${f2(roll)}deg) translate(-100px,-${cy}px) ${t}`;
    const shade = (nz: number) => Math.pow(1 - nz, 0.85);
    for (let q = 0; q < 4; q++) {
      const b = (q * Math.PI) / 2 + yaw;
      const nz = Math.cos(b);
      const nx = Math.sin(b);
      if (nz > 0.01) {
        const a1 = r2 * Math.sin(b - Math.PI / 4);
        const a2 = r2 * Math.sin(b + Math.PI / 4);
        const lo = Math.min(a1, a2);
        const w = Math.abs(a2 - a1) + F;
        // La franja se extiende F/2 hacia cada lado y se desvanece en ambos extremos.
        const band = `translateX(${f2(100 + lo - F / 2)}px) scaleX(${f3(w)})`;
        if (nx < -0.001) yw = { transform: wrap(band), opacity: +f3(shade(nz) * 0.3) };
        else if (nx > 0.001) yb = { transform: wrap(band), opacity: +f3(shade(nz) * 0.32) };
      }
      const g = (q * Math.PI) / 2 + pitch;
      const gz = Math.cos(g);
      const gy = Math.sin(g);
      if (gz > 0.01) {
        const a1 = r2 * Math.sin(g - Math.PI / 4);
        const a2 = r2 * Math.sin(g + Math.PI / 4);
        const lo = Math.min(a1, a2);
        const w = Math.abs(a2 - a1) + F;
        const bandY = `translateY(${f2(cy + lo - F / 2)}px) scaleY(${f3(w)})`;
        if (gy < -0.001) pw = { transform: wrap(bandY), opacity: +f3(shade(gz) * 0.26) };
        else if (gy > 0.001) pb = { transform: wrap(bandY), opacity: +f3(shade(gz) * 0.32) };
      }
    }
  }
  out.push(yw, yb, pw, pb);
  out.push({ transform: `rotate(${f2(roll)}deg)${squash(fx, fy)}` }); // cara (.flip)
  out.push({ transform: `rotate(${f2(-roll)}deg)` }); // brillo: contra-rota para que la luz quede fija
  const accT = `rotate(${f2(roll)}deg)${squash(dx, dy)}`;
  out.push({ transform: accT }, { transform: accT }); // capas de accesorios

  // Accesorios: la copia de atrás siempre es visible; la de adelante solo cuando queda frente al
  // cuerpo.
  const back: GfBotLayerFrame[] = [];
  const front: GfBotLayerFrame[] = [];
  for (const a of sh.acc ?? []) {
    const [X, Y, Z] = rot(...a.p);
    const [ux, uy] = rot(...a.up);
    const x0 = 100 + a.p[0];
    const y0 = cy + a.p[1];
    const deg = a.fixed ? 0 : (Math.atan2(ux, -uy) * 180) / Math.PI;
    const len = a.fixed
      ? 1
      : Math.max(Math.hypot(ux, uy) / Math.hypot(a.up[0], a.up[1]), 0.05);
    let sw = 1;
    if (a.n) {
      const [nx] = rot(...a.n);
      sw = Math.max(Math.sqrt(Math.max(0, 1 - nx * nx)), a.minW ?? 0.25);
    }
    const t = `translate(${f2(100 + X - x0)}px,${f2(cy + Y - y0)}px) rotate(${f2(deg)}deg) scale(${f3(sw)},${f3(len)})`;
    const face = a.faceOnly && a.n ? clamp01(rot(...a.n)[2] * 5) : 1;
    if (a.layered) {
      back.push({ transform: t, opacity: +f3(face) });
      front.push({ transform: t, opacity: +f3(face) });
      continue;
    }
    if (a.frontOnly) {
      back.push({ transform: t, opacity: 0 });
      front.push({ transform: t, opacity: +f3(face) });
      continue;
    }
    back.push({ transform: t, opacity: +f3(face) });
    // backOnly: siempre detrás. fade: entra por delante poco a poco, sin aparecer de golpe.
    const ahead = a.backOnly
      ? 0
      : a.fade
        ? clamp01((Z - a.fade[0]) / a.fade[1])
        : clamp01(Z / 4);
    front.push({ transform: t, opacity: +f3(Math.min(face, ahead)) });
  }
  return out.concat(back, front);
}
