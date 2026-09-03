import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GfIconComponent } from './gf-icon.component';
import type { AnimatedIconDef, IconChoreography } from './animated-icon.model';
import { ANIMATED_ICONS, ICON_ALIASES } from './animated-icons.registry';
import { CURATED_ICONS } from './curated-icons';
import { provideIconCatalog, GF_ICON_CATALOG, MAX_ICON_CATALOG } from './icon-catalog.provider';
// Los alias de la v1: se importan justamente para probar que siguen siendo el mismo objeto.
import { MaxIconComponent } from '../../public-api';
import {
  GF_ICONS_CONFIG,
  MAX_ICONS_CONFIG,
  provideGfIcons,
  provideMaxIcons,
} from './gf-icons.config';

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
describe('GfIconComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GfIconComponent],
      providers: [provideIconCatalog(ANIMATED_ICONS)],
    }).compileComponents();
  });

  function render(name: string) {
    const fixture = TestBed.createComponent(GfIconComponent);
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
      // `default` (coreografía con intención) solo es obligatoria en los curados a mano — los
      // generados (solo geometría + draw automático) no la llevan a propósito, ver el plan.
      if (CURATED_ICONS[name]) {
        expect(def.animations['default'], `${name}: falta la variante default`).toBeDefined();
      }
      expect(def.animations['draw'], `${name}: falta la variante draw`).toBeDefined();
      // `reveal` la cuelga `icon()` en TODOS desde la v3, igual que `draw`.
      expect(def.animations['reveal'], `${name}: falta la variante reveal`).toBeDefined();
      for (const [variant, chor] of Object.entries(def.animations)) {
        const mueve =
          !!chor.root ||
          !!chor.autoDraw ||
          !!chor.autoReveal ||
          Object.keys(chor.shapes ?? {}).length > 0;
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
    // `ellipse` faltaba aquí desde siempre — `requeridos[shape.tag] ?? []` caía al array vacío y
    // no validaba NINGÚN atributo para ese tag. Encontrado al generar el set completo de Lucide
    // (15 iconos reales usan ellipse). El mismo mapa vive en generate-lucide-icons.ts.
    const requeridos: Record<string, string[]> = {
      path: ['d'],
      circle: ['cx', 'cy', 'r'],
      rect: ['x', 'y', 'width', 'height'],
      line: ['x1', 'y1', 'x2', 'y2'],
      ellipse: ['cx', 'cy', 'rx', 'ry'],
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

    const fixture = TestBed.createComponent(GfIconComponent);
    fixture.componentRef.setInput('name', 'search');
    fixture.componentRef.setInput('label', 'Buscar');
    fixture.detectChanges();
    const conLabel = fixture.nativeElement.querySelector('svg');
    expect(conLabel.getAttribute('aria-hidden')).toBe('false');
    expect(conLabel.getAttribute('aria-label')).toBe('Buscar');
  });
});

/**
 * Los alias de la v1 (`Max*`), clavados.
 *
 * El caso peligroso no es el import: si `MaxIconComponent` desapareciera, TypeScript lo diría a
 * gritos. El peligroso es el SELECTOR — una plantilla es texto, así que un `<max-icon>` que se
 * queda sin componente no truena: Angular lo trata como elemento desconocido y no pinta nada.
 * Un renombrado de selector sin puente se ve como iconos invisibles, no como un error.
 */
