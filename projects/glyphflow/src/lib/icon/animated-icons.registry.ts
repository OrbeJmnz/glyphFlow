import { AnimatedIconDef } from './animated-icon.model';
import { CURATED_ICONS } from './curated-icons';
import { GENERATED_ICONS } from './generated-icons';
import { ICON_TAGS } from './icon-tags';
import { ICON_VARIANTS } from './icon-variants';

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
 * eso ancla el catálogo completo (los ~1767 iconos) en cualquier build que use uno solo.
 * Verificado con una reproducción mínima en esbuild directo.
 */
export const ANIMATED_ICON_NAMES = /* @__PURE__ */ Object.keys(ANIMATED_ICONS);

/** Metadata liviana por icono — la consume tooling (playground, filtros, futuro morph), nunca el
 * motor de animación. `curated: true` = coreografía con intención en curated-icons.ts; `false` =
 * solo geometría + draw automático en generated-icons.ts. `morphTargets` queda reservado para v2
 * (morph) — sin poblar todavía, no se inventan relaciones sin base real.
 */
export interface IconMeta {
  name: string;
  source: 'lucide';
  autoDraw: boolean;
  curated: boolean;
  /**
   * Los sinónimos con los que Lucide indexa el icono: `trash-2` trae `delete`, que es justo lo que
   * alguien teclea cuando no se sabe el nombre.
   *
   * **Requerido, no opcional**, y eso es un hecho medido, no un optimismo: los 1767 del catálogo
   * tienen al menos uno, verificado en las dos direcciones contra `lucide-static/tags.json`. El
   * generador lo vuelve a comprobar en cada corrida y ABORTA si alguno se queda sin — así el día
   * que Lucide publique uno pelado se entera un humano, en vez de colarse un `[]` silencioso.
   *
   * Si solo necesitas buscar, importa `ICON_TAGS` directo: tocar `ICON_META` arrastra el catálogo
   * completo, porque se construye sobre `ANIMATED_ICON_NAMES`.
   */
  tags: readonly string[];
  /**
   * Qué animaciones tiene el icono, además de `draw` (que siempre está — la inyecta `icon()`).
   * Sin esto, la única vía para saberlo es `Object.keys(ANIMATED_ICONS[nombre].animations)`, que
   * arrastra el catálogo entero — exactamente lo que `provideIconCatalog()` existe para evitar.
   *
   * Si solo necesitas esto, importa `ICON_VARIANTS` directo: tocar `ICON_META` arrastra el
   * catálogo completo, igual que con `tags`.
   */
  variants: readonly string[];
  morphTargets?: string[];
}

/**
 * Dos marcas "puro" hacen falta aquí, no una — lección de la regresión que encontró
 * `bundle-check` a escala completa (funcionaba con 22 iconos, se rompió con 1772): anotar SOLO la
 * llamada exterior (`Object.fromEntries`) no basta si su argumento contiene una llamada sin
 * anotar (`.map()`). esbuild no elimina una expresión si CUALQUIER sub-llamada dentro de ella
 * podría tener efectos secundarios, sin importar que la exterior esté marcada pura — mismo patrón
 * exacto que ya rompió `icon()` con sus helpers anidados (ver curated-icons.ts).
 */
export const ICON_META: Record<string, IconMeta> = /* @__PURE__ */ Object.fromEntries(
  /* @__PURE__ */ ANIMATED_ICON_NAMES.map((name) => [
    name,
    {
      name,
      source: 'lucide' as const,
      autoDraw: true,
      curated: !!CURATED_ICONS[name],
      // Acceso a propiedad, no llamada: no hay una sub-expresión más que anotar. Aquí colgarlo
      // sale gratis en peso porque quien llega a `ICON_META` ya se trajo el catálogo entero.
      tags: ICON_TAGS[name],
      variants: ICON_VARIANTS[name],
    },
  ]),
);

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
  // Renombre puro verificado contra lucide-static@1.31.0: la geometría de `rotate-ccw-clock` es
  // byte por byte la misma que tenía `history`, y Lucide sigue publicando `history.svg` como
  // alias deprecado (no lo borró como sí hizo con los logos de marca).
  history: 'rotate-ccw-clock',
};

/** Resuelve alias → nombre canónico del registro. */
export function resolveIconName(name: string): string {
  return ICON_ALIASES[name] ?? name;
}