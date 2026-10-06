import { bolt } from '../data/geometry';
import type { GfBotShape } from '../data/shape';
import { cubeShape } from './retired';

/**
 * Robot: toma el cuerpo de otra forma (círculo, huevo o cubo) y le pone visor, antena y tornillos.
 * Se parte de la forma base como OBJETO —no de su clave— para que quien use el robot solo cargue el
 * cuerpo que elija.
 */
export function makeRobot(base: GfBotShape, bodyKey = 'cube'): GfBotShape {
  const top = base.top ?? base.cy;
  const sideW = base.sideW ?? 60;
  return {
    ...base,
    id: 'robot',
    flex: 0.5,
    feel: { hem: 0.3, gel: 0.3, squash: 0.65 }, // casi no se deforma: más seco y mecánico
    hatAt: top - base.cy + 1.5,
    hatK: 0.88,
    label: 'Robot',
    retired: false,
    palette: 'steel',
    skin: 'robot',
    body: bodyKey,
    tilt: -3,
    mouth: 'smile',
    acc: [
      // antena chica, flexible, un poco inclinada, con la punta luminosa; se mueve con la emoción
      {
        p: [0, top - base.cy, 0],
        up: [0, -1, 0],
        lag: 0.03,
        swing: 1.6, // la antena es flexible
        draw: (x, y) =>
          `<rect class="ant-base" x="${x - 5}" y="${y - 3}" width="10" height="5" rx="2.5"/><g class="ant" style="transform-origin:${x}px ${y}px"><path class="ant-stick" d="M${x} ${y - 1} Q${x + 3.5} ${y - 8} ${x + 2.5} ${y - 15}"/><circle class="ant-tip" cx="${x + 2.5}" cy="${y - 18}" r="4.2" style="transform-origin:${x + 2.5}px ${y - 18}px"/></g>`,
      },
      bolt(-1, sideW, base.faceY - base.cy + 4),
      bolt(1, sideW, base.faceY - base.cy + 4),
    ],
  };
}

/** El robot de siempre: el visor, la antena y los tornillos sobre el cuerpo de cubo. */
export const robotShape: GfBotShape = /* @__PURE__ */ makeRobot(cubeShape);
