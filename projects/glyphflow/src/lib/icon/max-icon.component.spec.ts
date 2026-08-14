import { TestBed } from '@angular/core/testing';
import { MaxIconComponent } from './max-icon.component';
import { ANIMATED_ICONS, ICON_ALIASES } from './animated-icons.registry';
import { provideIconCatalog } from './icon-catalog.provider';

/**
 * El contrato que importa: el registro y el template no se desincronizan. Si alguien agrega un
 * icono y apunta un track a un índice que no existe, la coreografía se pierde en silencio — eso
 * es justo lo que aquí truena.
 *
 * No se prueba el movimiento en sí: jsdom no implementa Web Animations API. El componente lo
 * detecta y se queda estático, que también se verifica (no debe reventar).
 *
 * Los specs registran el catálogo completo vía `provideIconCatalog` a propósito, para probar
 * `name="..."` — en producción ese registro es opt-in (ver icon-catalog.provider.ts).
 */
describe('MaxIconComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaxIconComponent],
      providers: [provideIconCatalog(ANIMATED_ICONS)],
    }).compileComponents();
  });

  function render(name: string) {
    const fixture = TestBed.createComponent(MaxIconComponent);
    fixture.componentRef.setInput('name', name);
    fixture.detectChanges();
    return fixture;
  }

  it('dibuja las figuras del registro, en orden', () => {
    const svg = render('search').nativeElement.querySelector('svg');
    // search = [path (mango), circle (lente)] — el orden es el que indexan los tracks.
    expect(svg.children[0].tagName).toBe('path');
    expect(svg.children[1].tagName).toBe('circle');
  });

  it('normaliza pathLength para que el dibujo de trazo vaya en 0-1', () => {
    const svg = render('check').nativeElement.querySelector('svg');
    expect(svg.querySelector('path')?.getAttribute('pathLength')).toBe('1');
  });

  it('un nombre desconocido no pinta nada y no truena', () => {
    const svg = render('no-existe').nativeElement.querySelector('svg');
    expect(svg.children.length).toBe(0);
  });

  it('play() es inocuo donde no hay Web Animations API (jsdom no la implementa)', () => {
    expect(typeof Element.prototype.animate).not.toBe('function');
    const fixture = render('bell');
    expect(() => fixture.componentInstance.play()).not.toThrow();
  });

  it('todo track apunta a una figura que existe', () => {
    for (const [name, def] of Object.entries(ANIMATED_ICONS)) {
      for (const [variant, chor] of Object.entries(def.animations)) {
        for (const index of Object.keys(chor.shapes ?? {})) {
          expect(
            def.shapes[Number(index)],
            `${name}/${variant}: el track apunta a la figura ${index}, que no existe`,
          ).toBeDefined();
        }
      }
    }
  });

  it('toda variante mueve algo (root, figuras o trazo automático)', () => {
    for (const [name, def] of Object.entries(ANIMATED_ICONS)) {
      expect(def.animations['default'], `${name}: falta la variante default`).toBeDefined();
      expect(def.animations['draw'], `${name}: falta la variante draw`).toBeDefined();
      for (const [variant, chor] of Object.entries(def.animations)) {
        const mueve = !!chor.root || !!chor.autoDraw || Object.keys(chor.shapes ?? {}).length > 0;
        expect(mueve, `${name}/${variant}: variante vacía`).toBe(true);
      }
    }
  });

  it('todo alias apunta a un icono que existe', () => {
    for (const [viejo, nuevo] of Object.entries(ICON_ALIASES)) {
      expect(
        ANIMATED_ICONS[nuevo],
        `alias ${viejo} → ${nuevo}: el destino no existe`,
      ).toBeDefined();
      expect(
        ANIMATED_ICONS[viejo],
        `${viejo} tiene alias PERO también entrada propia`,
      ).toBeUndefined();
    }
  });

  it('las figuras traen los atributos que su tag necesita', () => {
    const requeridos: Record<string, string[]> = {
      path: ['d'],
      circle: ['cx', 'cy', 'r'],
      rect: ['x', 'y', 'width', 'height'],
      line: ['x1', 'y1', 'x2', 'y2'],
      polyline: ['points'],
      polygon: ['points'],
    };
    for (const [name, def] of Object.entries(ANIMATED_ICONS)) {
      def.shapes.forEach((shape, i) => {
        for (const attr of requeridos[shape.tag] ?? []) {
          expect(
            (shape as unknown as Record<string, unknown>)[attr],
            `${name}[${i}] (${shape.tag}): le falta "${attr}"`,
          ).toBeDefined();
        }
      });
    }
  });

  it('decorative por defecto oculta el icono de accesibilidad; label lo hace semántico', () => {
    const sinLabel = render('bell').nativeElement.querySelector('svg');
    expect(sinLabel.getAttribute('aria-hidden')).toBe('true');
    expect(sinLabel.getAttribute('aria-label')).toBeNull();

    const fixture = TestBed.createComponent(MaxIconComponent);
    fixture.componentRef.setInput('name', 'search');
    fixture.componentRef.setInput('label', 'Buscar');
    fixture.detectChanges();
    const conLabel = fixture.nativeElement.querySelector('svg');
    expect(conLabel.getAttribute('aria-hidden')).toBe('false');
    expect(conLabel.getAttribute('aria-label')).toBe('Buscar');
  });
});