describe('alias de la v1', () => {
  @Component({
    // El selector VIEJO, tal cual lo tiene escrito hoy quien ya usa la librería.
    template: `<max-icon name="search" />`,
    imports: [GfIconComponent],
  })
  class ConSelectorViejo {}

  it('`<max-icon>` sigue montando el componente y pintando sus figuras', async () => {
    await TestBed.configureTestingModule({
      imports: [ConSelectorViejo],
      providers: [provideIconCatalog(ANIMATED_ICONS)],
    }).compileComponents();

    const fixture = TestBed.createComponent(ConSelectorViejo);
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg');
    // Si el puente del selector faltara, `svg` sería null y el icono estaría invisible en la app
    // de alguien sin un solo mensaje de error.
    expect(svg).not.toBeNull();
    expect(svg.children.length).toBeGreaterThan(0);
  });

  it('los símbolos viejos son LA MISMA referencia, no copias', () => {
    // Para un `InjectionToken` esto no es cosmético: dos tokens distintos no se ven entre sí, así
    // que un `provideMaxIcons()` no alimentaría al componente y `durationScale` se ignoraría en
    // silencio, sin un error que lo delate.
    expect(MaxIconComponent).toBe(GfIconComponent);
    expect(MAX_ICONS_CONFIG).toBe(GF_ICONS_CONFIG);
    expect(provideMaxIcons).toBe(provideGfIcons);
    expect(MAX_ICON_CATALOG).toBe(GF_ICON_CATALOG);
  });

  it('`provideMaxIcons` sigue alimentando al componente de verdad', async () => {
    // No basta con que el token sea el mismo objeto: se prueba el viaje entero, del provider viejo
    // al `inject()` nuevo.
    await TestBed.configureTestingModule({
      imports: [GfIconComponent],
      providers: [provideIconCatalog(ANIMATED_ICONS), provideMaxIcons({ durationScale: 0.5 })],
    }).compileComponents();

    const fixture = TestBed.createComponent(GfIconComponent);
    fixture.componentRef.setInput('name', 'search');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('svg')).not.toBeNull();
    expect(TestBed.inject(GF_ICONS_CONFIG).durationScale).toBe(0.5);
  });

  /*
   * ── `animationsEnabled` ────────────────────────────────────────────────────────────────────
   *
   * jsdom no implementa Web Animations API, así que `play()` se corta solo por falta de `animate`
   * y no distinguiría "lo paró el interruptor" de "aquí no hay motor". Por eso se pone un doble de
   * `animate` y se afirma sobre si LLEGÓ a llamarse: es la única forma de probar el interruptor y
   * no el entorno.
   */
  describe('animationsEnabled', () => {
    let llamadas: number;
    let original: PropertyDescriptor | undefined;

    beforeEach(() => {
      llamadas = 0;
      original = Object.getOwnPropertyDescriptor(Element.prototype, 'animate');
      Object.defineProperty(Element.prototype, 'animate', {
        configurable: true,
        writable: true,
        value: function (): Animation {
          llamadas++;
          return dobleDeAnimacion();
        },
      });
    });

    afterEach(() => {
      if (original) Object.defineProperty(Element.prototype, 'animate', original);
      else delete (Element.prototype as unknown as Record<string, unknown>)['animate'];
    });

    async function montar(config: Record<string, unknown>) {
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [GfIconComponent],
        providers: [provideIconCatalog(ANIMATED_ICONS), provideGfIcons(config)],
      }).compileComponents();

      const fixture = TestBed.createComponent(GfIconComponent);
      fixture.componentRef.setInput('name', 'bell');
      fixture.detectChanges();
      return fixture;
    }

    it('en `false` no se crea ni una animación', async () => {
      const fixture = await montar({ animationsEnabled: false });
      fixture.componentInstance.play();
      expect(llamadas).toBe(0);
    });

    it('sin declararlo, anima como siempre', async () => {
      const fixture = await montar({});
      fixture.componentInstance.play();
      expect(llamadas).toBeGreaterThan(0);
    });

    it('se lee EN CADA reproducción, así que sirve como interruptor vivo', async () => {
      // El caso que justifica que sea un getter y no un campo: si el componente lo cacheara al
      // construirse, apagar el movimiento en caliente no tendría efecto hasta recargar.
      const config = {
        activo: true,
        get animationsEnabled() {
          return this.activo;
        },
      };
      const fixture = await montar(config);

      fixture.componentInstance.play();
      const conMovimiento = llamadas;
      expect(conMovimiento).toBeGreaterThan(0);

      config.activo = false;
      fixture.componentInstance.play();
      expect(llamadas).toBe(conMovimiento);
    });
  });
});

