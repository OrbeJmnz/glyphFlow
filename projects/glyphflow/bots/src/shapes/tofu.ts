import { f2 } from '../data/color';
import { mochiTuft } from '../data/mochi';
import type { GfBotShape } from '../data/shape';

  // globo: el bocadillo de chat — cuadrado blando, la esquina de abajo a la derecha en punta y una muesca
  // en arco en la base (por ahí asoma un «pie» del color del copete). Medido de la referencia, como el mochi.
export const tofuShape: GfBotShape = { id:'tofu', hatAt:-64.5, hatK:.84, bodyFit:{ k:1.12, y:58 }, label:'Tofu', palette:'mist', model:'sphere', depth:0.78, flex:.45, R:64, half:64, round:30, cy:112, faceY:107.5, top:49, sideW:64, eyeDx:22, eyeW:12.5, eyeH:20.5, mouthDy:19.5, skin:'mochi', faceStyle:'tofu', mouth:'oval', mochiDefault:'flat',
              d:'M68 49 H131 C149.2 49 164 63.8 164 82 V148 C164 162.9 151.9 175 137 175 H63 C48.1 175 36 162.9 36 148 V82 C36 63.8 50.3 49 68 49 Z',
              acc:[{ p:[-1, -60, -2], up:[0, -1, 0], n:[0, -.3, -.95], minW:.62, draw:(x, y, p, v) => `<g transform="translate(${f2(x - 99)} ${f2(y - 52)})">${mochiTuft(v, p, 'M76 53 C77 45 81 37 85 32.5 Q90 26.5 95 32.5 L101 39 L107 33 Q112 27.5 116.5 33 C119.5 38 121 45 122 53 Z')}</g>` } ],
              // el piecito ya no es un accesorio suelto (se despegaba al girar y dejaba un hueco): va pintado DENTRO del cuerpo
              footPaint:'M86 177 C91 171 96 164.5 102 164.5 C108 164.5 114 171 122 177 Z', footArc:'M89 175.5 C92 170 96 166.5 102 166.5 C110 166.5 116 170 120 175.5' };
