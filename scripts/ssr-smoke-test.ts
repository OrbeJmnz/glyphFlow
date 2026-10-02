// SSR smoke test — corre server-side (Node, sin jsdom, sin window/document reales) para probar
// que glyphflow no revienta en render de servidor. No es un test de Vitest a propósito: necesita
// un entorno Node genuino (no jsdom, que sí define `window`) para que la prueba signifique algo.
//
// Uso: npm run test:ssr
import '@angular/compiler';
import { Component } from '@angular/core';
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { provideServerRendering, renderApplication } from '@angular/platform-server';
import { MaxIconComponent, bellIcon, provideIconCatalog } from '../dist/glyphflow/fesm2022/glyphflow.mjs';
import { ANIMATED_ICONS } from '../dist/glyphflow/fesm2022/glyphflow.mjs';
import { GfBotComponent, mochiShape } from '../dist/glyphflow/fesm2022/glyphflow-bots.mjs';

if (typeof window !== 'undefined') {
  throw new Error('Este smoke test debe correr sin `window` global — si existe, no prueba nada.');
}

@Component({
  selector: 'app-root',
  imports: [MaxIconComponent, GfBotComponent],
  template: `
    <max-icon [iconDef]="bellIcon" trigger="auto" />
    <max-icon name="check" />
    <gf-bot [shape]="mochi" label="Asistente" />
  `,
})
class SsrTestRoot {
  bellIcon = bellIcon;
  mochi = mochiShape;
}

async function main() {
  const html = await renderApplication(
    (context: BootstrapContext) =>
      bootstrapApplication(
        SsrTestRoot,
        { providers: [provideServerRendering(), provideIconCatalog(ANIMATED_ICONS)] },
        context,
      ),
    { document: '<html><head></head><body><app-root></app-root></body></html>' },
  );

  if (!html.includes('<svg')) {
    throw new Error('El render de servidor no produjo ningún <svg> — algo se rompió en silencio.');
  }
  if (!html.includes('aria-hidden="true"')) {
    throw new Error('Falta el aria-hidden esperado en el SVG decorativo.');
  }

  // El bot: en servidor el host sale vacío (el motor necesita `window`) pero con su rol y nombre accesible.
  if (!html.includes('<gf-bot') || !html.includes('aria-label="Asistente"')) {
    throw new Error('El render de servidor no produjo <gf-bot> con su nombre accesible.');
  }
  if (html.includes('gf-bot-svg"')) {
    throw new Error('El motor de <gf-bot> corrió en el servidor: debe esperar al navegador (afterNextRender).');
  }

  console.log('SSR smoke test OK — glyphflow renderiza sin `window`/`document` reales, sin tronar.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
