import { Component, signal } from '@angular/core';
import { GfIconMorphComponent, LIKE_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-unlike-button',
  imports: [GfIconMorphComponent],
  template: `
    <button
      type="button"
      [attr.aria-pressed]="removed()"
      [attr.aria-label]="removed() ? 'Like' : 'Remove like'"
      (click)="removed.set(!removed())"
    >
      <gf-icon-morph [intent]="LIKE_INTENT" [active]="removed()" [animateAtRest]="true" [size]="18" />
    </button>
  `,
})
export class UnlikeButton {
  protected readonly LIKE_INTENT = LIKE_INTENT;
  protected readonly removed = signal(false);
}
