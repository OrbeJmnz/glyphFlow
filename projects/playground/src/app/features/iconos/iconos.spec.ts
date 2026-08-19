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
