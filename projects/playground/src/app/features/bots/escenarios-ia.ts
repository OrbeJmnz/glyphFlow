/**
 * Los tipos de salida de una IA que el chat de `/bots` sabe simular. No es un agente: es un banco de streams con la FORMA
 * de los reales (nombres de partes del Vercel AI SDK y eventos de la API de Mensajes de Anthropic) que se le pasan a los
 * adaptadores de verdad (`vercelAi`, `anthropic`) y a `bindAgent`. Lo que se ve en la página es exactamente la tubería que
 * usaría quien conecte su propio modelo; aquí solo cambia de dónde sale el stream.
 *
 * Es lógica pura, sin Angular ni DOM, para probarla con relojes falsos.
 *
 * Los escenarios se escriben una vez como «latidos» (`Latido`) independientes del proveedor y se compilan a cada uno: así no se
 * pueden contradecir y añadir un proveedor es añadir una tabla.
 */

export type Proveedor = 'vercel' | 'anthropic';
export const PROVEEDORES: readonly Proveedor[] = ['vercel', 'anthropic'];

export type EscenarioId =
  | 'simple'
  | 'razonamiento'
  | 'herramienta'
  | 'paralelo'
  | 'herramientaFalla'
  | 'aprobacion'
  | 'error'
  | 'abortar';

export const ESCENARIOS: readonly EscenarioId[] = [
  'simple',
  'razonamiento',
  'herramienta',
  'paralelo',
  'herramientaFalla',
  'aprobacion',
  'error',
  'abortar',
];

/** Un evento crudo tal como lo soltaría el SDK. Los adaptadores solo leen `type` (y, en Anthropic, el bloque y el delta). */
export type EventoCrudo = { readonly type: string } & Record<string, unknown>;

/** Un evento y lo que tarda en llegar DESDE el anterior (ms). `texto` marca un trozo de la respuesta, para pintarlo y para `bot.token`. */
export interface Parte {
  readonly evento: EventoCrudo;
  readonly ms: number;
  readonly texto?: string;
}

type Latido =
  | { k: 'inicio' }
  | { k: 'razona' }
  | { k: 'herramientas'; n: number }
  | { k: 'resultado'; n: number; espera?: number }
  | { k: 'falla' }
  | { k: 'aprobacion' }
  | { k: 'texto'; parcial?: boolean }
  | { k: 'fin' }
  | { k: 'error' };

interface Escenario {
  latidos: readonly Latido[];
  /** Si el visitante «corta» a mitad (el escenario `abortar`): a los cuántos ms se llama `stop()`. */
  cortaEnMs?: number;
}

const GUION: Record<EscenarioId, Escenario> = {
  simple: { latidos: [{ k: 'inicio' }, { k: 'texto' }, { k: 'fin' }] },
  razonamiento: { latidos: [{ k: 'inicio' }, { k: 'razona' }, { k: 'texto' }, { k: 'fin' }] },
  herramienta: {
    latidos: [{ k: 'inicio' }, { k: 'herramientas', n: 1 }, { k: 'resultado', n: 1 }, { k: 'texto' }, { k: 'fin' }],
  },
  paralelo: {
    latidos: [{ k: 'inicio' }, { k: 'herramientas', n: 2 }, { k: 'resultado', n: 2 }, { k: 'texto' }, { k: 'fin' }],
  },
  herramientaFalla: {
    latidos: [{ k: 'inicio' }, { k: 'herramientas', n: 1 }, { k: 'falla' }, { k: 'texto' }, { k: 'fin' }],
  },
  aprobacion: {
    latidos: [
      { k: 'inicio' },
      { k: 'herramientas', n: 1 },
      { k: 'aprobacion' },
      { k: 'resultado', n: 1, espera: 2800 },
      { k: 'texto' },
      { k: 'fin' },
    ],
  },
  error: { latidos: [{ k: 'inicio' }, { k: 'razona' }, { k: 'texto', parcial: true }, { k: 'error' }] },
  abortar: { latidos: [{ k: 'inicio' }, { k: 'texto' }], cortaEnMs: 2600 },
};

/** Cuánto tarda en soltarse cada palabra de la respuesta (ms): el ritmo de un modelo que escribe. */
export const PALABRA_MS = 130;

