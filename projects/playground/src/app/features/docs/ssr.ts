import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-docs-ssr',
  imports: [TranslocoPipe],
  templateUrl: './ssr.html',
  styleUrl: './docs-page.css',
})
export class Ssr {}
