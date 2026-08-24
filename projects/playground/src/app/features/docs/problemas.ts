import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-docs-problemas',
  imports: [TranslocoPipe],
  templateUrl: './problemas.html',
  styleUrl: './docs-page.css',
})
export class Problemas {}
