import { signal } from '@angular/core';

/**
 * Cuánto dura el acuse antes de volver al estado normal. Una sola constante porque antes había
 * CUATRO copias de esta lógica —editor, panel de icono, portada y patrones— con 1500 ms en unas y
 * 1600 en otras. Nadie lo notaría nunca, y esa es justamente la señal de que sobraba.
 */
export const ACUSE_MS = 1600;

/**
 * Copiar al portapapeles con acuse, sin mentir.
 *
 * **La regla que hereda de las cuatro implementaciones que reemplaza**: si `writeText` truena
 * —sin permiso, sin contexto seguro, sin foco— el estado NO cambia. Pintar la palomita sobre un
 * portapapeles vacío es peor que no ofrecer el botón: el usuario se va convencido de que lleva el
 * texto, y se entera al pegar.
 *
 * `fallo` existe por lo mismo: el silencio tampoco alcanza. Quien pulsa y no ve nada asume que la
 * interfaz se congeló, no que el navegador le negó el permiso.
 */
export class Copiador {
  private readonly _copiado = signal(false);
  private readonly _fallo = signal(false);
  private temporizador?: ReturnType<typeof setTimeout>;

  readonly copiado = this._copiado.asReadonly();
  readonly fallo = this._fallo.asReadonly();

  async copiar(texto: string): Promise<void> {
    clearTimeout(this.temporizador);
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      this._copiado.set(false);
      this._fallo.set(true);
      this.temporizador = setTimeout(() => this._fallo.set(false), ACUSE_MS);
      return;
    }
    this._fallo.set(false);
    this._copiado.set(true);
    this.temporizador = setTimeout(() => this._copiado.set(false), ACUSE_MS);
  }

  /** Se llama desde `ngOnDestroy`: un acuse pendiente sobre un componente muerto es una fuga. */
  destruir(): void {
    clearTimeout(this.temporizador);
  }
}
