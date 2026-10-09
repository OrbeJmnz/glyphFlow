import { gfBotKit, type GfBotGestureDef as GestureDef } from 'glyphflow/bots';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  backflipDef, doubleFlipDef, ghostSwoopDef, sideCartwheelDef, sideDodgeDef, spinSquashDef,
} from './acrobatics';
import { frontFlip } from './flip';
import { landingPose, withLanding } from './landing';

const { frameAt, tracksOf } = gfBotKit.motion;
const TAU = Math.PI * 2;
const frames = (def: GestureDef, n = 400) => {
  const tr = tracksOf(def.score);
  return Array.from({ length: n + 1 }, (_, i) => frameAt(def, tr, i / n));
};
const at = (def: GestureDef, t: number) => frameAt(def, tracksOf(def.score), t);

describe.each([
  ['spinSquash', spinSquashDef],
  ['sideDodge', sideDodgeDef],
  ['backflip', backflipDef],
  ['doubleFlip', doubleFlipDef],
  ['sideCartwheel', sideCartwheelDef],
  ['ghostSwoop', ghostSwoopDef],
])('%s', (_n, def) => {
  it('empieza y termina en el mismo sitio y la misma silueta (los giros, módulo una vuelta)', () => {
    for (const t of [0, 1]) {
      const f = at(def(), t);
      expect(f.x).toBeCloseTo(0, 6);
      expect(f.y).toBeCloseTo(0, 6);
      expect(Math.sin((f.roll * Math.PI) / 180)).toBeCloseTo(0, 6);
      expect(Math.cos((f.roll * Math.PI) / 180)).toBeCloseTo(1, 6);
      expect(Math.sin(f.yaw)).toBeCloseTo(0, 6);
      expect(Math.sin(f.pitch)).toBeCloseTo(0, 6);
      expect(f.z).toBeCloseTo(0, 6);
      expect(f.hopX * f.poseX).toBeCloseTo(1, 6);
      expect(f.hopY * f.poseY).toBeCloseTo(1, 6);
      expect(f.spread).toBeCloseTo(0, 6);
      expect(f.drag).toBeCloseTo(0, 6);
      expect(f.gel).toBeCloseTo(0, 6);
    }
  });
  it('no se hunde en el suelo', () => {
    expect(Math.max(...frames(def()).map((f) => f.y))).toBeLessThan(10);
  });
});

describe('spinSquash', () => {
  it('da una vuelta sobre su eje, acelera en el centro y se pasa un poco al frenar', () => {
    const yaw = frames(spinSquashDef()).map((f) => f.yaw);
    expect(Math.max(...yaw)).toBeGreaterThan(TAU);
    const v = (a: number, b: number) => (yaw[b] - yaw[a]) / (b - a);
    expect(v(130, 200)).toBeGreaterThan(v(10, 80));
    expect(Math.min(...yaw)).toBeLessThan(-0.2); // la torsión inicial al revés
  });
});

describe('sideDodge', () => {
  it('se inclina al contrario antes de salir, se pasa de la marca y vuelve', () => {
    const d = sideDodgeDef();
    expect(at(d, 0.12).roll).toBeLessThan(-6);
    expect(at(d, 0.12).x).toBeLessThan(0);
    const xs = frames(d).map((f) => f.x);
    expect(Math.max(...xs)).toBeGreaterThan(40);
    expect(xs.indexOf(Math.max(...xs))).toBeLessThan(250);
    expect(at(d, 0.28).hopX * at(d, 0.28).poseX).toBeGreaterThan(1.1); // estirado en horizontal
  });
  it('la falda se queda atrás: la cizalla llega con retraso', () => {
    expect(sideDodgeDef().field![0].lag).toBeGreaterThanOrEqual(0.08);
  });
});

