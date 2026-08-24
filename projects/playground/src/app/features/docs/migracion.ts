import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-docs-migracion',
  imports: [TranslocoPipe],
  templateUrl: './migracion.html',
  styleUrl: './docs-page.css',
})
export class Migracion {}
