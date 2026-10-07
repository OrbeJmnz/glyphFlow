import { ROUTINES, STATE_LABEL } from './routines';
import { GF_BOT_STATES } from '../bot-state';
import { TAU, S, clamp01, easeInOut } from '../engine/math';

describe('glyphflow/bots · matemática', () => {
  it('easeInOut arranca en 0, termina en 1 y es simétrica en el medio', () => {
    expect(easeInOut(0)).toBe(0);
    expect(easeInOut(1)).toBe(1);
    expect(easeInOut(0.5)).toBeCloseTo(0.5, 10);
  });
  it('clamp01 recorta y S arma el scale', () => {
    expect([clamp01(-3), clamp01(0.4), clamp01(9)]).toEqual([0, 0.4, 1]);
    expect(S(2)).toBe('scale(2,2)');
    expect(S(2, 3)).toBe('scale(2,3)');
    expect(TAU).toBeCloseTo(6.283185, 5);
  });
});

describe('glyphflow/bots · estados y rutinas', () => {
  it('hay una etiqueta por cada estado y las rutinas solo existen para los largos', () => {
    expect(Object.keys(STATE_LABEL)).toEqual([...GF_BOT_STATES]);
    expect(ROUTINES.working.length).toBe(6);
    expect(ROUTINES.sleeping.length).toBe(9);
  });
});
