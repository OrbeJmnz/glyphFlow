import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { escalaDuracion } from './duration-scale';

describe('App (shell)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
    escalaDuracion.set(1);
  });

  afterEach(() => escalaDuracion.set(1));

  it('monta', () => {
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy();
  });

  it('pinta la navegación y la marca', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelector('.marca')?.textContent).toContain('glyphflow');
    const rutas = [...html.querySelectorAll('.nav a')].map((a) => a.textContent?.trim());
    expect(rutas).toEqual(['Iconos', 'Lab', 'Docs']);
  });

  it('los chips de velocidad mueven la escala global', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    const chips = [...html.querySelectorAll<HTMLButtonElement>('.velocidad .chip')];
    expect(chips.map((c) => c.textContent?.trim())).toEqual(['0.5×', '1×', '1.5×', '2×']);

    chips[3].click();
    expect(escalaDuracion()).toBe(2);
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
  it('todas las páginas cargan por loadComponent — el shell no arrastra ninguna', () => {
    const planas = [...routes, ...(routes.find((r) => r.path === 'docs')?.children ?? [])];
    // `redirectTo: ''` (el comodín) es una cadena FALSY: filtrar con `!r.redirectTo` lo dejaba
    // pasar y el test culpaba a la ruta equivocada.
    const conPagina = planas.filter((r) => r.redirectTo === undefined);
    expect(conPagina.length).toBeGreaterThan(0);
    for (const r of conPagina) {
      expect(r.loadComponent, `la ruta "${r.path}" no es diferida`).toBeTypeOf('function');
    }
  });

  it('cada ruta con página tiene título, para que la pestaña no diga siempre lo mismo', () => {
    const hijas = routes.find((r) => r.path === 'docs')?.children ?? [];
    for (const r of [...routes, ...hijas]) {
      if (r.loadComponent && r.path !== 'docs') {
        expect(r.title, `la ruta "${r.path}" no tiene title`).toBeTruthy();
      }
    }
  });
});
