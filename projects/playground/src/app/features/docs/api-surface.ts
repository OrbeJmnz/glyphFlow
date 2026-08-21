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
}

/** Los ~1767 `export const xIcon` NO van aquí: se documentan como categoría, no uno por uno. */
export const SUFIJO_ICONO = /Icon$/;

export const API_VALORES: SimboloApi[] = [
  {
    nombre: 'MaxIconComponent',
    entrada: 'glyphflow',
    clase: 'componente',
    resumen: 'docs.api.simbolos.MaxIconComponent',
  },
  {
    nombre: 'provideMaxIcons',
    entrada: 'glyphflow',
    clase: 'función',
    resumen: 'docs.api.simbolos.provideMaxIcons',
  },
  {
    nombre: 'MAX_ICONS_CONFIG',
    entrada: 'glyphflow',
    clase: 'token',
    resumen: 'docs.api.simbolos.MAX_ICONS_CONFIG',
  },
  {
    nombre: 'provideIconCatalog',
    entrada: 'glyphflow',
    clase: 'función',
    resumen: 'docs.api.simbolos.provideIconCatalog',
  },
  {
    nombre: 'MAX_ICON_CATALOG',
    entrada: 'glyphflow',
    clase: 'token',
    resumen: 'docs.api.simbolos.MAX_ICON_CATALOG',
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
    nombre: 'MaxIconMorphComponent',
    entrada: 'glyphflow/morph',
    clase: 'componente',
    resumen: 'docs.api.simbolos.MaxIconMorphComponent',
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
    nombre: 'SPRING_PRESETS',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    resumen: 'docs.api.simbolos.SPRING_PRESETS',
  },
  {
    nombre: 'PASOS_DEFAULT',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    resumen: 'docs.api.simbolos.PASOS_DEFAULT',
  },
  {
    nombre: 'RESOLUCION_DEFAULT',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    resumen: 'docs.api.simbolos.RESOLUCION_DEFAULT',
  },
  {
    nombre: 'COLA_DEFAULT',
    entrada: 'glyphflow/morph',
    clase: 'constante',
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
  { nombre: 'MaxIconsConfig', entrada: 'glyphflow', resumen: 'docs.api.tipos.MaxIconsConfig' },
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
];
