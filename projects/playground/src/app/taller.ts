import { Injectable, signal } from '@angular/core';
import type { AnimatedIconDef } from 'glyphflow';

/**
 * El puente entre editar la FORMA y coreografiarla.
 *
 * Sin esto, el círculo que el proyecto promete se rompe justo a la mitad: editas la geometría en
 * `/editor`, y para animarla tienes que copiar el `d` a mano, armar el JSON, y pegarlo en el Lab.
 * El plan lo dice desde v4.1 — "comparten el mismo SVG en memoria: se edita la forma y luego se
 * coreografía esa forma ya editada, sin exportar/reimportar entre herramientas".
 *
 * Lo que viaja es un `AnimatedIconDef` completo: la geometría editada MÁS la coreografía original
 * del icono. Esa es la parte que vuelve útil el traspaso — los tracks siguen apuntando a los
 * mismos índices de figura, así que la animación que ya existía sigue corriendo sobre la forma
 * nueva.
 *
 * Deliberadamente NO se persiste. Es un traspaso entre dos pantallas de la misma sesión, no un
 * documento; guardarlo en `localStorage` obligaría a versionar un formato que todavía se mueve.
 */
@Injectable({ providedIn: 'root' })
export class Taller {
  private readonly _pieza = signal<{ nombre: string; def: AnimatedIconDef } | null>(null);

  /** Lo que espera del otro lado, o `null` si nadie mandó nada. */
  readonly pieza = this._pieza.asReadonly();

  enviar(nombre: string, def: AnimatedIconDef): void {
    this._pieza.set({ nombre, def });
  }

  /**
   * Lo toma y lo vacía: el traspaso es de una sola vez. Si se quedara, volver al Lab más tarde
   * repondría una edición vieja encima de lo que el usuario tuviera escrito.
   */
  recoger(): { nombre: string; def: AnimatedIconDef } | null {
    const p = this._pieza();
    if (p) this._pieza.set(null);
    return p;
  }
}
