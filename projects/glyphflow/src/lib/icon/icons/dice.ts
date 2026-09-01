// Familia `dice` del catálogo curado (6 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { track, icon } from '../choreography';

/**
 * UN DADO RUEDA, NO GIRA. Cara por cara, apoyando cada una en el piso.
 *
 * Antes esto era `rotate` puro alrededor del centro con pausas cada 45°: un cuadrado dando
 * vueltas en su eje, que es justo lo que NO hace un dado, y encima frenando en las posiciones de
 * canto. Lo que lo convierte en un rodado es la ALTURA.
 *
 * La cuenta: el cuadrado mide 18 de lado, así que su semidiagonal es 9·√2 = 12.728. Girado θ
 * alrededor del centro, su punto más bajo queda en 12 + 12.728·cos(45° − θ). En 0° y 90° eso da
 * 21 —la cara plana sobre el piso— pero en 45° da 24.728: el vértice se hunde 3.728 por debajo.
 * Levantarlo esa misma cantidad deja la esquina EXACTAMENTE en el piso mientras pasa por encima
 * de ella. Los pasos intermedios de 22.5° (2.76) existen porque WAAPI interpola en línea recta
 * entre keyframes y sin ellos el dado se hundiría ~0.9 a media vuelta.
 *
 * Sin desplazamiento horizontal a propósito: en 45° el cuadrado ya asoma 0.73 fuera de la caja por
 * cada lado, y correrlo además de lado —como hacía la referencia con su `translateX(-20%)`— lo
 * recorta. La altura sola ya cuenta la historia: el borde de abajo no se despega del piso.
 *
 * Y termina en 180° y no en 360° porque las seis caras de Lucide son simétricas a media vuelta
 * (dice-2: (15,9)↔(9,15); dice-3: (16,8)↔(8,16); dice-6 por pares). O sea que el dado acaba
 * idéntico a como empezó, con la mitad del recorrido.
 *
 * `linear` explícito: los offsets YA llevan la física —subir el canto es lento, caer del otro
 * lado es rápido— y encimarles un `ease-in-out` global se la borra.
 *
 * `origin: '50% 50%'` y NO en px: esto anima la RAÍZ (`root`), y el motor solo pone
 * `transform-box: view-box` en figuras hijas — en la raíz el origen cae contra el borde del
 * elemento `<svg>` renderizado. `'12px 12px'` acertaba de pura casualidad a 24px de tamaño, pero
 * en cualquier otro `size` quedaba clavado a 12px reales del borde y el giro pivotaba en una
 * esquina en vez del centro. El porcentaje sí es independiente del tamaño — y el `<svg>` siempre
 * es cuadrado (mismo alto que ancho), así que el centro cae exacto sin importar el box model.
 */
const DICE_ROLL_MS = 1100;
const DICE_ROLL = /* @__PURE__ */ [
  { transform: 'translateY(0) rotate(0deg)', offset: 0 },
  { transform: 'translateY(-2.76px) rotate(22.5deg)', offset: 0.08 },
  { transform: 'translateY(-3.728px) rotate(45deg)', offset: 0.15 },
  { transform: 'translateY(-2.76px) rotate(67.5deg)', offset: 0.2 },
  { transform: 'translateY(0) rotate(90deg)', offset: 0.24 },
  { transform: 'translateY(0) rotate(90deg)', offset: 0.5 },
  { transform: 'translateY(-2.76px) rotate(112.5deg)', offset: 0.58 },
  { transform: 'translateY(-3.728px) rotate(135deg)', offset: 0.65 },
  { transform: 'translateY(-2.76px) rotate(157.5deg)', offset: 0.7 },
  { transform: 'translateY(0) rotate(180deg)', offset: 0.74 },
  { transform: 'translateY(0) rotate(180deg)', offset: 1 },
];

export const dice1Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: 'M12 12h.01' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(DICE_ROLL, DICE_ROLL_MS, { easing: 'linear', origin: '50% 50%' }),
    },
  },
);

export const dice2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: 'M15 9h.01' },
    { tag: 'path', d: 'M9 15h.01' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(DICE_ROLL, DICE_ROLL_MS, { easing: 'linear', origin: '50% 50%' }),
    },
  },
);

export const dice3Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: 'M16 8h.01' },
    { tag: 'path', d: 'M12 12h.01' },
    { tag: 'path', d: 'M8 16h.01' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(DICE_ROLL, DICE_ROLL_MS, { easing: 'linear', origin: '50% 50%' }),
    },
  },
);

export const dice4Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: 'M16 8h.01' },
    { tag: 'path', d: 'M8 8h.01' },
    { tag: 'path', d: 'M8 16h.01' },
    { tag: 'path', d: 'M16 16h.01' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(DICE_ROLL, DICE_ROLL_MS, { easing: 'linear', origin: '50% 50%' }),
    },
  },
);

export const dice5Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: 'M16 8h.01' },
    { tag: 'path', d: 'M8 8h.01' },
    { tag: 'path', d: 'M8 16h.01' },
    { tag: 'path', d: 'M16 16h.01' },
    { tag: 'path', d: 'M12 12h.01' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(DICE_ROLL, DICE_ROLL_MS, { easing: 'linear', origin: '50% 50%' }),
    },
  },
);

export const dice6Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: 'M16 8h.01' },
    { tag: 'path', d: 'M16 12h.01' },
    { tag: 'path', d: 'M16 16h.01' },
    { tag: 'path', d: 'M8 8h.01' },
    { tag: 'path', d: 'M8 12h.01' },
    { tag: 'path', d: 'M8 16h.01' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(DICE_ROLL, DICE_ROLL_MS, { easing: 'linear', origin: '50% 50%' }),
    },
  },
);
