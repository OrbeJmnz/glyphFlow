// Genera los proyectos de `examples/`, uno por patrón de la página Patterns.
//
// Existen por el punto 7 de T20 («Abrir en StackBlitz» por patrón), pero la razón de fondo es más
// fuerte que el botón: son proyectos REALES, así que el criterio «compila pegado tal cual» deja de
// ser una promesa del snippet y pasa a ser algo que se compila. El enlace es una URL a
// stackblitz.com/github/…, sin dependencia nueva ni POST con un payload que nadie puede validar.
//
// La fuente de verdad es `snippets.ts`; esto los deriva. Un `--check` compara lo generado contra lo
// commiteado, para que no puedan divergir en silencio — el modo de falla que ya mordió dos veces
// hoy (el README en español y las cifras de bundle).
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import * as SNIPPETS from '../projects/playground/src/app/features/patrones/snippets.ts';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const leerJson = (p: string) => JSON.parse(readFileSync(join(RAIZ, p), 'utf8'));

const VERSION: string = leerJson('projects/glyphflow/package.json').version;
const ANGULAR: string = leerJson('package.json').dependencies['@angular/core'];

interface Ejemplo {
  dir: string;
  clase: string;
  selector: string;
  titulo: string;
  fuente: string;
}

export const EJEMPLOS: Ejemplo[] = [
  {
    dir: 'copy-button',
    clase: 'CopyButton',
    selector: 'app-copy-button',
    titulo: 'Copy to clipboard',
    fuente: SNIPPETS.SNIPPET_COPIAR_COMPLETO,
  },
  {
    dir: 'theme-toggle',
    clase: 'ThemeToggle',
    selector: 'app-theme-toggle',
    titulo: 'Theme toggle',
    fuente: SNIPPETS.SNIPPET_TEMA_COMPLETO,
  },
  {
    dir: 'send-button',
    clase: 'SendButton',
    selector: 'app-send-button',
    titulo: 'Three-state send',
    fuente: SNIPPETS.SNIPPET_ENVIAR_COMPLETO,
  },
  {
    dir: 'like-button',
    clase: 'LikeButton',
    selector: 'app-like-button',
    titulo: 'Reaction',
    fuente: SNIPPETS.SNIPPET_REACCION_COMPLETO,
  },
];

function archivosDe(e: Ejemplo): Record<string, string> {
  return {
    [`src/${e.dir}.ts`]: e.fuente + '\n',
    'src/main.ts':
      `import { bootstrapApplication } from '@angular/platform-browser';\n` +
      `import { ${e.clase} } from './${e.dir}';\n\n` +
      `bootstrapApplication(${e.clase});\n`,
    'index.html':
      `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n` +
      `    <title>glyphflow — ${e.titulo}</title>\n  </head>\n  <body>\n` +
      `    <${e.selector}></${e.selector}>\n` +
      `    <script type="module" src="/src/main.ts"></script>\n  </body>\n</html>\n`,
    'package.json':
      JSON.stringify(
        {
          name: `glyphflow-example-${e.dir}`,
          private: true,
          description: `glyphflow — ${e.titulo}`,
          scripts: { dev: 'vite', build: 'vite build' },
          dependencies: {
            '@angular/common': ANGULAR,
            '@angular/compiler': ANGULAR,
            '@angular/core': ANGULAR,
            '@angular/platform-browser': ANGULAR,
            glyphflow: `^${VERSION}`,
            rxjs: '^7.8.0',
          },
          devDependencies: {
            '@analogjs/vite-plugin-angular': '^1.10.0',
            typescript: '~5.9.0',
            vite: '^6.0.0',
          },
        },
        null,
        2,
      ) + '\n',
    'vite.config.ts':
      `import angular from '@analogjs/vite-plugin-angular';\n` +
      `import { defineConfig } from 'vite';\n\n` +
      `export default defineConfig({ plugins: [angular()] });\n`,
    'tsconfig.json':
      JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2022',
            module: 'ES2022',
            moduleResolution: 'bundler',
            strict: true,
            experimentalDecorators: true,
            skipLibCheck: true,
            types: [],
          },
          include: ['src'],
        },
        null,
        2,
      ) + '\n',
  };
}

const comprobar = process.argv.includes('--check');
const desincronizados: string[] = [];
let escritos = 0;

for (const e of EJEMPLOS) {
  for (const [relativo, contenido] of Object.entries(archivosDe(e))) {
    const destino = join(RAIZ, 'examples', e.dir, relativo);
    if (comprobar) {
      const actual = existsSync(destino) ? readFileSync(destino, 'utf8') : null;
      if (actual !== contenido) desincronizados.push(`examples/${e.dir}/${relativo}`);
      continue;
    }
    mkdirSync(dirname(destino), { recursive: true });
    writeFileSync(destino, contenido, 'utf8');
    escritos++;
  }
}

if (comprobar) {
  if (desincronizados.length > 0) {
    console.error(
      `gen:examples --check: ${desincronizados.length} archivo(s) no reflejan los snippets actuales:\n  ` +
        desincronizados.join('\n  ') +
        '\n  Corre `npm run gen:examples` y commitea el resultado.',
    );
    process.exit(1);
  }
  console.log('gen:examples --check: los ejemplos coinciden con los snippets del sitio.');
} else {
  console.log(`gen:examples: ${escritos} archivos en ${EJEMPLOS.length} proyectos.`);
}
