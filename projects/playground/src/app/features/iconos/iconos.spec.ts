import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CURATED_ICONS } from 'glyphflow';
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
  });

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
});
