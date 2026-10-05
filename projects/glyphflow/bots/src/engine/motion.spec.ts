import { PALETTES, RIM } from '../data/palettes';
import { mochiShape } from '../shapes/mochi';
import { buildShape } from './build';
import { createBotContext, type BotContext, type GfBotCue, type GfBotOptions } from './context';
import { blink, eyeSeq, gazeAt, lookTo, peek, setOpen, startBlinkLoop, swapEyes } from './eyes';
import { baseMouth, defaultMouth, setMouth } from './mouth';
import { applyMaterial, setMaterial, setPalette } from './paint';
import { animatePose, setPose } from './pose-motion';
import { resolveSpring, SPRING_DURATION_MS, SPRING_FALLBACK } from './spring';
import { SPRING_BOUNCY } from 'glyphflow';

function built(opts: Partial<GfBotOptions> = {}): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: mochiShape, ...opts });
  buildShape(ctx);
  return ctx;
}

/** jsdom no trae Web Animations: cada nodo recibe un `animate` propio y se anota qué se animó. */
interface Call {
  node: Element;
  frames: Keyframe[];
  options: KeyframeAnimationOptions;
}
function spyAnimate(nodes: Element[]): Call[] {
  const calls: Call[] = [];
  for (const node of nodes) {
    (node as unknown as { animate: unknown }).animate = (frames: Keyframe[], options: KeyframeAnimationOptions) => {
      calls.push({ node, frames, options });
      return { cancel: vi.fn(), onfinish: null };
    };
  }
  return calls;
}

