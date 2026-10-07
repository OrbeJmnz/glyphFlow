import type { GfBotRoutinesExtra, GfBotSleepRoutine, GfBotWorkRoutine } from 'glyphflow/bots';
import { RUN } from './routines-run';
import { WORK } from './work-variants';

/** Cómo se llaman, para quien las muestra, las rutinas de sueño que no se explican solas. */
const ETIQUETA: Partial<Record<GfBotSleepRoutine, string>> = { counting: 'counting sheep', sleepwalking: 'sleepwalking', nearFall: 'almost falling', night: 'starry night' };

/** Las seis rutinas de trabajo (con varias versiones cada una) y las nueve de sueño. */
export const routinesExtra: GfBotRoutinesExtra = {
  play(ctx, state, name) {
    const vs = state === 'working' ? WORK[name as GfBotWorkRoutine] : undefined;
    if (vs) {
      // la siguiente variación de esa rutina
      const i = (ctx.variantIdx[name] = ((ctx.variantIdx[name] ?? -1) + 1) % vs.length);
      vs[i][1](ctx);
      return `${name} · ${vs[i][0]}`;
    }
    RUN[name as keyof typeof RUN](ctx);
    return ETIQUETA[name as GfBotSleepRoutine] || name;
  },
};
