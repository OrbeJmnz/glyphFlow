// Usado por el job angular-compat de CI: recibe la ruta de una app Angular recién generada con
// `ng new` (cualquier versión — 20/21/22 usan la misma convención de archivo raíz standalone) y
// la reescribe para que use `<max-icon [iconDef]="bellIcon">`. Deliberadamente NO usa
// `provideIconCatalog`/`name=` aquí: eso ya está cubierto por los tests dentro del propio
// workspace de glyphflow — esta prueba es sobre el consumidor real (instala el .tgz, importa,
// compila, renderiza SSR), no sobre repetir la cobertura interna.
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const appDir = process.argv[2];
if (!appDir) {
  console.error('Uso: node wire-consumer-app.mjs <ruta-de-la-app>');
  process.exit(1);
}

const candidates = ['app.ts', 'app.component.ts'];
const found = candidates.find((f) => existsSync(join(appDir, 'src', 'app', f)));
if (!found) {
  console.error(`No encontré ni ${candidates.join(' ni ')} en ${appDir}/src/app — el scaffold de esta versión de Angular cambió su convención de nombres.`);
  process.exit(1);
}
const isComponentSuffix = found === 'app.component.ts';
const htmlFile = isComponentSuffix ? 'app.component.html' : 'app.html';

// Sin `styleUrl` a propósito: `ng new --minimal` no genera un .css por componente (reproducido
// local: NG2008 "Could not find stylesheet file" si se referencia uno que no existe). No
// necesitamos estilos para esta prueba, así que evitamos la suposición por completo.
writeFileSync(
  join(appDir, 'src', 'app', found),
  `import { Component } from '@angular/core';
import { MaxIconComponent, bellIcon } from 'glyphflow';

@Component({
  selector: 'app-root',
  imports: [MaxIconComponent],
  templateUrl: './${htmlFile}',
})
export class App {
  protected readonly bellIcon = bellIcon;
}
`,
  'utf8',
);

writeFileSync(
  join(appDir, 'src', 'app', htmlFile),
  `<max-icon [iconDef]="bellIcon" trigger="auto" />\n`,
  'utf8',
);

console.log(`Wired: ${found} + ${htmlFile} en ${appDir} para consumir glyphflow.`);
