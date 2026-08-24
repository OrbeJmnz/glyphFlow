import { Component, computed, signal } from '@angular/core';
import { checkIcon, copyIcon } from 'glyphflow';
import { GfIconMorphComponent } from 'glyphflow/morph';

@Component({
  selector: 'app-copy-button',
  imports: [GfIconMorphComponent],
  template: `
    <button type="button" (click)="copy()">
      <gf-icon-morph [icon]="icon()" [size]="18" spring="bouncy" />
      {{ copied() ? 'Copied' : 'Copy' }}
    </button>
  `,
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
}
