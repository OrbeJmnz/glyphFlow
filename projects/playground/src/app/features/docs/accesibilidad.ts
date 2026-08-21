import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-docs-accesibilidad',
  imports: [TranslocoPipe],
  templateUrl: './accesibilidad.html',
  styleUrl: './docs-page.css',
})
export class Accesibilidad {}
