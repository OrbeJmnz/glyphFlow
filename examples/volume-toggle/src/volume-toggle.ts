import { Component, signal } from '@angular/core';
import { GfIconMorphComponent, VOLUME_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-volume-toggle',
  imports: [GfIconMorphComponent],
  template: `
    <button
      type="button"
      [attr.aria-pressed]="muted()"
      [attr.aria-label]="muted() ? 'Unmute' : 'Mute'"
      (click)="muted.set(!muted())"
    >
      <gf-icon-morph [intent]="VOLUME_INTENT" [active]="muted()" [animateAtRest]="true" [size]="20" />
    </button>
  `,
})
export class VolumeToggle {
  protected readonly VOLUME_INTENT = VOLUME_INTENT;
  protected readonly muted = signal(false);
}
