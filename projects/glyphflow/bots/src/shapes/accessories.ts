import { f2 } from '../data/color';
import { mochiTuft } from '../data/mochi';
import type { GfBotShapeAccessory } from '../data/shape';
import { MOCHI_TUFT } from './mochi-tuft';

/** Accesorios que comparten varias formas de Noche: el copete del Mochi y una antena luminosa. */

export const tuftAcc = (top: number, s = 1): GfBotShapeAccessory => ({ p:[1, top, -2], up:[0, -1, 0], n:[0, -.3, -.95],
  draw:(x, y, p, v) => `<g transform="translate(${f2(x)} ${f2(y)}) scale(${s}) translate(-101 -62.5)">${mochiTuft(v, p, MOCHI_TUFT)}</g>` });
export const antennaAcc = (top: number): GfBotShapeAccessory => ({ p:[0, top, 0], up:[0, -1, 0], fixed:true,
  draw:(x, y, p) => `<path d="M${x} ${y + 2} V${y - 11}" stroke="#7FB0FF" stroke-width="2.4" stroke-linecap="round"/><circle cx="${x}" cy="${y - 15}" r="6" fill="#6F9BFF" opacity=".5" filter="url(#${p}-mblur)"/><circle cx="${x}" cy="${y - 15}" r="4.4" fill="#A9CCFF"/>` });
// copete medido de la referencia: el trazo va en coordenadas absolutas, anclado en su base
