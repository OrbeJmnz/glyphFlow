import { Provider, signal, untracked } from '@angular/core';
import { provideGfIcons } from 'glyphflow';
import { hayMovimiento } from './movimiento';

/**
 * Velocidad global de las animaciones, movible en vivo desde la UI. 2 = el doble de rápido.
 *
 * La UI habla de VELOCIDAD; la librería escala DURACIÓN (`duration * durationScale`). Son
 * recíprocos, y el getter de abajo es el único punto donde se cruzan. Confundirlos fue un bug real:
 * los chips escribían su etiqueta como `durationScale` crudo, así que `2×` alargaba la duración al
 * doble — corría a la MITAD de rápido, justo al revés de lo que decía el rótulo.
 *
 * El truco del getter: `provideGfIcons` recibe un objeto plano y se registra UNA vez en el
 * bootstrap, pero tanto `<gf-icon>` (dentro de `play()`) como `<gf-icon-morph>` (en cada cambio
 * de `[icon]`) leen `config.durationScale` EN EL MOMENTO DE ANIMAR, no al inyectar. Un getter sobre
 * una señal convierte ese contrato en un control vivo sin tocar la librería ni re-bootstrapear.
 *
 * Consecuencia honesta: aplica desde la SIGUIENTE reproducción. Una animación ya corriendo se
 * queda con la velocidad que tenía cuando arrancó — WAAPI ya recibió su `duration`.
 */
const CLAVE_VELOCIDAD = 'gf:speed';

function velocidadGuardada(): number | null {
  try {
    const v = Number(localStorage.getItem(CLAVE_VELOCIDAD));
    // Solo un preset conocido: un valor a mano en el storage no debe poder meter una velocidad
    // que la UI no sabe dibujar —el carril posiciona su indicador por ÍNDICE, no por valor—.
    return [0.5, 1, 1.5, 2].includes(v) ? v : null;
  } catch {
    return null; // Modo privado o cookies bloqueadas: se arranca en 1x y no se persiste.
  }
}

export const velocidadGlobal = signal(velocidadGuardada() ?? 1);

export function elegirVelocidad(v: number): void {
  velocidadGlobal.set(v);
  try {
    localStorage.setItem(CLAVE_VELOCIDAD, String(v));
  } catch {
    // Sin storage la elección dura lo que la pestaña. Degradación aceptable, no un error.
  }
}

export interface PresetVelocidad {
  /** Multiplicador de VELOCIDAD, no de duración: 2 corre el doble de rápido. */
  valor: number;
  etiqueta: string;
}

export const PRESETS_VELOCIDAD: PresetVelocidad[] = [
  { valor: 0.5, etiqueta: '0.5×' },
  { valor: 1, etiqueta: '1×' },
  { valor: 1.5, etiqueta: '1.5×' },
  { valor: 2, etiqueta: '2×' },
];

/**
 * La config viva de los iconos: velocidad Y movimiento.
 *
 * Van juntas en UN solo `provideGfIcons` porque `GF_ICONS_CONFIG` es un token, no un array: un
 * segundo `provide…` no se suma al primero, lo SUSTITUYE. Separarlos en dos providers dejaría
 * silenciosamente sin efecto al que quedara primero.
 */
export function provideConfigEnVivo(): Provider {
  return provideGfIcons({
    // `untracked`: el getter corre dentro de `play()`, y `play()` se dispara desde efectos del
    // componente. Sin esto ese efecto quedaría suscrito a la señal y se re-ejecutaría al mover el
    // chip — un ciclo reactivo que nadie pidió, disparado desde fuera de este archivo.
    get durationScale() {
      return 1 / untracked(velocidadGlobal);
    },
    get animationsEnabled() {
      return untracked(hayMovimiento);
    },
  });
}
