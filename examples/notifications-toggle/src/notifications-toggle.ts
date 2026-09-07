import { Component, signal } from '@angular/core';
import { GfIconMorphComponent, NOTIFY_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-notifications-toggle',
  imports: [GfIconMorphComponent],
  template: `
    <button
      type="button"
      [attr.aria-pressed]="muted()"
      [attr.aria-label]="muted() ? 'Unmute notifications' : 'Mute notifications'"
      (click)="muted.set(!muted())"
    >
      <gf-icon-morph [intent]="NOTIFY_INTENT" [active]="muted()" [animateAtRest]="true" [size]="20" />
    </button>
  `,
})
export class NotificationsToggle {
  protected readonly NOTIFY_INTENT = NOTIFY_INTENT;
  protected readonly muted = signal(false);
}
