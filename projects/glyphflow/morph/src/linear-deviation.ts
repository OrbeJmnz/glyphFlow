import { allocOutputs, interpPolar } from './core/interpolate';
import type { MorphPlan } from './core/plan';

/**
 * Cuánto se aleja la interpolación LINEAL de WAAPI entre `pasos` poses horneadas, respecto a la
 * trayectoria polar real (`interpPolar` continua). WAAPI interpola cada coordenada linealmente
 * entre dos keyframes vecinos — lo que el usuario VE entre la pose i y la i+1 es exactamente ese
 * lerp — así que es lo que se compara aquí contra la curva real.
 *
 * `muestrasPorTramo` subdivide cada intervalo [t_i, t_i+1] para buscar el peor punto INTERMEDIO —
 * los extremos, por construcción, coinciden con la curva real y no delatan nada.
 *
 * Herramienta de medición interna (tests, `scripts/morph-quality-report.ts`) — no es superficie
 * pública, por eso no pasa por `public-api.ts`.
 */
export function maxLinearDeviation(
  plan: MorphPlan,
  pasos: number,
  muestrasPorTramo = 20,
): number {
  const buf = allocOutputs(plan);
  const poses: Float64Array[][] = [];
  for (let i = 0; i < pasos; i++) {
    interpPolar(plan, i / (pasos - 1), buf);
    poses.push(buf.map((s) => s.slice()));
  }

  let peor = 0;
  const real = allocOutputs(plan);
  for (let i = 0; i < pasos - 1; i++) {
    const t0 = i / (pasos - 1);
    const t1 = (i + 1) / (pasos - 1);
    for (let m = 1; m < muestrasPorTramo; m++) {
      const u = m / muestrasPorTramo;
      interpPolar(plan, t0 + u * (t1 - t0), real);
      for (let k = 0; k < plan.items.length; k++) {
        const a = poses[i][k];
        const b = poses[i + 1][k];
        const r = real[k];
        for (let p = 0; p < r.length; p += 2) {
          const lx = a[p] + (b[p] - a[p]) * u;
          const ly = a[p + 1] + (b[p + 1] - a[p + 1]) * u;
          const d = Math.hypot(r[p] - lx, r[p + 1] - ly);
          if (d > peor) peor = d;
        }
      }
    }
  }
  return peor;
}
