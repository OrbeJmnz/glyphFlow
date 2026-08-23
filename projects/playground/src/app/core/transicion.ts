import { ApplicationRef, DOCUMENT, inject } from '@angular/core';

/**
 * Una sola puerta para todas las transiciones de vista del sitio.
 *
 * Existe por un motivo concreto: **dos `startViewTransition` a la vez se cancelan entre sí**. El
 * tema ya abría una para su círculo; en cuanto el grid abre otra al filtrar, cambiar de tema
 * mientras se filtra —o al revés— dejaba una de las dos a medias, sin error y sin forma de
 * enterarse. Centralizando, la nueva interrumpe a la anterior a propósito en vez de por accidente.
 */
let doc: Document | null = null;
let appRef: ApplicationRef | null = null;
let enCurso: ViewTransition | null = null;

/**
 * Registra una transición que abrió OTRO (hoy: el router de Angular, vía `onViewTransitionCreated`).
 *
 * Sin esto el coordinador no se enteraría y volvería el problema que vino a resolver: el router
 * abriendo la suya por su cuenta mientras el tema abre la propia.
 */
export function registrarExterna(transicion: ViewTransition): void {
  enCurso?.skipTransition();
  enCurso = transicion;
  void transicion.finished.finally(() => {
    if (enCurso === transicion) enCurso = null;
  });
}

/** Se llama UNA vez desde el shell: necesita contexto de inyección. */
export function conectarTransiciones(): void {
  doc = inject(DOCUMENT);
  appRef = inject(ApplicationRef);
}

export interface OpcionesTransicion {
  /**
   * Etiqueta el tipo de transición en `<html data-transition="…">` mientras dura. El atributo va en
   * inglés como todos los que salen al DOM; el valor lo pone quien la dispara (T19).
   *
   * El CSS la necesita porque los tipos NO se animan igual: el tema apaga el cruce del `root` (su
   * movimiento es el círculo), mientras que una ruta o el grid sí quieren el cruce de default. Sin
   * distinguir, apagarlo para el tema lo apagaba para todos.
   */
  marca?: string;
  /**
   * Corre cuando las dos fotos ya están tomadas. Es donde se pone una animación a medida — el
   * círculo del tema, por ejemplo — en vez del cruce que el navegador hace por default.
   */
  alEstarLista?: (transicion: ViewTransition) => void;
}

/**
 * Aplica `cambio` dentro de una transición de vista.
 *
 * El cambio va DENTRO del callback y no antes: si se aplica primero, la foto «vieja» ya sale con el
 * estado nuevo y no se ve ninguna transición. Y como Angular corre sin zonas, hace falta pedirle un
 * `tick()` explícito ahí dentro — al retornar el callback el DOM tiene que estar ya cambiado, y una
 * señal recién puesta todavía no ha pintado nada.
 *
 * Se degrada a aplicar el cambio y ya cuando: el navegador no trae la API, o quien mira pidió menos
 * movimiento. En los dos casos el resultado es correcto, solo sin animar.
 */
export function conTransicion(cambio: () => void, opciones?: OpcionesTransicion): void {
  const ventana = doc?.defaultView;

  if (
    !doc ||
    !appRef ||
    !ventana ||
    !doc.startViewTransition ||
    ventana.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    cambio();
    return;
  }

  const raiz = doc.documentElement;
  if (opciones?.marca) raiz.dataset['transition'] = opciones.marca;

  // Interrumpir a la anterior es deliberado: el usuario acaba de pedir otra cosa, y encimar dos
  // transiciones deja fotos de estados que ya no existen.
  enCurso?.skipTransition();

  const transicion = doc.startViewTransition(() => {
    cambio();
    appRef?.tick();
  });
  enCurso = transicion;

  void transicion.finished.finally(() => {
    if (enCurso === transicion) {
      enCurso = null;
      // Se limpia solo cuando ESTA sigue siendo la vigente: si otra la interrumpió, la marca ya es
      // suya y borrarla aquí le apagaría el estilo a media transición.
      delete raiz.dataset['transition'];
    }
  });

  if (opciones?.alEstarLista) {
    void transicion.ready.then(() => opciones.alEstarLista?.(transicion));
  }
}
