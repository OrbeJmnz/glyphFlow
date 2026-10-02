import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import type { GfBotState } from '../bot-state';
import { catShape } from '../shapes/cat';
import { mochiShape } from '../shapes/mochi';
import { GfBotComponent, type GfBotRoutineEvent } from './gf-bot.component';

const proto = Element.prototype as unknown as Record<string, unknown>;
const svgProto = SVGElement.prototype as unknown as Record<string, unknown>;

/** El dueño típico: estado de doble vía y un par de avisos. */
@Component({
  imports: [GfBotComponent],
  template: `<gf-bot
    [shape]="shape()"
    [(state)]="state"
    [skin]="skin()"
    [hoverOnly]="hoverOnly()"
    [interactive]="interactive()"
    [size]="size()"
    [label]="label()"
    (routineChange)="routines.push($event)"
    (wake)="woke = woke + 1"
  />`,
})
class Host {
  shape = signal(mochiShape);
  state = signal<GfBotState>('idle');
  skin = signal('neu');
  hoverOnly = signal(false);
  interactive = signal(false);
  size = signal<number | null>(null);
  label = signal<string | undefined>(undefined);
  routines: GfBotRoutineEvent[] = [];
  woke = 0;
}

async function render(): Promise<{ fixture: ComponentFixture<Host>; bot: GfBotComponent; el: HTMLElement }> {
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  await fixture.whenStable();
  const de = fixture.debugElement.children[0];
  if (!de) throw new Error('no se montó <gf-bot>');
  return { fixture, bot: de.componentInstance as GfBotComponent, el: de.nativeElement as HTMLElement };
}

