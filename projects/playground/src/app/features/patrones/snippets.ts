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

async copy() {
  try { await navigator.clipboard.writeText(text); } catch { return; }
  this.copied.set(true);
  setTimeout(() => this.copied.set(false), COPY_INTENT.autoReset);
}

<gf-icon-morph [intent]="COPY_INTENT" [active]="copied()" [animateAtRest]="true" [size]="18" />`;

export const SNIPPET_TEMA = `protected readonly light = signal(false);

<button [attr.aria-label]="light() ? 'Dark theme' : 'Light theme'">
  <gf-icon-morph [intent]="THEME_INTENT" [active]="!light()" [animateAtRest]="true" [size]="20" />
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
export const SNIPPET_COPIAR_COMPLETO = `import { Component, signal } from '@angular/core';
import { COPY_INTENT, GfIconMorphComponent } from 'glyphflow/morph';

@Component({
  selector: 'app-copy-button',
  imports: [GfIconMorphComponent],
  template: \`
    <button type="button" (click)="copy()">
      <gf-icon-morph [intent]="COPY_INTENT" [active]="copied()" [animateAtRest]="true" [size]="18" />
      {{ copied() ? 'Copied' : 'Copy' }}
    </button>
  \`,
})
export class CopyButton {
  protected readonly COPY_INTENT = COPY_INTENT;

  readonly text = 'npm i glyphflow';
  protected readonly copied = signal(false);

  protected async copy(): Promise<void> {
    // If the browser blocks it, the state does NOT change: no check mark over an empty buffer.
    try {
      await navigator.clipboard.writeText(this.text);
    } catch {
      return;
    }
    this.copied.set(true);
    // COPY_INTENT's own autoReset already brings the ICON back to idle — this does the same for
    // the rest of this demo (the button text), which the intent has no way to reach.
    setTimeout(() => this.copied.set(false), COPY_INTENT.autoReset);
  }
}`;

export const SNIPPET_TEMA_COMPLETO = `import { Component, computed, signal } from '@angular/core';
import { GfIconMorphComponent, THEME_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-theme-toggle',
  imports: [GfIconMorphComponent],
  template: \`
    <button type="button" [attr.aria-label]="label()" (click)="toggle()">
      <gf-icon-morph
        [intent]="THEME_INTENT"
        [active]="!light()"
        [animateAtRest]="true"
        [size]="20"
      />
    </button>
  \`,
})
export class ThemeToggle {
  protected readonly THEME_INTENT = THEME_INTENT;

  protected readonly light = signal(false);
  // The label says WHERE you are going, not where you are: in dark mode it offers the sun.
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
  // Exposed to the template: icons are values, not magic names.
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

/*
 * ── T25 · Los cinco que faltaban ──────────────────────────────────────────────
 *
 * El acordeón es el ÚNICO sin versión completa ni proyecto, y a propósito: su fragmento son cuatro
 * líneas de CSS, no un componente. Inventarle un envoltorio sería fingir que necesita uno.
 */
export const SNIPPET_MENU = `readonly open = signal(false);

<button [attr.aria-expanded]="open()" aria-controls="menu" (click)="open.set(!open())">
  <gf-icon-morph [intent]="MENU_CLOSE_INTENT" [active]="open()" [animateAtRest]="true" [size]="20" />
