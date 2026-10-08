/**
 * Los snippets de las páginas de documentación, en texto plano.
 *
 * Estaban dentro del `<pre>` del template, escapados a mano (`&#123;`, `&#64;`, `&lt;`). Como cadenas de
 * TS no pasan por el parser de HTML, así que se leen igual que se copian — que es justo lo que el
 * botón de copiar necesita: la cadena real, no texto para mirar.
 */

export const SNIPPET_INSTALAR = `npm i glyphflow`;

export const SNIPPET_PRIMER_ICONO = `import { Component } from '@angular/core';
import { GfIconComponent, bellIcon } from 'glyphflow';

@Component({
  selector: 'app-alert',
  imports: [GfIconComponent],
  template: '<gf-icon [iconDef]="bell" [size]="24" label="Notifications" />',
})
export class Alert {
  protected readonly bell = bellIcon;
}`;

export const SNIPPET_CATALOGO_POR_NOMBRE = `import { provideIconCatalog, ANIMATED_ICONS } from 'glyphflow';

bootstrapApplication(App, {
  providers: [provideIconCatalog(ANIMATED_ICONS)],
});`;

export const SNIPPET_VELOCIDAD = `import { provideGfIcons } from 'glyphflow';

providers: [provideGfIcons({ durationScale: 0.8 })]`;

export const SNIPPET_MORPH = `import { GfIconMorphComponent } from 'glyphflow/morph';

// The binding IS the state: changing [icon] triggers the transition from the previous value.
// <gf-icon-morph [icon]="current()" [size]="32" label="Status" />`;

export const SNIPPET_DECORATIVO_VS_SEMANTICO = `<!-- Decorative: the button already says "Save" -->
<button><gf-icon [iconDef]="save" /> Save</button>

<!-- Semantic: no text, the icon carries the meaning -->
<button><gf-icon [iconDef]="save" label="Save" /></button>`;

/*
 * El mensaje va partido en dos líneas a propósito. En una sola medía 107 caracteres y el bloque
 * pedía 879 px dentro de una caja de 702 a 1366 px de ventana: barra de desplazamiento horizontal
 * dentro del código, que es justo lo que T27 viene a quitar. `snippets:check` lo vigila.
 */
export const SNIPPET_GUARDIA_WINDOW = `if (typeof window !== 'undefined') {
  throw new Error(
    'This smoke test must run without a global \`window\` — if it exists, it proves nothing.',
  );
}`;

// ── Bots (`/docs/bots`) ─────────────────────────────────────────────────────────────────────────────────────

export const SNIPPET_BOTS_INICIO = `import { Component } from '@angular/core';
import { GfBotComponent, catShape } from 'glyphflow/bots';
import { superBounce } from 'glyphflow/bots/gestures';

@Component({
  selector: 'app-mascot',
  imports: [GfBotComponent],
  template: '<gf-bot [shape]="shape" skin="g1" [gestures]="gestures" label="Cat" />',
})
export class Mascot {
  protected readonly shape = catShape;
  protected readonly gestures = { superBounce };
}`;

export const SNIPPET_BOTS_GESTOS = `// bot = viewChild(GfBotComponent)
const run = bot()?.api?.gesture('superBounce', { intensity: 0.7, policy: 'queue' });

await run?.finished;   // 'done' | 'interrupted' | 'ignored' (never rejects)
run?.cancel();         // cut it if it is still running`;

export const SNIPPET_BOTS_PERSONALIZAR = `import { createHatsExtra, defineHat } from 'glyphflow/bots/extras';

const partyCap = defineHat({
  label: 'Party cap',
  draw: (p) => \`<rect class="\${p}-cap" x="-12" y="-14" width="24" height="14" rx="4" fill="#E0457B"/>\`,
});

// <gf-bot [shape]="shape" [palette]="['#FFD6E8', '#FF4F9A', '#7A1049']" hat="partyCap" [extras]="extras" />
const extras = { hats: createHatsExtra({ partyCap }) };   // expose it as a field of your component`;

export const SNIPPET_BOTS_PIEL = `/* <gf-bot class="sunset" [shape]="shape" skin="x-sunset" /> */
gf-bot.sunset {
  --gf-skin-fill: #ff8a5c;   /* body fill */
  --gf-skin-gloss: #fff3d6;  /* soft highlight on top (optional) */
  --gf-skin-edge: #b63a1e;   /* outline (optional) */
  --bot-base: #ff8a5c;       /* hats and toys inherit the --bot-* variables */
  --bot-primary: #ffb48f;
  --bot-shadow: #b63a1e;
}`;

export const SNIPPET_BOTS_IA_VERCEL = `import { bindAgent, vercelAi } from 'glyphflow/bots/ai';

const result = streamText({ model, prompt });   // your code, your key
const run = bindAgent(bot.api, result.fullStream, vercelAi);

await run.done;   // 'finished' | 'error' | 'stopped' (never rejects)
run.stop();       // cut the stream and release the bot`;

export const SNIPPET_BOTS_IA_ANTHROPIC = `import { bindAgent, anthropic } from 'glyphflow/bots/ai';

const stream = client.messages.stream({ model, max_tokens: 1024, messages });   // your code, your key
const run = bindAgent(bot.api, stream, anthropic);`;

export const SNIPPET_BOTS_PUNTERO = `<gf-bot [shape]="shape" [followPointer]="false" />`;
