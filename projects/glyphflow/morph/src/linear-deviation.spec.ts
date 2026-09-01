import { morphKeyframes } from './morph-keyframes';
import { maxLinearDeviation } from './linear-deviation';
import type { IconInput } from './core/types';
import {
  bellIcon,
  bellRingIcon,
  circleIcon,
  squareIcon,
  starIcon,
  heartIcon,
  userIcon,
  userRoundIcon,
  type AnimatedIconDef,
  type IconShape,
} from 'glyphflow';

/** `IconShape[]` → data estilo Lucide, que es lo que come el core. */
function aIconNode(def: AnimatedIconDef): [string, Record<string, string | number>][] {
  // Replica de `aIconInput`: descarta las figuras que el icono no enseña en reposo.
  return def.shapes.filter((s: IconShape) => s.opacity !== '0').map((s: IconShape) => {
    const { tag, ...attrs } = s as IconShape & Record<string, unknown>;
    const limpio: Record<string, string | number> = {};
    for (const [k, v] of Object.entries(attrs))
      if (v !== undefined) limpio[k] = v as string | number;
    return [tag, limpio];
  });
}

const bell = aIconNode(bellIcon);
const bellRing = aIconNode(bellRingIcon);
const heart = aIconNode(heartIcon);
const star = aIconNode(starIcon);
const circle = aIconNode(circleIcon);
const square = aIconNode(squareIcon);
const user = aIconNode(userIcon);
const userRound = aIconNode(userRoundIcon);

describe('maxLinearDeviation — qué tan lejos corta esquina WAAPI de la trayectoria polar real', () => {
  /**
   * Los 4 pares del benchmark, con el default ADAPTATIVO real (sin `steps` explícito): esto
   * ejercita el esquema de pasos que de verdad usan los consumidores, no un número fijo elegido a
   * mano para el test.
   */
  const PARES: [string, IconInput, IconInput][] = [
    ['bell→bell-ring', bell, bellRing],
    ['heart→star', heart, star],
    ['circle→square', circle, square],
    ['user→user-round', user, userRound],
  ];

  it.each(PARES)('%s se mantiene por debajo del umbral de fidelidad', (_id, origen, destino) => {
    const { plan, keyframes } = morphKeyframes(origen, destino);
    const desviacion = maxLinearDeviation(plan, keyframes.length);
    // Margen amplio sobre el peor caso medido (heart→star, ~0.01 en esta métrica): detecta una
    // regresión real sin ser frágil ante ajustes finos de la fórmula de pasos.
    expect(desviacion).toBeLessThan(0.05);
  });

  it('más pasos nunca empeora la desviación para el mismo par', () => {
    const { plan } = morphKeyframes(bell, bellRing, { steps: 20 });
    const con10 = maxLinearDeviation(plan, 10);
    const con20 = maxLinearDeviation(plan, 20);
    const con30 = maxLinearDeviation(plan, 30);
    expect(con20).toBeLessThanOrEqual(con10);
    expect(con30).toBeLessThanOrEqual(con20);
  });
});