describe('glyphflow/bots · movimiento de la cara', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  describe('spring', () => {
    it('sin `linear()` (jsdom, Safari viejo) cae al cubic-bezier con rebote', () => {
      expect(resolveSpring()).toEqual({ easing: SPRING_FALLBACK, duration: SPRING_DURATION_MS });
    });

    it('con `linear()` usa una copia IDÉNTICA al SPRING_BOUNCY del primario (si divergen, falla aquí)', () => {
      vi.stubGlobal('CSS', { supports: () => true });
      expect(resolveSpring().easing).toBe(SPRING_BOUNCY);
    });

    it('la duración natural coincide con la que documenta el primario', () => {
      expect(SPRING_DURATION_MS).toBe(925);
    });
  });

  describe('setPose / animatePose', () => {
    it('setPose escribe un transform en cada capa y recuerda la pose; lo que no se dice se queda', () => {
      const ctx = built();
      setPose(ctx, { yaw: 0.4, roll: 6 });
      setPose(ctx, { pitch: -0.2 });
      expect(ctx.pose).toEqual({ yaw: 0.4, pitch: -0.2, roll: 6 });
      expect(ctx.poseEls.every((n) => n.style.transform !== '')).toBe(true);
      expect(ctx.el.flip.style.transform).toBe('rotate(6.00deg)');
      expect(ctx.el.light.style.transform).toBe('rotate(-6.00deg)'); // el brillo contra-rota: la luz queda fija
    });

    it('las capas de rasgo se desvanecen al girar de espaldas', () => {
      const ctx = built();
      setPose(ctx, { yaw: Math.PI });
      expect(Number(ctx.poseEls[0].style.opacity)).toBe(0);
      setPose(ctx, { yaw: 0 });
      expect(Number(ctx.poseEls[0].style.opacity)).toBe(1);
    });

    it('una piel de color pintado (mflow) acompaña la pose', () => {
      const ctx = built();
      const mflow = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      ctx.fe.mflow = mflow;
      setPose(ctx, { yaw: 1, pitch: 0.5, roll: 10 });
      expect(mflow.style.translate).toBe('30.00px 11.00px');
      expect(mflow.style.rotate).toMatch(/^10(.00)?deg$/);
    });

    it('animatePose muestrea N+1 cuadros por capa, con un mínimo de 24 pasos', () => {
      const ctx = built();
      const calls = spyAnimate(ctx.poseEls);
      animatePose(ctx, (u) => ({ yaw: u }), 200);
      expect(calls).toHaveLength(ctx.poseEls.length);
      expect(calls[0].frames).toHaveLength(25); // 200 ms → 24 pasos mínimos → 25 cuadros
      expect(calls[0].frames[0]['offset']).toBe(0);
      expect(calls[0].frames.at(-1)?.['offset']).toBe(1);
      const largo = built();
      const llamadas = spyAnimate(largo.poseEls);
      animatePose(largo, (u) => ({ yaw: u }), 1800);
      expect(llamadas[0].frames).toHaveLength(101); // 1800/18 = 100 pasos
    });

    it('sin repeat cada capa va por `play` (relevo de pose) y queda en `running`', () => {
      const ctx = built();
      spyAnimate(ctx.poseEls);
      const anims = animatePose(ctx, () => ({ roll: 3 }), 400, { easing: 'ease-out' });
      expect(anims).toHaveLength(ctx.poseEls.length);
      expect(ctx.running.size).toBe(ctx.poseEls.length);
      expect(ctx.subAnims).toHaveLength(0);
    });

    it('con repeat llega primero a la pose inicial y lanza bucles esperando al resorte', () => {
      const ctx = built();
      const calls = spyAnimate(ctx.poseEls);
      animatePose(ctx, (u) => ({ roll: 10 * u + 4 }), 600, { repeat: true });
      expect(ctx.pose.roll).toBe(4);
      expect(ctx.subAnims).toHaveLength(ctx.poseEls.length);
      expect(calls[0].options).toMatchObject({ iterations: Infinity, delay: ctx.spring.duration * 0.6 });
    });

    it('en movimiento reducido el bucle no espera al resorte', () => {
      vi.stubGlobal('matchMedia', () => ({ matches: true }));
      const ctx = built();
      const calls = spyAnimate(ctx.poseEls);
      animatePose(ctx, () => ({}), 300, { repeat: true });
      expect(calls[0].options.delay).toBe(0);
    });
  });

  describe('ojos', () => {
    it('blink y eyeSeq animan los ojos abiertos Y los de las caras kawaii', () => {
      const ctx = built();
      const kawaii = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      kawaii.setAttribute('class', 'kE');
      ctx.svg.querySelector('.xkL')?.appendChild(kawaii);
      const calls = spyAnimate([...ctx.fe.eyeList, kawaii]);
      blink(ctx);
      expect(calls).toHaveLength(3);
      expect(calls[0].options).toEqual({ duration: 170, easing: 'ease-in-out' });
      expect(calls[0].frames[1]).toEqual({ transform: 'scale(1,0.08)', offset: 0.45 });
      eyeSeq(ctx, [{ opacity: 0 }, { opacity: 1 }], 90);
      expect(calls).toHaveLength(6);
    });

    it('swapEyes esconde el ojo abierto, muestra el alterno y avisa a las caras kawaii', () => {
      const ctx = built();
      const cues: GfBotCue[] = [];
      ctx.hooks.cue = (c) => cues.push(c);
      const abiertos = spyAnimate(ctx.fe.eyeList);
      const felices = spyAnimate(ctx.fe.happy);
      swapEyes(ctx, 'happy', 1000, [1]);
      expect(abiertos).toHaveLength(1);
      expect(abiertos[0].node).toBe(ctx.fe.eyeList[1]);
      expect(felices[0].node).toBe(ctx.fe.happy[1]);
      expect(abiertos[0].frames[1]).toEqual({ opacity: 0, offset: 0.09 });
      expect(felices[0].frames[1]).toEqual({ opacity: 1, offset: 0.09 });
      expect(cues).toEqual([{ eye: 'happy', which: [1], ms: 1000 }]);
    });

    it('en un gesto muy corto el fundido no pasa de 12% del tiempo', () => {
      const ctx = built();
      const abiertos = spyAnimate(ctx.fe.eyeList);
      spyAnimate(ctx.fe.squeeze);
      swapEyes(ctx, 'squeeze', 300);
      expect(abiertos[0].frames[1]['offset']).toBe(0.12);
    });

    it('setOpen cierra y abre los ojos', () => {
      const ctx = built();
      setOpen(ctx, false);
      expect(ctx.fe.eyeList.every((e) => e.style.opacity === '0')).toBe(true);
      expect(ctx.fe.closed.every((c) => c.getAttribute('opacity') === '1')).toBe(true);
      setOpen(ctx, true);
      expect(ctx.fe.eyeList.every((e) => e.style.opacity === '1')).toBe(true);
      expect(ctx.fe.closed.every((c) => c.getAttribute('opacity') === '0')).toBe(true);
    });

    it('peek entreabre los ojos cerrados durante 1.1 s', () => {
      const ctx = built();
      const cerrados = spyAnimate(ctx.fe.closed);
      const abiertos = spyAnimate(ctx.fe.eyeList);
      peek(ctx);
      expect(cerrados).toHaveLength(2);
      expect(cerrados[0].options.duration).toBe(1100);
      expect(abiertos.length).toBeGreaterThanOrEqual(4); // los suyos + los del parpadeo de ojos (eyeSeq)
    });

    it('lookTo y gazeAt mueven la cabeza; dormido, gazeAt no', () => {
      const ctx = built();
      lookTo(ctx, 1, -1);
      expect(ctx.pose.yaw).toBeCloseTo(0.6);
      expect(ctx.pose.pitch).toBeCloseTo(-0.32);
      gazeAt(ctx, 1, 1);
      expect(ctx.pose.yaw).toBeCloseTo(0.5);
      expect(ctx.pose.pitch).toBeCloseTo(0.35);
      ctx.state = 'sleeping';
      gazeAt(ctx, -1, 0);
      expect(ctx.pose.yaw).toBeCloseTo(0.5);
    });

    describe('startBlinkLoop', () => {
      it('parpadea cada 2.2–5.8 s y se detiene del todo con la función que devuelve', () => {
        vi.useFakeTimers();
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
        const ctx = built();
        const calls = spyAnimate(ctx.fe.eyeList);
        const stop = startBlinkLoop(ctx);
        vi.advanceTimersByTime(4000 - 1);
        expect(calls).toHaveLength(0);
        vi.advanceTimersByTime(1);
        expect(calls).toHaveLength(2); // un parpadeo = un animate por ojo
        stop();
        vi.advanceTimersByTime(60_000);
        expect(calls).toHaveLength(2);
        expect(vi.getTimerCount()).toBe(0);
      });

      it('en pausa o con movimiento reducido no parpadea, pero el reloj sigue', () => {
        vi.useFakeTimers();
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
        const ctx = built();
        const calls = spyAnimate(ctx.fe.eyeList);
        const stop = startBlinkLoop(ctx);
        ctx.paused = true;
        vi.advanceTimersByTime(4000);
        expect(calls).toHaveLength(0);
        ctx.paused = false;
        vi.advanceTimersByTime(4000);
        expect(calls).toHaveLength(2);
        stop();
      });

      it('dormido solo asoma de vez en cuando (22%)', () => {
        vi.useFakeTimers();
        const rnd = vi.spyOn(Math, 'random');
        const ctx = built();
        ctx.state = 'sleeping';
        const cerrados = spyAnimate(ctx.fe.closed);
        spyAnimate(ctx.fe.eyeList);
        const stop = startBlinkLoop(ctx);
        rnd.mockReturnValue(0.5);
        vi.advanceTimersByTime(4000);
        expect(cerrados).toHaveLength(0);
        rnd.mockReturnValue(0.1);
        vi.advanceTimersByTime(4000);
        expect(cerrados.length).toBeGreaterThan(0);
        stop();
      });

      it('un timer de parpadeo doble pendiente tampoco sobrevive al stop', () => {
        vi.useFakeTimers();
        vi.spyOn(Math, 'random').mockReturnValue(0.1); // dispara el segundo parpadeo
        const ctx = built();
        const calls = spyAnimate(ctx.fe.eyeList);
        const stop = startBlinkLoop(ctx);
        vi.advanceTimersByTime(2200 + 0.1 * 3600);
        expect(calls).toHaveLength(2);
        stop();
        vi.advanceTimersByTime(1000);
        expect(calls).toHaveLength(2);
      });
    });
  });

  describe('boca', () => {
    it('setMouth muestra una sola boca', () => {
      const ctx = built();
      setMouth(ctx, 'wide');
      const visibles = ctx.fe.mouths.filter((m) => m.style.opacity === '1').map((m) => m.dataset['m']);
      expect(visibles).toEqual(['wide']);
    });

    it('con `ms` vuelve sola a la boca de reposo y avisa a las caras kawaii', () => {
      vi.useFakeTimers();
      const ctx = built();
      const cues: GfBotCue[] = [];
      ctx.hooks.cue = (c) => cues.push(c);
      baseMouth(ctx, 'pill');
      setMouth(ctx, 'open', 800);
      expect(cues).toEqual([{ mouth: 'open', ms: 800 }]);
      expect(ctx.fe.mouths.find((m) => m.style.opacity === '1')?.dataset['m']).toBe('open');
      vi.advanceTimersByTime(800);
      expect(ctx.fe.mouths.find((m) => m.style.opacity === '1')?.dataset['m']).toBe('pill');
    });

    it('un setMouth nuevo cancela el regreso pendiente del anterior', () => {
      vi.useFakeTimers();
      const ctx = built();
      baseMouth(ctx, 'pill');
      setMouth(ctx, 'o', 500);
      setMouth(ctx, 'frown');
      vi.advanceTimersByTime(1000);
      expect(ctx.fe.mouths.find((m) => m.style.opacity === '1')?.dataset['m']).toBe('frown');
    });

    it('baseMouth recuerda la boca de reposo; sin `ms` no avisa a kawaii', () => {
      const ctx = built();
      const cue = vi.fn();
      ctx.hooks.cue = cue;
      baseMouth(ctx, 'smile');
      expect(ctx.mouthBase).toBe('smile');
      expect(cue).not.toHaveBeenCalled();
    });

    it('defaultMouth: dormido `sleep`, trabajando `flat`, en reposo la elegida o la de la forma', () => {
      const ctx = built();
      expect(defaultMouth(ctx, 'sleeping')).toBe('sleep');
      expect(defaultMouth(ctx, 'working')).toBe('flat');
      expect(defaultMouth(ctx, 'idle')).toBe('pill');
      ctx.mouthPref = 'w';
      expect(defaultMouth(ctx, 'idle')).toBe('w');
      ctx.mouthPref = null;
      ctx.shape = { ...mochiShape, baseMouth: 'w' };
      expect(defaultMouth(ctx, 'idle')).toBe('w');
    });
  });

  describe('paleta y material', () => {
    it('setPalette fija los tres tonos, el borde y deja el material en plástico', () => {
      const ctx = built();
      setPalette(ctx, 'coral');
      const [a, b, c] = PALETTES['coral'];
      expect(ctx.svg.style.getPropertyValue('--c1')).toBe(a);
      expect(ctx.svg.style.getPropertyValue('--c2')).toBe(b);
      expect(ctx.svg.style.getPropertyValue('--c3')).toBe(c);
      expect(ctx.svg.style.getPropertyValue('--rim')).toBe(RIM['coral']);
      expect(ctx.paletteKey).toBe('coral');
      expect(ctx.svg.dataset['material']).toBe('plastic');
    });

    it('`auto` toma la paleta de la forma', () => {
      const ctx = built();
      setPalette(ctx, 'auto');
      expect(ctx.svg.style.getPropertyValue('--c1')).toBe(PALETTES['mist'][0]);
    });

    it('un material metálico escribe sus seis paradas, usa el degradado metálico y enciende la viñeta', () => {
      const ctx = built();
      setPalette(ctx, 'steel');
      setMaterial(ctx, 'gold');
      for (let i = 1; i <= 6; i++) expect(ctx.svg.style.getPropertyValue('--m' + i), `--m${i}`).not.toBe('');
      expect(ctx.svg.dataset['material']).toBe('gold');
      expect(ctx.svg.querySelector('[data-paint]')?.getAttribute('fill')).toBe(`url(#${ctx.id}-metal)`);
      expect(ctx.svg.querySelector('.vig')?.getAttribute('opacity')).toBe('1');
      expect(ctx.svg.querySelector('.glossE')?.getAttribute('fill')).toBe(`url(#${ctx.id}-glossHard)`);
    });

    it('volver a plástico restituye el degradado normal y apaga la viñeta', () => {
      const ctx = built();
      setMaterial(ctx, 'metal');
      setMaterial(ctx, 'plastic');
      expect(ctx.svg.querySelector('[data-paint]')?.getAttribute('fill')).toBe(`url(#${ctx.id}-body)`);
      expect(ctx.svg.querySelector('.vig')?.getAttribute('opacity')).toBe('0');
      expect(ctx.svg.querySelector('.glossE')?.getAttribute('fill')).toBe(`url(#${ctx.id}-gloss)`);
    });

    it('`auto` usa el material de la forma, y sin él, plástico', () => {
      const ctx = built();
      applyMaterial(ctx);
      expect(ctx.svg.dataset['material']).toBe('plastic');
      ctx.shape = { ...mochiShape, material: 'chrome' };
      applyMaterial(ctx);
      expect(ctx.svg.dataset['material']).toBe('chrome');
    });
  });
});
