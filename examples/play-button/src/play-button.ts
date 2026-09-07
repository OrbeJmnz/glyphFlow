import { Component, signal } from '@angular/core';
import { GfIconMorphComponent, PLAY_PAUSE_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-play-button',
  imports: [GfIconMorphComponent],
  template: `
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
  `,
})
export class PlayButton {
  protected readonly PLAY_PAUSE_INTENT = PLAY_PAUSE_INTENT;
  protected readonly playing = signal(false);
}
