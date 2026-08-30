/**
 * La superficie pública de glyphflow, como DATO.
 *
 * Existe así — y no como tablas escritas a mano en el HTML — para que un spec pueda compararla
 * contra lo que el paquete exporta de verdad, en las dos direcciones: un símbolo documentado que ya
 * no existe, y uno exportado que nadie documentó. Unas docs que se contradicen con el paquete son
 * peores que no tener docs, porque se leen igual de creíbles.
 *
 * `resumen` no es el texto — es la CLAVE de traducción (`docs.api.simbolos.*` / `docs.api.tipos.*`
 * en `i18n/docs/{en,es}.json`). `nombre` y `entrada` sí son texto real: son el símbolo y la ruta de
 * import tal cual existen en el paquete, iguales en cualquier idioma, así que nunca pasan por
 * Transloco.
 */

export type Entrada = 'glyphflow' | 'glyphflow/morph';
export type Clase = 'componente' | 'función' | 'token' | 'constante';

export interface SimboloApi {
  nombre: string;
  entrada: Entrada;
  clase: Clase;
  /** Clave de traducción, no el texto — ver la nota de arriba. */
  resumen: string;
  /**
   * Si está, este símbolo es un alias `@deprecated` y aquí va el nombre que lo reemplaza.
   *
   * No basta con borrarlo de esta lista: el spec exige que TODO export esté documentado, y el
   * alias sigue exportado. Y aunque no lo exigiera, quien llega con código de la v1 necesita
   * encontrar en la página a qué migrar — que es justo cuando va a buscarlo.
   */
  obsoleto?: string;
}

/** Los ~1767 `export const xIcon` NO van aquí: se documentan como categoría, no uno por uno. */
export const SUFIJO_ICONO = /Icon$/;

