import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-docs-temas',
  imports: [TranslocoPipe],
  templateUrl: './temas.html',
  styleUrl: './docs-page.css',
})
export class Temas {}
