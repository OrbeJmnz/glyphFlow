import { ghostShape } from '../shapes/ghost';
import { hatsExtra } from '../../extras/src/hats';
import { routinesExtra } from '../../extras/src/routines';
import { mochiShape } from '../shapes/mochi';
import { octopusShape } from '../shapes/octopus';
import { createBotContext, type BotContext } from './context';
import { setFace, setFx, setHat, setMochi, setMouthKind, setShape } from './setters';
import { installStateHooks, setState } from './state';

const proto = Element.prototype as unknown as Record<string, unknown>;
const svgProto = SVGElement.prototype as unknown as Record<string, unknown>;

function bot(ready = true): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: mochiShape, extras: { hats: hatsExtra, routines: routinesExtra } });
  installStateHooks(ctx);
  setShape(ctx, ctx.shape);
  if (ready) {
    setState(ctx, 'idle');
    ctx.ready = true;
  }
  return ctx;
}

describe('glyphflow/bots · cambiar forma, piel, cara y sombrero', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // jsdom no mide el SVG: sin CTM la física del sombrero y de la nube no hace nada
    svgProto['getScreenCTM'] = () => null;
    svgProto['getTotalLength'] = () => 300;
    svgProto['getPointAtLength'] = (l: number) => ({ x: 100 + 60 * Math.cos((2 * Math.PI * l) / 300), y: 110 + 58 * Math.sin((2 * Math.PI * l) / 300) });
    proto['animate'] = function (this: Element, frames: Keyframe[]) {
      return { cancel: vi.fn(), onfinish: null, effect: { target: this, getKeyframes: () => frames } };
    };
    proto['getAnimations'] = () => [];
  });
  afterEach(() => {
    vi.useRealTimers();
    Reflect.deleteProperty(proto, 'animate');
    Reflect.deleteProperty(proto, 'getAnimations');
    for (const k of ['getScreenCTM', 'getTotalLength', 'getPointAtLength']) Reflect.deleteProperty(svgProto, k);
    document.body.innerHTML = '';
  });

  describe('setShape', () => {
    it('reconstruye el SVG con la forma nueva y conserva el estado', () => {
      const ctx = bot();
      setState(ctx, 'working');
      setShape(ctx, ghostShape);
      expect(ctx.shape).toBe(ghostShape);
      expect(ctx.svg.dataset['shape']).toBe('ghost');
      expect(ctx.el.clip.getAttribute('d')).toBe(ghostShape.d);
      expect(ctx.state).toBe('working');
    });

    it('cancela las animaciones de relevo vivas de la forma anterior', () => {
      const ctx = bot();
      const cancel = vi.fn();
      ctx.running.set(ctx.el.hop, { cancel } as unknown as Animation);
      setShape(ctx, octopusShape);
      expect(cancel).toHaveBeenCalledTimes(1);
      expect(ctx.running.has(ctx.el.hop)).toBe(false);
    });

    it('listo y en marcha reinicia la rutina con los rasgos nuevos y reaplica la paleta', () => {
      const onRoutine = vi.fn();
      const ctx = bot();
      ctx.opts.onRoutine = onRoutine;
      setState(ctx, 'working');
      onRoutine.mockClear();
      ctx.paletteKey = 'coral';
      setShape(ctx, ghostShape);
      expect(onRoutine).toHaveBeenCalledTimes(1);
      expect(ctx.svg.style.getPropertyValue('--c1')).not.toBe('');
    });

    it('en pausa no reinicia la rutina: solo repone la boca de reposo', () => {
      const onRoutine = vi.fn();
      const ctx = bot();
      ctx.opts.onRoutine = onRoutine;
      ctx.paused = true;
      setShape(ctx, ghostShape);
      expect(onRoutine).not.toHaveBeenCalled();
      expect(ctx.fe.mouths.find((m) => m.style.opacity === '1')?.dataset['m']).toBe('pill');
    });

    it('antes de estar listo (construcción) no toca estado ni paleta', () => {
      const ctx = bot(false);
      expect(ctx.ready).toBe(false);
      expect(ctx.el.clip.getAttribute('d')).toBe(mochiShape.d);
      expect(ctx.svg.style.getPropertyValue('--c1')).toBe('');
    });

    it('un cambio de forma monta el sombrero y su física en la forma nueva', () => {
      const ctx = bot();
      setHat(ctx, 'topHat');
      setShape(ctx, ghostShape);
      expect(ctx.svg.dataset['hat']).toBe('topHat');
      expect(ctx.hatEls).not.toBeNull();
    });
  });

  describe('validación: lo inválido cae al valor por defecto', () => {
    it('setFx acepta los cuatro efectos y quita cualquier otro', () => {
      const ctx = bot();
      for (const fx of ['glow', 'pixel', 'glitch', 'bug']) {
        setFx(ctx, fx);
        expect(ctx.svg.dataset['fx']).toBe(fx);
      }
      setFx(ctx, 'neón');
      expect(ctx.fxVar).toBeNull();
      expect(ctx.svg.dataset['fx']).toBe('');
      setFx(ctx, 'constructor');
      expect(ctx.fxVar).toBeNull();
      setFx(ctx, null);
      expect(ctx.fxVar).toBeNull();
    });

    it('setMochi acepta pieles de las cuatro familias y vuelve a neu con una desconocida', () => {
      const ctx = bot();
      for (const v of ['gel', 'g3', 'f2', 'o4']) {
        setMochi(ctx, v);
        expect(ctx.mochiVar, v).toBe(v);
        expect(ctx.svg.dataset['mvar'], v).toBe(v);
      }
      setMochi(ctx, 'zzz');
      expect(ctx.mochiVar).toBe('neu');
      setMochi(ctx, 'toString');
      expect(ctx.mochiVar).toBe('neu');
    });

    it('setMochi acepta una piel propia con prefijo x- y la pinta con variables CSS', () => {
      const ctx = bot();
      setMochi(ctx, 'x-sunset');
      expect(ctx.mochiVar).toBe('x-sunset');
      expect(ctx.svg.dataset['mvar']).toBe('x-sunset');
      expect(ctx.q('.skinPaint')!.innerHTML).toContain('var(--gf-skin-fill');
      expect(ctx.q('.skinOver')!.innerHTML).toContain('var(--gf-skin-edge');
      // sin prefijo, o con caracteres que no son de un id, sigue siendo un typo
      for (const v of ['sunset', 'x-', 'x-a b', 'x-"><script>']) {
        setMochi(ctx, v);
        expect(ctx.mochiVar, v).toBe('neu');
      }
    });

    it('setHat separa sombrero de accesorio y se queda con uno solo', () => {
      const ctx = bot();
      setHat(ctx, 'topHat');
      expect([ctx.hatKey, ctx.accX]).toEqual(['topHat', null]);
      setHat(ctx, 'halo');
      expect([ctx.hatKey, ctx.accX]).toEqual([null, 'halo']);
      setHat(ctx, 'nada');
      expect([ctx.hatKey, ctx.accX]).toEqual([null, null]);
      setHat(ctx, 'constructor');
      expect([ctx.hatKey, ctx.accX]).toEqual([null, null]);
      setHat(ctx, null);
      expect(ctx.svg.dataset['hat']).toBe('');
    });

    it('setFace acepta un estilo de cara y `null` devuelve la propia de la forma', () => {
      const ctx = bot();
      setFace(ctx, 'geo');
      expect(ctx.faceStyle).toBe('geo');
      expect(ctx.svg.dataset['face']).toBe('geo');
      setFace(ctx, 'rara');
      expect(ctx.faceStyle).toBeNull();
      setFace(ctx, null);
      expect(ctx.svg.dataset['face']).toBe('neu');
    });

    it('setMouthKind solo acepta pill y w, y repone la boca solo en reposo', () => {
      const ctx = bot();
      setMouthKind(ctx, 'w');
      expect(ctx.mouthPref).toBe('w');
      expect(ctx.fe.mouths.find((m) => m.style.opacity === '1')?.dataset['m']).toBe('w');
      setMouthKind(ctx, 'o');
      expect(ctx.mouthPref).toBeNull();
      setState(ctx, 'working');
      setMouthKind(ctx, 'w');
      expect(ctx.fe.mouths.find((m) => m.style.opacity === '1')?.dataset['m']).toBe('flat'); // trabajando manda la boca plana
    });
  });
});
