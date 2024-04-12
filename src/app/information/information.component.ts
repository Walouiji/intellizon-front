import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { InformationService } from './information.service';
import { Observable } from 'rxjs';
import { Weather } from '../models/weather/weather.model';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { environment } from '../environment/environment';
import { DatePipe } from '@angular/common';


const API_URL = "http://4be9040e-6581-4b9e-9321-b9357adf4fa2.pub.instances.scw.cloud:3000"
// const API_URL = "http://localhost:3000"
const urlLastDataResource = API_URL + "/api/intellizon-front/getLatestData"
const urlRangeDataResource = API_URL + "/api/intellizon-front/getDataRange"

const headers = { 'Content-Type': 'application/json', 'Authorization': environment.apiKey };

@Component({
	selector: 'information',
	standalone: true,
	imports: [MatCardModule, MatDividerModule, HttpClientModule, DatePipe],
	templateUrl: './information.component.html',
	styleUrl: './information.component.scss'
})
export class InformationComponent implements OnInit {

	lastData: any;
	rangeDate: any;

	constructor(protected http: HttpClient) { }

	getLastInfos(): Observable<Weather> {
		return this.http.get<Weather>(urlLastDataResource, { headers });
	}

	async getRangeInfo(start: string, end: string) {
		let response = await fetch("http://4be9040e-6581-4b9e-9321-b9357adf4fa2.pub.instances.scw.cloud:3000/api/intellizon-front/getDataRange?start=" +start + "&end="+end, {
			method: "GET",
			headers: headers
		});

		let data = await response.text();
		return JSON.parse(data);

	}

	ngOnInit() {
		this.getLastInfos().subscribe(data => {
			this.lastData = data;
		});
	}

	onClick() {
		const start = new Date(2024, 0, 1);
		const end = new Date(2024, 0, 30);
		console.log(start.toDateString());
		this.getRangeInfo(start.toDateString(), end.toDateString()).then((data: any) => {
			console.log(data);
		});
	}
}
