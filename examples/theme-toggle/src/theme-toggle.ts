import { Component, computed, signal } from '@angular/core';
import { moonIcon, sunIcon } from 'glyphflow';
import { GfIconMorphComponent } from 'glyphflow/morph';

@Component({
  selector: 'app-theme-toggle',
  imports: [GfIconMorphComponent],
  template: `
    <button type="button" [attr.aria-label]="label()" (click)="toggle()">
      <gf-icon-morph [icon]="icon()" [size]="20" />
    </button>
  `,
})
export class ThemeToggle {
  protected readonly light = signal(false);

  // El icono dice A DÓNDE vas, no dónde estás: en oscuro se ofrece el sol.
  protected readonly icon = computed(() => (this.light() ? moonIcon : sunIcon));
  protected readonly label = computed(() => (this.light() ? 'Dark theme' : 'Light theme'));

  protected toggle(): void {
    this.light.update((v) => !v);
  }
}
