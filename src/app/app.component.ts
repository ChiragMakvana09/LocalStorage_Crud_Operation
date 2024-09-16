import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageComponent } from './local-storage/local-storage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LocalStorageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'API';
}