</button>`;

export const SNIPPET_MENU_COMPLETO = `import { Component, signal, ElementRef, viewChild } from '@angular/core';
import { GfIconMorphComponent, MENU_CLOSE_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-menu-button',
  imports: [GfIconMorphComponent],
  template: \`
    <button
      #trigger
      type="button"
      [attr.aria-expanded]="open()"
      aria-controls="menu-panel"
      [attr.aria-label]="open() ? 'Close menu' : 'Open menu'"
      (click)="open.set(!open())"
      (keydown.escape)="close()"
    >
      <gf-icon-morph
        [intent]="MENU_CLOSE_INTENT"
        [active]="open()"
        [animateAtRest]="true"
        [size]="20"
      />
    </button>

    @if (open()) {
      <ul id="menu-panel">
        <li>Profile</li>
        <li>Sign out</li>
      </ul>
    }
  \`,
})
export class MenuButton {
  protected readonly MENU_CLOSE_INTENT = MENU_CLOSE_INTENT;
  private readonly trigger = viewChild.required<ElementRef<HTMLElement>>('trigger');

  protected readonly open = signal(false);

  /** Returns focus to the trigger: otherwise Escape leaves it on the <body>. */
  protected close(): void {
    this.open.set(false);
    this.trigger().nativeElement.focus();
  }
}`;

export const SNIPPET_PLAY = `readonly playing = signal(false);

<button [attr.aria-pressed]="playing()" (click)="playing.set(!playing())">
  <gf-icon-morph
    [intent]="PLAY_PAUSE_INTENT"
    [active]="playing()"
    [animateAtRest]="true"
    [size]="20"
  />
</button>`;

export const SNIPPET_PLAY_COMPLETO = `import { Component, signal } from '@angular/core';
import { GfIconMorphComponent, PLAY_PAUSE_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-play-button',
  imports: [GfIconMorphComponent],
  template: \`
    <button
      type="button"
      [attr.aria-pressed]="playing()"
      [attr.aria-label]="playing() ? 'Pause' : 'Play'"
      (click)="playing.set(!playing())"
    >
      <gf-icon-morph
        [intent]="PLAY_PAUSE_INTENT"
        [active]="playing()"
        [animateAtRest]="true"
        [size]="20"
      />
    </button>
  \`,
})
export class PlayButton {
  protected readonly PLAY_PAUSE_INTENT = PLAY_PAUSE_INTENT;
  protected readonly playing = signal(false);
}`;

export const SNIPPET_ACORDEON = `<!-- No morph: the shape does not change, it ROTATES. -->
<gf-icon [iconDef]="chevronDownIcon" [size]="16" trigger="manual" [class.open]="open()" />

gf-icon { transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1); }
gf-icon.open { transform: rotate(180deg); }
@media (prefers-reduced-motion: reduce) { gf-icon { transition: none; } }`;

export const SNIPPET_CAMPANA = `<!-- Same shape, movement with intent: choreography. -->
<gf-icon [iconDef]="bellIcon" [size]="20" trigger="hover" />`;

export const SNIPPET_CAMPANA_COMPLETO = `import { Component, signal } from '@angular/core';
import { GfIconComponent, bellIcon } from 'glyphflow';

@Component({
  selector: 'app-bell-button',
  imports: [GfIconComponent],
  template: \`
    <button type="button" [attr.aria-label]="label()" (click)="unread.set(0)">
      <gf-icon [iconDef]="bellIcon" [size]="20" trigger="hover" />
      @if (unread() > 0) {
        <span aria-hidden="true">•</span>
      }
    </button>
  \`,
})
export class BellButton {
  protected readonly bellIcon = bellIcon;
  protected readonly unread = signal(3);

  protected label(): string {
    const n = this.unread();
    return n > 0 ? n + ' unread notifications' : 'No unread notifications';
  }
}`;

export const SNIPPET_BUSCAR = `readonly open = signal(false);
readonly icon = computed(() => (this.open() ? xIcon : searchIcon));

<input [attr.tabindex]="open() ? null : -1" />
<button [attr.aria-expanded]="open()" (click)="toggle()">
  <gf-icon-morph [icon]="icon()" [size]="18" spring="snappy" />
</button>`;

export const SNIPPET_BUSCAR_COMPLETO = `import { Component, computed, signal, ElementRef, viewChild } from '@angular/core';
import { searchIcon, xIcon } from 'glyphflow';
import { GfIconMorphComponent } from 'glyphflow/morph';

@Component({
  selector: 'app-search-toggle',
  imports: [GfIconMorphComponent],
  template: \`
    <div [class.open]="open()">
      <input #field type="search" aria-label="Search" [attr.tabindex]="open() ? null : -1" />
      <button
        type="button"
        [attr.aria-expanded]="open()"
        [attr.aria-label]="open() ? 'Close search' : 'Open search'"
        (click)="toggle()"
      >
        <gf-icon-morph [icon]="icon()" [size]="18" spring="snappy" />
      </button>
    </div>
  \`,
})
export class SearchToggle {
  private readonly field = viewChild.required<ElementRef<HTMLInputElement>>('field');

  protected readonly open = signal(false);
  protected readonly icon = computed(() => (this.open() ? xIcon : searchIcon));

  protected toggle(): void {
    this.open.update((v) => !v);
    // Focus enters the field on open; on close it stays on the button, where the hand was.
    if (this.open()) queueMicrotask(() => this.field().nativeElement.focus());
  }
}`;

/*
 * ── Cinco MorphIntent — `[intent]` en vez de un `computed` a mano ─────────────────
 *
 * Ninguno de estos define su propio `computed<MorphIcon>`: el par de iconos y el resorte ya
 * vienen decididos dentro de la constante. El input al componente es un booleano (`active`), no
 * un icono — por eso el fragmento es más corto que los de arriba.
 *
 * `FAVORITE_INTENT` y `PIN_INTENT` invierten la señal (`[active]="!favorite()"`): en Lucide, el
 * icono `-Off` (`starOff`, `mapPinOff`) es el lado APAGADO de la función, no el lado marcado. Con
 * `favorite`/`pinned` leyendo en positivo ("esto ES un favorito"), el binding tiene que invertir
 * para que `active` (que enciende el lado `-Off`) siga cayendo del lado correcto. `NOTIFY_INTENT`,
 * `VOLUME_INTENT` y `LIKE_INTENT` no lo necesitan: sus señales (`muted`, `removed`) ya nombran
 * directamente el estado que representa el lado `-Off`.
 */
export const SNIPPET_FAVORITO = `readonly favorite = signal(true);

<!-- "active" es el lado -Off del intent (starOff): se invierte para que "favorite" siga en positivo. -->
<button [attr.aria-pressed]="favorite()" (click)="favorite.set(!favorite())">
  <gf-icon-morph [intent]="FAVORITE_INTENT" [active]="!favorite()" [animateAtRest]="true" [size]="20" />
</button>`;

export const SNIPPET_FAVORITO_COMPLETO = `import { Component, signal } from '@angular/core';
import { FAVORITE_INTENT, GfIconMorphComponent } from 'glyphflow/morph';

@Component({
  selector: 'app-favorite-button',
  imports: [GfIconMorphComponent],
  template: \`
    <button
      type="button"
      [attr.aria-pressed]="favorite()"
      [attr.aria-label]="favorite() ? 'Remove from favorites' : 'Add to favorites'"
      (click)="favorite.set(!favorite())"
    >
      <gf-icon-morph
        [intent]="FAVORITE_INTENT"
        [active]="!favorite()"
        [animateAtRest]="true"
        [size]="20"
      />
    </button>
  \`,
})
export class FavoriteButton {
  protected readonly FAVORITE_INTENT = FAVORITE_INTENT;

  // "active" turns on the intent's -Off side (starOff); inverted so the consumer's own signal
  // still reads positively ("is this a favorite"), not negatively.
  protected readonly favorite = signal(true);
}`;

export const SNIPPET_NOTIFICAR = `readonly muted = signal(false);

<button [attr.aria-pressed]="muted()" (click)="muted.set(!muted())">
  <gf-icon-morph [intent]="NOTIFY_INTENT" [active]="muted()" [animateAtRest]="true" [size]="20" />
</button>`;

export const SNIPPET_NOTIFICAR_COMPLETO = `import { Component, signal } from '@angular/core';
import { GfIconMorphComponent, NOTIFY_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-notifications-toggle',
  imports: [GfIconMorphComponent],
  template: \`
    <button
      type="button"
      [attr.aria-pressed]="muted()"
      [attr.aria-label]="muted() ? 'Unmute notifications' : 'Mute notifications'"
      (click)="muted.set(!muted())"
    >
      <gf-icon-morph [intent]="NOTIFY_INTENT" [active]="muted()" [animateAtRest]="true" [size]="20" />
    </button>
  \`,
})
export class NotificationsToggle {
  protected readonly NOTIFY_INTENT = NOTIFY_INTENT;
  protected readonly muted = signal(false);
}`;

export const SNIPPET_FIJAR = `readonly pinned = signal(true);

<!-- Mismo motivo que en favoritos: "active" es mapPinOff, se invierte. -->
<button [attr.aria-pressed]="pinned()" (click)="pinned.set(!pinned())">
  <gf-icon-morph [intent]="PIN_INTENT" [active]="!pinned()" [animateAtRest]="true" [size]="18" />
</button>`;

export const SNIPPET_FIJAR_COMPLETO = `import { Component, signal } from '@angular/core';
import { GfIconMorphComponent, PIN_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-pin-toggle',
  imports: [GfIconMorphComponent],
  template: \`
    <button
      type="button"
      [attr.aria-pressed]="pinned()"
      [attr.aria-label]="pinned() ? 'Unpin' : 'Pin'"
      (click)="pinned.set(!pinned())"
    >
      <gf-icon-morph [intent]="PIN_INTENT" [active]="!pinned()" [animateAtRest]="true" [size]="18" />
    </button>
  \`,
})
export class PinToggle {
  protected readonly PIN_INTENT = PIN_INTENT;

  // Same as FAVORITE_INTENT: "active" is the -Off side (mapPinOff), inverted so the signal
  // still reads positively.
  protected readonly pinned = signal(true);
}`;

export const SNIPPET_SILENCIAR = `readonly muted = signal(false);

<button [attr.aria-pressed]="muted()" (click)="muted.set(!muted())">
  <gf-icon-morph [intent]="VOLUME_INTENT" [active]="muted()" [animateAtRest]="true" [size]="20" />
</button>`;

export const SNIPPET_SILENCIAR_COMPLETO = `import { Component, signal } from '@angular/core';
import { GfIconMorphComponent, VOLUME_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-volume-toggle',
  imports: [GfIconMorphComponent],
  template: \`
    <button
      type="button"
      [attr.aria-pressed]="muted()"
      [attr.aria-label]="muted() ? 'Unmute' : 'Mute'"
      (click)="muted.set(!muted())"
    >
      <gf-icon-morph [intent]="VOLUME_INTENT" [active]="muted()" [animateAtRest]="true" [size]="20" />
    </button>
  \`,
})
export class VolumeToggle {
  protected readonly VOLUME_INTENT = VOLUME_INTENT;
  protected readonly muted = signal(false);
}`;

export const SNIPPET_QUITAR_LIKE = `readonly removed = signal(false);

<button [attr.aria-pressed]="removed()" (click)="removed.set(!removed())">
  <gf-icon-morph [intent]="LIKE_INTENT" [active]="removed()" [animateAtRest]="true" [size]="18" />
</button>`;

export const SNIPPET_QUITAR_LIKE_COMPLETO = `import { Component, signal } from '@angular/core';
import { GfIconMorphComponent, LIKE_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-unlike-button',
  imports: [GfIconMorphComponent],
  template: \`
    <button
      type="button"
      [attr.aria-pressed]="removed()"
      [attr.aria-label]="removed() ? 'Like' : 'Remove like'"
      (click)="removed.set(!removed())"
    >
      <gf-icon-morph [intent]="LIKE_INTENT" [active]="removed()" [animateAtRest]="true" [size]="18" />
    </button>
  \`,
})
export class UnlikeButton {
  protected readonly LIKE_INTENT = LIKE_INTENT;
  protected readonly removed = signal(false);
}`;

export const SNIPPET_CONTRASENA = `readonly visible = signal(false);

<input [type]="visible() ? 'text' : 'password'" />
<button [attr.aria-pressed]="visible()" (click)="visible.set(!visible())">
  <gf-icon-morph
    [intent]="PASSWORD_INTENT"
    [active]="visible()"
    [animateAtRest]="true"
    [size]="18"
  />
</button>`;

export const SNIPPET_CONTRASENA_COMPLETO = `import { Component, signal } from '@angular/core';
import { GfIconMorphComponent, PASSWORD_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-password-toggle',
  imports: [GfIconMorphComponent],
  template: \`
    <input [type]="visible() ? 'text' : 'password'" aria-label="Password" />
    <button
      type="button"
      [attr.aria-pressed]="visible()"
      [attr.aria-label]="visible() ? 'Hide password' : 'Show password'"
      (click)="visible.set(!visible())"
    >
      <gf-icon-morph
        [intent]="PASSWORD_INTENT"
        [active]="visible()"
        [animateAtRest]="true"
        [size]="18"
      />
    </button>
  \`,
})
export class PasswordToggle {
  protected readonly PASSWORD_INTENT = PASSWORD_INTENT;
  protected readonly visible = signal(false);
}`;

export const SNIPPET_EXPANDIR = `readonly open = signal(false);

<button [attr.aria-expanded]="open()" (click)="open.set(!open())">
  Details
  <gf-icon-morph
    [intent]="EXPAND_COLLAPSE_INTENT"
    [active]="open()"
    [animateAtRest]="true"
    [size]="16"
  />
</button>`;

export const SNIPPET_EXPANDIR_COMPLETO = `import { Component, signal } from '@angular/core';
import { EXPAND_COLLAPSE_INTENT, GfIconMorphComponent } from 'glyphflow/morph';

@Component({
  selector: 'app-expand-toggle',
  imports: [GfIconMorphComponent],
  template: \`
    <button type="button" [attr.aria-expanded]="open()" (click)="open.set(!open())">
      Details
      <gf-icon-morph
        [intent]="EXPAND_COLLAPSE_INTENT"
        [active]="open()"
        [animateAtRest]="true"
        [size]="16"
      />
    </button>
  \`,
})
export class ExpandToggle {
  protected readonly EXPAND_COLLAPSE_INTENT = EXPAND_COLLAPSE_INTENT;
  protected readonly open = signal(false);
}`;
