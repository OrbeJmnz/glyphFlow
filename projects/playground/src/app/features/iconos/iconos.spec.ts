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

  it('pinta una tarjeta por icono curado del paquete publicado', async () => {
    const fixture = TestBed.createComponent(Iconos);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelectorAll('.card').length).toBe(Object.keys(CURATED_ICONS).length);
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
    const fuente = html.querySelector('picture source');
    // La librería promete respetar `prefers-reduced-motion` y le dedica una página de docs. Un GIF
    // no se puede pausar por CSS, así que la única salida honesta es servir el logotipo quieto.
    expect(fuente?.getAttribute('media')).toBe('(prefers-reduced-motion: reduce)');
    expect(fuente?.getAttribute('srcset')).toContain('.svg');
    expect(html.querySelector('picture img')?.getAttribute('src')).toContain('.gif');
    // Con dimensiones explícitas para que la portada no salte al cargar.
    expect(html.querySelector('picture img')?.getAttribute('width')).toBe('780');
  });

  it('el filtro por insignia recorta la lista y se puede quitar', async () => {
    const fixture = TestBed.createComponent(Iconos);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    const total = html.querySelectorAll('.card').length;

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
    expect(filtrado).toBeLessThan(total);

    // Volver a todos es la propia cápsula «Todos»: el enlace «quitar filtro» que había antes
    // desapareció justamente porque duplicaba esto.
    html.querySelector<HTMLButtonElement>('.barra app-grupo button')!.click();
    await fixture.whenStable();
    expect(html.querySelectorAll('.card').length).toBe(total);
  });
});