/** A los cuántos ms se corta el escenario `abortar` (0 = no se corta solo). */
export const corteDe = (id: EscenarioId): number => GUION[id].cortaEnMs ?? 0;

const ev = (type: string, extra: Record<string, unknown> = {}): EventoCrudo => ({ type, ...extra });
const parte = (ms: number, evento: EventoCrudo, texto?: string): Parte => (texto === undefined ? { ms, evento } : { ms, evento, texto });

/** Cuántas palabras de la respuesta se sueltan antes de que el error parta el stream. */
const PALABRAS_ANTES_DE_FALLAR = 7;

/** Compila un latido a las partes del Vercel AI SDK 5+ (`result.fullStream`). */
function vercel(l: Latido, palabras: readonly string[]): Parte[] {
  switch (l.k) {
    case 'inicio':
      return [parte(700, ev('start')), parte(0, ev('start-step'))];
    case 'razona':
      return [
        parte(600, ev('reasoning-start', { id: 'r1' })),
        ...[0, 1, 2, 3].map((i) => parte(350, ev('reasoning-delta', { id: 'r1', delta: `paso ${i + 1} ` }))),
        parte(0, ev('reasoning-end', { id: 'r1' })),
      ];
    case 'herramientas':
      return Array.from({ length: l.n }, (_, i) => [
        parte(i === 0 ? 900 : 150, ev('tool-input-start', { toolCallId: `c${i}`, toolName: 'pesoDelIcono' })),
        parte(250, ev('tool-call', { toolCallId: `c${i}`, toolName: 'pesoDelIcono', input: {} })),
      ]).flat();
    case 'resultado':
      return [
        ...Array.from({ length: l.n }, (_, i) => parte(i === 0 ? (l.espera ?? 1000) : 200, ev('tool-result', { toolCallId: `c${i}`, output: {} }))),
        parte(0, ev('finish-step')),
        parte(500, ev('start-step')),
      ];
    case 'falla':
      // La herramienta falla pero el AGENTE sigue (el modelo recibe el error y contesta): no es `error` del stream.
      return [parte(1000, ev('tool-error', { toolCallId: 'c0', errorText: 'timeout' })), parte(0, ev('finish-step')), parte(500, ev('start-step'))];
    case 'aprobacion':
      // Espera a una persona: el bot se queda en «esperando» el rato que tarde en aprobar.
      return [parte(900, ev('tool-approval-request', { approvalId: 'a1', toolCallId: 'c0' }))];
    case 'texto': {
      const dichas = l.parcial ? palabras.slice(0, PALABRAS_ANTES_DE_FALLAR) : palabras;
      return [
        parte(500, ev('text-start', { id: 't1' })),
        ...dichas.map((w, i) => parte(PALABRA_MS, ev('text-delta', { id: 't1', delta: w }), i === 0 ? w : ` ${w}`)),
        ...(l.parcial ? [] : [parte(0, ev('text-end', { id: 't1' }))]),
      ];
    }
    case 'fin':
      return [parte(0, ev('finish-step')), parte(300, ev('finish', { finishReason: 'stop' }))];
    case 'error':
      return [parte(600, ev('error', { errorText: 'overloaded' }))];
  }
}

