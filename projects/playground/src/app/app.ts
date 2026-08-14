import { Component, signal } from '@angular/core';
import { MaxIconComponent } from 'glyphflow';

@Component({
  selector: 'app-root',
  imports: [MaxIconComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('playground');
}
