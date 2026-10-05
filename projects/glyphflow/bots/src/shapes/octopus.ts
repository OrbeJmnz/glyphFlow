import { pathLerp } from '../data/morph';
import { OCTOPUS_D, octopusD, octopusIdleSt } from '../data/octopus';
import type { GfBotShape } from '../data/shape';

/**
 * Pulpo: flota poquito y los tentáculos están vivos todo el tiempo — una onda los recorre de
 * izquierda a derecha (flanco izq → bajo izq → bajo der → flanco der): los flancos se mecen y los
 * bajos enroscan la punta y se aplastan/estiran.
 */
function makeOctopus(): GfBotShape {
  const idle = (ph: number) => octopusD(octopusIdleSt(ph));
  const keys = Array.from({ length: 16 }, (_, i) => idle(((i / 16) * Math.PI) * 2));
  keys.push(keys[0]);
  return {
    id: 'octopus',
    label: 'Octopus',
    family: 'octopus',
    palette: 'mist',
    model: 'sphere', depth:0.76,
    R: 59,
    cy: 100,
    top: 38,
    sideW: 59,
    faceY: 104,
    eyeDx: 20,
    eyeW: 10,
    eyeH: 17,
    eyeR: 0.5,
    mouthDy: 8.5,
    pillW: 13,
    pillH: 4.4,
    mouthW: 8,
    mouthH: 9,
    halfW: 12,
    halfH: 5.4,
    skin: 'mochi',
    faceStyle: 'neu',
    mouth: 'pill',
    float: true,
    floatAmp: 2.5,
    floatDur: 2200,
    hatAt: -60,
    hatK: 0.95,
    bodyFit: { k: 1.04, y: 52 },
    mochiDefault: 'o1',
    d: OCTOPUS_D,
    dKeys: keys,
    dDur: 3000,
    dEase: 'linear',
    d2: keys[8],
    dAt: (u) => pathLerp(keys, u),
  };
}

export const octopusShape: GfBotShape = /* @__PURE__ */ makeOctopus();

