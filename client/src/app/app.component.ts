import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
