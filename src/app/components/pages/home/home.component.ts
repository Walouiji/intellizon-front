import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { SensorService } from '../../../services/sensor.service';
import { CardComponent } from '../../information/card.component';
import { ChartComponent } from "../../chart/chart.component";


@Component({
    selector: 'home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CardComponent, ChartComponent, MatFormFieldModule, MatSelectModule, FormsModule]
})
export class HomeComponent implements OnInit {

    public temperatureData!: { time: Date; value: number; }[];
    public humidityData!: { time: Date; value: number; }[];
    public lightData!: { time: Date; value: number; }[];

    public latestTemperatureData!: { value: number; unit: string; };
    public latestHumidityData!: { value: number; unit: string; };
    public latestLightData!: { value: number; unit: string; };

    deviceList: any = []
    selectedDevice: any;

    constructor(private sensorService: SensorService) { }

    ngOnInit(): void {
        this.sensorService
            .getDevices().subscribe(devices => {
                this.deviceList = devices;
            });

            this.latestTemperatureData = { value: 0, unit: '°C' };
            this.latestHumidityData = { value: 0, unit: '%' };
            this.latestLightData = { value: 0, unit: 'Lx' };
    }

    /**
     * Requêter le serveur pour obtenir les données d'appareil pour être utilisées par les Charts
     * @param deviceEui Identifiant de l'appareil
     * @param dateStart Filtre sur la date de début
     * @param dateStop Filtre sur la date de fin
     */
    getChartData(deviceEui: string, dateStart: Date, dateStop: Date) {
        this.sensorService
            .getData(deviceEui, dateStart.toISOString(), dateStop.toISOString())
            .subscribe(sensorData => {
                this.temperatureData = sensorData.map(d => ({ time: d.datetime, value: parseFloat(d.temperature.value.toFixed(1)) }));
                this.humidityData = sensorData.map(d => ({ time: d.datetime, value: parseFloat(d.humidity.value.toFixed(1)) }));
                this.lightData = sensorData.map(d => ({ time: d.datetime, value: parseFloat(d.light.value.toFixed(1)) }));
            });
    }

    getLatestData(deviceEui: string) {
        this.sensorService
            .getLatestData(deviceEui)
            .subscribe(sensorData => {
                console.log(sensorData);
                this.latestTemperatureData = sensorData.temperature
                this.latestHumidityData = sensorData.humidity
                this.latestLightData = sensorData.light
                console.log(this.latestTemperatureData);
            });
    }

    onSelect(event: any) {
        this.selectedDevice = event;
        this.getLatestData(this.selectedDevice.deviceEui);
        this.getChartData(this.selectedDevice.deviceEui, new Date('2024-04-16'), new Date('2024-04-17'));
    }
}
