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

/*
 * ── Las versiones completas ───────────────────────────────────────────────────
 *
 * El fragmento se lee mejor —es el que enseña la idea sin ruido— pero no se puede pegar en ningún
 * sitio: no trae imports ni componente que lo contenga. Estas sí.
 *
 * El criterio de aceptación del ticket es literal: «compila pegada tal cual en un proyecto Angular
 * limpio con la librería instalada». Lo vigila `scripts/snippets-check.ts`, que las parsea de
 * verdad y comprueba que todo símbolo que usan esté importado. No es un type-check completo, y por
 * eso el script lo dice en su salida en vez de dejar creer que sí lo es.
 */
export const SNIPPET_COPIAR_COMPLETO = `import { Component, computed, signal } from '@angular/core';
import { checkIcon, copyIcon } from 'glyphflow';
import { GfIconMorphComponent } from 'glyphflow/morph';

@Component({
  selector: 'app-copy-button',
  imports: [GfIconMorphComponent],
  template: \`
    <button type="button" (click)="copy()">
      <gf-icon-morph [icon]="icon()" [size]="18" spring="bouncy" />
      {{ copied() ? 'Copied' : 'Copy' }}
    </button>
  \`,
})
export class CopyButton {
  readonly text = 'npm i glyphflow';

  protected readonly copied = signal(false);
  protected readonly icon = computed(() => (this.copied() ? checkIcon : copyIcon));

  protected async copy(): Promise<void> {
    // Si el navegador lo bloquea, el estado NO cambia: nada de palomitas sobre un buffer vacío.
    try {
      await navigator.clipboard.writeText(this.text);
    } catch {
      return;
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1600);
  }
}`;

export const SNIPPET_TEMA_COMPLETO = `import { Component, computed, signal } from '@angular/core';
import { moonIcon, sunIcon } from 'glyphflow';
import { GfIconMorphComponent } from 'glyphflow/morph';

@Component({
  selector: 'app-theme-toggle',
  imports: [GfIconMorphComponent],
  template: \`
    <button type="button" [attr.aria-label]="label()" (click)="toggle()">
      <gf-icon-morph [icon]="icon()" [size]="20" />
    </button>
  \`,
})
export class ThemeToggle {
  protected readonly light = signal(false);

  // El icono dice A DÓNDE vas, no dónde estás: en oscuro se ofrece el sol.
  protected readonly icon = computed(() => (this.light() ? moonIcon : sunIcon));
  protected readonly label = computed(() => (this.light() ? 'Dark theme' : 'Light theme'));

  protected toggle(): void {
    this.light.update((v) => !v);
  }
}`;

export const SNIPPET_ENVIAR_COMPLETO = `import { Component, signal } from '@angular/core';
import { GfIconComponent, circleCheckIcon, loaderCircleIcon, sendIcon } from 'glyphflow';
import { GfIconMorphComponent } from 'glyphflow/morph';

type SendState = 'idle' | 'sending' | 'sent';

@Component({
  selector: 'app-send-button',
  imports: [GfIconComponent, GfIconMorphComponent],
  template: \`
    <button type="button" [disabled]="state() === 'sending'" (click)="send()">
      @if (state() === 'sending') {
        <gf-icon [iconDef]="loaderCircleIcon" trigger="auto" [loop]="true" />
      } @else {
        <gf-icon-morph [icon]="state() === 'sent' ? circleCheckIcon : sendIcon" />
      }
      {{ state() === 'sent' ? 'Sent' : 'Send' }}
    </button>
  \`,
})
export class SendButton {
  // Expuestos a la plantilla: los iconos son valores, no nombres mágicos.
  protected readonly loaderCircleIcon = loaderCircleIcon;
  protected readonly circleCheckIcon = circleCheckIcon;
  protected readonly sendIcon = sendIcon;

  protected readonly state = signal<SendState>('idle');

  protected async send(): Promise<void> {
    this.state.set('sending');
    await new Promise((r) => setTimeout(r, 1200));
    this.state.set('sent');
  }
}`;

export const SNIPPET_REACCION_COMPLETO = `import { Component, signal } from '@angular/core';
import { GfIconComponent, heartIcon } from 'glyphflow';

@Component({
  selector: 'app-like-button',
  imports: [GfIconComponent],
  template: \`
    <button type="button" [attr.aria-pressed]="liked()" (click)="toggle()">
      <gf-icon [iconDef]="heartIcon" [size]="18" trigger="tap" />
      {{ votes() }}
    </button>
  \`,
})
export class LikeButton {
  protected readonly heartIcon = heartIcon;

  protected readonly liked = signal(false);
  protected readonly votes = signal(128);

  protected toggle(): void {
    this.liked.update((v) => !v);
    this.votes.update((n) => (this.liked() ? n + 1 : n - 1));
  }
}`;
