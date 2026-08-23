import { TestBed } from '@angular/core/testing';
import { provideRouter, type Route } from '@angular/router';
import { vi } from 'vitest';
import { App } from './app';
import { routes } from './app.routes';
import { velocidadGlobal } from './core/duration-scale';
import { estrellas } from './core/github';
import { IDIOMAS, type Idioma } from './core/idioma';
import { providersI18nTest } from './core/i18n-testing';
import { tema } from './core/tema';

describe('App (shell)', () => {
  beforeEach(async () => {
    // El shell pide las estrellas al montar. Sin esto cada test de aquí saldría a api.github.com:
    // lento, dependiente de la red y quemando la cuota por IP.
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }));
    // `ResizeObserver` ya está cubierto global en `test-setup.ts`.
    sessionStorage.clear();
    localStorage.clear();
    estrellas.set(null);
    tema.set('oscuro');

    await TestBed.configureTestingModule({
      // `providersI18nTest()`: módulo oficial de testing de Transloco, loader síncrono — sin él
      // el pipe/`translateSignal` no tienen de dónde resolver. Ver `core/i18n-testing.ts`.
      imports: [App, providersI18nTest()],
      providers: [provideRouter([])],
    }).compileComponents();
    velocidadGlobal.set(1);
  });

  afterEach(() => {
    velocidadGlobal.set(1);
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('monta', () => {
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy();
  });

  it('pinta la navegación y la marca', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    // La marca ya no es texto sino el logotipo. Lo que se verifica es su nombre ACCESIBLE — que es
    // lo que oye un lector de pantalla — y no que el `<img>` exista, que no probaría nada.
    expect(html.querySelector('.marca img')?.getAttribute('alt')).toBe('glyphflow');
    expect(html.querySelector('.marca')?.getAttribute('aria-label')).toContain('glyphflow');
    // Inglés por default (i18n, tráfico) — no español. Ver `core/i18n.ts`.
    const rutas = [...html.querySelectorAll('.nav a')].map((a) => a.textContent?.trim());
    expect(rutas).toEqual(['Icons', 'Patterns', 'Editor', 'Lab', 'Docs']);
    // El glifo junto al logotipo: el sitio animando su propio producto en el header.
    expect(html.querySelector('.marca gf-icon')).not.toBeNull();
    // El botón del repo está cableado (lo suyo se prueba en su propia spec).
    expect(html.querySelector('app-boton-github a.gh')).not.toBeNull();
  });

  it('los enlaces del nav llevan el prefijo de idioma', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    // Escritos duros (`/patrones`) mandarían al visitante en español a la rama en inglés — y peor,
    // sin prefijo caería en el comodín, que lo devuelve a la portada.
    const hrefs = [...html.querySelectorAll('.nav a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/en', '/en/patterns', '/en/editor', '/en/lab', '/en/docs']);
  });

  it('el botón de tema dice a dónde lleva, no dónde estás', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    const boton = html.querySelector<HTMLButtonElement>('button.tema')!;

    expect(boton.getAttribute('aria-label')).toBe('Switch to light theme');
    expect(boton.getAttribute('aria-pressed')).toBe('false');

    boton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(tema()).toBe('claro');
    expect(boton.getAttribute('aria-label')).toBe('Switch to dark theme');
    expect(boton.getAttribute('aria-pressed')).toBe('true');
  });

  it('los chips de velocidad mueven la escala global', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    // Acotado al HEADER: el control de velocidad se repite en el menú móvil, así que `.velocidad`
    // a secas ahora casa con los dos juegos y devolvía ocho píldoras. Se pide el del chrome, que es
    // el que esta prueba dice comprobar.
    const chips = [...html.querySelectorAll<HTMLButtonElement>('.shell-head .velocidad .chip')];
    expect(chips.map((c) => c.textContent?.trim())).toEqual(['0.5×', '1×', '1.5×', '2×']);

    chips[3].click();
    expect(velocidadGlobal()).toBe(2);
    await fixture.whenStable();
    // El aviso solo aparece fuera de 1×: en el default no hay nada que advertir.
    expect(html.querySelector('.shell-aviso')?.textContent).toContain('2×');
  });

  it('el aviso de velocidad no existe en 1×', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('.shell-aviso')).toBeNull();
  });
});

describe('rutas', () => {
  const ramas = routes.filter((r) => IDIOMAS.includes(r.path as Idioma));

  /** Las páginas de una rama, aplanadas: las de primer nivel más las hijas de docs. */
  function paginasDe(rama: Route): Route[] {
    const hijas = rama.children ?? [];
    return [...hijas, ...hijas.flatMap((h) => h.children ?? [])];
  }

  it('hay una rama por idioma, y solo una', () => {
    expect(ramas.map((r) => r.path)).toEqual([...IDIOMAS]);
  });

  it('las dos ramas ofrecen exactamente las mismas páginas', () => {
    // Los slugs cambian con el idioma; los `title` son CLAVES, así que no. Comparar por título es
    // lo que caza el fallo real de tener dos árboles: que a uno se le olvide una página y el
    // `hreflang` quede prometiendo una URL que devuelve la portada.
    const titulos = ramas.map((r) =>
      paginasDe(r)
        .map((p) => p.title)
        .filter(Boolean)
        .sort(),
    );
    expect(titulos[0]).toEqual(titulos[1]);
    expect(titulos[0].length).toBeGreaterThan(0);
  });

  it('todas las páginas cargan por loadComponent — el shell no arrastra ninguna', () => {
    for (const rama of ramas) {
      // `redirectTo: ''` (el comodín) es una cadena FALSY: filtrar con `!r.redirectTo` lo dejaba
      // pasar y el test culpaba a la ruta equivocada.
      const conPagina = paginasDe(rama).filter((r) => r.redirectTo === undefined);
      expect(conPagina.length).toBeGreaterThan(0);
      for (const r of conPagina) {
        expect(r.loadComponent, `la ruta "${rama.path}/${r.path}" no es diferida`).toBeTypeOf(
          'function',
        );
      }
    }
  });

  it('cada ruta con página tiene título, para que la pestaña no diga siempre lo mismo', () => {
    for (const rama of ramas) {
      for (const r of paginasDe(rama)) {
        // El marco de las docs es el único `loadComponent` sin título propio: lo pone su hija.
        if (r.loadComponent && r.children === undefined) {
          expect(r.title, `la ruta "${rama.path}/${r.path}" no tiene title`).toBeTruthy();
        }
      }
    }
  });
});
