import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { GfBotHatId } from 'glyphflow/bots';
import { assembleBot } from '../../src/engine/create-bot';
import { mochiShape } from '../../src/shapes/mochi';
import { createHatsExtra, defineHat, hatsExtra, HATS, hatWizard, routinesExtra, toysExtra } from './public-api';

/** Los extras son opt-in: sin ellos el motor no sabe de sombreros ni de juguetes, y con ellos funcionan igual que antes. */
describe('glyphflow/bots/extras', () => {
  const animate = Element.prototype.animate;
  const getAnimations = Element.prototype.getAnimations;
  const fake = () => ({ cancel: () => undefined, finish: () => undefined, commitStyles: () => undefined, finished: Promise.resolve(), currentTime: 0, effect: null, addEventListener: () => undefined, onfinish: null });
  const host = document.createElement('div');
  const svgProto = SVGElement.prototype as unknown as Record<string, unknown>;
  const svgSvgProto = SVGSVGElement.prototype as unknown as Record<string, unknown>;
  beforeEach(() => {
    svgProto['getScreenCTM'] = () => null;
    svgProto['getTotalLength'] = () => 300;
    svgProto['getPointAtLength'] = (l: number) => ({ x: 100 + 60 * Math.cos((2 * Math.PI * l) / 300), y: 110 + 58 * Math.sin((2 * Math.PI * l) / 300) });
    svgSvgProto['createSVGPoint'] = () => ({ x: 0, y: 0 });
    vi.useFakeTimers();
    Element.prototype.animate = vi.fn(fake) as never;
    Element.prototype.getAnimations = (() => []) as never;
    document.body.append(host);
  });
  afterEach(() => {
    for (const k of ['getScreenCTM', 'getTotalLength', 'getPointAtLength']) Reflect.deleteProperty(svgProto, k);
    Reflect.deleteProperty(svgSvgProto, 'createSVGPoint');
    host.remove();
    vi.useRealTimers();
    Element.prototype.animate = animate;
    Element.prototype.getAnimations = getAnimations;
  });

  it('HATS trae exactamente los ids del tipo GfBotHatId (el tipo vive en el motor)', () => {
    const ids: Record<GfBotHatId, true> = { wizard: true, party: true, santa: true, cap: true, beanie: true, topHat: true, beret: true, crown: true, birthday: true, chef: true, cowboy: true, pirate: true, headphones: true, visor: true, astronaut: true, antenna: true };
    expect(Object.keys(HATS).sort()).toEqual(Object.keys(ids).sort());
  });

  it('sin extras.hats el sombrero se ignora; con ellos se pone', () => {
    const sin = assembleBot(host, { shape: mochiShape, hat: 'wizard' });
    expect(sin.ctx.hatKey).toBeNull();
    sin.api.setHat('crown');
    expect(sin.ctx.hatKey).toBeNull();
    sin.api.destroy();
    const con = assembleBot(host, { shape: mochiShape, hat: 'wizard', extras: { hats: hatsExtra } });
    expect(con.ctx.hatKey).toBe('wizard');
    con.api.setHat('crown');
    expect(con.ctx.hatKey).toBe('crown');
    con.api.setHat('noExiste' as never);
    expect(con.ctx.hatKey).toBeNull();
    con.api.destroy();
  });

  it('un accesorio extra (gafas) sigue funcionando sin sombreros: deja su data-hat para el CSS', () => {
    const { ctx, api } = assembleBot(host, { shape: mochiShape });
    api.setHat('glasses');
    expect(ctx.svg.dataset['hat']).toBe('glasses');
    api.destroy();
  });

  it('pulse solo brilla con sombrero', () => {
    const { ctx, api } = assembleBot(host, { shape: mochiShape, extras: { hats: hatsExtra } });
    const antes = vi.mocked(Element.prototype.animate).mock.calls.length;
    hatsExtra.pulse(ctx);
    expect(vi.mocked(Element.prototype.animate).mock.calls.length).toBe(antes);
    api.setHat('topHat');
    const medio = vi.mocked(Element.prototype.animate).mock.calls.length;
    hatsExtra.pulse(ctx);
    expect(vi.mocked(Element.prototype.animate).mock.calls.length).toBeGreaterThan(medio);
    api.destroy();
  });

  it('sin extras.toys, bot.toy() no hace nada; con ellos pone el juguete', () => {
    const sin = assembleBot(host, { shape: mochiShape });
    expect(() => sin.api.toy('ball', 120, 150)).not.toThrow();
    expect(sin.ctx.el.toys.children.length).toBe(0);
    sin.api.destroy();
    const con = assembleBot(host, { shape: mochiShape, extras: { toys: toysExtra } });
    con.api.toy('ball', 120, 150);
    expect(con.ctx.el.toys.children.length).toBeGreaterThan(0);
    con.api.destroy();
  });

  it('sin extras.routines, working y sleeping solo respiran: sin rotación y sin onRoutine', () => {
    const onRoutine = vi.fn();
    const { ctx, api } = assembleBot(host, { shape: mochiShape, onRoutine });
    api.setState('working');
    vi.advanceTimersByTime(20000);
    expect(onRoutine).not.toHaveBeenCalled();
    expect(ctx.state).toBe('working');
    api.setState('sleeping');
    vi.advanceTimersByTime(20000);
    expect(onRoutine).not.toHaveBeenCalled();
    api.destroy();
  });

  it('con extras.routines, working rota y avisa con su etiqueta', () => {
    const etiquetas: string[] = [];
    const { api } = assembleBot(host, { shape: mochiShape, extras: { routines: routinesExtra }, onRoutine: (_s, l) => l && etiquetas.push(l) });
    api.setState('working');
    vi.advanceTimersByTime(4700 * 2);
    expect(etiquetas[0]).toBe('typing · tapping');
    expect(etiquetas.length).toBeGreaterThanOrEqual(2);
    api.destroy();
  });

  it('el modo IA se ve sin extras: thinking, tool y loading corren sus escenas del motor (con variantes)', () => {
    const etiquetas: string[] = [];
    const { api } = assembleBot(host, { shape: mochiShape, onRoutine: (_s, l) => l && etiquetas.push(l) });
    api.agent('thinking');
    api.agent('tool');
    api.agent('loading');
    expect(etiquetas.map((l) => l.split(' · ')[0])).toEqual(['thinking', 'analyzing', 'loading']);
    api.destroy();
  });

  describe('sombreros propios', () => {
    const miGorro = defineHat({ label: 'Mi gorro', draw: (p) => `<rect class="${p}-migorro" x="-12" y="-14" width="24" height="14" rx="4" fill="#E0457B"/>` });

    it('defineHat rellena la física y exige un dibujo', () => {
      expect(miGorro).toMatchObject({ label: 'Mi gorro', up: 0, k: 0.12, sway: 0.8, lift: 0.9, tip: 1 });
      expect(defineHat({ label: 'X', draw: () => '', k: 0.3 }).k).toBe(0.3);
      expect(() => defineHat({ label: 'Roto' } as never)).toThrow(/Roto.*draw/);
    });

    it('un catálogo propio pone su sombrero y deja las clases que el CSS y la física leen', () => {
      const { ctx, api } = assembleBot(host, { shape: mochiShape, hat: 'miGorro', extras: { hats: createHatsExtra({ miGorro }) } });
      expect(ctx.hatKey).toBe('miGorro');
      expect(ctx.svg.dataset['hat']).toBe('miGorro');
      expect(ctx.svg.querySelectorAll('.hatAcc').length).toBeGreaterThan(0);
      expect(ctx.svg.innerHTML).toContain('migorro');
      api.destroy();
    });

    it('solo existen los sombreros del catálogo que se pasó: los de serie no se cuelan', () => {
      const { ctx, api } = assembleBot(host, { shape: mochiShape, extras: { hats: createHatsExtra({ miGorro }) } });
      api.setHat('wizard');
      expect(ctx.hatKey).toBeNull();
      api.setHat('miGorro');
      expect(ctx.hatKey).toBe('miGorro');
      api.destroy();
    });

    it('se pueden mezclar los de serie con los propios, y uno de serie suelto funciona sin traer los demás', () => {
      const mezcla = assembleBot(host, { shape: mochiShape, hat: 'crown', extras: { hats: createHatsExtra({ ...HATS, miGorro }) } });
      expect(mezcla.ctx.hatKey).toBe('crown');
      mezcla.api.setHat('miGorro');
      expect(mezcla.ctx.hatKey).toBe('miGorro');
      mezcla.api.destroy();
      const suelto = assembleBot(host, { shape: mochiShape, hat: 'wizard', extras: { hats: createHatsExtra({ wizard: hatWizard }) } });
      expect(suelto.ctx.hatKey).toBe('wizard');
      expect(suelto.ctx.svg.querySelectorAll('.hatAcc').length).toBeGreaterThan(0);
      suelto.api.destroy();
    });
  });

  it('una paleta propia pinta los tres tonos y el contorno; una mala falla al crear el bot', () => {
    const { ctx, api } = assembleBot(host, { shape: mochiShape, palette: { colors: ['#FFD6E8', '#FF4F9A', '#7A1049'], rim: '#00FFFF' } });
    expect(ctx.svg.style.getPropertyValue('--c1')).toBe('#FFD6E8');
    expect(ctx.svg.style.getPropertyValue('--c2')).toBe('#FF4F9A');
    expect(ctx.svg.style.getPropertyValue('--c3')).toBe('#7A1049');
    expect(ctx.svg.style.getPropertyValue('--rim')).toBe('#00FFFF');
    api.setPalette(['#111111', '#222222', '#333333']);
    expect(ctx.svg.style.getPropertyValue('--c2')).toBe('#222222');
    expect(ctx.svg.style.getPropertyValue('--rim')).toBe('#111111');
    expect(() => api.setPalette(['#111', '#222'] as never)).toThrow(/paleta propia/);
    expect(ctx.svg.style.getPropertyValue('--c2')).toBe('#222222'); // la mala no tocó nada
    api.destroy();
  });
});
