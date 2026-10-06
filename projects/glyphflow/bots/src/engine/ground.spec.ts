import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { catShape } from '../shapes/cat';
import { ghostShape } from '../shapes/ghost';
import { mochiShape } from '../shapes/mochi';
import { octopusShape } from '../shapes/octopus';
import { robotShape } from '../shapes/robot';
import { tofuShape } from '../shapes/tofu';
import { pathExtent } from './body-fx';
import { shapeD } from './shape-view';
import { buildShape } from './build';
import { createBotContext, type BotContext } from './context';
import { GROUND_Y, groundClip } from './ground';

function built(): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: ghostShape });
  buildShape(ctx);
  return ctx;
}

describe('glyphflow/bots · recorte de suelo', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('envuelve .hop en un grupo SIN transformar que lleva el recorte, sobre la sombra', () => {
    const ctx = built();
    const padre = ctx.el.hop.parentElement!;
    groundClip(ctx, 1000);
    const g = ctx.el.hop.parentElement!;
    expect(g.classList.contains('gf-ground')).toBe(true);
    expect(g).not.toBe(padre);
    expect(g.parentElement).toBe(padre);
    expect(g.getAttribute('clip-path')).toBe(`url(#${ctx.id}-ground)`);
    const rect = ctx.svg.querySelector(`[id="${ctx.id}-ground"] rect`)!;
    expect(Number(rect.getAttribute('y')) + Number(rect.getAttribute('height'))).toBe(GROUND_Y);
  });

  it('el recorte queda por debajo de TODAS las formas en reposo (no les corta nada)', () => {
    for (const sh of [ghostShape, tofuShape, mochiShape, catShape, octopusShape, robotShape]) {
      const d = shapeD(sh);
      if (d) expect(pathExtent(d).bottom).toBeLessThan(GROUND_Y);
    }
  });

  it('se quita al terminar y no se duplica si se repite', () => {
    const ctx = built();
    groundClip(ctx, 1000);
    groundClip(ctx, 1000);
    expect(ctx.svg.querySelectorAll('.gf-ground').length).toBe(1);
    expect(ctx.svg.querySelectorAll(`[id="${ctx.id}-ground"]`).length).toBe(1);
    vi.advanceTimersByTime(1200);
    expect(ctx.el.hop.parentElement!.hasAttribute('clip-path')).toBe(false);
  });
});
