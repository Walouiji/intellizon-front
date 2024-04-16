import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_KEY } from '../../environment/environment';
import { SensorData } from '../models/sensor-data/sensor-data.interface';

@Injectable({
    providedIn: 'root'
})
export class SensorService {

    constructor(
        private http: HttpClient
    ) { }

    getData(devEUI: string, startDate: string, endDate: string): Observable<SensorData[]> {
        const url = `${API_BASE_URL}getDataRange/${devEUI}?start=${startDate}&end=${endDate}`;
        const headers = new HttpHeaders({
            'Authorization': API_KEY
        });
        return this.http.get<SensorData[]>(url, { headers: headers });
    }
    getDevices(): Observable<any> {
        const url = API_BASE_URL + "collections";
        const headers = new HttpHeaders({
            'Authorization': API_KEY
        });
        return this.http.get(url, { headers: headers });
    }
}
