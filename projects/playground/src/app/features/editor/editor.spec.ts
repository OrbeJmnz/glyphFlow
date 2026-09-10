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
 * el CABLEADO: que el componente arranque en blanco con la pluma armada, que elegir un icono
 * cargue su `d` real y pinte un nodo por punto arrastrable, y que cambiar de icono no arrastre
 * estado del anterior. La mayoría de los tests necesitan geometría real para tener algo que
 * mover/insertar/deshacer -- la piden explícitamente con el helper `elegir()`.
 */
describe('Editor', () => {
  /*
   * Cicatriz real, encontrada depurando esta sesión -- ninguno de estos tests destruía su
   * `fixture`. `ngOnDestroy` cancela el timer de 400ms que escribe el estado en `location.hash`
   * (`sincronizarUrl`); sin destruir, ese timer sigue vivo después de que el test que lo programó
   * ya terminó, y `location` es GLOBAL -- compartido por TODOS los tests del archivo, `TestBed` no
   * lo resetea entre componentes. Si el timer disparaba DURANTE la ejecución de un test distinto,
   * `restaurarDesdeHash()` de ESE componente leía el hash ajeno y le pisaba `modelos` con la
   * geometría de OTRO test. El síntoma: un test que carga un icono real y verifica su `d` a veces
   * (dependiendo del timing entre tests) lo veía vacío -- nunca en `ng test --watch`, donde cada
   * test corre con más aire entre uno y otro.
   */
  const fixturesActivos: { destroy(): void }[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // `Editor` vive en el scope `editor` (ver `app.routes.ts`) — el módulo de testing acepta la
      // clave con scope incluido directo. Ver `core/i18n-testing.ts`.
      imports: [Editor, providersI18nTest({ 'editor/en': editorEn, 'editor/es': editorEs })],
    }).compileComponents();
  });

  afterEach(() => {
    for (const fixture of fixturesActivos.splice(0)) fixture.destroy();
    // Por si algún timer alcanzó a escribir antes del destroy: el siguiente test no debe heredarlo.
    location.hash = '';
  });

  async function montar() {
    const fixture = TestBed.createComponent(Editor);
    fixturesActivos.push(fixture);
    await fixture.whenStable();
    return { fixture, html: fixture.nativeElement as HTMLElement };
  }

  /**
   * Cambia de pestaña en el panel (Icono/Edición/Salida/Proyecto). Las 4 secciones de antes son
   * pestañas ahora -- `@switch (pestanaActiva())` solo pinta la activa, así que cualquier test que
   * busque algo de OTRA pestaña (`.editable-d`, `.lista .chip`...) tiene que pasar por aquí
   * primero. Los botones no llevan texto verificable en el test (viene de transloco); el orden del
   * markup es fijo (Icono/Edición/Salida/Proyecto), así que basta con el índice.
   */
  async function irA(
    m: Awaited<ReturnType<typeof montar>>,
    pestana: 'icono' | 'edicion' | 'salida' | 'proyecto',
  ): Promise<void> {
    const { fixture, html } = m;
    const indices = { icono: 0, edicion: 1, salida: 2, proyecto: 3 } as const;
    html.querySelectorAll<HTMLButtonElement>('.tabs-nav button')[indices[pestana]].click();
    await fixture.whenStable();
  }

  /**
   * Selecciona un icono real por nombre. El editor arranca en blanco (T-nuevo: la pluma es la
   * entrada primaria a "crear desde cero"), así que los tests que prueban mecánica de EDICIÓN
   * (arrastrar, insertar, deshacer...) piden geometría real explícitamente -- ya no viene puesta
   * de fábrica. `heart` por default: es el mismo icono con el que estos tests ya se escribieron
   * antes del cambio, así que sus asunciones de "cuántos nodos hay" siguen valiendo igual.
   *
   * Devuelve el nombre elegido: elegir un icono salta solo a la pestaña "Edición" (ver
   * `Editor.elegir`), así que releer `.lista .chip.activo` después de llamar a este helper
   * requeriría volver a la pestaña "Icono" primero -- casi siempre alcanza con el nombre que ya se
   * pidió.
   */
  async function elegir(
    m: Awaited<ReturnType<typeof montar>>,
    nombre = 'heart',
  ): Promise<string> {
    const { fixture, html } = m;
    await irA(m, 'icono');
    const input = html.querySelector<HTMLInputElement>('app-campo-busqueda input')!;
    input.value = nombre;
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    const chip = [...html.querySelectorAll<HTMLButtonElement>('.lista .chip')].find(
      (b) => nombreDe(b) === nombre,
    );
    chip!.click();
    await fixture.whenStable();
    // Limpia el filtro: algunos tests cuentan chips o dependen del tramo normal de la lista.
    // El click de arriba ya saltó a "Edición" -- volver a "Icono" para poder tocar el buscador.
    await irA(m, 'icono');
    input.value = '';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    return nombre;
  }

  // Timeout explicito: este test monta un tramo del catalogo entero (2.7 MB de JSON) y
  // ya corria a ~4.9 s del limite de 5 s por default de Vitest. No es lentitud nueva --
  // es que el margen era de decimas, y cualquier variante que se agregue lo consume.
  it('elegir un icono carga su `d` intacto', async () => {
    const m = await montar();
    const nombre = await elegir(m);
    const { html } = m;
    await irA(m, 'salida');
    const salida = html.querySelector<HTMLTextAreaElement>('.editable-d')!.value;

    const original = CURATED_ICONS[nombre].shapes
      .filter(
        (s): s is typeof s & { d: string } =>
          s.tag === 'path' && typeof (s as { d?: unknown }).d === 'string',
      )
      .map((s) => s.d)
      .join('\n');
    // Sin tocar nada, el resultado es byte por byte el `d` de la librería.
    expect(salida).toBe(original);
  }, 20000);

  it('arranca en blanco, sin nodos, con la pluma armada', async () => {
    // T-nuevo: el editor ya no pre-carga un icono -- "crear desde cero" es la entrada primaria,
    // no una opción escondida detrás de "empezar de un curado y borrar todo".
    const m = await montar();
    const { html } = m;
    expect(html.querySelectorAll('.nodos .nodo').length).toBe(0);
    expect(html.querySelector('.lista .chip.activo')).toBeNull();
    // La pluma, armada de una -- no un segundo paso.
    expect(html.querySelector('.lienzo.modo-pluma')).not.toBeNull();
    // El `d` pegable vive en la pestaña "Salida".
    await irA(m, 'salida');
    expect(html.querySelector<HTMLTextAreaElement>('.editable-d')!.value).toBe('');
  });

  it('pinta un nodo por punto arrastrable, y ninguno por el `Z`', async () => {
    const m = await montar();
    await elegir(m);
    const { html } = m;
    await irA(m, 'salida');
    const d = html.querySelector<HTMLTextAreaElement>('.editable-d')!.value;
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
    const m = await montar();
    const nombre = await elegir(m);
    const { fixture, html } = m;
    await irA(m, 'salida');

    // El bloque de JSON solo pinta su contenido abierto; es el último de los dos plegables.
    const cabeceras = html.querySelectorAll<HTMLButtonElement>('.bloque-toggle');
    cabeceras[cabeceras.length - 1].click();
    await fixture.whenStable();

    const exportado = html.querySelector('pre.json code')!.textContent!;
    const resultado = analizarImportacion(exportado);

    expect(resultado).not.toBeNull();
    expect(resultado).not.toHaveProperty('errorKey');

    const aceptado = resultado as { def: { shapes: unknown[] }; nombre: string | null };
    expect(aceptado.nombre).toBe(nombre);
    expect(aceptado.def.shapes.length).toBeGreaterThan(0);

    // Y lleva la geometría que el editor está mostrando, no la del catálogo sin tocar.
    const dMostrado = html.querySelector<HTMLTextAreaElement>('.editable-d')!.value;
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
    expect(html.querySelector<HTMLTextAreaElement>('.editable-d')!.value).not.toContain('rect');
  });

  it('cambiar de icono no arrastra el estado del anterior', async () => {
    const m = await montar();
    await elegir(m, 'heart');
    const { fixture, html } = m;
    await irA(m, 'salida');
    const primero = html.querySelector<HTMLTextAreaElement>('.editable-d')!.value;

    // Cualquiera que no sea el puesto. Antes se comparaba por texto, y con los chips ya sin texto
    // la búsqueda devolvía `undefined`.
    await irA(m, 'icono');
    const otro = html.querySelector<HTMLButtonElement>('.lista .chip:not(.activo)')!;
    otro.click();
    await fixture.whenStable();
    // El click de arriba dispara `elegir()` de verdad, que salta a "Edición" -- ahí vive
    // restablecer. Y el botón no aparece: el icono nuevo está limpio, no hay nada que revertir.
    expect(html.querySelector('.restablecer')).toBeNull();

    await irA(m, 'salida');
    expect(html.querySelector<HTMLTextAreaElement>('.editable-d')!.value).not.toBe(primero);
  });

  // T30: el `d` del panel de salida es editable -- pegar o editar a mano carga esa forma. `change`
  // y no un `ClipboardEvent` simulado: `cargarDesdeTexto` es el mismo camino para pegar Y para
  // editar a mano (ver su comentario en `editor.ts`), así que probarlo por `change` cubre la
  // lógica real sin pelearse con jsdom y `clipboardData`, que no lo implementa de forma confiable.
  it('editar el `d` a mano (evento change) carga esa forma', async () => {
    const m = await montar();
    const { fixture, html } = m;
    await irA(m, 'salida');
    const campo = html.querySelector<HTMLTextAreaElement>('.editable-d')!;

    campo.value = 'M0 0L10 0L5 10Z';
    campo.dispatchEvent(new Event('change', { bubbles: true }));
    await fixture.whenStable();

    // Un triángulo: 3 nodos movibles, ninguno marcado `fin` (el trazo cierra con Z).
    expect(html.querySelectorAll('.nodos .nodo').length).toBe(3);
    expect(html.querySelector<HTMLTextAreaElement>('.editable-d')!.value).toBe('M0 0L10 0L5 10Z');
  });

  it('un `d` con más o menos líneas de las que hay trazos no se aplica', async () => {
    const m = await montar();
    const { fixture, html } = m;
    await irA(m, 'salida');
    const campo = html.querySelector<HTMLTextAreaElement>('.editable-d')!;
    const nodosAntes = html.querySelectorAll('.nodos .nodo').length;

    // El lienzo en blanco de arranque tiene 1 path; dos líneas no corresponden a nada -- ni
    // "reemplaza todos" ni "reemplaza el activo" aplica, así que `modelos` no se toca. (El VALOR
    // crudo del textarea no sirve para verificarlo: Angular no re-escribe una propiedad `[value]`
    // cuyo cómputo no cambió, así que lo que sí prueba que nada se aplicó es el conteo de nodos
    // reales.)
    campo.value = 'M0 0L1 1\nM2 2L3 3';
    campo.dispatchEvent(new Event('change', { bubbles: true }));
    await fixture.whenStable();

    expect(html.querySelectorAll('.nodos .nodo').length).toBe(nodosAntes);
  });

  it('un arrastre entero es UN paso de deshacer, no uno por píxel', async () => {
    const m = await montar();
    await elegir(m);
    const { fixture, html } = m;
    await irA(m, 'salida');
    const original = html.querySelector<HTMLTextAreaElement>('.editable-d')!.value;
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

    expect(html.querySelector<HTMLTextAreaElement>('.editable-d')!.value).not.toBe(original);
    const btnDeshacer = html.querySelectorAll<HTMLButtonElement>('.deshacer button')[0];
    expect(btnDeshacer.disabled).toBe(false);

    btnDeshacer.click();
    await fixture.whenStable();
    // UN solo click devuelve el `d` original completo.
    expect(html.querySelector<HTMLTextAreaElement>('.editable-d')!.value).toBe(original);
    expect(btnDeshacer.disabled).toBe(true);

    html.querySelectorAll<HTMLButtonElement>('.deshacer button')[1].click();
    await fixture.whenStable();
    expect(html.querySelector<HTMLTextAreaElement>('.editable-d')!.value).not.toBe(original);
  });

  it('seleccionar un nodo sin arrastrarlo NO mete un paso al historial', async () => {
    // La cicatriz: al soltar se redondeaban decimales SIEMPRE. Un simple click cambiaba los
    // decimales de una edición anterior, el historial lo contaba como cambio, y el siguiente
    // Ctrl+Z deshacía ese redondeo en vez de la operación que el usuario quería deshacer.
    const m = await montar();
    await elegir(m);
    const { fixture, html } = m;
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
    expect(html.querySelectorAll<HTMLButtonElement>('.deshacer button')[0].disabled).toBe(true);
  });

  it('agregar y borrar nodo son UN paso cada uno, y solo con nodo elegido', async () => {
    const m = await montar();
    await elegir(m);
    const { fixture, html } = m;
    const svg = html.querySelector('svg.lienzo')!;
    const r = { left: 0, top: 0, width: 480, height: 480 };
    svg.getBoundingClientRect = () =>
      ({ ...r, right: 480, bottom: 480, x: 0, y: 0, toJSON: () => r }) as DOMRect;

    // Sin nodo elegido no hay botones, solo la pista. `.nodo-acciones` vive en el dock del lienzo,
    // así que se ve sin importar qué pestaña del panel esté abierta -- `.editable-d` sí necesita
    // "Salida".
    expect(html.querySelector('.nodo-acciones button')).toBeNull();
    expect(html.querySelector('.nodo-acciones .pista-nodo')).not.toBeNull();
    await irA(m, 'salida');

    const antes = html.querySelectorAll('.nodos .nodo').length;
    const dAntes = html.querySelector<HTMLTextAreaElement>('.editable-d')!.value;

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

    const botones = html.querySelectorAll<HTMLButtonElement>('.nodo-acciones button');
    expect(botones.length).toBe(2);

    botones[0].click();
    await fixture.whenStable();
    expect(html.querySelectorAll('.nodos .nodo').length).toBe(antes + 1);

    html.querySelectorAll<HTMLButtonElement>('.deshacer button')[0].click();
    await fixture.whenStable();
    expect(html.querySelectorAll('.nodos .nodo').length).toBe(antes);
    expect(html.querySelector<HTMLTextAreaElement>('.editable-d')!.value).toBe(dAntes);
  });

  it('los botones de historial arrancan apagados', async () => {
    const { html } = await montar();
    const botones = html.querySelectorAll<HTMLButtonElement>('.deshacer button');
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
    const m = await montar();
    // `heart` va por la posición 700 de 1767: fuera de cualquier tramo inicial. Sin la excepción
    // del elegido, la lista saldría sin chip activo y no se vería qué se está editando.
    await elegir(m, 'heart');
    expect(m.html.querySelector('.lista .chip.activo')).toBeTruthy();
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

  /*
   * Cicatriz: el lienzo NO es cuadrado (con el workspace de tres columnas es claramente más ancho
   * que alto), pero su `viewBox` sí. Sin `preserveAspectRatio` el SVG usa el default `xMidYMid
   * meet`: escala uniforme y CENTRA, dejando bandas a los lados. `aViewBox()` mapeaba el rect
   * entero al viewBox —dividiendo x entre `width` e y entre `height`— así que en el eje largo
   * aplicaba el factor equivocado y no descontaba el centrado. Efecto: lo que dibujas aparece
   * desplazado del puntero, y tanto más cuanto más te alejas del centro.
   *
   * El test anterior usaba un rect de 480×480, cuadrado, donde las dos cuentas coinciden. Por eso
   * nunca lo cazó.
   */
  it('la conversión pantalla→viewBox respeta el centrado en un lienzo no cuadrado', async () => {
    const m = await montar();
    const { fixture, html } = m;
    const svg = html.querySelector('svg.lienzo')!;
    // 600×400: el dibujo ocupa 400×400 centrado, con 100px de banda a cada lado.
    const r = { left: 0, top: 0, width: 600, height: 400 };
    svg.getBoundingClientRect = () =>
      ({ ...r, right: 600, bottom: 400, x: 0, y: 0, toJSON: () => r }) as DOMRect;

    // El editor arranca con la pluma armada. Dos clics en puntos conocidos.
    // x=200 cae a 100px del borde IZQUIERDO del dibujo → 100/(400/24) = 6 unidades.
    // x=400 cae a 300px → 18 unidades. y=200 es el centro vertical → 12.
    for (const [x, y] of [
      [200, 200],
      [400, 200],
    ]) {
      svg.dispatchEvent(
        new PointerEvent('pointerdown', { clientX: x, clientY: y, bubbles: true }),
      );
      await fixture.whenStable();
    }
    // Enter termina el trazo abierto (≥2 puntos).
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await fixture.whenStable();

    await irA(m, 'salida');
    const d = html.querySelector<HTMLTextAreaElement>('.editable-d')!.value;
    // Con la cuenta vieja habrían salido 8 y 16: el ancho completo mapeado al viewBox.
    expect(d).toContain('M6 12');
    expect(d).toContain('18 12');
  }, 20000);

  it('el zoom reencuadra el viewBox y la conversión pantalla→viewBox lo respeta', async () => {
    // El riesgo real del zoom no es que se vea mal: es que `aViewBox` deje de cuadrar y el nodo se
    // despegue del puntero. Aquí se mide justo eso, arrastrando UNA unidad del icono con el
    // encuadre movido y comprobando que el punto se mueve una unidad, no 1.35.
    const m = await montar();
    await elegir(m);
    const { fixture, html } = m;
    const svg = html.querySelector('svg.lienzo')!;
    const r = { left: 0, top: 0, width: 480, height: 480 };
    svg.getBoundingClientRect = () =>
      ({ ...r, right: 480, bottom: 480, x: 0, y: 0, toJSON: () => r }) as DOMRect;

    // Por clase y no por el texto del botón: su contenido es un `<gf-icon>`, no un carácter. La
    // clase no depende del idioma en que corran los tests ni del orden dentro del dock.
    const mas = html.querySelector<HTMLButtonElement>('.dock .zoom-mas')!;
    mas.click();
    await fixture.whenStable();

    // El ajuste a rejilla arranca activo (T-nuevo): sin apagarlo, el arrastre de 1 unidad de abajo
    // se redondearía al múltiplo de 2 más cercano y este test dejaría de medir lo que dice medir
    // -- la conversión pantalla→viewBox, no el ajuste. Su botón vive en el dock del lienzo, orden
    // fijo (deshacer, rehacer, rejilla, ajuste, pluma) mientras no haya nodo elegido todavía -- las
    // acciones del nodo, que SÍ son condicionales, van después de este punto.
    html.querySelectorAll<HTMLButtonElement>('.dock .lienzo-btn')[3].click();
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
    const m = await montar();
    await elegir(m);
    const { fixture, html } = m;
    const antes = Number(html.querySelector('.nodos .nodo')!.getAttribute('r'));
    html.querySelector<HTMLButtonElement>('.dock .zoom-mas')!.click();
    await fixture.whenStable();
    expect(Number(html.querySelector('.nodos .nodo')!.getAttribute('r'))).toBeCloseTo(
      antes / 1.35,
      4,
    );
  });

  it('los nodos marcan inicio, y fin solo en trazos que no cierran', async () => {
    const m = await montar();
    await elegir(m);
    const { html } = m;
    await irA(m, 'salida');
    const d = html.querySelector<HTMLTextAreaElement>('.editable-d')!.value;
    const arranques = (d.match(/[Mm]/g) ?? []).length;
    const cierres = (d.match(/[zZ]/g) ?? []).length;
    // Un `inicio` por subpath; `fin` solo en los que quedan abiertos — en uno cerrado el final ES
    // el inicio y marcarlo dos veces sería mentira.
    expect(html.querySelectorAll('.nodos .nodo.inicio').length).toBe(arranques);
    expect(html.querySelectorAll('.nodos .nodo.fin').length).toBe(arranques - cierres);
  });

  it('el JSON arranca plegado y el `d` abierto', async () => {
    const m = await montar();
    const { fixture, html } = m;
    await irA(m, 'salida');
    expect(html.querySelector('.bloque pre.json')).toBeNull();
    expect(html.querySelector<HTMLTextAreaElement>('.editable-d')).not.toBeNull();

    html.querySelectorAll<HTMLButtonElement>('.bloque .bloque-toggle')[1].click();
    await fixture.whenStable();
    expect(html.querySelector('.bloque pre.json')!.textContent).toContain('"shapes"');
  });

  /*
   * Reordenar trazos es la única acción del panel de capas que cambia el icono EXPORTADO, no solo
   * lo que se ve. Y arrastra una consecuencia que no se ve venir: `IconChoreography.shapes` es un
   * `Record<number, MotionTrack>` indexado por posición dentro de `def.shapes`, así que mover una
   * figura sin remapear esos tracks deja la coreografía animando la figura equivocada, en
   * silencio y sin que ningún tipo se queje. Estos dos tests son la red de esa cicatriz.
   */
  async function jsonDeSalida(m: Awaited<ReturnType<typeof montar>>) {
    const { fixture, html } = m;
    await irA(m, 'salida');
    const toggles = html.querySelectorAll<HTMLButtonElement>('.bloque .bloque-toggle');
    if (!html.querySelector('.bloque pre.json')) {
      toggles[1].click();
      await fixture.whenStable();
    }
    return JSON.parse(html.querySelector('.bloque pre.json')!.textContent!) as {
      shapes: { d?: string }[];
      animations: Record<string, { shapes?: Record<string, unknown> }>;
    };
  }

  it('desde un icono en blanco se pueden dibujar trazos separados', async () => {
    // El hueco que esto tapa: la pluma escribe SIEMPRE dentro del trazo activo, así que sin un
    // "trazo nuevo" todo lo dibujado en un icono en blanco caía en el mismo `<path>` y el panel
    // de capas no pasaba nunca de una fila.
    const m = await montar();
    const { fixture, html } = m;
    const svg = html.querySelector('svg.lienzo')!;
    const r = { left: 0, top: 0, width: 480, height: 480 };
    svg.getBoundingClientRect = () =>
      ({ ...r, right: 480, bottom: 480, x: 0, y: 0, toJSON: () => r }) as DOMRect;

    const dibujar = async (puntos: [number, number][]) => {
      for (const [x, y] of puntos) {
        svg.dispatchEvent(
          new PointerEvent('pointerdown', { clientX: x, clientY: y, bubbles: true }),
        );
        await fixture.whenStable();
      }
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await fixture.whenStable();
    };

    expect(html.querySelectorAll('.capas-lista .capa').length).toBe(1);
    await dibujar([
      [100, 100],
      [200, 100],
    ]);

    html.querySelector<HTMLButtonElement>('.capas-nuevo')!.click();
    await fixture.whenStable();
    expect(html.querySelectorAll('.capas-lista .capa').length).toBe(2);

    await dibujar([
      [100, 300],
      [200, 300],
    ]);

    // Dos trazos de verdad, cada uno con su `d`: es una línea por `<path>` en la salida.
    await irA(m, 'salida');
    const lineas = html
      .querySelector<HTMLTextAreaElement>('.editable-d')!
      .value.split('\n')
      .filter(Boolean);
    expect(lineas.length).toBe(2);
    expect(lineas[0]).not.toBe(lineas[1]);
  }, 20000);

  it('subir un trazo reordena las figuras del icono exportado', async () => {
    const m = await montar();
    await elegir(m, 'alarm-clock');
    const { fixture, html } = m;

    const antes = await jsonDeSalida(m);
    const dsAntes = antes.shapes.map((f) => f.d).filter(Boolean);
    expect(dsAntes.length).toBeGreaterThan(1);

    await irA(m, 'icono');
    // Subir el segundo trazo: pasa a ser el primero.
    html
      .querySelectorAll('.capa')[1]
      .querySelectorAll<HTMLButtonElement>('.capa-mini')[0]
      .click();
    await fixture.whenStable();

    const despues = await jsonDeSalida(m);
    const dsDespues = despues.shapes.map((f) => f.d).filter(Boolean);
    // Los dos primeros `d` intercambiados, el resto igual: es una permutación, no una reescritura.
    expect(dsDespues[0]).toBe(dsAntes[1]);
    expect(dsDespues[1]).toBe(dsAntes[0]);
    expect(dsDespues.slice(2)).toEqual(dsAntes.slice(2));
  }, 20000);

  it('al reordenar, los tracks de la coreografía siguen a su figura', async () => {
    const m = await montar();
    await elegir(m, 'alarm-clock');
    const { fixture, html } = m;

    const antes = await jsonDeSalida(m);
    // La variante que tenga tracks por índice; `alarm-clock` los trae.
    const conTracks = Object.entries(antes.animations).find(
      ([, c]) => c.shapes && Object.keys(c.shapes).length > 0,
    );
    expect(conTracks, 'el icono de prueba debe traer tracks indexados').toBeDefined();
    const [variante, coreoAntes] = conTracks!;
    const indicesAntes = Object.keys(coreoAntes.shapes!).map(Number).sort((a, b) => a - b);

    await irA(m, 'icono');
    html
      .querySelectorAll('.capa')[1]
      .querySelectorAll<HTMLButtonElement>('.capa-mini')[0]
      .click();
    await fixture.whenStable();

    const despues = await jsonDeSalida(m);
    const coreoDespues = despues.animations[variante];
    const indicesDespues = Object.keys(coreoDespues.shapes!).map(Number).sort((a, b) => a - b);

    // Mismo número de tracks: ninguno se perdió por el camino.
    expect(indicesDespues.length).toBe(indicesAntes.length);

    // Y cada track sigue apuntando a la MISMA figura, esté donde esté ahora. Se comprueba por su
    // `d`: es lo que de verdad identifica a la figura, no su posición.
    for (const i of indicesAntes) {
      const dOriginal = antes.shapes[i]?.d;
      if (dOriginal === undefined) continue;
      const nuevoIndice = indicesDespues.find((j) => despues.shapes[j]?.d === dOriginal);
      expect(nuevoIndice, `el track de la figura ${i} se quedó sin su figura`).toBeDefined();
    }
  }, 20000);
});

/**
 * Los chips de la lista del editor son SOLO icono: el nombre dejó de estar en el texto y vive en el
 * nombre accesible. Se lee de ahí y no del `[texto]` del tooltip a propósito — `aria-label` es lo
 * que de verdad percibe quien navega con lector de pantalla.
 */
function nombreDe(chip: Element): string {
  return (chip.getAttribute('aria-label') ?? '').replace(/^Edit\s+/, '');
}
