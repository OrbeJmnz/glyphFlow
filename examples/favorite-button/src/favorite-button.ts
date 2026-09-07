import { Component, signal } from '@angular/core';
import { FAVORITE_INTENT, GfIconMorphComponent } from 'glyphflow/morph';

@Component({
  selector: 'app-favorite-button',
  imports: [GfIconMorphComponent],
  template: `
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
  `,
})
export class FavoriteButton {
  protected readonly FAVORITE_INTENT = FAVORITE_INTENT;

  // "active" turns on the intent's -Off side (starOff); inverted so the consumer's own signal
  // still reads positively ("is this a favorite"), not negatively.
  protected readonly favorite = signal(true);
}