describe('glyphflow/bots · <gf-bot>', () => {
  beforeEach(async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'] });
    svgProto['getScreenCTM'] = () => null;
    proto['animate'] = function (this: Element, frames: Keyframe[]) {
      return { cancel: vi.fn(), onfinish: null, effect: { target: this, getKeyframes: () => frames, getTiming: () => ({}) } };
    };
    proto['getAnimations'] = () => [];
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
  });
  afterEach(() => {
    // primero se destruyen los componentes (el bot necesita `getAnimations` para soltarse) y luego se borran los stubs
    TestBed.resetTestingModule();
    vi.useRealTimers();
    vi.restoreAllMocks();
    Reflect.deleteProperty(proto, 'animate');
    Reflect.deleteProperty(proto, 'getAnimations');
    Reflect.deleteProperty(svgProto, 'getScreenCTM');
    document.body.innerHTML = '';
  });

  it('monta el SVG del bot con la forma pedida', async () => {
    const { el, bot } = await render();
    const svg = el.querySelector('svg.gf-bot-svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('data-shape')).toBe('mochi');
    expect(bot.api?.state).toBe('idle');
  });

  it('antes del primer render el host está vacío (así sale en servidor)', () => {
    const fixture = TestBed.createComponent(Host);
    const el = fixture.debugElement.nativeElement as HTMLElement;
    expect(el.querySelector('svg')).toBeNull();
  });

  it('cambiar la forma o la piel reconstruye el bot sin remontarlo', async () => {
    const { fixture, el, bot } = await render();
    const svg = el.querySelector('svg');
    fixture.componentInstance.shape.set(catShape);
    fixture.detectChanges();
    expect(el.querySelector('svg')?.getAttribute('data-shape')).toBe('cat');
    fixture.componentInstance.skin.set('gel');
    fixture.detectChanges();
    expect(el.querySelector('svg')?.getAttribute('data-mvar')).toBe('gel');
    // el mismo <svg>: se rehace por dentro, no se destruye el bot
    expect(el.querySelector('svg')).toBe(svg);
    expect(bot.api).not.toBeNull();
  });

  it('el estado de entrada mueve al bot', async () => {
    const { fixture, bot } = await render();
    fixture.componentInstance.state.set('working');
    fixture.detectChanges();
    expect(bot.api?.state).toBe('working');
    fixture.componentInstance.state.set('sleeping');
    fixture.detectChanges();
    expect(bot.api?.state).toBe('sleeping');
  });

  it('un estado inicial distinto de idle se aplica al montar', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.state.set('working');
    fixture.detectChanges();
    await fixture.whenStable();
    const bot = fixture.debugElement.children[0]?.componentInstance as GfBotComponent;
    expect(bot.api?.state).toBe('working');
  });

  it('cuando el bot vuelve solo a idle lo avisa y el estado de doble vía no queda viejo', async () => {
    const { fixture, bot } = await render();
    fixture.componentInstance.state.set('working');
    fixture.detectChanges();
    bot.api?.agent('writing');
    bot.api?.agent('done');
    vi.advanceTimersByTime(1600);
    fixture.detectChanges();
    expect(bot.api?.state).toBe('idle');
    expect(fixture.componentInstance.state()).toBe('idle');
  });

  it('avisa las rutinas que arranca', async () => {
    const { fixture } = await render();
    fixture.componentInstance.state.set('working');
    fixture.detectChanges();
    expect(fixture.componentInstance.routines.length).toBeGreaterThan(0);
    expect(fixture.componentInstance.routines.at(-1)?.state).toBe('working');
  });

  describe('accesibilidad', () => {
    it('sin label es decorativo: aria-hidden y sin rol', async () => {
      const { el } = await render();
      expect(el.getAttribute('aria-hidden')).toBe('true');
      expect(el.getAttribute('role')).toBeNull();
    });

    it('con label es una imagen con nombre', async () => {
      const { fixture, el } = await render();
      fixture.componentInstance.label.set('Asistente');
      fixture.detectChanges();
      expect(el.getAttribute('role')).toBe('img');
      expect(el.getAttribute('aria-label')).toBe('Asistente');
      expect(el.getAttribute('aria-hidden')).toBeNull();
    });
  });

  it('size fija el ancho con la variable --gf-bot-size', async () => {
    const { fixture, el } = await render();
    fixture.componentInstance.size.set(140);
    fixture.detectChanges();
    expect(el.style.getPropertyValue('--gf-bot-size')).toBe('140px');
  });

  describe('interactive', () => {
    it('marca el host y activa tocar/arrastrar; apagarlo y volver a encenderlo funciona', async () => {
      const { fixture, el, bot } = await render();
      const svg = bot.api?.svg as SVGSVGElement;
      const add = vi.spyOn(svg, 'addEventListener');
      const remove = vi.spyOn(svg, 'removeEventListener');
      expect(el.hasAttribute('data-interactive')).toBe(false);
      fixture.componentInstance.interactive.set(true);
      fixture.detectChanges();
      expect(el.hasAttribute('data-interactive')).toBe(true);
      const n = add.mock.calls.length;
      expect(n).toBeGreaterThan(0);
      fixture.componentInstance.interactive.set(false);
      fixture.detectChanges();
      expect(remove.mock.calls.length).toBe(n);
      fixture.componentInstance.interactive.set(true);
      fixture.detectChanges();
      expect(add.mock.calls.length).toBe(2 * n);
    });
  });

  describe('hoverOnly', () => {
    it('nace congelado y solo anima con el cursor encima', async () => {
      const { fixture, el, bot } = await render();
      fixture.componentInstance.hoverOnly.set(true);
      fixture.detectChanges();
      expect(bot.api?.paused).toBe(true);
      el.dispatchEvent(new Event('pointerenter'));
      expect(bot.api?.paused).toBe(false);
      el.dispatchEvent(new Event('pointerleave'));
      expect(bot.api?.paused).toBe(true);
    });

    it('sin hoverOnly el cursor no pausa nada', async () => {
      const { el, bot } = await render();
      el.dispatchEvent(new Event('pointerleave'));
      expect(bot.api?.paused).toBe(false);
    });
  });

  it('al destruirse suelta el bot y no truena', async () => {
    const { fixture, bot, el } = await render();
    const api = bot.api;
    expect(api).not.toBeNull();
    fixture.destroy();
    expect(bot.api).toBeNull();
    expect(api?.paused).toBe(true);
    expect(el.querySelector('svg')).not.toBeNull(); // el SVG queda en el DOM que Angular retira; no se limpia a mano
  });
});
