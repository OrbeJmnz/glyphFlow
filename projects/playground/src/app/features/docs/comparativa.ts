import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-docs-comparativa',
  imports: [TranslocoPipe],
  templateUrl: './comparativa.html',
  styleUrl: './docs-page.css',
})
export class Comparativa {}
