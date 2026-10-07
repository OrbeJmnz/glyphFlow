import type { EstadoBot, FormaId } from './bots-datos';

/** Lo que el visitante tiene puesto en el escenario: de aquí sale el código que lo reproduce. */
export interface ConfigBot {
  forma: FormaId;
  piel: string;
  /** Cuánto se mueven los gestos (1 = como están escritos). Solo se escribe en el código si es distinta de 1. */
  intensidad?: number;
  /** Un gesto elegido (`frontFlip`…) o `null` si todavía no ha pulsado ninguno. */
  gesto: string | null;
  sigue: boolean;
  toca: boolean;
  /** Si pide el modo IA (`agentReactions`). */
  agente: boolean;
  /** El estado elegido: `working` y `sleeping` traen sus rutinas de `glyphflow/bots/extras`; en reposo no hace falta nada. */
  estado?: EstadoBot;
}

/** `ghost` → `ghostShape`: el nombre con que la librería exporta cada forma. */
const FORMA_EXPORT: Record<FormaId, string> = {
  ghost: 'ghostShape',
  cat: 'catShape',
  octopus: 'octopusShape',
  tofu: 'tofuShape',
  mochi: 'mochiShape',
  robot: 'robotShape',
};

export const nombreForma = (f: FormaId): string => FORMA_EXPORT[f];

/** Quita lo repetido sin cambiar el orden. */
const unicos = (xs: readonly string[]): string[] => xs.filter((x, i) => xs.indexOf(x) === i);

/**
 * El código que reproduce lo que el visitante ve, en dos tamaños: el FRAGMENTO que enseña (la
 * plantilla y las líneas que importan) y el COMPLETO que se pega (con imports y la clase).
 *
 * Solo importa lo que se usa: es la promesa de `glyphflow/bots/gestures` (cada gesto es un objeto
 * suelto), así que el snippet no debe pedir `physicalGestures` cuando alcanza con un gesto.
 */
export function codigoBot(c: ConfigBot): { fragmento: string; completo: string } {
  const forma = nombreForma(c.forma);
  const gestos = unicos([...(c.gesto ? [c.gesto] : []), ...(c.agente ? ['frontFlip'] : [])]);
  const rutinas = !!c.estado && c.estado !== 'idle';

  const atributos = [
    `[shape]="shape"`,
    ...(c.piel && c.forma !== 'robot' ? [`skin="${c.piel}"`] : []),
    ...(rutinas ? [`state="${c.estado}"`, `[extras]="extras"`] : []),
    ...(gestos.length ? [`[gestures]="gestures"`] : []),
    ...(c.agente ? [`[onAgentEvent]="reacciones"`] : []),
    ...(c.sigue ? [`[followPointer]="true"`] : []),
    ...(c.toca ? [`[interactive]="true"`] : []),
  ];

  const miembros = [
    `  protected readonly shape = ${forma};`,
    ...(rutinas ? [`  protected readonly extras = { routines: routinesExtra };`] : []),
    ...(gestos.length ? [`  protected readonly gestures = { ${gestos.join(', ')} };`] : []),
    ...(c.agente ? [`  protected readonly reacciones = agentReactions();`] : []),
  ];

  const importsBots = ['GfBotComponent', forma];
  const importsGestos = [...gestos, ...(c.agente ? ['agentReactions'] : [])];
  const imports = [
    `import { ${importsBots.join(', ')} } from 'glyphflow/bots';`,
    ...(rutinas ? [`import { routinesExtra } from 'glyphflow/bots/extras';`] : []),
    ...(importsGestos.length ? [`import { ${unicos(importsGestos).join(', ')} } from 'glyphflow/bots/gestures';`] : []),
  ];

  const plantilla = `<gf-bot ${atributos.join(' ')} />`;
  // Cómo se llama al bot: en el fragmento es `bot` a secas; en la clase completa, la señal `viewChild`.
  const usar = (bot: string): string[] => [
    ...(c.gesto ? [`${bot}.api?.gesture('${c.gesto}'${c.intensidad !== undefined && c.intensidad !== 1 ? `, { intensity: ${c.intensidad} }` : ''});`] : []),
    ...(c.agente ? [`${bot}.api?.agent('thinking'); // 'thinking' → 'tool' → 'writing' → 'done'`] : []),
  ];

  const fragmento = [plantilla, ...(miembros.length ? ['', ...miembros] : []), ...(usar('bot').length ? ['', ...usar('bot')] : [])].join('\n');

  const hayUso = usar('bot').length > 0;
  const completo = [
    ...imports,
    `import { Component${hayUso ? ', viewChild' : ''} } from '@angular/core';`,
    '',
    '@Component({',
    `  selector: 'app-mascota',`,
    `  imports: [GfBotComponent],`,
    `  template: \`${plantilla}\`,`,
    '})',
    'export class Mascota {',
    ...(hayUso ? [`  protected readonly bot = viewChild(GfBotComponent);`] : []),
    ...miembros,
    ...(hayUso ? ['', '  jugar(): void {', ...usar('this.bot()?').map((l) => `    ${l}`), '  }'] : []),
    '}',
  ].join('\n');

  return { fragmento, completo };
}
