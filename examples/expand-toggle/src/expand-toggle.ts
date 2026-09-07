import { Component, signal } from '@angular/core';
import { EXPAND_COLLAPSE_INTENT, GfIconMorphComponent } from 'glyphflow/morph';

@Component({
  selector: 'app-expand-toggle',
  imports: [GfIconMorphComponent],
  template: `
    <button type="button" [attr.aria-expanded]="open()" (click)="open.set(!open())">
      Details
      <gf-icon-morph
        [intent]="EXPAND_COLLAPSE_INTENT"
        [active]="open()"
        [animateAtRest]="true"
        [size]="16"
      />
    </button>
  `,
})
export class ExpandToggle {
  protected readonly EXPAND_COLLAPSE_INTENT = EXPAND_COLLAPSE_INTENT;
  protected readonly open = signal(false);
}
