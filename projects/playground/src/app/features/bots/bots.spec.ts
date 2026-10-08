import { describe, expect, it } from 'vitest';
import { codigoBot, type ConfigBot } from './bots-codigo';
import { esperaVida, FORMAS, GESTOS, GESTOS_SUELTOS, GRUPOS, gestoSuelto, PIELES } from './bots-datos';

describe('datos de /bots', () => {
  it('son 20 gestos, sin repetir, y cada uno cae en un grupo que existe', () => {
    expect(GESTOS.length).toBe(20);
    expect(new Set(GESTOS.map((g) => g.id)).size).toBe(20);
    for (const g of GESTOS) expect(GRUPOS).toContain(g.grupo);
    for (const grupo of GRUPOS) expect(GESTOS.some((g) => g.grupo === grupo)).toBe(true);
  });

  it('toda forma tiene su tabla de pieles (el robot no ofrece)', () => {
    for (const f of FORMAS) expect(PIELES[f]).toBeDefined();
    expect(PIELES.robot.length).toBe(0);
    for (const f of FORMAS.filter((x) => x !== 'robot')) expect(PIELES[f].length).toBeGreaterThan(2);
  });
});

describe('codigoBot (el snippet que reproduce lo que se ve)', () => {
  const base: ConfigBot = { forma: 'cat', piel: 'g1', gesto: null, sigue: true, toca: false, agente: false };

  it('sin nada elegido solo pide el componente y la forma', () => {
    const { fragmento, completo } = codigoBot(base);
    expect(fragmento).toContain('<gf-bot [shape]="shape" skin="g1" />');
    expect(fragmento).not.toContain('gestures');
    expect(completo).toContain(`import { GfBotComponent, catShape } from 'glyphflow/bots';`);
    expect(completo).not.toContain('glyphflow/bots/gestures');
  });

  it('importa SOLO el gesto elegido, no el paquete entero (la promesa del entry opt-in)', () => {
    const { completo, fragmento } = codigoBot({ ...base, gesto: 'superBounce' });
    expect(completo).toContain(`import { superBounce } from 'glyphflow/bots/gestures';`);
    expect(completo).not.toContain('physicalGestures');
    expect(fragmento).toContain('[gestures]="gestures"');
    expect(fragmento).toContain(`gesture('superBounce')`);
  });

  it('con el modo IA pide agentReactions y un gesto para el festejo', () => {
    const { completo } = codigoBot({ ...base, agente: true });
    expect(completo).toContain('agentReactions');
    expect(completo).toContain('frontFlip');
    expect(completo).toContain('[onAgentEvent]="reacciones"');
    expect(completo).toContain('agentReactions()');
  });

  it('con el modo IA conecta un stream con bindAgent y el adaptador del SDK elegido', () => {
    const vercel = codigoBot({ ...base, agente: true });
    expect(vercel.completo).toContain(`import { bindAgent, vercelAi } from 'glyphflow/bots/ai';`);
    expect(vercel.completo).toContain('bindAgent(api, stream, vercelAi)');
    const anthropic = codigoBot({ ...base, agente: true, proveedor: 'anthropic' });
    expect(anthropic.completo).toContain(`import { bindAgent, anthropic } from 'glyphflow/bots/ai';`);
    expect(anthropic.completo).toContain('bindAgent(api, stream, anthropic)');
    expect(codigoBot(base).completo).not.toContain('glyphflow/bots/ai');
  });

  it('no repite un import y refleja el cursor y el tacto', () => {
    const { completo, fragmento } = codigoBot({ ...base, gesto: 'frontFlip', agente: true, sigue: true, toca: true });
    expect(completo.match(/frontFlip/g)?.length).toBeLessThan(5);
    expect(completo.match(/import \{[^}]*frontFlip[^}]*\} from 'glyphflow\/bots\/gestures'/g)?.length).toBe(1);
    expect(fragmento).not.toContain('followPointer'); // viene encendido: no se escribe
    expect(fragmento).toContain('[interactive]="true"');
    expect(codigoBot({ ...base, sigue: false }).fragmento).toContain('[followPointer]="false"');
  });

  it('el robot no lleva piel; el mochi usa su propia forma', () => {
    expect(codigoBot({ ...base, forma: 'robot', piel: '' }).fragmento).not.toContain('skin=');
    expect(codigoBot({ ...base, forma: 'mochi', piel: 'neu' }).completo).toContain('mochiShape');
  });

  it('en la clase completa usa la señal viewChild, no `bot` a secas', () => {
    const { completo } = codigoBot({ ...base, gesto: 'frontFlip' });
    expect(completo).toContain('viewChild(GfBotComponent)');
    expect(completo).toContain(`this.bot()?.api?.gesture('frontFlip')`);
  });
});

