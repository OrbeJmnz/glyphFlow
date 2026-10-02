import { FACES } from '../data/faces';
import { ghostShape } from '../shapes/ghost';
import { catShape } from '../shapes/cat';
import { mochiShape } from '../shapes/mochi';
import { nCloudShape } from '../shapes/night';
import { octopusShape } from '../shapes/octopus';
import { cubeShape } from '../shapes/retired';
import { makeRobot } from '../shapes/robot';
import { applyFx, buildShape } from './build';
import { createBotContext, type BotContext, type GfBotOptions } from './context';
import { accMarkup, faceMarkup, faceOf, ownFace } from './face';
import { POSE_SLOTS } from './pose';
import { curSh, shapeD, withHat } from './shape-view';
import { startShapeFx } from './shape-fx';

function make(opts: Partial<GfBotOptions> = {}): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  return createBotContext(host, { shape: mochiShape, ...opts });
}
const built = (opts: Partial<GfBotOptions> = {}): BotContext => {
  const ctx = make(opts);
  buildShape(ctx);
  return ctx;
};

/** Cada forma de serie: la paridad contra el prototipo se midió fuera del repo; aquí quedan los invariantes. */
const FORMAS = [mochiShape, ghostShape, catShape, octopusShape, nCloudShape, makeRobot(cubeShape)];

