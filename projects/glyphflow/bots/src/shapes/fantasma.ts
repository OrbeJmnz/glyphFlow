import { fantPath } from '../data/fantasma';
import type { GfBotShape } from '../data/shape';

  // fantasma: la hoja de referencia «Fantasma · variante 12» (silueta y cara medidas; el borde ondula solo)
export const fantasmaShape: GfBotShape = { id:'fantasma', bodyFit:{ k:.93, y:66 }, hatAt:-54.2, hatK:.72, label:'Fantasma', palette:'niebla', model:'sphere', R:50, cy:117, faceY:107.8, top:60.1, sideW:50, float:true,
              eyeDx:20.2, eyeW:9.9, eyeH:16.5, eyeR:.5, mouthDy:8.4, halfW:13, halfH:5.7, mouthW:8, mouthH:10, pillW:12.5, pillH:6,
              skin:'mochi', faceStyle:'fant', mouth:'pill', family:'fant', d:/* @__PURE__ */ fantPath(0), d2:/* @__PURE__ */ fantPath(1), dAt:fantPath };
