import type { Punto, Segmento } from './path-model';

/**
 * Partir un tramo en dos por un punto intermedio, sin mover la curva.
 *
 * Por qué no `bezier-js`, que el plan daba por hecho: se midió el catálogo. De los 1250 tramos
 * dibujables, 500 (40%) son ARCOS y bezier-js no tiene tipo de arco; los cubics que sí cubriría
 * son 56 (4%). Traer una dependencia que resuelve el 4% y deja fuera al 40% es el trade
 * equivocado. Lo de aquí cubre los tres tipos — línea, cubic y arco — con fórmulas conocidas.
 */

const esRel = (letra: string) => letra === letra.toLowerCase();

/** Los pares de números del tramo, pasados a absolutas. */
function puntosAbsolutos(seg: Segmento): Punto[] {
  const rel = esRel(seg.letra);
  const [ox, oy] = seg.inicio;
  const pares: Punto[] = [];
  for (let i = 0; i + 1 < seg.numeros.length; i += 2) {
    const x = seg.numeros[i];
    const y = seg.numeros[i + 1];
    pares.push(rel ? [ox + x, oy + y] : [x, y]);
  }
  return pares;
}

/** Escribe un punto absoluto como los números que le tocan al comando (relativo o absoluto). */
function comoNumeros(letra: string, inicio: Punto, p: Punto): [number, number] {
  return esRel(letra) ? [p[0] - inicio[0], p[1] - inicio[1]] : [p[0], p[1]];
}

// ── Arcos: de parametrización por extremos a parametrización por centro ───────

export interface ArcoCentro {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  /** Rotación del eje x, en radianes. */
  phi: number;
  theta1: number;
  deltaTheta: number;
}

/**
 * El `A` del SVG dice a dónde llega, no dónde está su centro. Para partirlo hay que recuperar el
 * centro y el barrido angular: es el apéndice F.6.5 de la spec, ni más ni menos.
 */
export function arcoACentro(
  p0: Punto,
  rxIn: number,
  ryIn: number,
  phiGrados: number,
  fA: number,
  fS: number,
  p1: Punto,
): ArcoCentro | null {
  let rx = Math.abs(rxIn);
  let ry = Math.abs(ryIn);
  // Radio cero: la spec dice que el arco degenera en línea recta. No hay centro que recuperar.
  if (rx === 0 || ry === 0) return null;

  const phi = (phiGrados * Math.PI) / 180;
  const cos = Math.cos(phi);
  const sin = Math.sin(phi);
  const dx2 = (p0[0] - p1[0]) / 2;
  const dy2 = (p0[1] - p1[1]) / 2;
  const x1p = cos * dx2 + sin * dy2;
  const y1p = -sin * dx2 + cos * dy2;

  // Radios demasiado chicos para unir los extremos: la spec manda agrandarlos, no fallar.
  const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
  if (lambda > 1) {
    const k = Math.sqrt(lambda);
    rx *= k;
    ry *= k;
  }

  const num = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
  const den = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
  const factor = Math.sqrt(Math.max(0, num / den)) * (fA === fS ? -1 : 1);
  const cxp = (factor * (rx * y1p)) / ry;
  const cyp = (factor * -(ry * x1p)) / rx;

  const cx = cos * cxp - sin * cyp + (p0[0] + p1[0]) / 2;
  const cy = sin * cxp + cos * cyp + (p0[1] + p1[1]) / 2;

  const angulo = (ux: number, uy: number, vx: number, vy: number) => {
    const producto = ux * vx + uy * vy;
    const largo = Math.hypot(ux, uy) * Math.hypot(vx, vy);
    const signo = ux * vy - uy * vx < 0 ? -1 : 1;
    return signo * Math.acos(Math.min(1, Math.max(-1, producto / largo)));
  };

  const ux = (x1p - cxp) / rx;
  const uy = (y1p - cyp) / ry;
  const vx = (-x1p - cxp) / rx;
  const vy = (-y1p - cyp) / ry;
  const theta1 = angulo(1, 0, ux, uy);
  let deltaTheta = angulo(ux, uy, vx, vy) % (2 * Math.PI);
  if (fS === 0 && deltaTheta > 0) deltaTheta -= 2 * Math.PI;
  if (fS === 1 && deltaTheta < 0) deltaTheta += 2 * Math.PI;

  return { cx, cy, rx, ry, phi, theta1, deltaTheta };
}

function puntoDelArco(a: ArcoCentro, theta: number): Punto {
  const cos = Math.cos(a.phi);
  const sin = Math.sin(a.phi);
  const x = a.rx * Math.cos(theta);
  const y = a.ry * Math.sin(theta);
  return [cos * x - sin * y + a.cx, sin * x + cos * y + a.cy];
}

// ── Punto en t ───────────────────────────────────────────────────────────────

/** De Casteljau: parte una cúbica en dos que juntas son la misma curva. */
function deCasteljau(
  p0: Punto,
  p1: Punto,
  p2: Punto,
  p3: Punto,
  t: number,
): { punto: Punto; izq: [Punto, Punto]; der: [Punto, Punto] } {
  const mez = (a: Punto, b: Punto): Punto => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const a = mez(p0, p1);
  const b = mez(p1, p2);
  const c = mez(p2, p3);
  const d = mez(a, b);
  const e = mez(b, c);
  return { punto: mez(d, e), izq: [a, d], der: [e, c] };
}

