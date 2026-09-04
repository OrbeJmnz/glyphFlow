/**
 * Intenciones semánticas: los gestos de dos estados que casi toda app escribe a mano.
 *
 * Un intent NO es azúcar sintáctico para ahorrarse un ternario — eso no valdría una API. Lo que
 * trae es la CURADURÍA: el par de figuras, con qué resorte transiciona y si el estado activo es
 * transitorio. Eso es criterio por gesto, y es justo lo que un consumidor no tiene por qué volver
 * a decidir cada vez.
 *
 * Se usan por CONST IMPORTADA, no por atributo de texto:
 *
 * ```ts
 * import { COPY_INTENT } from 'glyphflow/morph';
 * ```
 * ```html
 * <gf-icon-morph [intent]="COPY_INTENT" [active]="copiado()" />
 * ```
 *
 * Un `import` de más contra un `intent="copy"`, y a cambio dos cosas: TypeScript caza el typo en
 * compilación en vez de dejar un icono mudo en runtime, y quien importa `COPY_INTENT` no paga las
 * figuras de los otros cinco. Un registro global por nombre habría arrastrado los doce iconos a
 * cualquiera que usara uno — el mismo problema que `provideIconCatalog()` existe para evitar.
 *
 * Por NOMBRE DE PAQUETE (`from 'glyphflow'`), nunca por ruta relativa: ver la cabecera de
 * `public-api.ts` de este entry point.
 */
import {
  checkIcon,
  chevronDownIcon,
  chevronUpIcon,
  copyIcon,
  eyeIcon,
  eyeOffIcon,
  menuIcon,
  moonIcon,
  pauseIcon,
  playIcon,
  sunIcon,
  xIcon,
} from 'glyphflow';
import type { MorphIcon } from './gf-icon-morph.component';
import type { SpringConfig, SpringPreset } from './morph-keyframes';

/** Un gesto de dos estados, con su carácter ya decidido. */
export interface MorphIntent {
  /** La figura en reposo, con `active` en `false`. */
  readonly idle: MorphIcon;
  /** La figura con `active` en `true`. */
  readonly active: MorphIcon;
  /** Con qué resorte transiciona. El input `spring` del componente lo pisa si se fija. */
  readonly spring?: SpringPreset | SpringConfig;
  /**
   * Milisegundos tras los que el estado activo vuelve solo a reposo. Ausente = se queda.
   *
   * Solo lo trae un intent cuyo estado activo sea TRANSITORIO — una confirmación. Un toggle que
   * refleja estado real (tema, contraseña, play/pausa) jamás debe volver solo: mentiría sobre lo
   * que está pasando de verdad.
   */
  readonly autoReset?: number;
}

/**
 * Copiar al portapapeles. El estado activo es una confirmación, así que se va sola a los 2 s.
 *
 * `snappy` porque una confirmación tiene que llegar de golpe: es la respuesta a un clic que el
 * usuario acaba de dar y está mirando.
 */
export const COPY_INTENT: MorphIntent = {
  idle: copyIcon,
  active: checkIcon,
  spring: 'snappy',
  autoReset: 2000,
};

/**
 * Claro ↔ oscuro. `active` = oscuro.
 *
 * `smooth` a propósito, contra el resto: cambiar de tema es un cambio de ambiente, no una
 * confirmación. Un resorte con rebote aquí se lee como un error, no como un gesto.
 */
export const THEME_INTENT: MorphIntent = {
  idle: sunIcon,
  active: moonIcon,
  spring: 'smooth',
};

/** Enseñar u ocultar una contraseña. `active` = la contraseña está a la vista. */
export const PASSWORD_INTENT: MorphIntent = {
  idle: eyeIcon,
  active: eyeOffIcon,
  spring: 'snappy',
};

/** Transporte de reproducción. `active` = está sonando, así que el botón ofrece pausar. */
export const PLAY_PAUSE_INTENT: MorphIntent = {
  idle: playIcon,
  active: pauseIcon,
  spring: 'snappy',
};

/** Menú de navegación. `active` = abierto, así que el botón ofrece cerrar. */
export const MENU_CLOSE_INTENT: MorphIntent = {
  idle: menuIcon,
  active: xIcon,
  spring: 'snappy',
};

/** Desplegar y plegar. `active` = desplegado, así que la punta mira arriba. */
export const EXPAND_COLLAPSE_INTENT: MorphIntent = {
  idle: chevronDownIcon,
  active: chevronUpIcon,
  spring: 'smooth',
};
