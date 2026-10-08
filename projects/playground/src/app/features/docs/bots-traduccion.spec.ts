import { describe, expect, it } from 'vitest';
import { FILAS_TRADUCCION } from './bots-traduccion';

const paso = (sdk: string, crudo: string) => FILAS_TRADUCCION.find((f) => f.sdk === sdk && f.crudo === crudo)?.paso;

describe('tabla de traducción de /docs/bots', () => {
  it('cada fila sale de correr el adaptador, y estas son las que más sorprenden', () => {
    // Pedir aprobación a una persona NO tiene paso propio: el bot solo espera.
    expect(paso('vercel', 'tool-approval-request')).toBe('loading');
    // Una herramienta que falla NO es un error del agente: el modelo recibe el fallo y sigue.
    expect(paso('vercel', 'tool-error')).toBeNull();
    expect(paso('vercel', 'tool-result')).toBeNull();
    expect(paso('vercel', 'error')).toBe('error');
    expect(paso('vercel', 'abort')).toBe('idle');
    // En Anthropic, un mensaje que cierra con `tool_use` NO termina el turno; con `end_turn` sí.
    expect(paso('anthropic', 'message_stop (stop_reason: tool_use)')).toBeNull();
    expect(paso('anthropic', 'message_stop (stop_reason: end_turn)')).toBe('done');
    expect(paso('anthropic', 'message_start')).toBe('thinking');
  });

  it('no repite una fila y cubre los dos SDK', () => {
    const claves = FILAS_TRADUCCION.map((f) => `${f.sdk}/${f.crudo}`);
    expect(new Set(claves).size).toBe(claves.length);
    expect(new Set(FILAS_TRADUCCION.map((f) => f.sdk))).toEqual(new Set(['vercel', 'anthropic']));
  });
});
