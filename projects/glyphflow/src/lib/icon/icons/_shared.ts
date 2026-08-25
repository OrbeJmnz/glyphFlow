// Helpers de coreografía que comparten VARIAS familias.
//
// Viven aquí y no duplicados en cada familia a propósito: dos copias del mismo helper se
// desincronizan en cuanto alguien ajusta un timing en una sola, y eso no lo caza ningún test
// — el lock ancla la coreografía resultante, no de dónde salió. Una sola fuente, un solo ajuste.
import { rotateSeq, scaleSeq } from '../choreography';

/** Copiado y confirmado: la misma separación de copy y la palomita se dibuja de insignia. */
// Se despega de verdad, más lejos y con rebote elástico, en vez del handshake chico.
export const COPY_PEEL = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(3px, -3px)' },
  { transform: 'translate(0, 0)' },
];

// Palpitar real: 4 pulsaciones que se van apagando, como un corazón calmándose.
export const HEART_QUAD_PULSE = /* @__PURE__ */ scaleSeq([1, 1.16, 1, 1.16, 1, 1.1, 1, 1.06, 1]);

// La esquina doblada gira desde donde se pega a la hoja, como si se doblara en el momento.
// Mismo carácter que `file-badge:chida` (el papel cede, el sello se aprieta) — aquí la esquina
// es la insignia: se aprieta y rebota en vez de solo girar. `flip` guarda el giro original.
export const FOLD_CHIDA = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(0.85)' },
  { transform: 'scale(1.08)' },
  { transform: 'scale(1)' },
];

/** Revisado: la palomita se dibuja sobre la tabla. */
// Variantes de la sección 6: reutilizan insignias que YA tienen animación en otro icono de la
// librería (pen, +, -, x, check, search, sync) — mismo criterio, aplicado a la insignia nueva.
export const BADGE_BOUNCE_DRAW = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'scale(0.8)' },
  { strokeDasharray: '1', strokeDashoffset: '0.4', opacity: '0.6', transform: 'scale(1.25)' },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)' },
];

export const X_SNAP_DRAW = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'scale(1)' },
  { strokeDasharray: '1', strokeDashoffset: '0.5', opacity: '0.5', transform: 'scale(1.15)' },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)' },
];

export const REFRESH_SPIN = /* @__PURE__ */ rotateSeq([0, 360]);

export const SHIELD_GEAR_SPIN = /* @__PURE__ */ [
  { transform: 'scale(1) rotate(0deg)' },
  { transform: 'scale(1.15) rotate(360deg)' },
  { transform: 'scale(1) rotate(720deg)' },
];

/**
 * Una figura sola no tiene con qué escalonarse, así que late. Es el mismo pulso que `circle` usa
 * desde siempre para su aro pelado; aquí lo comparten todos los iconos de una sola pieza.
 */
export const LATIDO = /* @__PURE__ */ scaleSeq([1, 1.15, 1]);
