import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { InformationService } from './information.service';
import { Observable } from 'rxjs';
import { Weather } from '../models/weather/weather.model';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';


const API_URL = "http://4be9040e-6581-4b9e-9321-b9357adf4fa2.pub.instances.scw.cloud:3000"
// const API_URL = "http://localhost:3000"
const urlLastDataResource = API_URL + "/api/intellizon-front/getLatestData"
const urlRangeDataResource = API_URL + "/api/intellizon-front/getDataRange"

const headers = { 'Content-Type': 'application/json', 'Authorization': 'API_KEY' };

@Component({
	selector: 'information',
	standalone: true,
	imports: [MatCardModule, MatDividerModule, HttpClientModule],
	templateUrl: './information.component.html',
	styleUrl: './information.component.scss'
})
export class InformationComponent implements OnInit{

	lastData: any;
	rangeDate: any;

	constructor(protected http: HttpClient) { }

	getLastInfos(): Observable<Weather> {
		return this.http.get<Weather>(urlLastDataResource, { headers });
	  }
	getRangeInfo(): Observable<any> {
		const params = new HttpParams().set('start', '2024-01-01').set('end', '2024-12-12');
		// const params = { start: "2024-01-01", end: "2024-12-12" };
		return this.http.get<any>(urlRangeDataResource, { headers, params});
	}

	ngOnInit() {
		this.getLastInfos().subscribe(data => {
			this.lastData = data;
		});
		this.getRangeInfo().subscribe(data => {
			this.rangeDate = data;
		});
	}

	onClick() {
		console.log(this.rangeDate);
	}
}
