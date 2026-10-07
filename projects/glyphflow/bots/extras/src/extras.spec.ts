import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { GfBotHatId } from 'glyphflow/bots';
import { assembleBot } from '../../src/engine/create-bot';
import { mochiShape } from '../../src/shapes/mochi';
import { hatsExtra, HATS, toysExtra } from './public-api';

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
});
