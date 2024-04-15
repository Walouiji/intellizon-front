import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { API_KEY, API_BASE_URL } from '../../../environment/environment';

const urlLastDataResource = API_BASE_URL + "/api/intellizon-front/getLatestData"
const urlRangeDataResource = API_BASE_URL + "/api/intellizon-front/getDataRange"

const headers = { 'Content-Type': 'application/json', 'Authorization': API_KEY };

@Component({
	selector: 'information',
	standalone: true,
	imports: [MatCardModule, MatDividerModule, HttpClientModule, DatePipe, MatGridListModule],
	templateUrl: './information.component.html',
	styleUrl: './information.component.scss'
})
export class InformationComponent {
	// TO BE IMPLEMENTED
}