describe('vida del avatar del chat', () => {
  it('espera entre 6 y 11 s entre un gesto suelto y el siguiente', () => {
    expect(esperaVida(0)).toBe(6000);
    expect(esperaVida(0.999)).toBeLessThanOrEqual(11000);
    expect(esperaVida(0.5)).toBe(8500);
  });

  it('todo gesto suelto es uno de los 20 y es ligero (sin saltos ni giros grandes)', () => {
    const ids = new Set(GESTOS.map((g) => g.id));
    for (const g of GESTOS_SUELTOS) expect(ids.has(g)).toBe(true);
    for (const pesado of ['frontFlip', 'backflip', 'doubleFlip', 'tornadoSpin', 'sideCartwheel', 'jellyDrop', 'diveEmerge', 'peekPop'])
      expect(GESTOS_SUELTOS).not.toContain(pesado);
  });

  it('el azar recorre todos y nunca se sale de la lista', () => {
    const vistos = new Set<string>();
    for (let i = 0; i < 100; i++) vistos.add(gestoSuelto(i / 100));
    expect(vistos.size).toBe(GESTOS_SUELTOS.length);
    expect(GESTOS_SUELTOS).toContain(gestoSuelto(0.9999999));
    expect(GESTOS_SUELTOS).toContain(gestoSuelto(0));
  });
});

describe('el código con rutinas', () => {
  const base: ConfigBot = { forma: 'cat', piel: 'g1', gesto: null, sigue: false, toca: false, agente: false };
  it('en reposo no pide nada de extras', () => {
    const { completo } = codigoBot({ ...base, estado: 'idle' });
    expect(completo).not.toContain('glyphflow/bots/extras');
    expect(completo).not.toContain('state=');
  });
  it('trabajando o dormido pide las rutinas y fija el estado', () => {
    for (const estado of ['working', 'sleeping'] as const) {
      const { completo, fragmento } = codigoBot({ ...base, estado });
      expect(completo).toContain(`import { routinesExtra } from 'glyphflow/bots/extras';`);
      expect(fragmento).toContain(`state="${estado}"`);
      expect(fragmento).toContain('[extras]="extras"');
      expect(fragmento).toContain('routines: routinesExtra');
    }
  });
});

describe('el código con intensidad', () => {
  const base: ConfigBot = { forma: 'cat', piel: 'g1', gesto: 'frontFlip', sigue: false, toca: false, agente: false };
  it('con intensidad 1 (o sin ella) el gesto se pide como siempre', () => {
    expect(codigoBot({ ...base, intensidad: 1 }).fragmento).toContain(`gesture('frontFlip');`);
    expect(codigoBot(base).fragmento).toContain(`gesture('frontFlip');`);
  });
  it('con otra intensidad la escribe en la llamada', () => {
    expect(codigoBot({ ...base, intensidad: 0.5 }).fragmento).toContain(`gesture('frontFlip', { intensity: 0.5 });`);
    expect(codigoBot({ ...base, intensidad: 2 }).completo).toContain(`{ intensity: 2 }`);
  });
});

