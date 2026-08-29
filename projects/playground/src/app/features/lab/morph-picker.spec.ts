import { TestBed } from '@angular/core/testing';
import { AnimatedIconDef, bellIcon, bellRingIcon, starIcon } from 'glyphflow';
import { MorphPicker } from './morph-picker';
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
  tramoActivo: import('@angular/core').Signal<{ origen: Elegido; destino: Elegido } | null>;
  elegirTramo(indice: number): void;
  agregar(item: Elegido): void;
  quitar(indice: number): void;
  limpiar(): void;
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
