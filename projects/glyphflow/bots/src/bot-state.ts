/**
 * Los tres estados largos de un bot: en reposo, trabajando (rutinas de pensar, escribir, cargar…)
 * y dormido. Es lo primero que fija el entry point porque TODO lo demás cuelga de aquí: el motor
 * decide la respiración, la cara y las rutinas por estado, y `agent()` solo traduce eventos del
 * agente a uno de estos tres.
 *
 * Tipos puros, CERO imports de Angular — igual que `animated-icon.model.ts` en el primario.
 */
export type GfBotState = 'idle' | 'working' | 'sleeping';

/** Los estados en el orden en que se documentan. `as const` para que el tipo salga de aquí. */
export const GF_BOT_STATES: readonly GfBotState[] = ['idle', 'working', 'sleeping'] as const;

/** `true` si `value` es un estado válido — para inputs que llegan como string desde una plantilla. */
export const isGfBotState = (value: unknown): value is GfBotState =>
  typeof value === 'string' && (GF_BOT_STATES as readonly string[]).includes(value);