describe('reverse() al salir el puntero', () => {
  let creadas: FalsaAnimacion[];
  let original: PropertyDescriptor | undefined;

  beforeEach(() => {
    creadas = [];
    original = Object.getOwnPropertyDescriptor(Element.prototype, 'animate');
    Object.defineProperty(Element.prototype, 'animate', {
      configurable: true,
      writable: true,
      value: function (_kf: unknown, opciones: KeyframeAnimationOptions): Animation {
        const anim: FalsaAnimacion = {
          playState: 'running',
          reversas: 0,
          fill: opciones?.fill,
          reverse() {
            this.reversas++;
          },
          cancel: () => undefined,
          commitStyles: () => undefined,
          onfinish: null,
          currentTime: 0,
        };
        creadas.push(anim);
        return anim as unknown as Animation;
      },
    });
  });

  afterEach(() => {
    if (original) Object.defineProperty(Element.prototype, 'animate', original);
    else delete (Element.prototype as unknown as Record<string, unknown>)['animate'];
  });

  /**
   * La regresión: `Animation.reverse()` sobre algo que está en `idle` no invierte nada — lo
   * REVIVE desde el final. Un track de un tiro se cancela solo al terminar, así que al salir el
   * puntero después de que la animación acabó, las figuras arrancaban hacia atrás estando ya
   * quietas; y las que llevan `fill: 'backwards'` se quedaban congeladas en su primer fotograma
   * porque su `onfinish` ya se había soltado. Se veía en `arrow-up-narrow-wide`: las tres líneas
   * horizontales no volvían a su tamaño.
   *
   * Se reproduce `hold` y no `default`: en la v3 ese estado sostenido se mudó ahí, y de paso es la
   * variante que el hover dispara en este icono — o sea el camino real donde ocurre el fallo. Lo
   * que el test necesita es una mezcla de tracks de un tiro y sostenidos en la MISMA reproducción,
   * y eso solo lo da un `hold` (el trazo del montaje aporta los de un tiro).
   */
  it('no revive los tracks que ya terminaron y se cancelaron solos', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [GfIconComponent],
      providers: [provideIconCatalog(ANIMATED_ICONS)],
    }).compileComponents();

    const fixture = TestBed.createComponent(GfIconComponent);
    fixture.componentRef.setInput('name', 'arrow-up-narrow-wide');
    fixture.detectChanges();
    fixture.componentInstance.play('hold');

    // Lo que hace el motor de verdad al terminar un track que no sostiene: cancelarlo.
    const unTiro = creadas.filter((a) => a.fill !== 'forwards' && a.fill !== 'both');
    const sostienen = creadas.filter((a) => a.fill === 'forwards' || a.fill === 'both');
    expect(unTiro.length).toBeGreaterThan(0);
    expect(sostienen.length).toBeGreaterThan(0);
    for (const a of unTiro) a.playState = 'idle';

    fixture.componentInstance.reverse();

    expect(unTiro.map((a) => a.reversas)).toEqual(unTiro.map(() => 0));
    expect(sostienen.map((a) => a.reversas)).toEqual(sostienen.map(() => 1));
  });
});

/*
 * ── `animation="default"` ──────────────────────────────────────────────────────────────────────
 *
 * El hoyo de API que se tapó el 2026-09-02: `default` era la ÚNICA variante que no se podía pedir.
 *
 * `@Input() animation` arrancaba en `'default'`, y ese valor ES un nombre de variante legítimo. Así
 * que `varianteDeHover()` no podía distinguir "el consumidor no lo fijó" de "lo fijó a `default`", y
 * desempataba descartándolo: en un icono de 3+ variantes, pedir `animation="default"` seguía
 * disparando la TERCERA en hover. Con `trash-2` (draw/default/active) no había forma de quedarse
 * con la sacudida.
 *
 * Se afirma sobre el EFECTO OBSERVABLE —qué `duration` llegó a `animate()`— y no leyendo
 * `hoverVariant`, que es privado: al consumidor lo que le importa es qué gesto se ve. jsdom no
 * implementa Web Animations API, así que el doble de `animate` es obligatorio igual que en los
 * bloques de arriba.
 */
