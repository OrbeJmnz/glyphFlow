import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CURATED_ICONS } from 'glyphflow';
import { Iconos } from './iconos';

describe('Iconos', () => {
  beforeEach(async () => {
    // La portada trae el hero, y su botón «Empezar» es un routerLink.
    await TestBed.configureTestingModule({
      imports: [Iconos],
      providers: [provideRouter([])],
    }).compileComponents();
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

    // El grupo de filtros, no el primer chip de la barra: ese es «Repetir todo».
    const filtro = html.querySelector<HTMLButtonElement>('.barra .grupo .chip');
    expect(filtro).toBeTruthy();
    filtro!.click();
    await fixture.whenStable();

    const filtrado = html.querySelectorAll('.card').length;
    expect(filtrado).toBeGreaterThan(0);
    expect(filtrado).toBeLessThan(total);

    html.querySelector<HTMLButtonElement>('.aviso .enlace')!.click();
    await fixture.whenStable();
    expect(html.querySelectorAll('.card').length).toBe(total);
  });
});
