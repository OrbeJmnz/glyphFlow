import { Component } from '@angular/core';
import { GfBotComponent, catShape } from 'glyphflow/bots';
import { superBounce } from 'glyphflow/bots/gestures';

@Component({
  selector: 'app-mascot',
  imports: [GfBotComponent],
  template: '<gf-bot [shape]="shape" skin="g1" [gestures]="gestures" label="Cat" />',
})
export class Mascot {
  protected readonly shape = catShape;
  protected readonly gestures = { superBounce };
}
