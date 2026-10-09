import type { GfBotAgentEvent } from 'glyphflow/bots';
import { anthropic, vercelAi, type GfAgentAdapter } from 'glyphflow/bots/ai';
import { corteDe, partes, type EscenarioId, type EventoCrudo, type Proveedor } from './escenarios-ia';

/**
 * Lo que VA a pasar al correr un escenario, calculado de antemano con los mismos adaptadores. El chat lo usa para pintar el riel
 * y la traza completos y apagados antes de pulsar «Enviar» (el visitante ve el mecanismo sin tener que esperarlo) y para que lo que
 * llega solo los vaya encendiendo: la lista ya no crece con cada evento, así que no empuja el resto de la página.
 *
 * No inventa nada: `planDe` corre el adaptador de verdad sobre las partes del escenario y aplica las mismas reglas que `bindAgent`
 * (avisa `prompt` al arrancar, colapsa pasos repetidos, cierra con `done` si el stream se agota sin un final). El spec lo compara
 * con una corrida real de punta a punta.
 *
 * Es lógica pura, sin Angular ni DOM.
 */

const ADAPTADORES: Record<Proveedor, GfAgentAdapter<EventoCrudo>> = { vercel: vercelAi, anthropic };
const TERMINAL: readonly GfBotAgentEvent[] = ['done', 'error', 'idle'];

/** Una línea de la traza: lo que mandó el SDK (repetido seguido = un renglón con ×n) y a qué paso lo tradujo el adaptador. */
export interface LineaTraza {
  crudo: string;
  paso: GfBotAgentEvent | null;
  n: number;
}

export interface Plan {
  pasos: GfBotAgentEvent[];
  traza: LineaTraza[];
}

export function planDe(id: EscenarioId, p: Proveedor, palabras: readonly string[]): Plan {
  const leer = ADAPTADORES[p]();
  const corte = corteDe(id);
  const pasos: GfBotAgentEvent[] = ['prompt'];
  const traza: LineaTraza[] = [];
  let ultimo: GfBotAgentEvent = 'prompt';
  let reloj = 0;
  let cortado = false;

  for (const parte of partes(id, p, palabras)) {
    reloj += parte.ms;
    // Un escenario que se corta solo (`abortar`) llega hasta ese instante: lo que el stream iba a mandar después no ocurre.
    if (corte && reloj > corte) {
      cortado = true;
      break;
    }
    const paso = leer(parte.evento) ?? null;
    const prev = traza[traza.length - 1];
    if (prev && prev.crudo === parte.evento.type) prev.n++;
    else traza.push({ crudo: parte.evento.type, paso, n: 1 });
    if (paso && paso !== ultimo) {
      pasos.push(paso);
      ultimo = paso;
    }
  }

  if (cortado) pasos.push('idle');
  else if (!TERMINAL.includes(ultimo)) pasos.push('done');
  return { pasos, traza };
}
