import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordGuessComponent } from './components/word-guess/word-guess.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  WordGuessComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WordGames';
}
