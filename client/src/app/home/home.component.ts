import { Component } from '@angular/core';
import {NavComponent} from '../nav/nav.component'
import {HeaderComponent} from '../header/header.component'
import {HeadlinesComponent} from '../headlines/headlines.component'
import {CateogryListComponent} from '../cateogry-list/cateogry-list.component'
import {FooterComponent} from '../footer/footer.component'
@Component({
  selector: 'app-home',
  imports: [NavComponent,HeaderComponent,HeadlinesComponent,CateogryListComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
