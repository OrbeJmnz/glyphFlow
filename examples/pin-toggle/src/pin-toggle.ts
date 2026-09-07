import { Component, signal } from '@angular/core';
import { GfIconMorphComponent, PIN_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-pin-toggle',
  imports: [GfIconMorphComponent],
  template: `
    <button
      type="button"
      [attr.aria-pressed]="pinned()"
      [attr.aria-label]="pinned() ? 'Unpin' : 'Pin'"
      (click)="pinned.set(!pinned())"
    >
      <gf-icon-morph [intent]="PIN_INTENT" [active]="!pinned()" [animateAtRest]="true" [size]="18" />
    </button>
  `,
})
export class PinToggle {
  protected readonly PIN_INTENT = PIN_INTENT;

  // Same as FAVORITE_INTENT: "active" is the -Off side (mapPinOff), inverted so the signal
  // still reads positively.
  protected readonly pinned = signal(true);
}