/** El punto del tramo en t ∈ [0,1]. `null` si el comando no dibuja nada (`M`, `Z`). */
export function puntoEn(seg: Segmento, t: number): Punto | null {
  const L = seg.letra.toUpperCase();
  const [x0, y0] = seg.inicio;
  const [x1, y1] = seg.fin;
  const recta = (): Punto => [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];

  if (L === 'M' || L === 'Z') return null;
  if (L === 'L' || L === 'H' || L === 'V') return recta();

  if (L === 'C') {
    const [c1, c2] = puntosAbsolutos(seg);
    return deCasteljau([x0, y0], c1, c2, [x1, y1], t).punto;
  }

  if (L === 'A') {
    const [rx, ry, phi, fA, fS] = seg.numeros;
    const arco = arcoACentro([x0, y0], rx, ry, phi, fA, fS, [x1, y1]);
    if (!arco) return recta();
    return puntoDelArco(arco, arco.theta1 + arco.deltaTheta * t);
  }

  // `S`/`Q`/`T` casi no aparecen en el catálogo (hay UN `s`). Se aproxima con la recta entre
  // extremos antes que inventar un punto: es visiblemente distinto y no finge exactitud.
  return recta();
}

// ── Partir ───────────────────────────────────────────────────────────────────

/**
 * Parte el tramo en dos por t, o `null` si el comando no se puede partir (`M`, `Z`).
 *
 * Los dos tramos conservan el estilo del original — relativo sigue relativo — y salen marcados
 * sucios: su texto original ya no describe lo que hay.
 */
export function dividirSegmento(seg: Segmento, t: number): [Segmento, Segmento] | null {
  const L = seg.letra.toUpperCase();
  if (L === 'M' || L === 'Z') return null;

  const medio = puntoEn(seg, t);
  if (!medio) return null;
  const rel = esRel(seg.letra);

  const nuevo = (letra: string, inicio: Punto, fin: Punto, numeros: number[]): Segmento => ({
    letra,
    numeros,
    crudo: '',
    sucio: true,
    inicio,
    fin,
  });

  if (L === 'C') {
    const [c1, c2] = puntosAbsolutos(seg);
    const { izq, der } = deCasteljau(seg.inicio, c1, c2, seg.fin, t);
    const letra = rel ? 'c' : 'C';
    return [
      nuevo(letra, seg.inicio, medio, [
        ...comoNumeros(letra, seg.inicio, izq[0]),
        ...comoNumeros(letra, seg.inicio, izq[1]),
        ...comoNumeros(letra, seg.inicio, medio),
      ]),
      nuevo(letra, medio, seg.fin, [
        ...comoNumeros(letra, medio, der[0]),
        ...comoNumeros(letra, medio, der[1]),
        ...comoNumeros(letra, medio, seg.fin),
      ]),
    ];
  }

  if (L === 'A') {
    const [rx, ry, phi, fA, fS] = seg.numeros;
    const arco = arcoACentro(seg.inicio, rx, ry, phi, fA, fS, seg.fin);
    if (arco) {
      const letra = rel ? 'a' : 'A';
      // Cada mitad barre menos ángulo, así que su bandera de "arco largo" se RECALCULA: heredarla
      // del original le pintaría media vuelta de más a la mitad que ya no la necesita.
      const largo = (d: number) => (Math.abs(d) > Math.PI ? 1 : 0);
      // Los radios que se escriben son los CORREGIDOS, no los que traía el `d`. Cuando un arco
      // pide radios demasiado chicos para unir sus extremos, la spec manda agrandarlos — y el
      // catálogo lo hace: `pencil` escribe `a1 1` para una cuerda de 5.6, que se corrige a 2.819.
      // Copiar el `1 1` a las mitades las volvía a corregir contra SU cuerda, o sea un círculo más
      // chico: la curva se movía casi 1.2 unidades a media partición.
      const rxOk = arco.rx;
      const ryOk = arco.ry;
      return [
        nuevo(letra, seg.inicio, medio, [
          rxOk,
          ryOk,
          phi,
          largo(arco.deltaTheta * t),
          fS,
          ...comoNumeros(letra, seg.inicio, medio),
        ]),
        nuevo(letra, medio, seg.fin, [
          rxOk,
          ryOk,
          phi,
          largo(arco.deltaTheta * (1 - t)),
          fS,
          ...comoNumeros(letra, medio, seg.fin),
        ]),
      ];
    }
  }

  // Línea, o arco degenerado. `h`/`v` se vuelven `l`: el punto de corte ya no comparte
  // necesariamente eje con el destino.
  const letra = rel ? 'l' : 'L';
  return [
    nuevo(letra, seg.inicio, medio, comoNumeros(letra, seg.inicio, medio)),
    nuevo(letra, medio, seg.fin, comoNumeros(letra, medio, seg.fin)),
  ];
}