/** Compila un latido a eventos de la API de Mensajes de Anthropic (`client.messages.stream`). */
function anthropic(l: Latido, palabras: readonly string[]): Parte[] {
  switch (l.k) {
    case 'inicio':
      return [parte(700, ev('message_start'))];
    case 'razona':
      return [
        parte(400, ev('content_block_start', { content_block: { type: 'thinking' } })),
        ...[0, 1, 2, 3].map((i) =>
          parte(350, ev('content_block_delta', { delta: { type: 'thinking_delta', thinking: `paso ${i + 1} ` } })),
        ),
        parte(0, ev('content_block_stop')),
      ];
    case 'herramientas':
      // Varios bloques `tool_use` en UN mensaje = herramientas en paralelo. El mensaje se cierra con `stop_reason: tool_use`:
      // eso NO es el final, el agente corre la herramienta y pide otro mensaje (lo hace el latido `resultado`).
      return [
        ...Array.from({ length: l.n }, (_, i) => [
          parte(i === 0 ? 900 : 150, ev('content_block_start', { content_block: { type: 'tool_use', name: 'pesoDelIcono' } })),
          parte(250, ev('content_block_delta', { delta: { type: 'input_json_delta', partial_json: '{}' } })),
          parte(0, ev('content_block_stop')),
        ]).flat(),
        parte(200, ev('message_delta', { delta: { stop_reason: 'tool_use' } })),
        parte(0, ev('message_stop')),
      ];
    case 'resultado':
      // La herramienta corre de TU lado: no hay evento. Lo que se ve es el siguiente mensaje (una petición nueva).
      return [parte(l.espera ?? 1000, ev('message_start'))];
    case 'falla':
      // Un fallo de la herramienta viaja al modelo como `tool_result` con `is_error`: tampoco es un evento del stream.
      return [parte(1000, ev('message_start'))];
    case 'aprobacion':
      // Anthropic no tiene un evento de aprobación: pedirla es cosa tuya, ANTES de correr la herramienta. El stream ya se cerró con
      // `stop_reason: tool_use` y el bot se queda en «herramienta» hasta que llega el siguiente mensaje (la espera va en `resultado`).
      return [];
    case 'texto': {
      const dichas = l.parcial ? palabras.slice(0, PALABRAS_ANTES_DE_FALLAR) : palabras;
      return [
        parte(500, ev('content_block_start', { content_block: { type: 'text' } })),
        ...dichas.map((w, i) =>
          parte(PALABRA_MS, ev('content_block_delta', { delta: { type: 'text_delta', text: w } }), i === 0 ? w : ` ${w}`),
        ),
        ...(l.parcial ? [] : [parte(0, ev('content_block_stop'))]),
      ];
    }
    case 'fin':
      return [parte(200, ev('message_delta', { delta: { stop_reason: 'end_turn' } })), parte(300, ev('message_stop'))];
    case 'error':
      return [parte(600, ev('error', { error: { type: 'overloaded_error', message: 'Overloaded' } }))];
  }
}

/** El stream del escenario `id` con la forma del proveedor `p`. `palabras` es la respuesta, ya partida. */
export function partes(id: EscenarioId, p: Proveedor, palabras: readonly string[]): Parte[] {
  const compilar = p === 'vercel' ? vercel : anthropic;
  return GUION[id].latidos.flatMap((l) => compilar(l, palabras));
}

/**
 * Un reloj que se puede cortar. `dormir` espera `ms`; `cortar` despierta a quien esté esperando y a partir de ahí todo `dormir`
 * vuelve al instante con `cortado` en `true`. Sin esto, cortar un stream a media espera dejaba vivo un temporizador hablándole
 * a un bot que ya soltó la corrida.
 */
export interface Reloj {
  dormir(ms: number): Promise<void>;
  cortar(): void;
  readonly cortado: boolean;
}

export function crearReloj(
  programar: (fn: () => void, ms: number) => unknown = (fn, ms) => setTimeout(fn, ms),
  cancelar: (id: unknown) => void = (id) => clearTimeout(id as ReturnType<typeof setTimeout>),
): Reloj {
  let id: unknown = null;
  let despertar: (() => void) | null = null;
  let cortado = false;
  return {
    dormir: (ms) =>
      cortado || ms <= 0
        ? Promise.resolve()
        : new Promise<void>((r) => {
            despertar = r;
            id = programar(() => {
              despertar = null;
              r();
            }, ms);
          }),
    cortar: () => {
      cortado = true;
      if (id !== null) cancelar(id);
      despertar?.();
      despertar = null;
    },
    get cortado() {
      return cortado;
    },
  };
}

/** Reproduce las partes como un `AsyncIterable` (lo que espera `bindAgent`), respetando el ritmo y cortándose con el reloj. */
export async function* flujo(lista: readonly Parte[], reloj: Reloj, alParte?: (p: Parte) => void): AsyncGenerator<EventoCrudo> {
  for (const p of lista) {
    await reloj.dormir(p.ms);
    if (reloj.cortado) return;
    alParte?.(p);
    yield p.evento;
  }
}
