import { Component, computed, signal, ElementRef, viewChild } from '@angular/core';
import { menuIcon, xIcon } from 'glyphflow';
import { GfIconMorphComponent } from 'glyphflow/morph';

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
      <gf-icon-morph [icon]="icon()" [size]="20" spring="snappy" />
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
  private readonly trigger = viewChild.required<ElementRef<HTMLElement>>('trigger');

  protected readonly open = signal(false);
  protected readonly icon = computed(() => (this.open() ? xIcon : menuIcon));

  /** Returns focus to the trigger: otherwise Escape leaves it on the <body>. */
  protected close(): void {
    this.open.set(false);
    this.trigger().nativeElement.focus();
  }
}