describe('backflip', () => {
  it('es el mortal hacia ATRÁS en 3D: carga hacia delante (cabeceo +), gira -360° sobre el eje horizontal y se aleja de quien mira', () => {
    const d = backflipDef();
    expect(at(d, 0.12).pitch).toBeGreaterThan(0.1); // se inclina hacia delante para cargar
    const pitch = frames(d).map((f) => f.pitch);
    expect(Math.min(...pitch)).toBeCloseTo(-TAU, 0);
    expect(at(d, 0.52).pitch).toBeCloseTo(-Math.PI, 3);
    expect(at(d, 0.52).z).toBeLessThan(-0.1); // la cabeza se va hacia atrás: el bot se ve más pequeño
  });
  it('no gira en el plano ni se va hacia un lado (es lo contrario del front flip, no su espejo)', () => {
    for (const f of frames(backflipDef())) {
      expect(f.roll).toBe(0);
      expect(f.x).toBeCloseTo(0, 9);
    }
  });
  it('en el aire el cuerpo es rígido: gira entero, sin aplastarse ni deformarse', () => {
    for (const t of [0.4, 0.5, 0.6]) {
      const f = at(backflipDef(), t);
      expect(f.poseX).toBeCloseTo(1, 6);
      expect(f.poseY).toBeCloseTo(1, 6);
      expect(f.spread).toBeCloseTo(0, 6);
      expect(f.drag).toBeCloseTo(0, 6);
      expect(f.gel).toBeCloseTo(0, 6);
    }
  });
});

describe('doubleFlip', () => {
  it('dos vueltas, mucho más alto y con más carga que el front flip', () => {
    const d = doubleFlipDef();
    const f = frames(d);
    expect(Math.max(...f.map((x) => x.roll))).toBeCloseTo(720, 0);
    expect(Math.min(...f.map((x) => x.y))).toBeLessThan(-140);
    const c = at(d, 0.16);
    expect(c.hopY * c.poseY).toBeLessThan(0.84);
    const i = at(d, 0.89);
    expect(i.hopX * i.poseX).toBeGreaterThan(1.15);
    expect(i.hopY * i.poseY).toBeLessThan(0.82);
  });
});

describe('sideCartwheel', () => {
  it('360° en un arco: no gira sobre el mismo punto', () => {
    const f = frames(sideCartwheelDef());
    expect(Math.max(...f.map((x) => x.roll))).toBeGreaterThan(360);
    expect(Math.max(...f.map((x) => x.x))).toBeGreaterThan(20);
    expect(Math.min(...f.map((x) => x.y))).toBeLessThan(-30);
  });
  it('aterriza primero de un lado (sigue inclinado) y oscila lateralmente', () => {
    const d = sideCartwheelDef();
    expect(at(d, 0.86).roll).toBeLessThan(360);
    expect(at(d, 0.86).roll).toBeGreaterThan(340);
    expect(at(d, 0.9).roll).toBeGreaterThan(360);
    expect(at(d, 0.94).roll).toBeLessThan(360);
  });
});

describe('ghostSwoop', () => {
  it('se inclina hacia donde va', () => {
    const f = frames(ghostSwoopDef());
    expect(f[60].x - f[40].x).toBeGreaterThan(0); // va a la derecha
    expect(f[50].roll).toBeGreaterThan(5);
    expect(f[210].x - f[190].x).toBeLessThan(0); // y luego vuelve a la izquierda
    expect(f[200].roll).toBeLessThan(-5);
  });
  it('recorre una S: va a un lado y al otro y vuelve al sitio', () => {
    const xs = frames(ghostSwoopDef()).map((f) => f.x);
    expect(Math.max(...xs)).toBeGreaterThan(40);
    expect(Math.min(...xs)).toBeLessThan(-40);
  });
});

describe('landingPose', () => {
  // `withLanding` agenda la cara de aterrizaje con un temporizador: con el reloj real dispararía DESPUÉS del test, contra un contexto de mentira
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());
  const ctxFalso = () => ({ subTimers: [], hooks: { act: () => undefined } }) as never;

  it('withLanding devuelve la duración del gesto y no toca nada si el gesto no la devuelve', () => {
    expect(withLanding(() => 900, 'happy')(ctxFalso())).toBe(900);
    expect(withLanding(() => undefined, 'happy')(ctxFalso())).toBeUndefined();
  });
  it('se puede encadenar a cualquier gesto y acepta las cuatro poses', () => {
    expect(typeof landingPose).toBe('function');
    for (const p of ['happy', 'proud', 'dizzy', 'surprised'] as const) expect(typeof withLanding(frontFlip, p)).toBe('function');
  });
});
