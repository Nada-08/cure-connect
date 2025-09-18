import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component'
import { HeadlinesComponent } from '../headlines/headlines.component'
import { CateogryListComponent } from '../cateogry-list/cateogry-list.component'

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HeadlinesComponent, CateogryListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