export const API_VALORES: SimboloApi[] = [
  {
    nombre: 'GfIconComponent',
    entrada: 'glyphflow',
    clase: 'componente',
    resumen: 'docs.api.simbolos.GfIconComponent',
  },
  {
    nombre: 'provideGfIcons',
    entrada: 'glyphflow',
    clase: 'función',
    resumen: 'docs.api.simbolos.provideGfIcons',
  },
  {
    nombre: 'GF_ICONS_CONFIG',
    entrada: 'glyphflow',
    clase: 'token',
    resumen: 'docs.api.simbolos.GF_ICONS_CONFIG',
  },
  {
    nombre: 'provideIconCatalog',
    entrada: 'glyphflow',
    clase: 'función',
    resumen: 'docs.api.simbolos.provideIconCatalog',
  },
  {
    nombre: 'GF_ICON_CATALOG',
    entrada: 'glyphflow',
    clase: 'token',
    resumen: 'docs.api.simbolos.GF_ICON_CATALOG',
  },
  {
    nombre: 'CURATED_ICONS',
    entrada: 'glyphflow',
    clase: 'constante',
    resumen: 'docs.api.simbolos.CURATED_ICONS',
  },
  {
    nombre: 'GENERATED_ICONS',
    entrada: 'glyphflow',
    clase: 'constante',
    resumen: 'docs.api.simbolos.GENERATED_ICONS',
  },
  {
    nombre: 'ANIMATED_ICONS',
    entrada: 'glyphflow',
    clase: 'constante',
    resumen: 'docs.api.simbolos.ANIMATED_ICONS',
  },
  {
    nombre: 'ANIMATED_ICON_NAMES',
    entrada: 'glyphflow',
    clase: 'constante',
    resumen: 'docs.api.simbolos.ANIMATED_ICON_NAMES',
  },
  {
    nombre: 'ICON_ALIASES',
    entrada: 'glyphflow',
    clase: 'constante',
    resumen: 'docs.api.simbolos.ICON_ALIASES',
  },
  {
    nombre: 'resolveIconName',
    entrada: 'glyphflow',
    clase: 'función',
    resumen: 'docs.api.simbolos.resolveIconName',
  },
  {
    nombre: 'ICON_META',
    entrada: 'glyphflow',
    clase: 'constante',
    resumen: 'docs.api.simbolos.ICON_META',
  },
  {
    nombre: 'ICON_TAGS',
    entrada: 'glyphflow',
    clase: 'constante',
    resumen: 'docs.api.simbolos.ICON_TAGS',
  },
  // Los nombres de la v1. Se documentan porque la v2 los sigue exportando —el spec exige que TODO
  // export esté documentado— y porque quien llegue con código de la v1 tiene que encontrar a qué
  // migrar, que es justo cuando va a buscarlo.
  {
    nombre: 'MaxIconComponent',
    entrada: 'glyphflow',
    clase: 'componente',
    obsoleto: 'GfIconComponent',
    resumen: 'docs.api.simbolos.GfIconComponent',
  },
  {
    nombre: 'provideMaxIcons',
    entrada: 'glyphflow',
    clase: 'función',
    obsoleto: 'provideGfIcons',
    resumen: 'docs.api.simbolos.provideGfIcons',
  },
  {
    nombre: 'MAX_ICONS_CONFIG',
    entrada: 'glyphflow',
    clase: 'token',
    obsoleto: 'GF_ICONS_CONFIG',
    resumen: 'docs.api.simbolos.GF_ICONS_CONFIG',
  },
  {
    nombre: 'MAX_ICON_CATALOG',
    entrada: 'glyphflow',
    clase: 'token',
    obsoleto: 'GF_ICON_CATALOG',
    resumen: 'docs.api.simbolos.GF_ICON_CATALOG',
  },
  {
    nombre: 'GfIconMorphComponent',
    entrada: 'glyphflow/morph',
    clase: 'componente',
    resumen: 'docs.api.simbolos.GfIconMorphComponent',
  },
  {
    nombre: 'MaxIconMorphComponent',
    entrada: 'glyphflow/morph',
    clase: 'componente',
    obsoleto: 'GfIconMorphComponent',
    resumen: 'docs.api.simbolos.GfIconMorphComponent',
  },
  {
    nombre: 'morphKeyframes',
    entrada: 'glyphflow/morph',
    clase: 'función',
    resumen: 'docs.api.simbolos.morphKeyframes',
  },
  {
    nombre: 'runMorph',
    entrada: 'glyphflow/morph',
    clase: 'función',
    resumen: 'docs.api.simbolos.runMorph',
  },
  {
    nombre: 'canonicalD',
    entrada: 'glyphflow/morph',
    clase: 'función',
    resumen: 'docs.api.simbolos.canonicalD',
  },
  {
    nombre: 'morphAt',
    entrada: 'glyphflow/morph',
    clase: 'función',
    resumen: 'docs.api.simbolos.morphAt',
  },
  {
    nombre: 'createLiveMorph',
    entrada: 'glyphflow/morph',
    clase: 'función',
    resumen: 'docs.api.simbolos.createLiveMorph',
  },
  {
    nombre: 'SPRING_PRESETS',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    resumen: 'docs.api.simbolos.SPRING_PRESETS',
  },
  {
    nombre: 'STEPS_DEFAULT',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    resumen: 'docs.api.simbolos.STEPS_DEFAULT',
  },
  {
    nombre: 'RESOLUTION_DEFAULT',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    resumen: 'docs.api.simbolos.RESOLUTION_DEFAULT',
  },
  {
    nombre: 'SPRING_TAIL_DEFAULT',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    resumen: 'docs.api.simbolos.SPRING_TAIL_DEFAULT',
  },
  {
    nombre: 'correspondenceIsPoor',
    entrada: 'glyphflow/morph',
    clase: 'función',
    resumen: 'docs.api.simbolos.correspondenceIsPoor',
  },
  {
    nombre: 'QUALITY_RESIDUAL_MAX',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    resumen: 'docs.api.simbolos.QUALITY_RESIDUAL_MAX',
  },
  {
    nombre: 'QUALITY_FRAGMENTATION_MAX',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    resumen: 'docs.api.simbolos.QUALITY_FRAGMENTATION_MAX',
  },
  {
    nombre: 'maxLinearDeviation',
    entrada: 'glyphflow/morph',
    clase: 'función',
    resumen: 'docs.api.simbolos.maxLinearDeviation',
  },
  // Los nombres de la v1. Se documentan porque siguen exportados —el spec exige que TODO export
  // esté documentado— y porque quien llegue con código viejo tiene que encontrar a qué migrar.
  {
    nombre: 'PASOS_DEFAULT',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    obsoleto: 'STEPS_DEFAULT',
    resumen: 'docs.api.simbolos.PASOS_DEFAULT',
  },
  {
    nombre: 'RESOLUCION_DEFAULT',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    obsoleto: 'RESOLUTION_DEFAULT',
    resumen: 'docs.api.simbolos.RESOLUCION_DEFAULT',
  },
  {
    nombre: 'COLA_DEFAULT',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    obsoleto: 'SPRING_TAIL_DEFAULT',
    resumen: 'docs.api.simbolos.COLA_DEFAULT',
  },
];

