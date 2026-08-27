import { TestBed } from '@angular/core/testing';
import { CURATED_ICONS } from 'glyphflow';
import { providersI18nTest } from '../../core/i18n-testing';
import { Editor } from './editor';
import { parseD } from './geometria/path-model';
import { nodosDe } from './geometria/path-edit';
import editorEn from '../../../i18n/editor/en.json';
import editorEs from '../../../i18n/editor/es.json';
import { analizarImportacion } from '../lab/icon-import';

/**
 * La matemática de edición tiene sus propios tests sobre los 450 paths del catálogo. Esto prueba
 * el CABLEADO: que el componente cargue el `d` real, pinte un nodo por punto arrastrable, y que
 * cambiar de icono no arrastre estado del anterior.
 */
describe('Editor', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // `Editor` vive en el scope `editor` (ver `app.routes.ts`) — el módulo de testing acepta la
      // clave con scope incluido directo. Ver `core/i18n-testing.ts`.
      imports: [Editor, providersI18nTest({ 'editor/en': editorEn, 'editor/es': editorEs })],
    }).compileComponents();
  });

  async function montar() {
    const fixture = TestBed.createComponent(Editor);
    await fixture.whenStable();
    return { fixture, html: fixture.nativeElement as HTMLElement };
  }

  it('arranca con un icono cargado y su `d` intacto', async () => {
    const { html } = await montar();
    const salida = html.querySelector('.salida code')!.textContent!;
    const nombre = nombreDe(html.querySelector('.lista .chip.activo')!);

    const original = CURATED_ICONS[nombre].shapes
      .filter(
        (s): s is typeof s & { d: string } =>
          s.tag === 'path' && typeof (s as { d?: unknown }).d === 'string',
      )
      .map((s) => s.d)
      .join('\n');
    // Sin tocar nada, el resultado es byte por byte el `d` de la librería.
    expect(salida).toBe(original);
  });

  it('pinta un nodo por punto arrastrable, y ninguno por el `Z`', async () => {
    const { html } = await montar();
    const d = html.querySelector('.salida code')!.textContent!;
    // Contra el parser real (`parseD`/`nodosDe`, ya probado sobre los 899 paths del catálogo) en
    // vez de contar letras de comando a mano: un comando puede repetirse implícito (mismo `a` con
    // varios juegos de parámetros seguidos), y ahí contar letras sub-cuenta puntos reales.
    const esperados = d
      .split('\n')
      .flatMap((linea) => nodosDe(parseD(linea)).filter((n) => n.movible));
    /*
     * `.nodos .nodo` y no `.nodo` a secas —aquí y en el resto del archivo—: la leyenda del lienzo
     * dibuja sus muestras con LAS MISMAS clases, a propósito, para que no puedan derivar de lo que
     * se ve arriba. Sin acotar al grupo, estas cuentas incluían las muestras y este test empezó a
     * medir la leyenda además del lienzo.
     */
    expect(html.querySelectorAll('.nodos .nodo').length).toBe(esperados.length);
  });

  it('lo que el editor exporta es exactamente lo que el importador del Lab acepta', async () => {
    /*
     * El viaje de ida y vuelta, anclado. El editor sabía exportar y el Lab sabe importar, pero
     * nadie comprobaba que hablaran el mismo idioma: bastaba con que alguien renombrara una clave
     * en un lado para que el JSON dejara de entrar por el otro, y el síntoma habría sido un usuario
     * pegando su trabajo y viendo un error.
     *
     * Contra el texto que se RENDERIZA, no contra el `computed` interno: es el que se copia y el
     * que se descarga, así que es el que de verdad viaja.
     */
    const { fixture, html } = await montar();

    // El bloque de JSON solo pinta su contenido abierto; es el último de los dos plegables.
    const cabeceras = html.querySelectorAll<HTMLButtonElement>('.bloque-cab');
    cabeceras[cabeceras.length - 1].click();
    await fixture.whenStable();

    const exportado = html.querySelector('pre.json code')!.textContent!;
    const resultado = analizarImportacion(exportado);

    expect(resultado).not.toBeNull();
    expect(resultado).not.toHaveProperty('errorKey');

    const aceptado = resultado as { def: { shapes: unknown[] }; nombre: string | null };
    expect(aceptado.nombre).toBe(nombreDe(html.querySelector('.lista .chip.activo')!));
    expect(aceptado.def.shapes.length).toBeGreaterThan(0);

    // Y lleva la geometría que el editor está mostrando, no la del catálogo sin tocar.
    const dMostrado = html.querySelector('.salida code')!.textContent!;
    const dExportado = (aceptado.def.shapes as { d?: string }[])
      .filter((f) => typeof f.d === 'string')
      .map((f) => f.d)
      .join('\n');
    expect(dExportado).toBe(dMostrado);
  });

  it('las figuras que no son `path` se pintan de contexto pero no traen nodos', async () => {
    const { fixture, html } = await montar();
    // `copy` trae un `rect` además del path: se ve, no se edita.
    const chip = [...html.querySelectorAll<HTMLButtonElement>('.lista .chip')].find(
      (b) => b.textContent?.trim() === 'copy',
    );
    if (!chip) return;
    chip.click();
    await fixture.whenStable();
    expect(html.querySelectorAll('.contexto rect').length).toBe(1);
    expect(html.querySelector('.salida code')!.textContent).not.toContain('rect');
  });

  it('cambiar de icono no arrastra el estado del anterior', async () => {
    const { fixture, html } = await montar();
    const primero = html.querySelector('.salida code')!.textContent;
    // Cualquiera que no sea el puesto. Antes se comparaba por texto, y con los chips ya sin texto
    // la búsqueda devolvía `undefined`.
    const otro = html.querySelector<HTMLButtonElement>('.lista .chip:not(.activo)')!;
    otro.click();
    await fixture.whenStable();
    expect(html.querySelector('.salida code')!.textContent).not.toBe(primero);
    // Y el botón de restablecer no aparece: el icono nuevo está limpio, no hay nada que revertir.
    expect(html.querySelector('.salida-cab .restablecer')).toBeNull();
  });

  it('un arrastre entero es UN paso de deshacer, no uno por píxel', async () => {
    const { fixture, html } = await montar();
    const original = html.querySelector('.salida code')!.textContent!;
    const svg = html.querySelector('svg.lienzo')!;
    const nodo = html.querySelectorAll('.nodos .nodo')[1] as SVGCircleElement;

    // El entorno de tests no calcula layout, así que `getBoundingClientRect` devuelve ceros y la
    // conversión a viewBox dividiría entre cero. Se fija un rect: sin esto el test se saltaría sus
    // propias aserciones y pasaría sin probar nada.
    const r = { left: 0, top: 0, width: 480, height: 480 };
    svg.getBoundingClientRect = () =>
      ({ ...r, right: 480, bottom: 480, x: 0, y: 0, toJSON: () => r }) as DOMRect;

    const punto = (x: number, y: number) => ({
      clientX: r.left + (x / 24) * r.width,
      clientY: r.top + (y / 24) * r.height,
      bubbles: true,
      pointerId: 1,
    });
    const x0 = Number(nodo.getAttribute('cx'));
    const y0 = Number(nodo.getAttribute('cy'));
    nodo.setPointerCapture = () => undefined;

    nodo.dispatchEvent(new PointerEvent('pointerdown', punto(x0, y0)));
    // Tres movimientos: si cada uno entrara al historial, harían falta tres Ctrl+Z.
    for (const paso of [1, 2, 3]) {
      svg.dispatchEvent(new PointerEvent('pointermove', punto(x0 + paso, y0)));
    }
    svg.dispatchEvent(new PointerEvent('pointerup', punto(x0 + 3, y0)));
    await fixture.whenStable();

    expect(html.querySelector('.salida code')!.textContent).not.toBe(original);
    const btnDeshacer = html.querySelectorAll<HTMLButtonElement>('.deshacer .chip')[0];
    expect(btnDeshacer.disabled).toBe(false);

    btnDeshacer.click();
    await fixture.whenStable();
    // UN solo click devuelve el `d` original completo.
    expect(html.querySelector('.salida code')!.textContent).toBe(original);
    expect(btnDeshacer.disabled).toBe(true);

    html.querySelectorAll<HTMLButtonElement>('.deshacer .chip')[1].click();
    await fixture.whenStable();
    expect(html.querySelector('.salida code')!.textContent).not.toBe(original);
  });

  it('seleccionar un nodo sin arrastrarlo NO mete un paso al historial', async () => {
    // La cicatriz: al soltar se redondeaban decimales SIEMPRE. Un simple click cambiaba los
    // decimales de una edición anterior, el historial lo contaba como cambio, y el siguiente
    // Ctrl+Z deshacía ese redondeo en vez de la operación que el usuario quería deshacer.
    const { fixture, html } = await montar();
    const svg = html.querySelector('svg.lienzo')!;
    const r = { left: 0, top: 0, width: 480, height: 480 };
    svg.getBoundingClientRect = () =>
      ({ ...r, right: 480, bottom: 480, x: 0, y: 0, toJSON: () => r }) as DOMRect;

    const nodo = html.querySelectorAll('.nodos .nodo')[1] as SVGCircleElement;
    nodo.setPointerCapture = () => undefined;
    const punto = (x: number, y: number) => ({
      clientX: (x / 24) * r.width,
      clientY: (y / 24) * r.height,
      bubbles: true,
      pointerId: 1,
    });
    const x0 = Number(nodo.getAttribute('cx'));
    const y0 = Number(nodo.getAttribute('cy'));

    // Tres clicks sin mover: ni uno debe registrarse.
    for (let i = 0; i < 3; i++) {
      nodo.dispatchEvent(new PointerEvent('pointerdown', punto(x0, y0)));
      svg.dispatchEvent(new PointerEvent('pointerup', punto(x0, y0)));
      await fixture.whenStable();
    }
    expect(html.querySelectorAll<HTMLButtonElement>('.deshacer .chip')[0].disabled).toBe(true);
  });

  it('agregar y borrar nodo son UN paso cada uno, y solo con nodo elegido', async () => {
    const { fixture, html } = await montar();
    const svg = html.querySelector('svg.lienzo')!;
    const r = { left: 0, top: 0, width: 480, height: 480 };
    svg.getBoundingClientRect = () =>
      ({ ...r, right: 480, bottom: 480, x: 0, y: 0, toJSON: () => r }) as DOMRect;

    // Sin nodo elegido no hay botones, solo la pista.
    expect(html.querySelector('.nodo-acciones .chip')).toBeNull();
    expect(html.querySelector('.nodo-acciones .pista-nodo')).not.toBeNull();

    const antes = html.querySelectorAll('.nodos .nodo').length;
    const dAntes = html.querySelector('.salida code')!.textContent;

    const nodo = html.querySelectorAll('.nodos .nodo')[2] as SVGCircleElement;
    nodo.setPointerCapture = () => undefined;
    const p = {
      clientX: (Number(nodo.getAttribute('cx')) / 24) * r.width,
      clientY: (Number(nodo.getAttribute('cy')) / 24) * r.height,
      bubbles: true,
      pointerId: 1,
    };
    nodo.dispatchEvent(new PointerEvent('pointerdown', p));
    svg.dispatchEvent(new PointerEvent('pointerup', p));
    await fixture.whenStable();

    const botones = html.querySelectorAll<HTMLButtonElement>('.nodo-acciones .chip');
    expect(botones.length).toBe(2);

    botones[0].click();
    await fixture.whenStable();
    expect(html.querySelectorAll('.nodos .nodo').length).toBe(antes + 1);

    html.querySelectorAll<HTMLButtonElement>('.deshacer .chip')[0].click();
    await fixture.whenStable();
    expect(html.querySelectorAll('.nodos .nodo').length).toBe(antes);
    expect(html.querySelector('.salida code')!.textContent).toBe(dAntes);
  });

  it('los botones de historial arrancan apagados', async () => {
    const { html } = await montar();
    const botones = html.querySelectorAll<HTMLButtonElement>('.deshacer .chip');
    expect(botones.length).toBe(2);
    expect([...botones].every((b) => b.disabled)).toBe(true);
  });

  it('el buscador acota la lista', async () => {
    const { fixture, html } = await montar();
    const antes = html.querySelectorAll('.lista .chip').length;
    const input = html.querySelector<HTMLInputElement>('app-campo-busqueda input')!;
    input.value = 'bell';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    const despues = [...html.querySelectorAll('.lista .chip')].map(nombreDe);
    expect(despues.length).toBeLessThan(antes);
    expect(despues.every((n) => n.includes('bell'))).toBe(true);
  });

  /**
   * La lista se cortaba en 60 con un `slice`, y el corte era invisible: el contenedor tiene
   * `max-height` con scroll, así que 60-de-899 se veía idéntico a 60-de-60.
   *
   * El daño no era solo de descubrimiento. El icono `x` quedaba INALCANZABLE: su única consulta
   * posible (`x`) tiene 61 coincidencias y `x` cae en la posición 60 — un lugar fuera del corte.
   * Un editor al que no se le puede pedir un icono del catálogo no cumple su trabajo.
   */
  /*
   * Antes afirmaba que se montaban los 1767 chips. Dejó de ser cierto a propósito el 2026-08-27:
   * instanciar 1 772 `<gf-icon>` costaba 3 732 ms de hilo principal bloqueado. Ahora se monta un
   * tramo.
   *
   * Lo que NO puede volver es el corte silencioso — el de 60 que dejaba `x` fuera para siempre, y
   * que el test de abajo sigue vigilando. Un corte es aceptable sólo si se ve, se puede deshacer y
   * el buscador sigue alcanzando lo que no está montado. Eso es lo que se prueba aquí.
   */
  it('corta la lista, pero lo dice y se puede deshacer', async () => {
    const { html } = await montar();
    const total = Object.keys(CURATED_ICONS).length;
    const chips = html.querySelectorAll('.lista .chip').length;

    expect(chips).toBeGreaterThan(0);
    expect(chips).toBeLessThan(total);

    // El conteo sigue anunciando el catálogo entero, no lo montado.
    expect(html.querySelector('.conteo')?.textContent).toContain(String(total));

    // Y hay por dónde seguir sin depender de un `IntersectionObserver`, que tabulando no se
    // dispara nunca.
    expect(html.querySelector('.lista button[app-boton]')).toBeTruthy();
  });

  it('el icono que se está editando siempre está montado, caiga donde caiga', async () => {
    const { html } = await montar();
    // `heart`, el de arranque, va por la posición 700 de 1767: fuera de cualquier tramo inicial.
    // Sin la excepción del elegido, la lista salía sin chip activo y no se veía qué se editaba.
    expect(html.querySelector('.lista .chip.activo')).toBeTruthy();
  });

  it('se puede llegar a `x`, que el corte de 60 dejaba fuera para siempre', async () => {
    const { fixture, html } = await montar();
    const input = html.querySelector<HTMLInputElement>('app-campo-busqueda input')!;
    input.value = 'x';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect([...html.querySelectorAll('.lista .chip')].map(nombreDe)).toContain('x');
  });

  /**
   * Un nombre viejo de Lucide tiene que encontrar al actual. Sin esto, quien llega con
   * `alert-triangle` en la cabeza ve una lista vacía y concluye que el icono no existe.
   */
  it('la búsqueda entiende los alias de nombres viejos de Lucide', async () => {
    const { fixture, html } = await montar();
    const input = html.querySelector<HTMLInputElement>('app-campo-busqueda input')!;
    input.value = 'alert-triangle';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect([...html.querySelectorAll('.lista .chip')].map(nombreDe)).toContain('triangle-alert');
  });

  /** El conteo va derivado: escrito a mano se queda atrás, como ya pasó con el «180». */
  it('publica cuántos ve el usuario y cuántos hay', async () => {
    const { html } = await montar();
    const total = Object.keys(CURATED_ICONS).length;
    expect(html.querySelector('.grupo-tit .conteo')!.textContent!.trim()).toBe(`${total}/${total}`);
  });

  it('el zoom reencuadra el viewBox y la conversión pantalla→viewBox lo respeta', async () => {
    // El riesgo real del zoom no es que se vea mal: es que `aViewBox` deje de cuadrar y el nodo se
    // despegue del puntero. Aquí se mide justo eso, arrastrando UNA unidad del icono con el
    // encuadre movido y comprobando que el punto se mueve una unidad, no 1.35.
    const { fixture, html } = await montar();
    const svg = html.querySelector('svg.lienzo')!;
    const r = { left: 0, top: 0, width: 480, height: 480 };
    svg.getBoundingClientRect = () =>
      ({ ...r, right: 480, bottom: 480, x: 0, y: 0, toJSON: () => r }) as DOMRect;

    const [mas] = [...html.querySelectorAll<HTMLButtonElement>('.barra-baja .lienzo-btn')].filter(
      (b) => b.textContent?.trim() === '+',
    );
    mas.click();
    await fixture.whenStable();

    const [px, py, ancho] = svg.getAttribute('viewBox')!.split(' ').map(Number);
    // Un paso de zoom: 24 / 1.35, centrado — el encuadre encoge y se recorre hacia el centro.
    expect(ancho).toBeCloseTo(24 / 1.35, 3);
    expect(px).toBeCloseTo((24 - ancho) / 2, 3);
    expect(py).toBeCloseTo((24 - ancho) / 2, 3);

    const nodo = html.querySelectorAll('.nodos .nodo')[1] as SVGCircleElement;
    nodo.setPointerCapture = () => undefined;
    const x0 = Number(nodo.getAttribute('cx'));
    const y0 = Number(nodo.getAttribute('cy'));
    // De unidades del icono a píxeles, ahora que el viewBox ya no arranca en 0 ni mide 24.
    const aPantalla = (x: number, y: number) => ({
      clientX: ((x - px) / ancho) * r.width,
      clientY: ((y - py) / ancho) * r.height,
      bubbles: true,
      pointerId: 1,
    });

    nodo.dispatchEvent(new PointerEvent('pointerdown', aPantalla(x0, y0)));
    svg.dispatchEvent(new PointerEvent('pointermove', aPantalla(x0 + 1, y0)));
    svg.dispatchEvent(new PointerEvent('pointerup', aPantalla(x0 + 1, y0)));
    await fixture.whenStable();

    const movido = html.querySelectorAll('.nodos .nodo')[1] as SVGCircleElement;
    expect(Number(movido.getAttribute('cx'))).toBeCloseTo(x0 + 1, 1);
    expect(Number(movido.getAttribute('cy'))).toBeCloseTo(y0, 1);
  });

  it('el radio de los nodos se divide entre el zoom para medir lo mismo en pantalla', async () => {
    const { fixture, html } = await montar();
    const antes = Number(html.querySelector('.nodos .nodo')!.getAttribute('r'));
    [...html.querySelectorAll<HTMLButtonElement>('.barra-baja .lienzo-btn')]
      .find((b) => b.textContent?.trim() === '+')!
      .click();
    await fixture.whenStable();
    expect(Number(html.querySelector('.nodos .nodo')!.getAttribute('r'))).toBeCloseTo(
      antes / 1.35,
      4,
    );
  });

  it('los nodos marcan inicio, y fin solo en trazos que no cierran', async () => {
    const { html } = await montar();
    const d = html.querySelector('.salida code')!.textContent!;
    const arranques = (d.match(/[Mm]/g) ?? []).length;
    const cierres = (d.match(/[zZ]/g) ?? []).length;
    // Un `inicio` por subpath; `fin` solo en los que quedan abiertos — en uno cerrado el final ES
    // el inicio y marcarlo dos veces sería mentira.
    expect(html.querySelectorAll('.nodos .nodo.inicio').length).toBe(arranques);
    expect(html.querySelectorAll('.nodos .nodo.fin').length).toBe(arranques - cierres);
  });

  it('el JSON arranca plegado y el `d` abierto', async () => {
    const { fixture, html } = await montar();
    expect(html.querySelector('.bloque pre.json')).toBeNull();
    expect(html.querySelector('.salida code')).not.toBeNull();

    html.querySelectorAll<HTMLButtonElement>('.bloque .bloque-cab')[1].click();
    await fixture.whenStable();
    expect(html.querySelector('.bloque pre.json')!.textContent).toContain('"shapes"');
  });
});

/**
 * Los chips de la lista del editor son SOLO icono: el nombre dejó de estar en el texto y vive en el
 * nombre accesible. Se lee de ahí y no del `[texto]` del tooltip a propósito — `aria-label` es lo
 * que de verdad percibe quien navega con lector de pantalla.
 */
function nombreDe(chip: Element): string {
  return (chip.getAttribute('aria-label') ?? '').replace(/^Edit\s+/, '');
}
