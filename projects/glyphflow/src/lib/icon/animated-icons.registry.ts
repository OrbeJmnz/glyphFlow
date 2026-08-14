import { AnimatedIconDef } from './animated-icon.model';
import { CURATED_ICONS } from './curated-icons';
import { GENERATED_ICONS } from './generated-icons';

/**
 * Composición final: generado primero, curado al final — un argumento posterior de
 * `Object.assign` siempre gana sobre uno anterior, así que si algún nombre existiera en ambos (no
 * debería pasar, ver generated-icons.ts), lo curado a mano manda siempre.
 *
 * `Object.assign`, NO spread (`{...a, ...b}`) — verificado con una reproducción mínima en esbuild
 * directo: el spread de un objeto importado de otro módulo impide que esbuild elimine TODO lo que
 * ese objeto referencia, incluso cuando el resultado del spread nunca se usa. `Object.assign` es
 * una llamada normal, así que la marca "puro" sí aplica y sí se puede eliminar si nadie la usa.
 */
export const ANIMATED_ICONS: Record<string, AnimatedIconDef> = /* @__PURE__ */ Object.assign(
  {},
  GENERATED_ICONS,
  CURATED_ICONS,
);

/**
 * Nombres disponibles — útil para catálogos/demos sin exponer el registro completo.
 *
 * La marca "puro" inline (pegada al `Object.keys`, no aquí arriba a propósito — un comentario de
 * bloque en esta posición confunde al escáner de Rollup con una anotación mal puesta) es
 * obligatoria: sin ella esbuild trata la llamada como si pudiera tener efectos secundarios y
 * jamás la elimina aunque nadie use `ANIMATED_ICON_NAMES` — y al referenciar `ANIMATED_ICONS`,
 * eso ancla el registro completo (los 184 iconos) en cualquier build que use uno solo. Verificado
 * con una reproducción mínima en esbuild directo.
 */
export const ANIMATED_ICON_NAMES = /* @__PURE__ */ Object.keys(ANIMATED_ICONS);

/**
 * Nombres VIEJOS de Lucide que la app sigue usando en sus templates. Lucide los renombró y
 * `lucide-angular` los resuelve por alias, pero este registro guarda el nombre nuevo — sin este
 * mapa, `<app-animated-icon name="alert-triangle">` no pintaría nada y nadie sabría por qué.
 *
 * Solo van renombramientos REALES (mismo glifo). Si el dibujo cambió, no es alias: es otro icono.
 */
export const ICON_ALIASES: Record<string, string> = {
  'alert-triangle': 'triangle-alert',
  'alert-circle': 'circle-alert',
  'check-circle': 'circle-check',
  'x-circle': 'circle-x',
  'help-circle': 'circle-question-mark',
  'plus-circle': 'circle-plus',
  'more-horizontal': 'ellipsis',
  'loader-2': 'loader-circle',
  filter: 'funnel',
  // Renombramientos que trae esta versión de Lucide y que la app aún escribe a la antigua.
  'bar-chart-3': 'chart-column',
  edit: 'square-pen',
  'edit-2': 'pen',
  'edit-3': 'pen-line',
  'file-check-2': 'file-check-corner',
  'file-warning': 'file-exclamation-point',
  'flip-horizontal': 'square-centerline-dashed-horizontal',
  'flip-vertical': 'square-centerline-dashed-vertical',
  home: 'house',
  'more-vertical': 'ellipsis-vertical',
  'upload-cloud': 'cloud-upload',
};

/** Resuelve alias → nombre canónico del registro. */
export function resolveIconName(name: string): string {
  return ICON_ALIASES[name] ?? name;
}