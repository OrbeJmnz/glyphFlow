import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { GfBotAgentEvent } from 'glyphflow/bots';
import { anthropic, bindAgent, vercelAi, type GfAgentAdapter, type GfAgentEnd } from 'glyphflow/bots/ai';
import { ESCENARIOS, PROVEEDORES, corteDe, crearReloj, flujo, partes, type EscenarioId, type EventoCrudo, type Proveedor } from './escenarios-ia';

const PALABRAS = 'una respuesta de ocho palabras que se va soltando poco a poco'.split(' ');
const ADAPTADORES: Record<Proveedor, GfAgentAdapter<EventoCrudo>> = { vercel: vercelAi, anthropic };

/** Corre un escenario por la tubería REAL (adaptador + `bindAgent`) y devuelve los pasos que vio el bot y cómo terminó. */
async function correr(id: EscenarioId, p: Proveedor): Promise<{ pasos: GfBotAgentEvent[]; fin: GfAgentEnd }> {
  const pasos: GfBotAgentEvent[] = [];
  const reloj = crearReloj();
  const run = bindAgent({ agent: (e) => pasos.push(e) }, flujo(partes(id, p, PALABRAS), reloj), ADAPTADORES[p]);
  if (corteDe(id)) {
    await vi.advanceTimersByTimeAsync(corteDe(id));
    run.stop();
    reloj.cortar();
  }
  let fin: GfAgentEnd | undefined;
  void run.done.then((f) => (fin = f));
  for (let i = 0; i < 400 && fin === undefined; i++) await vi.advanceTimersByTimeAsync(100);
  return { pasos, fin: fin as GfAgentEnd };
}

/**
 * Lo que ve el bot en cada escenario. Es la traducción real de cada SDK, no un guion escrito a mano: si un adaptador cambia lo que
 * hace con un evento, este spec lo dice. Dos cosas que conviene notar: la aprobación humana de Vercel es un `loading` (el bot espera,
 * no hay un paso propio), y en Anthropic cada petición nueva del bucle de herramientas empieza con un `message_start` = `thinking`.
 */
const ESPERADO: Record<Proveedor, Record<EscenarioId, { pasos: GfBotAgentEvent[]; fin: GfAgentEnd }>> = {
  vercel: {
    simple: { pasos: ['prompt', 'loading', 'writing', 'done'], fin: 'finished' },
    razonamiento: { pasos: ['prompt', 'loading', 'thinking', 'writing', 'done'], fin: 'finished' },
    herramienta: { pasos: ['prompt', 'loading', 'tool', 'loading', 'writing', 'done'], fin: 'finished' },
    paralelo: { pasos: ['prompt', 'loading', 'tool', 'loading', 'writing', 'done'], fin: 'finished' },
    herramientaFalla: { pasos: ['prompt', 'loading', 'tool', 'loading', 'writing', 'done'], fin: 'finished' },
    aprobacion: { pasos: ['prompt', 'loading', 'tool', 'loading', 'writing', 'done'], fin: 'finished' },
    error: { pasos: ['prompt', 'loading', 'thinking', 'writing', 'error'], fin: 'error' },
    abortar: { pasos: ['prompt', 'loading', 'writing', 'idle'], fin: 'stopped' },
  },
  anthropic: {
    simple: { pasos: ['prompt', 'thinking', 'writing', 'done'], fin: 'finished' },
    razonamiento: { pasos: ['prompt', 'thinking', 'writing', 'done'], fin: 'finished' },
    herramienta: { pasos: ['prompt', 'thinking', 'tool', 'thinking', 'writing', 'done'], fin: 'finished' },
    paralelo: { pasos: ['prompt', 'thinking', 'tool', 'thinking', 'writing', 'done'], fin: 'finished' },
    herramientaFalla: { pasos: ['prompt', 'thinking', 'tool', 'thinking', 'writing', 'done'], fin: 'finished' },
    aprobacion: { pasos: ['prompt', 'thinking', 'tool', 'thinking', 'writing', 'done'], fin: 'finished' },
    error: { pasos: ['prompt', 'thinking', 'writing', 'error'], fin: 'error' },
    abortar: { pasos: ['prompt', 'thinking', 'writing', 'idle'], fin: 'stopped' },
  },
};

describe('escenarios de IA del chat', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  for (const p of PROVEEDORES) {
    for (const id of ESCENARIOS) {
      it(`${p} · ${id}: el bot ve los pasos esperados y la corrida termina como se espera`, async () => {
        const r = await correr(id, p);
        expect(r.pasos).toEqual(ESPERADO[p][id].pasos);
        expect(r.fin).toBe(ESPERADO[p][id].fin);
      });
    }
  }

  it('cubre todos los escenarios en los dos proveedores (si se añade uno, hay que decir qué debe ver el bot)', () => {
    for (const p of PROVEEDORES) expect(Object.keys(ESPERADO[p]).sort()).toEqual([...ESCENARIOS].sort());
  });

  it('el texto sale en trozos que, juntos, son la respuesta (y parcial si el stream falla)', () => {
    for (const p of PROVEEDORES) {
      const completo = partes('simple', p, PALABRAS)
        .map((x) => x.texto ?? '')
        .join('');
      expect(completo).toBe(PALABRAS.join(' '));
      const parcial = partes('error', p, PALABRAS)
        .map((x) => x.texto ?? '')
        .join('');
      expect(parcial.length).toBeGreaterThan(0);
      expect(parcial.length).toBeLessThan(completo.length);
    }
  });

  it('solo `abortar` se corta solo', () => {
    expect(ESCENARIOS.filter((e) => corteDe(e) > 0)).toEqual(['abortar']);
  });

  it('los eventos de herramientas en paralelo llegan en UN mensaje (Anthropic: un solo message_start antes de las herramientas)', () => {
    const tipos = partes('paralelo', 'anthropic', PALABRAS).map((x) => x.evento.type);
    expect(tipos.slice(0, 1)).toEqual(['message_start']);
    expect(tipos.filter((t) => t === 'content_block_start').length).toBeGreaterThanOrEqual(2);
  });
});

describe('el reloj cortable', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('cortar despierta al que espera y deja el reloj muerto', async () => {
    const reloj = crearReloj();
    let despertó = false;
    void reloj.dormir(10_000).then(() => (despertó = true));
    reloj.cortar();
    await vi.advanceTimersByTimeAsync(0);
    expect(despertó).toBe(true);
    expect(reloj.cortado).toBe(true);
    await expect(reloj.dormir(10_000)).resolves.toBeUndefined();
  });

  it('un flujo cortado se acaba sin soltar más eventos', async () => {
    const reloj = crearReloj();
    const vistos: string[] = [];
    const it = flujo(partes('simple', 'vercel', PALABRAS), reloj, () => undefined);
    const lectura = (async () => {
      for await (const e of it) {
        vistos.push(e.type);
        if (vistos.length === 2) reloj.cortar();
      }
    })();
    await vi.advanceTimersByTimeAsync(5000);
    await lectura;
    expect(vistos).toEqual(['start', 'start-step']);
  });
});
