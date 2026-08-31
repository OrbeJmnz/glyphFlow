import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Recuadro } from '../../shared/ui/recuadro';

@Component({
  selector: 'app-docs-migracion',
  imports: [TranslocoPipe, Recuadro],
  templateUrl: './migracion.html',
  styleUrl: './docs-page.css',
})
export class Migracion {}
