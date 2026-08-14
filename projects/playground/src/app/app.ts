import { Component, signal } from '@angular/core';
import { MaxIconComponent, bellIcon } from 'glyphflow';

@Component({
  selector: 'app-root',
  imports: [MaxIconComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('playground');
  protected readonly bellIcon = bellIcon;
}
