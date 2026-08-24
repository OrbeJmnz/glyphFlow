import { Component, computed, signal, ElementRef, viewChild } from '@angular/core';
import { searchIcon, xIcon } from 'glyphflow';
import { GfIconMorphComponent } from 'glyphflow/morph';

@Component({
  selector: 'app-search-toggle',
  imports: [GfIconMorphComponent],
  template: `
    <div [class.open]="open()">
      <input #field type="search" aria-label="Search" [attr.tabindex]="open() ? null : -1" />
      <button
        type="button"
        [attr.aria-expanded]="open()"
        [attr.aria-label]="open() ? 'Close search' : 'Open search'"
        (click)="toggle()"
      >
        <gf-icon-morph [icon]="icon()" [size]="18" spring="snappy" />
      </button>
    </div>
  `,
})
export class SearchToggle {
  private readonly field = viewChild.required<ElementRef<HTMLInputElement>>('field');

  protected readonly open = signal(false);
  protected readonly icon = computed(() => (this.open() ? xIcon : searchIcon));

  protected toggle(): void {
    this.open.update((v) => !v);
    // Focus enters the field on open; on close it stays on the button, where the hand was.
    if (this.open()) queueMicrotask(() => this.field().nativeElement.focus());
  }
}
