import { Component, signal } from '@angular/core';
import { GfIconComponent, heartIcon } from 'glyphflow';

@Component({
  selector: 'app-like-button',
  imports: [GfIconComponent],
  template: `
    <button type="button" [attr.aria-pressed]="liked()" (click)="toggle()">
      <gf-icon [iconDef]="heartIcon" [size]="18" trigger="tap" />
      {{ votes() }}
    </button>
  `,
})
export class LikeButton {
  protected readonly heartIcon = heartIcon;

  protected readonly liked = signal(false);
  protected readonly votes = signal(128);

  protected toggle(): void {
    this.liked.update((v) => !v);
    this.votes.update((n) => (this.liked() ? n + 1 : n - 1));
  }
}
