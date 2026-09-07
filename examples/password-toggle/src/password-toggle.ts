import { Component, signal } from '@angular/core';
import { GfIconMorphComponent, PASSWORD_INTENT } from 'glyphflow/morph';

@Component({
  selector: 'app-password-toggle',
  imports: [GfIconMorphComponent],
  template: `
    <input [type]="visible() ? 'text' : 'password'" aria-label="Password" />
    <button
      type="button"
      [attr.aria-pressed]="visible()"
      [attr.aria-label]="visible() ? 'Hide password' : 'Show password'"
      (click)="visible.set(!visible())"
    >
      <gf-icon-morph
        [intent]="PASSWORD_INTENT"
        [active]="visible()"
        [animateAtRest]="true"
        [size]="18"
      />
    </button>
  `,
})
export class PasswordToggle {
  protected readonly PASSWORD_INTENT = PASSWORD_INTENT;
  protected readonly visible = signal(false);
}
