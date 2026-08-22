import { Provider, signal, untracked } from '@angular/core';
import { provideMaxIcons } from 'glyphflow';

/**
 * Velocidad global de las animaciones, movible en vivo desde la UI. 2 = el doble de rápido.
 *
 * La UI habla de VELOCIDAD; la librería escala DURACIÓN (`duration * durationScale`). Son
 * recíprocos, y el getter de abajo es el único punto donde se cruzan. Confundirlos fue un bug real:
 * los chips escribían su etiqueta como `durationScale` crudo, así que `2×` alargaba la duración al
 * doble — corría a la MITAD de rápido, justo al revés de lo que decía el rótulo.
 *
 * El truco del getter: `provideMaxIcons` recibe un objeto plano y se registra UNA vez en el
 * bootstrap, pero tanto `<max-icon>` (dentro de `play()`) como `<max-icon-morph>` (en cada cambio
 * de `[icon]`) leen `config.durationScale` EN EL MOMENTO DE ANIMAR, no al inyectar. Un getter sobre
 * una señal convierte ese contrato en un control vivo sin tocar la librería ni re-bootstrapear.
 *
 * Consecuencia honesta: aplica desde la SIGUIENTE reproducción. Una animación ya corriendo se
 * queda con la velocidad que tenía cuando arrancó — WAAPI ya recibió su `duration`.
 */
export const velocidadGlobal = signal(1);

export interface PresetVelocidad {
  /** Multiplicador de VELOCIDAD, no de duración: 2 corre el doble de rápido. */
  valor: number;
  etiqueta: string;
  /** Clave de traducción (`i18n/{en,es}.json`, bajo `shell.velocidad.*`) — no texto suelto. */
  notaClave: string;
}

export const PRESETS_VELOCIDAD: PresetVelocidad[] = [
  { valor: 0.5, etiqueta: '0.5×', notaClave: 'shell.velocidad.notaLento' },
  { valor: 1, etiqueta: '1×', notaClave: 'shell.velocidad.notaNormal' },
  { valor: 1.5, etiqueta: '1.5×', notaClave: 'shell.velocidad.notaMasRapido' },
  { valor: 2, etiqueta: '2×', notaClave: 'shell.velocidad.notaDoble' },
];

export function provideVelocidadEnVivo(): Provider {
  return provideMaxIcons({
    // `untracked`: el getter corre dentro de `play()`, y `play()` se dispara desde efectos del
    // componente. Sin esto ese efecto quedaría suscrito a la señal y se re-ejecutaría al mover el
    // chip — un ciclo reactivo que nadie pidió, disparado desde fuera de este archivo.
    get durationScale() {
      return 1 / untracked(velocidadGlobal);
    },
  });
}
