/**
 * Tipos del sistema de iconos animados.
 *
 * PORTABILIDAD (léelo antes de tocar): esta carpeta está diseñada para copiarse tal cual a otro
 * proyecto Angular. Por eso NO importa nada — ni `lucide-angular`, ni Tailwind, ni una librería de
 * animación. Los keyframes son Web Animations API cruda (tipos del DOM, cero imports) y el SVG lo
 * dibuja el propio componente. Si algo aquí empieza a depender del proyecto, se rompió el trato.
 */

/**
 * Figura del icono. Campos opcionales a propósito (en vez de una unión discriminada) porque el
 * template de Angular no necesita estrecharla y así el data se pega igualito al de lucide.dev.
 */
export interface IconShape {
  tag: 'path' | 'circle' | 'rect' | 'line' | 'polyline' | 'polygon' | 'ellipse';
  /** tag='path' */
  d?: string;
  /** tag='circle' */
  cx?: number;
  cy?: number;
  r?: number;
  /** tag='rect' — `rx`/`ry` los comparte con `ellipse` */
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rx?: number;
  ry?: number;
  /** tag='line' */
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  /** tag='polyline' | 'polygon' */
  points?: string;
  /**
   * Override puntual — el SVG raíz ya pinta `fill="none"` (todo es trazo por default). Un puñado
   * de iconos de Lucide rompen esa regla a propósito (el agujero de `key-round`, el punto de
   * `tag`): una figura sólida adentro de un icono que por lo demás es solo contorno. Encontrado
   * generando el set completo (9 iconos), siempre con el mismo valor `"currentColor"` — nunca un
   * color fijo, para que siga heredando del texto igual que el trazo.
   */
  fill?: string;
  /**
   * Opacidad de arranque, como atributo. Existe para una sola cosa: figuras que el icono necesita
   * PARA MOVERSE pero que en reposo no debe enseñar, porque Lucide no las dibuja.
   *
   * El caso que la trajo es `archive`: al separarse las dos mitades, el cajón de abajo queda sin
   * borde superior — Lucide no lo dibuja porque con la tapa puesta no se ve. La arista que lo
   * cierra nace en `'0'` y solo aparece mientras dura el gesto, así que el icono quieto sigue
   * siendo idéntico al de Lucide.
   *
   * Va como atributo de presentación a propósito: cualquier keyframe con `opacity` lo gana
   * mientras la animación corre, y al terminar manda otra vez este valor. Sin trucos de CSS.
   */
  opacity?: string;
}

/**
 * Un track = qué keyframes, con qué timing y sobre qué pivote. Es WAAPI crudo a propósito: no
 * inventamos un formato propio que luego haya que mantener.
 */
export interface MotionTrack {
  keyframes: Keyframe[];
  options: KeyframeAnimationOptions;
  /**
   * `transform-origin` que se fija ANTES de animar (WAAPI no lo lleva en las options). En figuras
   * hijas usa unidades de usuario del viewBox (ej. `'3px 6px'`), no porcentajes del elemento.
   */
  origin?: string;
}

/**
 * Coreografía de una variante. `root` mueve el `<svg>` completo; `shapes` mueve figuras concretas
 * por índice — y ahí es donde vive la diferencia entre un icono animado y un GIF: en la campana el
 * badajo va 200ms desfasado del cuerpo, y eso es lo que lo hace sentir físico.
 */
/**
 * Dibujo de trazo CALCULADO en vivo, no escrito a mano.
 *
 * El componente mide cada figura con `getTotalLength()` y con eso hace dos cosas que a mano son
 * imposibles de acertar: dibuja **primero las líneas largas** y deja las cortas para el final, y le
 * da a cada una la duración que le toca según su longitud (velocidad de pluma constante). Sin esto,
 * un contorno largo y un guioncito de 5 unidades tardaban lo mismo y el trazo se sentía a saltos.
 */
export interface AutoDraw {
  /** Velocidad de la pluma, en unidades del viewBox por segundo. */
  speed?: number;
  /** Traslape con la figura anterior. 0 = en fila india; 1 = todas al mismo tiempo. */
  overlap?: number;
  /** Piso y techo de duración por figura (ms), para que ni parpadee ni se eternice. */
  min?: number;
  max?: number;
  easing?: string;
}

/**
 * `reveal` automático: el icono se MATERIALIZA. Una copia tenue del trazo completo destella por
 * debajo (el "fantasma") mientras el trazo real se dibuja encima, y el conjunto se acomoda con un
 * bamboleo. Es la receta que `bolt` y `audio-waveform` traían escrita a mano, generalizada.
 *
 * Se distingue del `draw` en el fantasma: `draw` es una pluma que recorre las figuras en fila, de
 * la más larga a la más corta; `reveal` las trae todas a la vez sobre una guía que se apaga. Sin
 * el fantasma las dos animaciones se parecerían demasiado como para justificar las dos.
 */
export interface AutoReveal {
  /** Duración del trazo (ms). El bamboleo dura un 15% más para cerrar después de él. */
  duration?: number;
  /** Opacidad de la guía fantasma mientras el trazo se dibuja encima. */
  guide?: number;
  easing?: string;
  /** El bamboleo del conjunto. `false` lo apaga — útil si el icono ya gira en su `default`. */
  wobble?: boolean;
}

export interface IconChoreography {
  root?: MotionTrack;
  /** Índice de la figura dentro de `shapes[]` → su track. */
  shapes?: Record<number, MotionTrack>;
  /** Dibujo de trazo automático (ver `AutoDraw`). Se combina con `root`/`shapes` sin problema. */
  autoDraw?: AutoDraw;
  /**
   * Materialización automática (ver `AutoReveal`). La inyecta `icon()` en TODOS los iconos, así que
   * su presencia es también lo que distingue al `reveal` genérico de uno curado a mano — de eso
   * depende `varianteDeHover` para no robarle el hover al icono que sí tiene gesto propio.
   */
  autoReveal?: AutoReveal;
  /**
   * Para animaciones de ESTADO (el icono se queda en su pose final, ej. refresh girado 45°):
   * al salir el puntero se reproduce en reversa en vez de cortarse en seco.
   */
  reverseOnLeave?: boolean;
}

export interface AnimatedIconDef {
  viewBox?: string;
  shapes: IconShape[];
  /** Debe existir `default`; el resto son variantes opcionales (`rotate`, `find`, …). */
  animations: Record<string, IconChoreography>;
}

/**
 * Cuándo se dispara la animación.
 *
 * `group` es el modo por defecto y el que usa la app: **se dibuja al montarse** y reproduce su
 * variante de hover cuando el puntero entra a su superficie. Esa superficie se elige en este
 * orden: el **control** que lo contiene (`button`/`a`) → el `.group` de Tailwind → el icono mismo.
 * El control va primero porque en una fila con varios botones de acción, colgarse del grupo
 * animaba todos a la vez.
 */
export type AnimatedIconTrigger = 'group' | 'hover' | 'tap' | 'view' | 'auto' | 'manual';
