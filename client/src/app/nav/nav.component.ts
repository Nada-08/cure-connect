import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', '../home/home.component.css']
})
export class NavComponent {
  name: string = "basmala";
}
