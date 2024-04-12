import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import { InformationComponent } from '../information/information.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, MatDividerModule, InformationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
