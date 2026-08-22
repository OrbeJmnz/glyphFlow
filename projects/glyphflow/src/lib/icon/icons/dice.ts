// Familia `dice` del catálogo curado (6 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, icon } from '../choreography';

export const dice1Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: 'M12 12h.01' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(45deg)', offset: 0.0714 },
          { transform: 'rotate(45deg)', offset: 0.25 },
          { transform: 'rotate(90deg)', offset: 0.3214 },
          { transform: 'rotate(90deg)', offset: 0.5 },
          { transform: 'rotate(135deg)', offset: 0.5714 },
          { transform: 'rotate(135deg)', offset: 0.75 },
          { transform: 'rotate(180deg)', offset: 0.8214 },
          { transform: 'rotate(180deg)', offset: 1 },
        ],
        2520,
        { easing: EASE, origin: '12px 12px' },
      ),
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
      root: /* @__PURE__ */ track(
        [
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(45deg)', offset: 0.0714 },
          { transform: 'rotate(45deg)', offset: 0.25 },
          { transform: 'rotate(90deg)', offset: 0.3214 },
          { transform: 'rotate(90deg)', offset: 0.5 },
          { transform: 'rotate(135deg)', offset: 0.5714 },
          { transform: 'rotate(135deg)', offset: 0.75 },
          { transform: 'rotate(180deg)', offset: 0.8214 },
          { transform: 'rotate(180deg)', offset: 1 },
        ],
        2520,
        { easing: EASE, origin: '12px 12px' },
      ),
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
      root: /* @__PURE__ */ track(
        [
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(45deg)', offset: 0.0714 },
          { transform: 'rotate(45deg)', offset: 0.25 },
          { transform: 'rotate(90deg)', offset: 0.3214 },
          { transform: 'rotate(90deg)', offset: 0.5 },
          { transform: 'rotate(135deg)', offset: 0.5714 },
          { transform: 'rotate(135deg)', offset: 0.75 },
          { transform: 'rotate(180deg)', offset: 0.8214 },
          { transform: 'rotate(180deg)', offset: 1 },
        ],
        2520,
        { easing: EASE, origin: '12px 12px' },
      ),
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
      root: /* @__PURE__ */ track(
        [
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(45deg)', offset: 0.0714 },
          { transform: 'rotate(45deg)', offset: 0.25 },
          { transform: 'rotate(90deg)', offset: 0.3214 },
          { transform: 'rotate(90deg)', offset: 0.5 },
          { transform: 'rotate(135deg)', offset: 0.5714 },
          { transform: 'rotate(135deg)', offset: 0.75 },
          { transform: 'rotate(180deg)', offset: 0.8214 },
          { transform: 'rotate(180deg)', offset: 1 },
        ],
        2520,
        { easing: EASE, origin: '12px 12px' },
      ),
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
      root: /* @__PURE__ */ track(
        [
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(45deg)', offset: 0.0714 },
          { transform: 'rotate(45deg)', offset: 0.25 },
          { transform: 'rotate(90deg)', offset: 0.3214 },
          { transform: 'rotate(90deg)', offset: 0.5 },
          { transform: 'rotate(135deg)', offset: 0.5714 },
          { transform: 'rotate(135deg)', offset: 0.75 },
          { transform: 'rotate(180deg)', offset: 0.8214 },
          { transform: 'rotate(180deg)', offset: 1 },
        ],
        2520,
        { easing: EASE, origin: '12px 12px' },
      ),
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
      root: /* @__PURE__ */ track(
        [
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(45deg)', offset: 0.0714 },
          { transform: 'rotate(45deg)', offset: 0.25 },
          { transform: 'rotate(90deg)', offset: 0.3214 },
          { transform: 'rotate(90deg)', offset: 0.5 },
          { transform: 'rotate(135deg)', offset: 0.5714 },
          { transform: 'rotate(135deg)', offset: 0.75 },
          { transform: 'rotate(180deg)', offset: 0.8214 },
          { transform: 'rotate(180deg)', offset: 1 },
        ],
        2520,
        { easing: EASE, origin: '12px 12px' },
      ),
    },
  },
);
