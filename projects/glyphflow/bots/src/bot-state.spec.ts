import { GF_BOT_STATES, isGfBotState } from './bot-state';

describe('glyphflow/bots · estados', () => {
  it('expone los tres estados en orden', () => {
    expect(GF_BOT_STATES).toEqual(['idle', 'working', 'sleeping']);
  });

  it('reconoce los estados válidos y rechaza el resto', () => {
    for (const s of GF_BOT_STATES) expect(isGfBotState(s)).toBe(true);
    expect(isGfBotState('dancing')).toBe(false);
    expect(isGfBotState(undefined)).toBe(false);
    expect(isGfBotState(1)).toBe(false);
  });
});
