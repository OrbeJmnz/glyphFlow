import { f2 } from '../data/color';
import { CAT_BODY, catPart } from '../data/cat';
import type { GfBotShape } from '../data/shape';

  // gato: la hoja de referencia «Gato · variante 12» (silueta medida; orejas y cola detrás del cuerpo)
export const catShape: GfBotShape = { id:'cat', bodyFit:{ k:.92, y:69 }, label:'Cat', hatAt:-52.2, hatK:.78, palette:'tangerine', model:'sphere', R:61, cy:119, faceY:113, top:64.6, sideW:61, eyeDx:18, eyeW:11, eyeH:17, eyeR:.5, mouthDy:13.5,
              skin:'mochi', faceStyle:'cat', mouth:'pill', baseMouth:'w', pillW:10, pillH:5.2, family:'cat', d:CAT_BODY,
              acc:[{ p:[-38.8, -21.9, -3], up:[0, -1, 0], n:[0, 0, 1], minW:.55, backOnly:true, draw:(x, y, p, v) => `<g transform="translate(${f2(x - 61.17)} ${f2(y - 97.12)})">${catPart(v, p, 'earL')}</g>` },
                   { p:[40.2, -24.4, -3], up:[0, -1, 0], n:[0, 0, 1], minW:.55, backOnly:true, draw:(x, y, p, v) => `<g transform="translate(${f2(x - 140.23)} ${f2(y - 94.62)})">${catPart(v, p, 'earR')}</g>` },
                   { p:[71.5, 43.1, -26], up:[0, -1, 0], fade:[0, 26], draw:(x, y, p, v) => `<g transform="translate(${f2(x - 171.51)} ${f2(y - 162.12)})">${catPart(v, p, 'tail')}</g>` }] };
