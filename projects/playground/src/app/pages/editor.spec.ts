import { TestBed } from '@angular/core/testing';
import { CURATED_ICONS } from 'glyphflow';
import { Editor } from './editor';

/**
 * La matemática de edición tiene sus propios tests sobre los 450 paths del catálogo. Esto prueba
 * el CABLEADO: que el componente cargue el `d` real, pinte un nodo por punto arrastrable, y que
 * cambiar de icono no arrastre estado del anterior.
 */
describe('Editor', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Editor] }).compileComponents();
  });

  async function montar() {
    const fixture = TestBed.createComponent(Editor);
    await fixture.whenStable();
    return { fixture, html: fixture.nativeElement as HTMLElement };
  }

  it('arranca con un icono cargado y su `d` intacto', async () => {
    const { html } = await montar();
    const salida = html.querySelector('.salida code')!.textContent!;
    const nombre = html.querySelector('.lista .chip.activo')!.textContent!.trim();

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
    const cierres = (d.match(/[zZ]/g) ?? []).length;
    const comandos = (d.match(/[MmLlHhVvCcSsQqTtAaZz]/g) ?? []).length;
    expect(html.querySelectorAll('.nodo').length).toBe(comandos - cierres);
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
    const otro = [...html.querySelectorAll<HTMLButtonElement>('.lista .chip')].find(
      (b) =>
        b.textContent?.trim() !== html.querySelector('.lista .chip.activo')?.textContent?.trim(),
    )!;
    otro.click();
    await fixture.whenStable();
    expect(html.querySelector('.salida code')!.textContent).not.toBe(primero);
    // Y el botón de restablecer no aparece: el icono nuevo está limpio.
    expect(html.querySelector('.salida-cab .enlace')?.textContent?.trim()).toBe('copiar');
  });

  it('el buscador acota la lista', async () => {
    const { fixture, html } = await montar();
    const antes = html.querySelectorAll('.lista .chip').length;
    const input = html.querySelector<HTMLInputElement>('.buscador input')!;
    input.value = 'bell';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    const despues = [...html.querySelectorAll('.lista .chip')].map((c) => c.textContent!.trim());
    expect(despues.length).toBeLessThan(antes);
    expect(despues.every((n) => n.includes('bell'))).toBe(true);
  });
});
