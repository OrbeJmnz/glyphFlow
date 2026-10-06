/**
 * Un agente de mentira para la demo del chat: no llama a ningún modelo, recorre un guion con los
 * mismos pasos que un agente de verdad le avisaría al bot (`prompt`, `thinking`, `tool`, `loading`,
 * `writing`, y `done` o `error`) y suelta la respuesta palabra por palabra.
 *
 * Es lógica pura, sin Angular ni DOM, para poder probarla con relojes falsos. La página solo la
 * conecta a las señales y al bot.
 */

export type PasoAgente = 'prompt' | 'thinking' | 'tool' | 'loading' | 'writing' | 'done' | 'error';

export interface PasoGuion {
  evento: PasoAgente;
  /** Cuánto se queda en este paso antes de pasar al siguiente (ms). */
  ms: number;
}

/** Lo que tarda en soltarse cada palabra de la respuesta (ms): el ritmo de un modelo que escribe. */
export const PALABRA_MS = 130;

/**
 * El guion. Con error el agente falla al usar la herramienta, como pasa de verdad: no hay `loading`
 * ni `writing`, se salta directo a `error`.
 */
export function guion(conError: boolean): readonly PasoGuion[] {
  return conError
    ? [
        { evento: 'prompt', ms: 700 },
        { evento: 'thinking', ms: 1500 },
        { evento: 'tool', ms: 1800 },
        { evento: 'error', ms: 0 },
      ]
    : [
        { evento: 'prompt', ms: 700 },
        { evento: 'thinking', ms: 1500 },
        { evento: 'tool', ms: 1600 },
        { evento: 'loading', ms: 1100 },
        { evento: 'writing', ms: 0 },
        { evento: 'done', ms: 0 },
      ];
}

export interface GanchosAgente {
  /** Se llama al entrar en cada paso: aquí se le avisa al bot (`bot.agent(evento)`). */
  evento: (e: PasoAgente) => void;
  /** Una palabra de la respuesta, mientras dura `writing` (`bot.token(palabra)` y a la pantalla). */
  palabra: (p: string) => void;
  /** Terminó (bien o mal). */
  fin: (resultado: 'done' | 'error') => void;
}

type Programar = (fn: () => void, ms: number) => unknown;
type Cancelar = (id: unknown) => void;

/**
 * Corre el guion. Devuelve la función que lo corta (el visitante pulsó otra vez, o se fue de la
 * página): sin ella un temporizador vivo seguiría hablándole a un bot que ya no existe.
 *
 * `programar` y `cancelar` se inyectan para que el spec controle el tiempo sin depender de un
 * reloj global.
 */
export function correrGuion(
  conError: boolean,
  palabras: readonly string[],
  g: GanchosAgente,
  programar: Programar = (fn, ms) => setTimeout(fn, ms),
  cancelar: Cancelar = (id) => clearTimeout(id as ReturnType<typeof setTimeout>),
): () => void {
  let id: unknown = null;
  let vivo = true;
  const pasos = guion(conError);

  const paso = (i: number): void => {
    if (!vivo) return;
    const p = pasos[i];
    g.evento(p.evento);
    if (p.evento === 'done' || p.evento === 'error') {
      g.fin(p.evento);
      return;
    }
    if (p.evento === 'writing') {
      escribir(0, i);
      return;
    }
    id = programar(() => paso(i + 1), p.ms);
  };

  const escribir = (n: number, i: number): void => {
    if (!vivo) return;
    if (n >= palabras.length) {
      id = programar(() => paso(i + 1), PALABRA_MS * 3); // un respiro antes de cerrar
      return;
    }
    g.palabra(palabras[n]);
    id = programar(() => escribir(n + 1, i), PALABRA_MS);
  };

  paso(0);
  return () => {
    vivo = false;
    if (id !== null) cancelar(id);
  };
}
