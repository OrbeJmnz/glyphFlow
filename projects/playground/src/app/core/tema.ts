import { DOCUMENT, effect, inject, signal } from '@angular/core';

export type Tema = 'oscuro' | 'claro';

const CLAVE = 'gf:tema';

function guardado(): Tema | null {
  try {
    const v = localStorage.getItem(CLAVE);
    return v === 'claro' || v === 'oscuro' ? v : null;
  } catch {
    return null; // Modo privado o cookies bloqueadas: se arranca con el default y no se persiste.
  }
}

/**
 * Tema del sitio.
 *
 * **Arranca en oscuro a propósito, sin consultar `prefers-color-scheme` todavía.** La paleta clara
 * no existe aún — solo se define `:root` oscuro. Si esto sembrara desde el sistema, a quien tiene el
 * suyo en claro le saldría el sitio oscuro con el icono de sol encendido: el control diciendo una
 * cosa y la pantalla otra. Cuando entre la paleta clara, aquí se agrega el `matchMedia` y el
 * arranque pasa a respetar el sistema.
 */
export const tema = signal<Tema>(guardado() ?? 'oscuro');

export function alternarTema(): void {
  tema.update((t) => (t === 'oscuro' ? 'claro' : 'oscuro'));
}

/**
 * Conecta la señal al documento: escribe `data-tema` en `<html>` y persiste la elección.
 *
 * Se llama UNA vez, desde el shell, porque necesita contexto de inyección. `DOCUMENT` y no el
 * `document` global para que `core/` siga siendo prerenderizable el día que se quiera.
 */
export function conectarTema(): void {
  const doc = inject(DOCUMENT);
  effect(() => {
    const t = tema();
    // Corchetes, no `.tema`: `noPropertyAccessFromIndexSignature` prohíbe el acceso por punto
    // sobre `DOMStringMap`.
    doc.documentElement.dataset['tema'] = t;
    try {
      localStorage.setItem(CLAVE, t);
    } catch {
      // Sin storage la elección dura lo que la pestaña. Es degradación aceptable, no un error.
    }
  });
}
