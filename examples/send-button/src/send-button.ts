import { Component, signal } from '@angular/core';
import { GfIconComponent, circleCheckIcon, loaderCircleIcon, sendIcon } from 'glyphflow';
import { GfIconMorphComponent } from 'glyphflow/morph';

type SendState = 'idle' | 'sending' | 'sent';

@Component({
  selector: 'app-send-button',
  imports: [GfIconComponent, GfIconMorphComponent],
  template: `
    <button type="button" [disabled]="state() === 'sending'" (click)="send()">
      @if (state() === 'sending') {
        <gf-icon [iconDef]="loaderCircleIcon" trigger="auto" [loop]="true" />
      } @else {
        <gf-icon-morph [icon]="state() === 'sent' ? circleCheckIcon : sendIcon" />
      }
      {{ state() === 'sent' ? 'Sent' : 'Send' }}
    </button>
  `,
})
export class SendButton {
  // Expuestos a la plantilla: los iconos son valores, no nombres mágicos.
  protected readonly loaderCircleIcon = loaderCircleIcon;
  protected readonly circleCheckIcon = circleCheckIcon;
  protected readonly sendIcon = sendIcon;

  protected readonly state = signal<SendState>('idle');

  protected async send(): Promise<void> {
    this.state.set('sending');
    await new Promise((r) => setTimeout(r, 1200));
    this.state.set('sent');
  }
}
