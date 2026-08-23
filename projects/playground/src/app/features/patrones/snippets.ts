/**
 * Los cuatro snippets de la página, en texto plano.
 *
 * Vivían dentro del `<pre>` del template, escapados a mano (`&#64;if`, `&#123;`, `&lt;gf-icon&gt;`),
 * y eso arrastraba dos problemas que aquí desaparecen:
 *
 * 1. **El de las llaves.** El parser de HTML decodifica `&#123;` a `{` ANTES de que Angular busque
 *    interpolaciones, así que `{{ votes() }}` dentro de un snippet se EVALUABA: el bloque de
 *    reacción no mostraba el código, mostraba el conteo del demo y cambiaba al pulsar el corazón.
 *    Se tapaba con `ngNonBindable`. Como cadena de TS no pasa por el parser y el problema no
 *    existe — por eso el `ngNonBindable` se fue con ellos.
 * 2. **No se podían copiar.** Un `<pre>` con entidades HTML es texto para mirar; lo que el botón
 *    de copiar necesita es la cadena real.
 */
export const SNIPPET_COPIAR = `protected readonly copied = signal(false);
protected readonly icon = computed(() => (this.copied() ? checkIcon : copyIcon));

async copy() {
  try { await navigator.clipboard.writeText(text); } catch { return; }
  this.copied.set(true);
  setTimeout(() => this.copied.set(false), 1600);
}

<gf-icon-morph [icon]="icon()" [size]="18" spring="bouncy" />`;

export const SNIPPET_TEMA = `protected readonly light = signal(false);
protected readonly icon = computed(() => (this.light() ? sunIcon : moonIcon));

<button [attr.aria-label]="light() ? 'Dark theme' : 'Light theme'">
  <gf-icon-morph [icon]="icon()" [size]="20" />
</button>`;

export const SNIPPET_ENVIAR = `@if (state() === 'sending') {
  <gf-icon [iconDef]="loaderCircleIcon" trigger="auto" [loop]="true" />
} @else {
  <gf-icon-morph [icon]="state() === 'sent' ? circleCheckIcon : sendIcon" />
}`;

export const SNIPPET_REACCION = `<button [attr.aria-pressed]="liked()" (click)="toggle()">
  <gf-icon [iconDef]="heartIcon" [size]="18" trigger="tap" />
  {{ votes() }}
</button>`;