describe('glyphflow/bots · construcción de la forma', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  describe('face', () => {
    it('la cara elegida a mano manda; sin ella, la de la forma si tiene ojos neumórficos, y si no `neu`', () => {
      expect(faceOf(make(), mochiShape)).toBe('neu');
      expect(faceOf(make(), ghostShape)).toBe('ghost');
      expect(faceOf(make(), catShape)).toBe('cat');
      expect(faceOf(make({ face: 'geo' }), ghostShape)).toBe('geo');
      expect(faceOf(make({ face: 'neu' }), ghostShape)).toBe('ghost');
      expect(ownFace({ ...mochiShape, faceStyle: 'minimal' })).toBe('neu');
    });

    it('cada estilo de cara dibuja sus ojos con los rasgos que los gestos buscan por clase', () => {
      for (const id of Object.keys(FACES) as (keyof typeof FACES)[]) {
        const ctx = make({ face: id });
        const html = faceMarkup(ctx, mochiShape);
        expect(html, id).not.toContain('${');
        expect(html, id).not.toContain('undefined');
        expect(html, id).not.toContain('NaN');
        for (const c of ['eyeball', 'closed', 'happy', 'squeeze', 'browA', 'browS', 'tear', 'mouths', 'sweat', 'faceFx', 'bubble']) {
          expect(html, `${id}:${c}`).toContain(c);
        }
        expect((html.match(/class="eye"/g) ?? []).length, id).toBe(2);
      }
    });

    it('trae las 13 bocas y la capa de caras kawaii; el robot no lleva kawaii', () => {
      const html = faceMarkup(make(), mochiShape);
      for (const m of ['smile', 'oval', 'cat', 'half', 'pill', 'wide', 'open', 'w', 'o', 'sleep', 'flat', 'frown', 'wavy']) {
        expect(html).toContain(`data-m="${m}"`);
      }
      expect(html).toContain('xkL');
      expect(faceMarkup(make(), makeRobot(cubeShape))).not.toContain('xkL');
    });

    it('los ids de la cara cuelgan del prefijo del bot', () => {
      const ctx = make({ face: 'minimal' });
      const refs = [...faceMarkup(ctx, mochiShape).matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]);
      expect(refs.length).toBeGreaterThan(0);
      for (const r of refs) expect(r.startsWith(ctx.id + '-'), r).toBe(true);
    });

    it('accMarkup pinta una copia por accesorio de la forma', () => {
      const ctx = make({ shape: catShape });
      expect((accMarkup(ctx, catShape).match(/class="acc/g) ?? []).length).toBe(catShape.acc?.length);
      expect(accMarkup(ctx, { ...mochiShape, acc: undefined })).toBe('');
    });
  });

  describe('shape-view', () => {
    it('sin sombrero devuelve la misma forma; con sombrero reemplaza el copete por los accesorios del sombrero', () => {
      const plain = make();
      expect(withHat(plain, mochiShape)).toBe(mochiShape);
      const hat = make({ hat: 'topHat' });
      const out = withHat(hat, mochiShape);
      expect(out).not.toBe(mochiShape);
      expect(out.acc?.some((a) => a.tuft)).toBe(false);
      expect(out.acc?.some((a) => a.hat)).toBe(true);
      expect(mochiShape.acc?.some((a) => a.tuft)).toBe(true); // la forma compartida no se muta
    });

    it('cachea por (forma, sombrero): el mismo objeto cuadro tras cuadro', () => {
      const ctx = make({ hat: 'topHat' });
      expect(withHat(ctx, mochiShape)).toBe(withHat(ctx, mochiShape));
      const first = curSh(ctx);
      ctx.hatKey = 'wizard';
      expect(curSh(ctx)).not.toBe(first);
    });

    it('una forma sin `d` falla con el nombre de la forma', () => {
      expect(() => shapeD({ ...mochiShape, id: 'rara', d: undefined })).toThrow(/rara/);
    });
  });

  describe('buildShape', () => {
    it('escribe contorno, cara y atributos de datos que el CSS de las pieles espera', () => {
      const ctx = built({ mochi: 'gel' });
      expect(ctx.el.clip.getAttribute('d')).toBe(mochiShape.d);
      expect(ctx.svg.dataset['shape']).toBe('mochi');
      expect(ctx.svg.dataset['skin']).toBe('mochi');
      expect(ctx.svg.dataset['mvar']).toBe('gel');
      expect(ctx.svg.dataset['mfam']).toBe('light');
      expect(ctx.svg.dataset['face']).toBe('neu');
      expect(ctx.el.face.innerHTML).toContain('class="eyes"');
    });

    it('la familia de la piel sale del nombre de la variante, no de su inicial', () => {
      const familia = (shape: GfBotOptions['shape'], mochi: string) => built({ shape, mochi }).svg.dataset['mfam'];
      expect(familia(catShape, 'g1')).toBe('cat');
      expect(familia(ghostShape, 'f4')).toBe('ghost');
      expect(familia(octopusShape, 'o2')).toBe('octopus');
      expect(familia(mochiShape, 'n3')).toBe('night');
      expect(familia(mochiShape, 'neu')).toBe('light');
      expect(familia(makeRobot(cubeShape), 'neu')).toBe('');
    });

    it('rehace las referencias de la cara y deja las listas llenas', () => {
      const ctx = built();
      expect(ctx.fe.eyeList).toHaveLength(2);
      expect(ctx.fe.closed).toHaveLength(2);
      expect(ctx.fe.mouths).toHaveLength(13);
      expect(ctx.fe.eyes).toBeInstanceOf(SVGElement);
      expect(ctx.fe.mflow).toBeNull();
    });

    it('los rasgos de la cara y las capas que giran siguen el orden que espera projectPose', () => {
      for (const shape of FORMAS) {
        const ctx = built({ shape });
        const accs = shape.acc?.length ?? 0;
        expect(ctx.feats.length, shape.id).toBeGreaterThan(0);
        // [...rasgos, ...POSE_SLOTS, ...accesorios atrás, ...accesorios adelante]
        expect(ctx.poseEls.length, shape.id).toBe(ctx.feats.length + POSE_SLOTS.length + accs * 2);
        const i = ctx.feats.length;
        expect(ctx.poseEls[i], shape.id).toBe(ctx.el.clip);
        expect(ctx.poseEls[i + 5], shape.id).toBe(ctx.el.flip);
        expect(ctx.poseEls[i + 6], shape.id).toBe(ctx.el.light);
      }
    });

    it('en el robot el reflejo va debajo de la cara; en las demás, encima', () => {
      const robot = built({ shape: makeRobot(cubeShape) });
      expect([...robot.el.flip.children].indexOf(robot.el.light)).toBeLessThan([...robot.el.flip.children].indexOf(robot.el.face));
      const mochi = built();
      expect([...mochi.el.flip.children].indexOf(mochi.el.light)).toBeGreaterThan([...mochi.el.flip.children].indexOf(mochi.el.face));
    });

    it('una forma nueva cancela las animaciones de la anterior', () => {
      const ctx = built();
      const cancel = vi.fn();
      ctx.shapeAnims = [{ cancel } as unknown as Animation];
      buildShape(ctx);
      expect(cancel).toHaveBeenCalledTimes(1);
      expect(ctx.shapeAnims).toEqual([]);
    });

    it('con sombrero pone sus accesorios en las dos capas; con accesorio extra, su marcado en fxOut', () => {
      // jsdom no mide trazos: un círculo fijo basta para que el halo se acomode
      const proto = SVGElement.prototype as unknown as Record<string, unknown>;
      proto['getTotalLength'] = () => 300;
      proto['getPointAtLength'] = (l: number) => ({ x: 100 + 60 * Math.cos((2 * Math.PI * l) / 300), y: 110 + 58 * Math.sin((2 * Math.PI * l) / 300) });
      try {
      const conSombrero = built({ hat: 'topHat' });
      expect(conSombrero.el.accFront.innerHTML).toContain('hatAcc');
      expect(conSombrero.el.accBack.innerHTML).toContain('hatAcc');
      const halo = built({ hat: 'halo' });
      expect(halo.el.fxOut.innerHTML).toContain('nhalo');
      expect(halo.el.accFront.innerHTML).not.toContain('hatAcc');
      } finally {
        Reflect.deleteProperty(proto, 'getTotalLength');
        Reflect.deleteProperty(proto, 'getPointAtLength');
      }
    });

    it('la nube trae su volumen extra y las demás formas no', () => {
      expect(built({ shape: nCloudShape }).el.fxIn.innerHTML).toContain('nvol');
      expect(built().el.fxIn.innerHTML).not.toContain('nvol');
    });

    it('las pieles con tokens propios los publican como --bot-*, y las demás los quitan', () => {
      const f = built({ shape: ghostShape, mochi: 'f1' });
      expect(f.svg.style.getPropertyValue('--bot-base')).not.toBe('');
      f.mochiVar = 'neu';
      buildShape(f);
      expect(f.svg.style.getPropertyValue('--bot-base')).toBe('');
    });

    it('applyFx enciende el filtro de pixel y glitch con el id del bot, y lo apaga con otro efecto', () => {
      const ctx = built({ fx: 'pixel' });
      expect(ctx.svg.dataset['fx']).toBe('pixel');
      expect(ctx.el.breath.style.filter).toContain(`${ctx.id}-pix`);
      ctx.fxVar = 'glitch';
      applyFx(ctx);
      expect(ctx.el.breath.style.filter).toContain(`${ctx.id}-glitch`);
      ctx.fxVar = 'glow';
      applyFx(ctx);
      expect(ctx.el.breath.style.filter).toBe('');
      ctx.fxVar = null;
      applyFx(ctx);
      expect(ctx.svg.dataset['fx']).toBe('');
    });

    it('pone la transición con el resorte salvo en movimiento reducido', () => {
      const ctx = built();
      expect(ctx.poseEls[0].style.transition).toContain(`${ctx.spring.duration}ms`);
      vi.stubGlobal('matchMedia', () => ({ matches: true }));
      const reducido = built();
      expect(reducido.reduce).toBe(true);
      expect(reducido.poseEls[0].style.transition).toBe('');
    });
  });

  describe('startShapeFx', () => {
    it('una forma sin onda no anima nada', () => {
      const ctx = built();
      expect(ctx.shapeAnims).toEqual([]);
      expect(ctx.shapeTimer).toBeNull();
    });

    it('en un navegador que anima `d`, la onda del fantasma es una animación infinita que va y viene', () => {
      vi.stubGlobal('CSS', { supports: () => true });
      const calls: { frames: Keyframe[]; options: KeyframeAnimationOptions }[] = [];
      const ctx = make({ shape: ghostShape });
      (ctx.el.clip as unknown as { animate: unknown }).animate = (frames: Keyframe[], options: KeyframeAnimationOptions) => {
        calls.push({ frames, options });
        return { cancel: vi.fn() };
      };
      startShapeFx(ctx);
      expect(calls).toHaveLength(1);
      expect(calls[0].frames).toHaveLength(2);
      expect(calls[0].frames[0]['d']).toBe(`path("${ghostShape.d}")`);
      expect(calls[0].options).toMatchObject({ iterations: Infinity, direction: 'alternate' });
      expect(ctx.shapeAnims).toHaveLength(1);
      expect(ctx.shapeTimer).toBeNull();
    });

    it('el pulpo anima sus fotogramas con su propia duración y easing, sin ir y venir', () => {
      vi.stubGlobal('CSS', { supports: () => true });
      const calls: { frames: Keyframe[]; options: KeyframeAnimationOptions }[] = [];
      const ctx = make({ shape: octopusShape });
      (ctx.el.clip as unknown as { animate: unknown }).animate = (frames: Keyframe[], options: KeyframeAnimationOptions) => {
        calls.push({ frames, options });
        return { cancel: vi.fn() };
      };
      startShapeFx(ctx);
      expect(calls[0].frames).toHaveLength(octopusShape.dKeys?.length ?? -1);
      expect(calls[0].options).toMatchObject({ duration: octopusShape.dDur, easing: octopusShape.dEase });
      expect(calls[0].options.direction).toBeUndefined();
    });

    it('sin soporte de `d` animado (Safari) recalcula la onda con un intervalo', () => {
      vi.useFakeTimers();
      const ctx = make({ shape: ghostShape });
      startShapeFx(ctx);
      expect(ctx.shapeTimer).not.toBeNull();
      const antes = ctx.el.clip.getAttribute('d');
      vi.advanceTimersByTime(400);
      expect(ctx.el.clip.getAttribute('d')).not.toBe(antes);
      clearInterval(ctx.shapeTimer!);
    });

    it('con movimiento reducido no arranca nada', () => {
      vi.stubGlobal('matchMedia', () => ({ matches: true }));
      const ctx = built({ shape: ghostShape });
      expect(ctx.shapeAnims).toEqual([]);
      expect(ctx.shapeTimer).toBeNull();
    });

    it('al reconstruir, el intervalo anterior se cancela y no se acumulan', () => {
      vi.useFakeTimers();
      const ctx = make({ shape: ghostShape });
      startShapeFx(ctx);
      const primero = ctx.shapeTimer;
      startShapeFx(ctx);
      expect(ctx.shapeTimer).not.toBe(primero);
      clearInterval(ctx.shapeTimer!);
    });
  });
});
