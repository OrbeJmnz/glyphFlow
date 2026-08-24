import { DOCUMENT, DestroyRef, inject } from '@angular/core';

/**
 * Pausa las animaciones mientras la pestaña está oculta, y las reanuda al volver.
 *
 * **En reposo esto casi no hace nada, y eso está medido**: con 933 iconos en el DOM el sitio tiene
 * DOS animaciones corriendo, no 899 — los iconos animan por disparo, no en bucle. Lo que sí
 * justifica esto es el instante después de «Repetir visibles»: ahí conviven cientos de animaciones
 * durante unos segundos, y cambiar de pestaña en ese momento las dejaba corriendo contra un DOM
 * que nadie mira.
 *
 * Se guarda EXACTAMENTE lo que se pausó, en vez de reanudar todo al volver. Un `getAnimations()`
 * masivo al regresar reanudaría también lo que estaba pausado o terminado por su cuenta — por
 * ejemplo un icono que el visitante dejó a medias — y arrancaría solo, sin que nadie lo pidiera.
 */
export function conectarPausaOculta(): void {
  const doc = inject(DOCUMENT, { optional: true });
  // `test:ssr` y el prerender no tienen documento; ahí no hay nada que pausar.
  if (!doc?.addEventListener) return;

  let pausadas: Animation[] = [];

  const alCambiar = (): void => {
    if (doc.visibilityState === 'hidden') {
      pausadas = doc.getAnimations().filter((a) => a.playState === 'running');
      for (const a of pausadas) a.pause();
    } else {
      for (const a of pausadas) {
        // Puede haberse cancelado o terminado mientras no mirábamos.
        if (a.playState === 'paused') a.play();
      }
      pausadas = [];
    }
  };

  doc.addEventListener('visibilitychange', alCambiar);
  inject(DestroyRef).onDestroy(() => doc.removeEventListener('visibilitychange', alCambiar));
}
