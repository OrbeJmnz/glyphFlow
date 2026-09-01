import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CURATED_ICONS } from 'glyphflow';
import { cargarCurados } from '../../core/catalogo';
import { providersI18nTest } from '../../core/i18n-testing';
import { Iconos, SNIPPET_PORTADA } from './iconos';
import iconosEn from '../../../i18n/iconos/en.json';
import iconosEs from '../../../i18n/iconos/es.json';

describe('el snippet de la portada', () => {
  /*
   * La portada enseña código que la gente va a pegar. Un snippet que cita un símbolo que ya no
   * existe es peor que no tener snippet: se lee igual de creíble y truena en su proyecto, no en
   * el nuestro. Esto lo compara contra lo que el paquete exporta DE VERDAD — el mismo criterio
   * que `api-surface.spec.ts` aplica a la tabla de API.
   */
  it('cada símbolo que cita existe en el paquete', async () => {
    const gf = (await import('glyphflow')) as Record<string, unknown>;
    for (const simbolo of ['GfIconComponent', 'bellIcon']) {
      expect(SNIPPET_PORTADA, `el snippet ya no cita ${simbolo}`).toContain(simbolo);
      expect(gf[simbolo], `${simbolo} no existe en el paquete`).toBeDefined();
    }
  });

  it('cubre las tres cosas que T4 pide enseñar', () => {
    expect(SNIPPET_PORTADA).toContain("from 'glyphflow'");
    expect(SNIPPET_PORTADA).toContain('imports: [GfIconComponent]');
    expect(SNIPPET_PORTADA).toContain('<gf-icon');
    // Al menos un input de configuración, no solo la etiqueta pelada.
    expect(SNIPPET_PORTADA).toMatch(/[size]|[iconDef]/);
  });

  it('no quedó hablando el namespace de la v1', () => {
    expect(SNIPPET_PORTADA).not.toMatch(/MaxIcon|max-icon|provideMaxIcons/);
  });
});

