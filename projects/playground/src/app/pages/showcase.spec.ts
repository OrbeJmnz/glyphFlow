import { TestBed } from '@angular/core/testing';
import { CURATED_ICONS } from 'glyphflow';
import { Showcase } from './showcase';

describe('Showcase', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Showcase] }).compileComponents();
  });

  it('pinta una tarjeta por icono curado del paquete publicado', async () => {
    const fixture = TestBed.createComponent(Showcase);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelectorAll('.card').length).toBe(Object.keys(CURATED_ICONS).length);
  });

  it('el filtro por insignia recorta la lista y se puede quitar', async () => {
    const fixture = TestBed.createComponent(Showcase);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    const total = html.querySelectorAll('.card').length;

    const filtro = html.querySelector<HTMLButtonElement>('.barra .chip');
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
