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

export const SNIPPET_GUARDIA_WINDOW = `if (typeof window !== 'undefined') {
  throw new Error('This smoke test must run without a global \`window\` — if it exists, it proves nothing.');
}`;
