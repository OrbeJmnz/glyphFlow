import { Component, signal, ElementRef, viewChild } from '@angular/core';
import { GfIconMorphComponent, MENU_CLOSE_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-menu-button',
  imports: [GfIconMorphComponent],
  template: `
    <button
      #trigger
      type="button"
      [attr.aria-expanded]="open()"
      aria-controls="menu-panel"
      [attr.aria-label]="open() ? 'Close menu' : 'Open menu'"
      (click)="open.set(!open())"
      (keydown.escape)="close()"
    >
      <gf-icon-morph
        [intent]="MENU_CLOSE_INTENT"
        [active]="open()"
        [animateAtRest]="true"
        [size]="20"
      />
    </button>

    @if (open()) {
      <ul id="menu-panel">
        <li>Profile</li>
        <li>Sign out</li>
      </ul>
    }
  `,
})
export class MenuButton {
  protected readonly MENU_CLOSE_INTENT = MENU_CLOSE_INTENT;
  private readonly trigger = viewChild.required<ElementRef<HTMLElement>>('trigger');

  protected readonly open = signal(false);

  /** Returns focus to the trigger: otherwise Escape leaves it on the <body>. */
  protected close(): void {
    this.open.set(false);
    this.trigger().nativeElement.focus();
  }
}
