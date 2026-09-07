import { Component, computed, signal } from '@angular/core';
import { GfIconMorphComponent, THEME_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-theme-toggle',
  imports: [GfIconMorphComponent],
  template: `
    <button type="button" [attr.aria-label]="label()" (click)="toggle()">
      <gf-icon-morph
        [intent]="THEME_INTENT"
        [active]="!light()"
        [animateAtRest]="true"
        [size]="20"
      />
    </button>
  `,
})
export class ThemeToggle {
  protected readonly THEME_INTENT = THEME_INTENT;

  protected readonly light = signal(false);
  // The label says WHERE you are going, not where you are: in dark mode it offers the sun.
  protected readonly label = computed(() => (this.light() ? 'Dark theme' : 'Light theme'));

  protected toggle(): void {
    this.light.update((v) => !v);
  }
}
