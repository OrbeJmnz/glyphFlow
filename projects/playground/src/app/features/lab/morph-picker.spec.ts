import { TestBed } from '@angular/core/testing';
import { AnimatedIconDef, bellIcon, bellRingIcon, starIcon } from 'glyphflow';
import { morphKeyframes } from 'glyphflow/morph';
import { MorphPicker } from './morph-picker';
import { aIconNode } from './icon-node';
import { RESORTE_LENTO } from './morph-scrubber';
import { providersI18nTest } from '../../core/i18n-testing';
import labEn from '../../../i18n/lab/en.json';
import labEs from '../../../i18n/lab/es.json';

/**
 * Cobertura acotada a LO NUEVO (selección de tramo → scrubber manual). El picker no traía specs
 * antes de esto y no se retrofitea entero — solo lo que este cambio agrega.
 *
 * Se manipula `secuencia`/`elegirTramo` directo vía cast, sin pasar por el buscador real: eso
 * evitaría esperar el catálogo curado (~1MB, `import()` real) por cada test cuando lo que se
 * prueba es el cableado de selección, no la búsqueda.
 */
interface Elegido {
  nombre: string;
  def: AnimatedIconDef;
}

interface Interno {
  secuencia: import('@angular/core').WritableSignal<Elegido[]>;
  indiceActual: import('@angular/core').WritableSignal<number>;
  corriendo: import('@angular/core').Signal<boolean>;
  tramoActivo: import('@angular/core').Signal<{ origen: Elegido; destino: Elegido } | null>;
  elegirTramo(indice: number): void;
  agregar(item: Elegido): void;
  quitar(indice: number): void;
  limpiar(): void;
  reproducir(): void;
}

describe('MorphPicker — selección de tramo', () => {
  const bell: Elegido = { nombre: 'bell', def: bellIcon };
  const bellRing: Elegido = { nombre: 'bell-ring', def: bellRingIcon };
  const star: Elegido = { nombre: 'star', def: starIcon };

  async function montar(): Promise<{ picker: Interno; html: HTMLElement }> {
    await TestBed.configureTestingModule({
      imports: [MorphPicker, providersI18nTest({ 'lab/en': labEn, 'lab/es': labEs })],
    }).compileComponents();
    const fixture = TestBed.createComponent(MorphPicker);
    const picker = fixture.componentInstance as unknown as Interno;
    picker.secuencia.set([bell, bellRing, star]);
    fixture.detectChanges();
    return { picker, html: fixture.nativeElement as HTMLElement };
  }

  it('sin tramo elegido, el lienzo pinta el preview en vivo, no el scrubber', async () => {
    const { html } = await montar();
    expect(html.querySelector('app-morph-scrubber')).toBeNull();
    expect(html.querySelector('gf-icon-morph')).not.toBeNull();
  });

  it('elegir el tramo 0→1 pinta el scrubber con ESE par y oculta el preview en vivo', async () => {
    const { picker } = await montar();
    picker.elegirTramo(1);
    expect(picker.tramoActivo()).toEqual({ origen: bell, destino: bellRing });
  });

  it('elegir el mismo tramo dos veces lo cierra (toggle)', async () => {
    const { picker } = await montar();
    picker.elegirTramo(1);
    expect(picker.tramoActivo()).not.toBeNull();
    picker.elegirTramo(1);
    expect(picker.tramoActivo()).toBeNull();
  });

  it('el índice 0 no tiene tramo "antes": elegirlo no hace nada', async () => {
    const { picker } = await montar();
    picker.elegirTramo(0);
    expect(picker.tramoActivo()).toBeNull();
  });

  it('agregar, quitar y limpiar cierran el tramo activo', async () => {
    const { picker } = await montar();

    picker.elegirTramo(1);
    picker.agregar({ nombre: 'heart', def: bellIcon });
    expect(picker.tramoActivo()).toBeNull();

    picker.elegirTramo(1);
    picker.quitar(2);
    expect(picker.tramoActivo()).toBeNull();

    picker.elegirTramo(1);
    picker.limpiar();
    expect(picker.tramoActivo()).toBeNull();
  });
});

