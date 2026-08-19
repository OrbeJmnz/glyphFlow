/**
 * La superficie pública de glyphflow, como DATO.
 *
 * Existe así — y no como tablas escritas a mano en el HTML — para que un spec pueda compararla
 * contra lo que el paquete exporta de verdad, en las dos direcciones: un símbolo documentado que ya
 * no existe, y uno exportado que nadie documentó. Unas docs que se contradicen con el paquete son
 * peores que no tener docs, porque se leen igual de creíbles.
 */

export type Entrada = 'glyphflow' | 'glyphflow/morph';
export type Clase = 'componente' | 'función' | 'token' | 'constante';

export interface SimboloApi {
  nombre: string;
  entrada: Entrada;
  clase: Clase;
  resumen: string;
}

/** Los ~1767 `export const xIcon` NO van aquí: se documentan como categoría, no uno por uno. */
export const SUFIJO_ICONO = /Icon$/;

export const API_VALORES: SimboloApi[] = [
  {
    nombre: 'MaxIconComponent',
    entrada: 'glyphflow',
    clase: 'componente',
    resumen: 'El motor. Selector <max-icon>. Standalone.',
  },
  {
    nombre: 'provideMaxIcons',
    entrada: 'glyphflow',
    clase: 'función',
    resumen: 'Config global opcional. Hoy solo durationScale.',
  },
  {
    nombre: 'MAX_ICONS_CONFIG',
    entrada: 'glyphflow',
    clase: 'token',
    resumen: 'El InjectionToken detrás de provideMaxIcons, por si lo quieres proveer tú.',
  },
  {
    nombre: 'provideIconCatalog',
    entrada: 'glyphflow',
    clase: 'función',
    resumen: 'Registra el catálogo para poder usar name=. Opt-in: sin esto, name= no pinta.',
  },
  {
    nombre: 'MAX_ICON_CATALOG',
    entrada: 'glyphflow',
    clase: 'token',
    resumen: 'El token del catálogo. Sin él, un name desconocido se pinta vacío, sin tronar.',
  },
  {
    nombre: 'CURATED_ICONS',
    entrada: 'glyphflow',
    clase: 'constante',
    resumen: 'Los 180 con coreografía a mano.',
  },
  {
    nombre: 'GENERATED_ICONS',
    entrada: 'glyphflow',
    clase: 'constante',
    resumen: 'Los 1587 restantes de Lucide, solo con trazo automático.',
  },
  {
    nombre: 'ANIMATED_ICONS',
    entrada: 'glyphflow',
    clase: 'constante',
    resumen: 'Curados + generados. Referenciarlo ancla el catálogo completo en tu bundle.',
  },
  {
    nombre: 'ANIMATED_ICON_NAMES',
    entrada: 'glyphflow',
    clase: 'constante',
    resumen: 'Las claves del catálogo. Mismo costo de bundle que ANIMATED_ICONS.',
  },
  {
    nombre: 'ICON_ALIASES',
    entrada: 'glyphflow',
    clase: 'constante',
    resumen: 'Renombramientos reales de Lucide (mismo glifo, nombre nuevo).',
  },
  {
    nombre: 'resolveIconName',
    entrada: 'glyphflow',
    clase: 'función',
    resumen: 'Aplica los alias: nombre viejo → nombre actual.',
  },
  {
    nombre: 'ICON_META',
    entrada: 'glyphflow',
    clase: 'constante',
    resumen: 'Metadatos por icono (categorías, etiquetas de búsqueda).',
  },
  {
    nombre: 'MaxIconMorphComponent',
    entrada: 'glyphflow/morph',
    clase: 'componente',
    resumen: 'Selector <max-icon-morph>. Cambiar [icon] dispara la transición.',
  },
  {
    nombre: 'morphKeyframes',
    entrada: 'glyphflow/morph',
    clase: 'función',
    resumen: 'Calcula los keyframes discretos de `d` entre dos iconos. No anima nada.',
  },
  {
    nombre: 'runMorph',
    entrada: 'glyphflow/morph',
    clase: 'función',
    resumen: 'morphKeyframes + element.animate(). Devuelve la Animation para que la controles.',
  },
  {
    nombre: 'canonicalD',
    entrada: 'glyphflow/morph',
    clase: 'función',
    resumen: 'El `d` de un icono ya resuelto — lo que se pinta cuando no hay transición.',
  },
  {
    nombre: 'SPRING_PRESETS',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    resumen:
      'smooth (ζ=1.00), snappy (ζ=0.73) y bouncy (ζ=0.40). Los dos últimos rebotan de verdad.',
  },
  {
    nombre: 'PASOS_DEFAULT',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    resumen: '20 poses discretas. Decidido en el Lab comparando 10/15/20/30.',
  },
  {
    nombre: 'RESOLUCION_DEFAULT',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    resumen: '64 puntos por subpath.',
  },
  {
    nombre: 'COLA_DEFAULT',
    entrada: 'glyphflow/morph',
    clase: 'constante',
    resumen: 'Qué hacer con la cola asintótica del resorte.',
  },
];

/** Tipos: se erosionan en runtime, así que el spec los verifica al COMPILAR, importándolos. */
export const API_TIPOS: { nombre: string; entrada: Entrada; resumen: string }[] = [
  {
    nombre: 'AnimatedIconDef',
    entrada: 'glyphflow',
    resumen: 'Un icono: geometría + sus variantes de animación.',
  },
  {
    nombre: 'IconShape',
    entrada: 'glyphflow',
    resumen: 'Una figura del SVG (path, circle, line…).',
  },
  {
    nombre: 'IconChoreography',
    entrada: 'glyphflow',
    resumen: 'Una variante: tracks por figura + autoDraw + reverseOnLeave.',
  },
  {
    nombre: 'MotionTrack',
    entrada: 'glyphflow',
    resumen: 'Keyframes + opciones WAAPI para una figura.',
  },
  {
    nombre: 'AutoDraw',
    entrada: 'glyphflow',
    resumen: 'Config del trazo automático (velocidad, traslape, topes).',
  },
  {
    nombre: 'AnimatedIconTrigger',
    entrada: 'glyphflow',
    resumen: "'group' | 'hover' | 'tap' | 'view' | 'auto' | 'manual'.",
  },
  { nombre: 'MaxIconsConfig', entrada: 'glyphflow', resumen: 'Lo que recibe provideMaxIcons.' },
  { nombre: 'IconMeta', entrada: 'glyphflow', resumen: 'Los metadatos de un icono del catálogo.' },
  {
    nombre: 'MorphIcon',
    entrada: 'glyphflow/morph',
    resumen: 'Lo que acepta [icon]: un AnimatedIconDef o su geometría.',
  },
  {
    nombre: 'MorphKeyframes',
    entrada: 'glyphflow/morph',
    resumen: 'La salida de morphKeyframes: keyframes, duración, peso.',
  },
  {
    nombre: 'MorphKeyframesOpts',
    entrada: 'glyphflow/morph',
    resumen: 'Pasos, resolución, cola, resorte, sobrepaso.',
  },
  {
    nombre: 'RunMorphOpts',
    entrada: 'glyphflow/morph',
    resumen: 'Lo anterior + loop, dirección y durationScale.',
  },
  {
    nombre: 'SpringConfig',
    entrada: 'glyphflow/morph',
    resumen: 'Resorte crudo: rigidez y amortiguamiento.',
  },
  {
    nombre: 'SpringPreset',
    entrada: 'glyphflow/morph',
    resumen: "Los nombres de SPRING_PRESETS: 'smooth' | 'snappy' | 'bouncy'.",
  },
];
