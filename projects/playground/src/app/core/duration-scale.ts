import { Provider, signal, untracked } from '@angular/core';
import { provideMaxIcons } from 'glyphflow';

/**
 * Escala global de duración, movible en vivo desde la UI.
 *
 * El truco está en el getter: `provideMaxIcons` recibe un objeto plano y se registra UNA vez en el
 * bootstrap, pero tanto `<max-icon>` (dentro de `play()`) como `<max-icon-morph>` (en cada cambio
 * de `[icon]`) leen `config.durationScale` EN EL MOMENTO DE ANIMAR, no al inyectar. Un getter sobre
 * una señal convierte ese contrato en un control vivo sin tocar la librería ni re-bootstrapear.
 *
 * Consecuencia honesta: aplica desde la SIGUIENTE reproducción. Una animación ya corriendo se
 * queda con la escala que tenía cuando arrancó — WAAPI ya recibió su `duration`.
 */
export const escalaDuracion = signal(1);

export interface PresetEscala {
  valor: number;
  etiqueta: string;
  /** Clave de traducción (`i18n/{en,es}.json`, bajo `shell.velocidad.*`) — no texto suelto. */
  notaClave: string;
}

export const PRESETS_ESCALA: PresetEscala[] = [
  { valor: 0.5, etiqueta: '0.5×', notaClave: 'shell.velocidad.notaMitad' },
  { valor: 1, etiqueta: '1×', notaClave: 'shell.velocidad.notaNormal' },
  { valor: 1.5, etiqueta: '1.5×', notaClave: 'shell.velocidad.notaMediaLenta' },
  { valor: 2, etiqueta: '2×', notaClave: 'shell.velocidad.notaDetalle' },
];

export function provideEscalaEnVivo(): Provider {
  return provideMaxIcons({
    // `untracked`: el getter corre dentro de `play()`, y `play()` se dispara desde efectos del
    // componente. Sin esto ese efecto quedaría suscrito a la señal y se re-ejecutaría al mover el
    // chip — un ciclo reactivo que nadie pidió, disparado desde fuera de este archivo.
    get durationScale() {
      return untracked(escalaDuracion);
    },
  });
}
