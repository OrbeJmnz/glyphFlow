import { Component, signal } from '@angular/core';
import { COPY_INTENT, GfIconMorphComponent } from 'glyphflow/morph';

@Component({
  selector: 'app-copy-button',
  imports: [GfIconMorphComponent],
  template: `
    <button type="button" (click)="copy()">
      <gf-icon-morph [intent]="COPY_INTENT" [active]="copied()" [animateAtRest]="true" [size]="18" />
      {{ copied() ? 'Copied' : 'Copy' }}
    </button>
  `,
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
}
