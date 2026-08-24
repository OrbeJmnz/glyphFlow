import { Component, signal } from '@angular/core';
import { GfIconComponent, bellIcon } from 'glyphflow';

@Component({
  selector: 'app-bell-button',
  imports: [GfIconComponent],
  template: `
    <button type="button" [attr.aria-label]="label()" (click)="unread.set(0)">
      <gf-icon [iconDef]="bellIcon" [size]="20" trigger="hover" />
      @if (unread() > 0) {
        <span aria-hidden="true">•</span>
      }
    </button>
  `,
})
export class BellButton {
  protected readonly bellIcon = bellIcon;
  protected readonly unread = signal(3);

  protected label(): string {
    const n = this.unread();
    return n > 0 ? n + ' unread notifications' : 'No unread notifications';
  }
}
