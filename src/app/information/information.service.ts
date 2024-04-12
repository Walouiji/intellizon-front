import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../models/weather/weather.model';

const API_URL = "https://3f3b-185-135-236-202.ngrok-free.app"
const urlWeatherResource = API_URL + "/api/intellizon-front/getLatestData"

@Injectable({
	providedIn: 'root'
})
export class InformationService {
	constructor(protected http: HttpClient) {}

	// get Temperature and Humidity
	getWeatherInfos(): Observable<Weather> {
		return this.http.get<Weather>(urlWeatherResource, {headers: { 'Content-Type': 'application/json', 'Authorization': 'wLkOJUkQPfCoVEQCI78qo6oup408TjIRI4X1lvDvXLGlkQvkeY'}});
	}
}
