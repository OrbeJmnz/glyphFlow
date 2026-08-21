import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-docs-empezando',
  imports: [TranslocoPipe],
  templateUrl: './empezando.html',
  styleUrl: './docs-page.css',
})
export class Empezando {}
