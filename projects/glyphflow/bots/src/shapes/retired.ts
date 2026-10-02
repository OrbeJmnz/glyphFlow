import { squircle } from '../data/geometry';
import type { GfBotShape } from '../data/shape';

/** Formas retiradas: ya no se ofrecen sueltas, pero siguen existiendo (el robot toma su cuerpo de `cubo`). */
  // huevo: esfera blanda — el techo un poco más ancho, la base aplanada, sin simetría perfecta
export const eggShape: GfBotShape = { id:'egg', label:'Egg', retired:true,    palette:'lavender',  model:'sphere', R:64, cy:108, faceY:106, top:44, sideW:65, tilt:-4, mouth:'smile',
              d:'M101 44 C137 44 165 68 165.5 103 C166 137 147 171.5 100 172 C54 172 34 138 35 103 C36 68 65 44 101 44 Z' };

  // caramelo: la misma familia que el huevo, pero más ancho y bajo, ojos más juntos, mejillas más marcadas, sonrisa amplia
export const candyShape: GfBotShape = { id:'candy', label:'Candy', retired:true, palette:'caramel', model:'sphere', R:66, cy:116, faceY:113, top:58, sideW:71, tilt:3, mouth:'wide', eyeDx:16, cheek:1.25,
              d:'M100 58 C141 57 170.5 79 171 115 C171.5 147 146 172 100 172 C54 172 29 147 29.5 115 C30 79 59 58.5 100 58 Z' };

export const cubeShape: GfBotShape = { id:'cube', label:'Cube', retired:true,     palette:'sky',    model:'box', half:60, round:34, cy:112, faceY:110, top:53, sideW:62, d:/* @__PURE__ */ squircle(100, 112, 61, 59, 3.4, 3) };

export const pillShape: GfBotShape = { id:'pill', label:'Pill', retired:true,  palette:'mint',    model:'cyl', R:45, cy:106, faceY:104, d:'M100 40 A45 45 0 0 1 145 85 V127 A45 45 0 0 1 55 127 V85 A45 45 0 0 1 100 40 Z' };

export const dropShape: GfBotShape = { id:'drop', label:'Drop', retired:true,     palette:'aqua',     model:'sphere', R:60, cy:128, faceY:126, d:'M100 36 C116 64 160 92 160 128 C160 158 134 176 100 176 C66 176 40 158 40 128 C40 92 84 64 100 36 Z' };
