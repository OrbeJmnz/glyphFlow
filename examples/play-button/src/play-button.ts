import { Component, computed, signal } from '@angular/core';
import { pauseIcon, playIcon } from 'glyphflow';
import { GfIconMorphComponent } from 'glyphflow/morph';

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
      <gf-icon-morph [icon]="icon()" [size]="20" spring="snappy" />
    </button>
  `,
})
export class PlayButton {
  protected readonly playing = signal(false);
  protected readonly icon = computed(() => (this.playing() ? pauseIcon : playIcon));
}
