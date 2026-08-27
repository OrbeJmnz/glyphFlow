import { DOCUMENT, computed, effect, inject, signal } from '@angular/core';

/**
 * Si el visitante quiere movimiento, y quién lo decide.
 *
 * Tres estados por dentro y DOS en la UI, que no es lo mismo y es justo lo que el ticket pide: el
 * botón enseña «animado / quieto», pero la preferencia recuerda además si alguien la tocó. Sin ese
 * tercer estado no hay forma de distinguir «quiere movimiento» de «nunca opinó y su sistema
 * tampoco pide lo contrario», y la elección manual no podría GANARLE al sistema — que es
 * literalmente el requisito.
 *
 * - `null`  → nadie eligió: manda `prefers-reduced-motion`.
 * - `'on'`  → lo pidió a mano. Anima aunque el sistema pida movimiento reducido.
 * - `'off'` → lo apagó a mano. No anima aunque el sistema no pida nada.
 *
 * El vocabulario que sale al DOM y al storage va en inglés (`data-motion`, `gf:motion`), como
 * `data-theme` y `gf:theme`. La frontera es el punto de escritura, no el archivo (T19).
 */
export type EleccionMovimiento = 'on' | 'off';

const CLAVE = 'gf:motion';

let doc: Document | null = null;

function guardada(): EleccionMovimiento | null {
  try {
    const v = localStorage.getItem(CLAVE);
    return v === 'on' || v === 'off' ? v : null;
  } catch {
    return null; // Modo privado o cookies bloqueadas: se sigue al sistema y no se persiste.
  }
}

/** Lo que pide el sistema. Va por señal porque se puede cambiar con el sitio abierto. */
const prefiereReducido = signal(leerPreferenciaDelSistema());

/**
 * Mismo criterio que `tema.ts`: primero lo que el script del `<head>` dejó en el `<html>`, porque
 * el prerender no tiene `matchMedia` y su respuesta se hornea en las rutas estáticas. Sin esto,
 * quien pide movimiento reducido recibe HTML con `data-motion="on"` y ve animarse el sitio hasta
 * que hidrata.
 */
function leerPreferenciaDelSistema(): boolean {
  const html = (globalThis as { document?: Document }).document?.documentElement;
  const puesto = html?.getAttribute('data-motion');
  if (puesto === 'on') return false;
  if (puesto === 'off') return true;
  try {
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false; // Prerender y navegadores sin `matchMedia`: se asume que sí hay movimiento.
  }
}

export const eleccionMovimiento = signal<EleccionMovimiento | null>(guardada());

/** Lo que de verdad manda: la elección si existe, y si no, el sistema. */
export const hayMovimiento = computed(() => {
  const elegido = eleccionMovimiento();
  return elegido ? elegido === 'on' : !prefiereReducido();
});

/** `true` mientras nadie haya tocado el botón — o sea, mientras el sistema siga mandando. */
export const siguiendoAlSistema = computed(() => eleccionMovimiento() === null);

export function alternarMovimiento(): void {
  const siguiente: EleccionMovimiento = hayMovimiento() ? 'off' : 'on';
  eleccionMovimiento.set(siguiente);
  try {
    localStorage.setItem(CLAVE, siguiente);
  } catch {
    // Sin storage la elección dura lo que la pestaña. Degradación aceptable, no un error.
  }
}

/**
 * Congela lo que ya está corriendo, o lo suelta.
 *
 * El interruptor de la librería impide que EMPIECEN animaciones nuevas, pero no toca las que ya
 * iban en camino: sin esto, apagar el movimiento a media reproducción dejaba el icono terminando
 * su recorrido. El criterio de aceptación dice «detiene y reanuda sin recargar», así que hay que
 * alcanzarlas.
 *
 * Se guarda EXACTAMENTE lo que se pausó, igual que en `pausa-oculta.ts` y por el mismo motivo: un
 * `play()` masivo al reanudar arrancaría también lo que estaba pausado por su cuenta.
 */
let congeladas: Animation[] = [];

function aplicar(hay: boolean): void {
  if (!doc) return;

  // `setAttribute` y NO `dataset`: el DOM del prerender no implementa `DOMStringMap`. Misma
  // cicatriz que `data-theme` — ver `tema.ts`.
  doc.documentElement.setAttribute('data-motion', hay ? 'on' : 'off');

  if (!doc.getAnimations) return; // El prerender no las tiene.

  if (hay) {
    for (const a of congeladas) if (a.playState === 'paused') a.play();
    congeladas = [];
  } else {
    congeladas = doc.getAnimations().filter((a) => a.playState === 'running');
    for (const a of congeladas) a.pause();
  }
}

/**
 * Conecta la señal al documento. Se llama UNA vez, desde el shell, porque necesita contexto de
 * inyección.
 */
export function conectarMovimiento(): void {
  doc = inject(DOCUMENT);
  effect(() => aplicar(hayMovimiento()));

  // El sistema puede cambiar con el sitio abierto (perfiles de accesibilidad, ajustes por batería).
  // Solo importa mientras nadie haya elegido a mano, pero suscribirse siempre es más barato que
  // conectar y desconectar según el estado.
  try {
    const consulta = matchMedia('(prefers-reduced-motion: reduce)');
    consulta.addEventListener('change', (e) => prefiereReducido.set(e.matches));
  } catch {
    // Sin `matchMedia` no hay a qué suscribirse; la semilla ya dejó el valor por defecto.
  }
}