describe('la variante `default` sí se puede pedir', () => {
  let duraciones: number[];
  let original: PropertyDescriptor | undefined;

  /** Tres variantes idénticas salvo la duración — esa es la etiqueta que delata cuál corrió. */
  function pista(duration: number): IconChoreography {
    return { shapes: { 0: { keyframes: [{ opacity: 1 }, { opacity: 0.4 }], options: { duration } } } };
  }

  /** El orden del catálogo real: `draw`, `default`, y la especial del icono al final. */
  const DEF: AnimatedIconDef = {
    shapes: [{ tag: 'path', d: 'M0 0h24' }],
    animations: { draw: pista(111), default: pista(222), spin: pista(333) },
  };

  beforeEach(async () => {
    duraciones = [];
    original = Object.getOwnPropertyDescriptor(Element.prototype, 'animate');
    Object.defineProperty(Element.prototype, 'animate', {
      configurable: true,
      writable: true,
      value: function (_kf: unknown, opciones: KeyframeAnimationOptions): Animation {
        duraciones.push(opciones?.duration as number);
        return dobleDeAnimacion();
      },
    });

    TestBed.resetTestingModule();
    // Sin `provideIconCatalog`: el def va por `[iconDef]`, que es la vía sin catálogo.
    await TestBed.configureTestingModule({ imports: [GfIconComponent] }).compileComponents();
  });

  afterEach(() => {
    if (original) Object.defineProperty(Element.prototype, 'animate', original);
    else delete (Element.prototype as unknown as Record<string, unknown>)['animate'];
  });

  /** Monta en modo `group` (el default) y devuelve las duraciones que dispara UN hover. */
  function duracionesDeHover(animation?: string): number[] {
    const fixture = TestBed.createComponent(GfIconComponent);
    fixture.componentRef.setInput('iconDef', DEF);
    if (animation !== undefined) fixture.componentRef.setInput('animation', animation);
    fixture.detectChanges(); // ngAfterViewInit → wireGroup() → play('draw')

    duraciones = []; // el trazo de entrada no es lo que se mide aquí
    // `Event` y no `PointerEvent`: jsdom no lo trae siempre, y el guard táctil del motor solo
    // descarta `pointerType === 'touch'` — `undefined` pasa, que es justo el caso de escritorio.
    fixture.nativeElement.dispatchEvent(new Event('pointerenter'));
    return duraciones;
  }

  it('sin fijarlo, el hover sigue eligiendo la TERCERA variante', () => {
    expect(duracionesDeHover()).toEqual([333]);
  });

  it('fijado a `default`, el hover reproduce `default` y NO la tercera', () => {
    expect(duracionesDeHover('default')).toEqual([222]);
  });

  it('fijado a cualquier otra, manda esa (lo que ya funcionaba sigue igual)', () => {
    expect(duracionesDeHover('draw')).toEqual([111]);
  });
});

/** Lo justo para poder afirmar A QUIÉN se le llamó `reverse()` y en qué estado estaba. */
interface FalsaAnimacion {
  playState: string;
  reversas: number;
  fill: FillMode | undefined;
  reverse(): void;
  cancel(): void;
  commitStyles(): void;
  onfinish: (() => void) | null;
  currentTime: number;
}

/**
 * Lo mínimo que el componente toca del objeto que devuelve `animate()`.
 *
 * Los métodos son `() => undefined` y no `() => {}` porque el lint de la librería prohíbe cuerpos
 * vacíos, y aquí no hay nada que ejecutar: lo que se afirma es que `animate()` LLEGÓ a llamarse,
 * no lo que pase después.
 */
function dobleDeAnimacion(): Animation {
  const nada = (): undefined => undefined;

  return {
    playState: 'running',
    currentTime: 0,
    finished: Promise.resolve(),
    onfinish: null,
    cancel: nada,
    play: nada,
    pause: nada,
    reverse: nada,
    commitStyles: nada,
    persist: nada,
  } as unknown as Animation;
}