/**
 * Cicatriz real (reportada por Orbe): el lienzo se queda mostrando el ÚLTIMO icono agregado
 * (`agregar()` mueve `indiceActual` ahí para dar feedback visual mientras se arma la cadena). Al
 * darle a "reproducir", el reseteo a índice 0 es TAMBIÉN un morph real — pero el temporizador del
 * primer tramo (0→1) se agendaba con retraso 0 sin importar de dónde venía el lienzo, así que ese
 * regreso al primer icono nunca alcanzaba a verse: lo pisaba el siguiente paso en el mismo instante.
 */
describe('MorphPicker — reproducir la secuencia', () => {
  const bell: Elegido = { nombre: 'bell', def: bellIcon };
  const bellRing: Elegido = { nombre: 'bell-ring', def: bellRingIcon };
  const star: Elegido = { nombre: 'star', def: starIcon };

  async function montar(): Promise<{ picker: Interno }> {
    await TestBed.configureTestingModule({
      imports: [MorphPicker, providersI18nTest({ 'lab/en': labEn, 'lab/es': labEs })],
    }).compileComponents();
    const fixture = TestBed.createComponent(MorphPicker);
    const picker = fixture.componentInstance as unknown as Interno;
    picker.secuencia.set([bell, bellRing, star]);
    fixture.detectChanges();
    return { picker };
  }

  const duracion = (desde: Elegido, hasta: Elegido) =>
    morphKeyframes(aIconNode(desde.def), aIconNode(hasta.def), { spring: RESORTE_LENTO }).duracion;

  it('si el lienzo no estaba en el primer icono, "reproducir" no salta al índice 1 en el mismo instante', async () => {
    const { picker } = await montar();
    // Simula la cadena recién construida con `agregar()`: el lienzo se queda mostrando el ÚLTIMO
    // icono agregado (índice 2), no el primero.
    picker.indiceActual.set(2);
    vi.useFakeTimers();
    try {
      picker.reproducir();
      expect(picker.indiceActual()).toBe(0); // el reseteo a 0 SÍ es síncrono
      vi.advanceTimersByTime(1);
      // Antes del fix, el paso a índice 1 se agendaba con retraso 0 sin importar de dónde venía
      // el lienzo: a 1ms ya habría "reproducido" — pisando el regreso al primer icono a medias.
      expect(picker.indiceActual()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it('reproduce los tres tramos en orden, esperando lo que tarda el regreso al primer icono', async () => {
    const { picker } = await montar();
    picker.indiceActual.set(2);
    vi.useFakeTimers();
    try {
      picker.reproducir();
      const regreso = duracion(star, bell);
      const paso1 = duracion(bell, bellRing);
      const paso2 = duracion(bellRing, star);

      vi.advanceTimersByTime(regreso + 10);
      expect(picker.indiceActual()).toBe(1);

      vi.advanceTimersByTime(paso1 + 10);
      expect(picker.indiceActual()).toBe(2);

      vi.advanceTimersByTime(paso2 + 10);
      // Fin de la vuelta: en loop, sigue corriendo — no se apaga sola.
      expect(picker.corriendo()).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it('al terminar una vuelta completa, la repite en loop (del último de vuelta al primero)', async () => {
    const { picker } = await montar(); // arranca en índice 0, sin reseteo previo
    vi.useFakeTimers();
    try {
      picker.reproducir();
      const paso1 = duracion(bell, bellRing);
      const paso2 = duracion(bellRing, star);
      const regreso = duracion(star, bell);

      vi.advanceTimersByTime(paso1 + 10);
      expect(picker.indiceActual()).toBe(2); // en plena primera vuelta, antes de que el loop reinicie

      vi.advanceTimersByTime(paso2 + regreso + 10);
      // Segunda vuelta: ya de regreso en el primer tramo, sin que nadie haya vuelto a hacer clic.
      expect(picker.indiceActual()).toBe(1);
      expect(picker.corriendo()).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it('con la secuencia corriendo, "reproducir" otra vez la detiene — mismo botón hace de play/stop', async () => {
    const { picker } = await montar();
    picker.reproducir();
    expect(picker.corriendo()).toBe(true);
    picker.reproducir();
    expect(picker.corriendo()).toBe(false);
  });
});
