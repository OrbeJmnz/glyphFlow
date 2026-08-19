import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { CURATED_ICONS, type AnimatedIconDef } from 'glyphflow';
import { Taller } from './taller';
import { IconImport } from './icon-import';
import { Editor } from './pages/editor';

/**
 * El círculo que el proyecto promete desde v4.1: editar la forma y coreografiar ESA forma, sin
 * exportar y reimportar a mano. Lo que se prueba aquí es el traspaso completo, no cada mitad.
 */
describe('Taller — el puente entre editar y coreografiar', () => {
  it('el traspaso es de una sola vez: recoger lo vacía', () => {
    const taller = TestBed.configureTestingModule({}).inject(Taller);
    const def = CURATED_ICONS['bell'];
    expect(taller.recoger()).toBeNull();

    taller.enviar('bell', def);
    expect(taller.pieza()?.nombre).toBe('bell');
    expect(taller.recoger()?.def).toBe(def);
    // Si se quedara, volver al Lab más tarde repondría una edición vieja encima de lo escrito.
    expect(taller.recoger()).toBeNull();
    expect(taller.pieza()).toBeNull();
  });

  it('el importador recoge lo que mandó el editor y lo previsualiza', async () => {
    TestBed.configureTestingModule({ imports: [IconImport] });
    const taller = TestBed.inject(Taller);
    const editado: AnimatedIconDef = {
      ...CURATED_ICONS['bell'],
      shapes: CURATED_ICONS['bell'].shapes.map((f) =>
        f.tag === 'path' ? { ...f, d: 'M1 2h3' } : f,
      ),
    };
    taller.enviar('bell (editado)', editado);

    const fixture = TestBed.createComponent(IconImport);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;

    // El panel se abre solo y dice de dónde vino: pegado a mano y llegado del editor no son igual.
    expect(html.querySelector('.desde-editor')?.textContent).toContain('bell (editado)');
    const textarea = html.querySelector('textarea')!;
    expect(textarea.value).toContain('M1 2h3');
    // Y entra por la MISMA puerta pública: si el JSON no fuera válido para el importador, no
    // habría preview.
    expect(html.querySelector('max-icon')).not.toBeNull();
  });

  it('sin nada en el taller, el importador arranca cerrado y vacío', async () => {
    TestBed.configureTestingModule({ imports: [IconImport] });
    const fixture = TestBed.createComponent(IconImport);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelector('.desde-editor')).toBeNull();
    expect(html.querySelector('textarea')).toBeNull();
  });

  it('el editor manda la geometría editada CON la coreografía original', async () => {
    // La ruta `lab` tiene que EXISTIR aunque el test no la pinte: el botón navega de verdad, y con
    // rutas vacías Angular rechazaba la navegación con NG04002 — una promesa sin manejar que
    // Vitest marca como posible falso positivo del resto de la corrida.
    TestBed.configureTestingModule({
      imports: [Editor],
      providers: [provideRouter([{ path: 'lab', children: [] }])],
    });
    const taller = TestBed.inject(Taller);
    const fixture = TestBed.createComponent(Editor);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;

    const nombre = html.querySelector('.lista .chip.activo')!.textContent!.trim();
    html.querySelector<HTMLButtonElement>('.btn-coreografiar')!.click();
    await fixture.whenStable();

    // Y de paso se verifica lo que el botón promete: además de mandar la pieza, lleva al Lab.
    expect(TestBed.inject(Router).url).toBe('/lab');

    const pieza = taller.recoger()!;
    expect(pieza.nombre).toBe(nombre);
    // Las animaciones viajan intactas: sin ellas el traspaso no serviría de nada.
    expect(pieza.def.animations).toBe(CURATED_ICONS[nombre].animations);
    // Y las figuras conservan su ORDEN y su cantidad: los tracks apuntan a `shapes[i]` por índice,
    // así que reordenarlas rompería en silencio la animación que se quiere conservar.
    const originales = CURATED_ICONS[nombre].shapes;
    expect(pieza.def.shapes.length).toBe(originales.length);
    expect(pieza.def.shapes.map((f) => f.tag)).toEqual(originales.map((f) => f.tag));
  });
});