/** Tipos: se erosionan en runtime, así que el spec los verifica al COMPILAR, importándolos. */
export const API_TIPOS: { nombre: string; entrada: Entrada; resumen: string }[] = [
  {
    nombre: 'AnimatedIconDef',
    entrada: 'glyphflow',
    resumen: 'docs.api.tipos.AnimatedIconDef',
  },
  {
    nombre: 'IconShape',
    entrada: 'glyphflow',
    resumen: 'docs.api.tipos.IconShape',
  },
  {
    nombre: 'IconChoreography',
    entrada: 'glyphflow',
    resumen: 'docs.api.tipos.IconChoreography',
  },
  {
    nombre: 'MotionTrack',
    entrada: 'glyphflow',
    resumen: 'docs.api.tipos.MotionTrack',
  },
  {
    nombre: 'AutoDraw',
    entrada: 'glyphflow',
    resumen: 'docs.api.tipos.AutoDraw',
  },
  {
    nombre: 'AnimatedIconTrigger',
    entrada: 'glyphflow',
    resumen: 'docs.api.tipos.AnimatedIconTrigger',
  },
  { nombre: 'GfIconsConfig', entrada: 'glyphflow', resumen: 'docs.api.tipos.GfIconsConfig' },
  { nombre: 'IconMeta', entrada: 'glyphflow', resumen: 'docs.api.tipos.IconMeta' },
  {
    nombre: 'MorphIcon',
    entrada: 'glyphflow/morph',
    resumen: 'docs.api.tipos.MorphIcon',
  },
  {
    nombre: 'MorphKeyframes',
    entrada: 'glyphflow/morph',
    resumen: 'docs.api.tipos.MorphKeyframes',
  },
  {
    nombre: 'MorphKeyframesOpts',
    entrada: 'glyphflow/morph',
    resumen: 'docs.api.tipos.MorphKeyframesOpts',
  },
  {
    nombre: 'RunMorphOpts',
    entrada: 'glyphflow/morph',
    resumen: 'docs.api.tipos.RunMorphOpts',
  },
  {
    nombre: 'SpringConfig',
    entrada: 'glyphflow/morph',
    resumen: 'docs.api.tipos.SpringConfig',
  },
  {
    nombre: 'SpringPreset',
    entrada: 'glyphflow/morph',
    resumen: 'docs.api.tipos.SpringPreset',
  },
  {
    nombre: 'LiveMorph',
    entrada: 'glyphflow/morph',
    resumen: 'docs.api.tipos.LiveMorph',
  },
  {
    nombre: 'LiveMorphOpts',
    entrada: 'glyphflow/morph',
    resumen: 'docs.api.tipos.LiveMorphOpts',
  },
];
