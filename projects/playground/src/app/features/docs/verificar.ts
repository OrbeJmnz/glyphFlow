import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-docs-verificar',
  imports: [TranslocoPipe],
  templateUrl: './verificar.html',
  styleUrl: './docs-page.css',
})
export class Verificar {}
