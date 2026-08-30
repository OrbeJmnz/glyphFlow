/**
 * Tokenizador de una sola pasada para los snippets de `BloqueCodigo`. Sin librería: los 16 usos
 * del sitio son fragmentos cortos de TS/HTML controlados por el propio repo (`patrones/snippets.ts`,
 * `docs/snippets.ts`), nunca texto de usuario — cargar Prism/highlight.js para esto sería la
 * dependencia que #NESTJS-STD ya cuestiona, para un problema que un regex resuelve.
 *
 * Es una alternancia, no un parser: cada categoría se prueba en orden y gana la primera que calce
 * en la posición actual (mismo principio que un lexer real, sin el AST). El orden importa —
 * comentarios y cadenas van primero porque "tragan" cualquier cosa que llevan dentro, incluida una
 * palabra clave o un binding que de otro modo se coloreada dos veces.
 */

const CLASE_POR_GRUPO: Readonly<Record<string, string>> = {
  comentarioHtml: 'tok-comentario',
  comentarioBloque: 'tok-comentario',
  comentarioLinea: 'tok-comentario',
  cadenaDoble: 'tok-cadena',
  cadenaSimple: 'tok-cadena',
  interpolacion: 'tok-binding',
  binding: 'tok-binding',
  etiqueta: 'tok-etiqueta',
  palabraClave: 'tok-clave',
  numero: 'tok-numero',
};

const PALABRAS_CLAVE = [
  'const',
  'let',
  'var',
  'return',
  'if',
  'else',
  'for',
  'of',
  'in',
  'while',
  'switch',
  'case',
  'break',
  'continue',
  'class',
  'extends',
  'implements',
  'interface',
  'type',
  'enum',
  'import',
  'export',
  'from',
  'as',
  'default',
  'function',
  'async',
  'await',
  'new',
  'this',
  'super',
  'typeof',
  'instanceof',
  'void',
  'null',
  'undefined',
  'true',
  'false',
  'readonly',
  'protected',
  'private',
  'public',
  'static',
];

/*
 * SIN categoría para template literals: la probé como "un solo token opaco" (la regla clásica
 * para no partir una interpolación de JS a medias) y rompía el caso que de verdad importa aquí.
 * Los snippets `_COMPLETO` de este repo son un componente Angular completo escrito como template
 * literal de TS, y adentro llevan un `template: \x60 ... \x60` -- el HTML de ahí es el contenido
 * que la gente viene a leer. Tragárselo entero como "una cadena" apagaba tags y bindings
 * justo en la vista que más se usa. La comilla invertida ahora es puntuación suelta, sin
 * categoría propia: pasa de largo sin color y el HTML de adentro se tokeniza normal.
 */
const TOKEN_RE = new RegExp(
  [
    String.raw`(?<comentarioHtml><!--[\s\S]*?-->)`,
    String.raw`(?<comentarioBloque>/\*[\s\S]*?\*/)`,
    String.raw`(?<comentarioLinea>//[^\n]*)`,
    String.raw`(?<cadenaDoble>"(?:\\.|[^"\\])*")`,
    String.raw`(?<cadenaSimple>'(?:\\.|[^'\\])*')`,
    String.raw`(?<interpolacion>\{\{[\s\S]*?\}\})`,
    String.raw`(?<binding>[[(][\w.-]+[\])]=)`,
    /*
     * Minúscula a propósito: un tag real u componente (`gf-icon`, `button`, `ul`) siempre empieza
     * así, un genérico de TS (`ElementRef<HTMLInputElement>`) siempre en mayúscula — es la señal
     * barata que separa "es una etiqueta" de "es un genérico" sin necesitar un parser de verdad.
     *
     * La excepción que esa señal sola no cubre: los primitivos de TS también son minúscula
     * (`Promise<void>`, `Array<string>`) y sin este veto "void"/"string" salían coloreados como si
     * fueran una etiqueta — se vio de verdad en `Promise<void>` de `SNIPPET_COPIAR_COMPLETO`.
     */
    String.raw`(?<etiqueta><\/?(?!(?:void|string|number|boolean|any|unknown|never|object|symbol|bigint|undefined|null)\b)[a-z][\w-]*|\/>|(?<![-=])>)`,
    String.raw`(?<palabraClave>\b(?:${PALABRAS_CLAVE.join('|')})\b)`,
    String.raw`(?<numero>\b\d+(?:\.\d+)?\b)`,
  ].join('|'),
  'g',
);

function escapar(texto: string): string {
  return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Convierte código plano en HTML con `<span class="tok-...">` por categoría. Puro: mismo texto, mismo resultado. */
export function resaltarCodigo(codigo: string): string {
  TOKEN_RE.lastIndex = 0;
  let salida = '';
  let ultimo = 0;
  let coincidencia: RegExpExecArray | null;

  while ((coincidencia = TOKEN_RE.exec(codigo))) {
    if (coincidencia.index > ultimo) {
      salida += escapar(codigo.slice(ultimo, coincidencia.index));
    }
    const grupo = Object.entries(coincidencia.groups ?? {}).find(([, valor]) => valor !== undefined);
    if (grupo) {
      const [nombre, valor] = grupo;
      salida += `<span class="${CLASE_POR_GRUPO[nombre]}">${escapar(valor)}</span>`;
    }
    ultimo = TOKEN_RE.lastIndex;
    if (coincidencia.index === TOKEN_RE.lastIndex) {
      TOKEN_RE.lastIndex++;
    }
  }

  salida += escapar(codigo.slice(ultimo));
  return salida;
}
