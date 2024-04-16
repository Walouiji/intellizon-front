import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { API_BASE_URL } from '../../../environment/environment';
import {MatIconModule} from '@angular/material/icon';
import { ChartComponent } from '../chart/chart.component';

@Component({
	selector: 'information',
	standalone: true,
	imports: [MatCardModule, MatDividerModule, HttpClientModule, DatePipe, MatGridListModule, MatIconModule, ChartComponent],
	templateUrl: './information.component.html',
	styleUrl: './information.component.scss'
})
export class InformationComponent {

	@Input() tempActuel!: number;
	@Input() tempIdeal!: number;
}