describe('Iconos', () => {
  beforeEach(async () => {
    // su botón «Empezar» es un routerLink.
    await TestBed.configureTestingModule({
      // `Iconos` traduce su título con conteo (`translateSignal`) y su template usa el scope
      // `iconos.*` (hero, showcase, argumentos, barra, grid) — sin ambos truena con
      // `TRANSLOCO_TRANSPILER` no encontrado. Ver `core/i18n-testing.ts`.
      imports: [Iconos, providersI18nTest({ 'iconos/en': iconosEn, 'iconos/es': iconosEs })],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  /*
   * Antes afirmaba que se pintaba UNA tarjeta por icono curado. Dejó de ser cierto a propósito el
   * 2026-08-27: montar los 1767 de golpe bloqueaba el hilo principal 18 segundos, porque
   * `<gf-icon trigger="group">` dibuja al montarse y para dibujar mide `getTotalLength()` de cada
   * figura. Ahora se monta un tramo que crece al llegar al final.
   *
   * Lo que sí tiene que seguir siendo cierto, y es lo que se prueba: el catálogo COMPLETO está
   * disponible —el conteo que se anuncia es el de verdad— y lo montado es un prefijo suyo, no una
   * muestra suelta.
   */
  // Timeout explicito: este test monta un tramo del catalogo entero (2.7 MB de JSON) y
  // ya corria a ~4.9 s del limite de 5 s por default de Vitest. No es lentitud nueva --
  // es que el margen era de decimas, y cualquier variante que se agregue lo consume.
  it('monta un tramo del catálogo y anuncia el total de verdad', async () => {
    const fixture = TestBed.createComponent(Iconos);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    const curados = Object.keys(CURATED_ICONS).length;

    const montadas = html.querySelectorAll('.card').length;
    expect(montadas).toBeGreaterThan(0);
    expect(montadas).toBeLessThan(curados);

    // El total anunciado es el del catálogo entero, no el de lo montado.
    expect(html.querySelector('.grid')?.getAttribute('aria-label')).toContain(String(curados));

    // Y queda por dónde seguir: el botón es la única vía para quien navega con teclado, porque
    // tabulando entre tarjetas nunca se dispara un `IntersectionObserver`.
    expect(html.querySelector('.hay-mas button')).toBeTruthy();
  }, 20000);

  /*
   * El panel de detalle es un DRAWER, no un modal, y eso es reversible sin querer: basta con
   * volver a poner un scrim «para que se vea mejor» o un `aria-modal` «porque es un diálogo».
   *
   * Lo era hasta el 2026-08-27 —scrim opaco, `aria-modal="true"`, scroll del `<body>` bloqueado y
   * trampa de foco— y el efecto era que para mirar dos iconos había que abrir, cerrar, buscar
   * dónde estabas y volver a abrir. Ahora la rejilla sigue viva debajo: se baja por ella y se
   * pulsa otro icono sin cerrar nada.
   */
  it('el panel abierto deja la rejilla usable: ni scrim ni aria-modal ni scroll bloqueado', async () => {
    const fixture = TestBed.createComponent(Iconos);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;

    html.querySelector<HTMLElement>('.card')!.click();
    await fixture.whenStable();

    expect(html.querySelector('app-icon-detail-panel')).toBeTruthy();
    expect(html.querySelector('.scrim')).toBeNull();
    expect(html.querySelector('[aria-modal]')).toBeNull();
    expect(document.body.style.overflow).not.toBe('hidden');

    // Y la rejilla le hace HUECO en vez de dejar iconos debajo: sin esto, 3 de cada 7 columnas
    // quedaban permanentemente tapadas por el panel (medido a 1280px).
    expect(html.querySelector('.grid')?.classList.contains('con-panel')).toBe(true);
    expect(html.querySelector('.barra')?.classList.contains('con-panel')).toBe(true);
  });

  /*
   * La marca `hold` es la única insignia que vuelve a la tarjeta, y va SOLO donde toca: son 473 de
   * 1767, así que pintarla de más la convertiría en ruido y de menos la haría mentir.
   *
   * `hold` y `held` no son lo mismo y por eso conviven — uno es una variante aparte que sostiene su
   * pose, el otro es que el propio `default` se quede mientras el puntero siga encima. Medido sobre
   * el catálogo el día que se separaron: 473 y 128, y CERO en común. Si algún día se solapan, es
   * que uno de los dos cambió de significado y hay que volver a mirar la taxonomía.
   */
  it('la marca hold sale solo en los iconos que tienen esa variante', async () => {
    // Contra el MISMO catálogo que alimenta la rejilla, no contra `CURATED_ICONS` del paquete
    // publicado: son dos fuentes distintas a propósito —el sitio sirve su JSON generado del
    // fuente— y compararlas cruzadas sólo funcionaba mientras los iconos que difieren cayeran
    // fuera del primer tramo de 120.
    const catalogo = await cargarCurados();
    const fixture = TestBed.createComponent(Iconos);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;

    const tarjetas = [...html.querySelectorAll<HTMLElement>('.card')];
    expect(tarjetas.length).toBeGreaterThan(0);
    // Que la muestra CONTENGA de los dos tipos: si el tramo trajera solo iconos sin `hold`, el
    // bucle pasaría con la marca desconectada de todo.
    const conHold = tarjetas.filter((t) => !!catalogo[t.dataset['icono']!]?.animations['hold']);
    expect(conHold.length).toBeGreaterThan(0);
    expect(conHold.length).toBeLessThan(tarjetas.length);

    for (const tarjeta of tarjetas) {
      const nombre = tarjeta.dataset['icono']!;
      const conMarca = !!tarjeta.querySelector('.marca-hold');
      const conVariante = !!catalogo[nombre]?.animations['hold'];
      expect(conMarca, `${nombre}: la marca y la variante no coinciden`).toBe(conVariante);
    }
  });

  /*
   * Abrir el panel recorta las columnas y eso empuja a cada tarjeta un tercio de las filas que
   * tenía encima — medido en el navegador, 2226px en compacta y 6278px en cómoda para el icono
   * 500. Sin corregir el scroll, quien pulsa un icono lo pierde de vista con el mismo gesto.
   *
   * jsdom no hace layout, así que lo que se blinda aquí no es el cálculo sino sus PIEZAS: que la
   * tarjeta lleve el ancla que el regreso necesita, y que abrir y cerrar no truene. Lo segundo no
   * es teórico: la primera versión usaba `CSS.escape`, que no existe fuera del navegador, y el run
   * seguía en verde porque el fallo salía como error no capturado en vez de como test roto.
   */
  it('cada tarjeta lleva su ancla, y abrir y cerrar el panel no truena fuera del navegador', async () => {
    const fixture = TestBed.createComponent(Iconos);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;

    const tarjetas = [...html.querySelectorAll<HTMLElement>('.card')];
    for (const tarjeta of tarjetas) {
      expect(tarjeta.dataset['icono'], 'una tarjeta sin ancla es una tarjeta a la que no se vuelve')
        .toBeTruthy();
    }

    const volver = vi.spyOn(window, 'scrollTo');

    tarjetas[0].click();
    await fixture.whenStable();
    expect(html.querySelector('app-icon-detail-panel')).toBeTruthy();

    html.querySelector<HTMLElement>('.detalle .cerrar')!.click();
    await fixture.whenStable();
    expect(html.querySelector('app-icon-detail-panel')).toBeNull();

    // Con rects a cero el ancla se reencuentra en su sitio y no hay nada que mover; el respaldo
    // por `scrollY` solo entra cuando esa tarjeta ya no existe. Lo que importa es que el camino
    // se recorrió entero sin lanzar — que es lo que `CSS.escape` rompía.
    volver.mockRestore();
  });

  /*
   * Los seis del hero son la RESPUESTA a lo que se acaba de escribir, no seis iconos decorativos
   * que ya no vienen a cuento. Y son los mismos seis primeros de la rejilla: dos listas ordenadas
   * por criterios distintos en la misma pantalla se leen como un error.
   */
  it('los seis del hero pasan a ser los seis primeros resultados', async () => {
    const fixture = TestBed.createComponent(Iconos);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;

    const muestra = [...html.querySelectorAll('.demo li span')].map((s) => s.textContent!.trim());
    expect(muestra).toEqual(['sparkles', 'bell', 'settings', 'star', 'zap', 'send']);

    const input = html.querySelector<HTMLInputElement>('.busqueda-hero input')!;
    input.value = 'arrow';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    const buscando = [...html.querySelectorAll('.demo li span')].map((s) => s.textContent!.trim());
    expect(buscando.length).toBe(6);
    expect(buscando.every((n) => n.includes('arrow'))).toBe(true);
    // Los mismos que abre la rejilla, en el mismo orden.
    const rejilla = [...html.querySelectorAll('.card [data-name]')]
      .slice(0, 6)
      .map((s) => s.textContent!.trim());
    expect(buscando).toEqual(rejilla);

    // Y el puente al resto, que sólo aparece si de verdad sobra algo.
    expect(html.querySelector('.ver-resto')).toBeTruthy();
  });

  it('sin resultados aparece el bloque con cara, y no una fila vacía', async () => {
    const fixture = TestBed.createComponent(Iconos);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;

    const input = html.querySelector<HTMLInputElement>('.busqueda-hero input')!;
    input.value = 'zzzzqq';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(html.querySelector('.demo')).toBeNull();
    expect(html.querySelector('app-sin-resultados')).toBeTruthy();
    // La cara es un icono del catálogo con su SVG, no un emoji: la regla del proyecto es que
    // ningún emoji hace de icono, y aquí sería además el peor sitio para romperla.
    expect(html.querySelector('app-sin-resultados gf-icon svg')).toBeTruthy();
    expect(html.querySelector('.ver-resto')).toBeNull();
  });

  it('el comando de instalación se copia, y lo dice', async () => {
    const fixture = TestBed.createComponent(Iconos);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;

    const boton = html.querySelector<HTMLButtonElement>('.instalar')!;
    // Un BOTÓN, no un enlace: el de copiar dentro de un `<a>` sería markup inválido, y de paso
    // lo que se quiere de la portada es el comando en el portapapeles, no otra pestaña.
    expect(boton.tagName).toBe('BUTTON');
    expect(boton.textContent).toContain('npm i glyphflow');

    // La zona de copia va aparte para que se vea DÓNDE está el gesto.
    expect(boton.querySelector('.instalar-copia gf-icon-morph')).toBeTruthy();

    // Y el tooltip dice en qué punto está.
    const burbuja = html.querySelector('.acciones .burbuja');
    expect(burbuja?.textContent?.trim()).toBe('Copy');
  });

  it('el hero conserva un h1 real, escondido solo a la vista', async () => {
    const fixture = TestBed.createComponent(Iconos);
    await fixture.whenStable();
    const h1 = (fixture.nativeElement as HTMLElement).querySelector('h1');
    // Reemplazar el h1 por una imagen sin texto pierde el SEO de la portada y deja mudo al lector
    // de pantalla. El titular sigue ahí; solo se esconde con `clip-path`.
    expect(h1?.textContent).toContain('glyphflow');
    expect(h1?.classList.contains('visualmente-oculto')).toBe(true);
  });

  it('el GIF del hero cede ante el movimiento reducido', async () => {
    const fixture = TestBed.createComponent(Iconos);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    const fuentes = [...html.querySelectorAll('picture source')];
    const media = fuentes.map((f) => f.getAttribute('media'));

    // La librería promete respetar `prefers-reduced-motion` y le dedica una página de docs. Un GIF
    // no se puede pausar por CSS, así que la única salida honesta es servir el logotipo quieto.
    const quieto = fuentes.find((f) => f.getAttribute('media') === '(prefers-reduced-motion: reduce)');
    expect(quieto?.getAttribute('srcset')).toContain('.svg');

    // Y desde el 2026-08-27, el TEMA va por la misma vía y por el mismo motivo: el `src` lo hornea
    // el prerender, donde no hay `matchMedia`, así que salía siempre el GIF oscuro de 425 KB y
    // quien prefiere claro se lo bajaba entero para verlo cambiar al de 50 al hidratar.
    expect(media).toContain('(prefers-color-scheme: light)');
    const claro = fuentes.find((f) => f.getAttribute('media') === '(prefers-color-scheme: light)');
    expect(claro?.getAttribute('srcset')).toContain('-light.');

    // Lo más específico va primero: gana el PRIMER `<source>` que casa.
    expect(media[0]).toBe('(prefers-reduced-motion: reduce) and (prefers-color-scheme: light)');

    expect(html.querySelector('picture img')?.getAttribute('src')).toContain('.gif');
    // Con dimensiones explícitas para que la portada no salte al cargar.
    expect(html.querySelector('picture img')?.getAttribute('width')).toBe('780');
  });

  it('el filtro por insignia recorta la lista y se puede quitar', async () => {
    const fixture = TestBed.createComponent(Iconos);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;

    // El TOTAL ANUNCIADO, no las tarjetas montadas: desde que la rejilla monta un tramo, con y sin
    // filtro puede haber el mismo número de tarjetas en el DOM aunque la lista de detrás sea muy
    // distinta. El conteo del `aria-label` sí es el de verdad.
    const anunciado = (): number =>
      Number(html.querySelector('.grid')?.getAttribute('aria-label')?.match(/\d+/)?.[0] ?? 0);
    const total = anunciado();

    // El grupo de filtros, no el primer botón de la barra: ese es «Repetir todo». Se apunta al
    // componente `app-grupo` y no a una clase, porque el componente es el contrato y la clase es
    // un detalle de su estilo.
    //
    // Y DENTRO del grupo, no el primero: ese es la cápsula «Todos», que por definición no recorta
    // nada. Se pide el primero sin pulsar, que es el primer filtro de insignia de verdad.
    const filtro = html.querySelector<HTMLButtonElement>(
      '.barra app-grupo button[aria-pressed="false"]',
    );
    expect(filtro).toBeTruthy();
    filtro!.click();
    await fixture.whenStable();

    const filtrado = html.querySelectorAll('.card').length;
    expect(filtrado).toBeGreaterThan(0);
    expect(anunciado()).toBeGreaterThan(0);
    expect(anunciado()).toBeLessThan(total);

    // Volver a todos es la propia cápsula «Todos»: el enlace «quitar filtro» que había antes
    // desapareció justamente porque duplicaba esto.
    html.querySelector<HTMLButtonElement>('.barra app-grupo button')!.click();
    await fixture.whenStable();
    expect(anunciado()).toBe(total);
  });

  /*
   * PAGE_SIZE = 200: el catálogo completo (más de 1700 curados) tiene que pedir varias páginas, y
   * una búsqueda que devuelve pocas decenas no debería mostrar controles que no sirven para nada.
   */
  describe('paginación', () => {
    it('con pocos resultados, el pie de paginación ni existe', async () => {
      const fixture = TestBed.createComponent(Iconos);
      await fixture.whenStable();
      const html = fixture.nativeElement as HTMLElement;

      const input = html.querySelector<HTMLInputElement>('.busqueda-hero input')!;
      input.value = 'arrow';
      input.dispatchEvent(new Event('input'));
      await fixture.whenStable();

      expect(html.querySelector('.pie-paginacion')).toBeNull();
    });

    it('con el catálogo completo aparece el paginador, y filtrar vuelve a la página 1', async () => {
      const fixture = TestBed.createComponent(Iconos);
      await fixture.whenStable();
      const html = fixture.nativeElement as HTMLElement;

      expect(html.querySelector('.pie-paginacion app-paginador')).toBeTruthy();

      // La segunda flecha es «Siguiente»: avanza a la página 2.
      const flechas = () => [...html.querySelectorAll<HTMLButtonElement>('.paginador-flecha')];
      flechas()[1].click();
      await fixture.whenStable();
      expect(html.querySelector('.paginador-num.activo')?.textContent?.trim()).toBe('2');

      // Filtrar por insignia resetea la página, igual que resetea el tramo montado.
      html.querySelector<HTMLButtonElement>('.barra app-grupo button[aria-pressed="false"]')!.click();
      await fixture.whenStable();
      expect(html.querySelector('.paginador-num.activo')?.textContent?.trim()).toBe('1');
    });

    it('cambiar Cómodo/Compacto no resetea la página', async () => {
      const fixture = TestBed.createComponent(Iconos);
      await fixture.whenStable();
      const html = fixture.nativeElement as HTMLElement;

      const flechas = () => [...html.querySelectorAll<HTMLButtonElement>('.paginador-flecha')];
      flechas()[1].click();
      await fixture.whenStable();
      expect(html.querySelector('.paginador-num.activo')?.textContent?.trim()).toBe('2');

      // El segundo `app-grupo` de la barra es el de densidad; se pulsa el que NO está activo.
      const botonesDensidad = [
        ...html.querySelectorAll<HTMLButtonElement>('.barra-controles app-grupo:nth-of-type(2) button'),
      ];
      botonesDensidad.find((b) => b.getAttribute('aria-pressed') === 'false')!.click();
      await fixture.whenStable();

      expect(html.querySelector('.paginador-num.activo')?.textContent?.trim()).toBe('2');
    });
  });
});
