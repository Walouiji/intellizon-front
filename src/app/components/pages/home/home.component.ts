import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { SensorService } from '../../../services/sensor.service';
import { CardComponent } from '../../information/card.component';
import { ChartComponent } from "../../chart/chart.component";
import { Observable, concatMap, of, tap } from 'rxjs';


@Component({
    selector: 'home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CardComponent, ChartComponent, MatFormFieldModule, MatSelectModule, FormsModule, MatButtonToggleModule]
})
export class HomeComponent implements OnInit, AfterViewInit {

    public temperatureData!: { time: Date; value: number; }[];
    public humidityData!: { time: Date; value: number; }[];
    public lightData!: { time: Date; value: number; }[];

    public latestTemperatureData!: { value: number; unit: string; };
    public latestHumidityData!: { value: number; unit: string; };
    public latestLightData!: { value: number; unit: string; };

    public configTemperatureData: { min: number, max: number } = { min: 0, max: 0 };
    public configHumidityData: { min: number, max: number } = { min: 0, max: 0 };
    public configLightData: { min: number, max: number } = { min: 0, max: 0 };

    public configTemperature: any | undefined;
    public configHumidity: any | undefined;
    public configLight: any | undefined;

    public t_icon!: string;
    public h_icon!: string;
    public l_icon!: string;

    public t_state!: string;
    public h_state!: string;
    public l_state!: boolean;

    deviceList: any = []
    selectedDevice: any;
    selectedDayCount = 1;

    constructor(private sensorService: SensorService) { }

    ngOnInit(): void {
        this.sensorService
            .getDevices()
            .pipe(
                tap(devices => {
                    this.deviceList = devices;
                    this.selectedDevice = this.deviceList[0];
                    this.updateConfigFields(this.selectedDevice.deviceEui);
                }),
                concatMap(() => this.updateCardInfos()),
                concatMap(() => this.updateChart()),
                concatMap(() => this.updateConfigFields(this.selectedDevice.deviceEui)),
            )
            .subscribe();

        this.latestTemperatureData = { value: 0, unit: '°C' };
        this.latestHumidityData = { value: 0, unit: '%' };
        this.latestLightData = { value: 0, unit: 'lx' };

    }
    ngAfterViewInit(): void {
        // this.updateConfigFields();
    }

    /**
     * Requêter le serveur pour obtenir les données d'appareil pour être utilisées par les Charts
     */
    updateChart(): Observable<any> {
        const now = new Date();
        const dateFromDayCount = new Date(new Date().setDate(new Date().getDate() - this.selectedDayCount));

        return this.sensorService
            .getData(this.selectedDevice.deviceEui, dateFromDayCount.toISOString(), now.toISOString())
            .pipe(
                tap(sensorData => {
                    this.temperatureData = sensorData.map(d => ({ time: d.datetime, value: parseFloat(d.temperature.value.toFixed(1)) }));
                    this.humidityData = sensorData.map(d => ({ time: d.datetime, value: parseFloat(d.humidity.value.toFixed(1)) }));
                    this.lightData = sensorData.map(d => ({ time: d.datetime, value: parseFloat(d.light.value.toFixed(1)) }));
                })
            );
    }

    updateCardInfos(): Observable<any> {
        return this.sensorService
            .getLatestData(this.selectedDevice.deviceEui)
            .pipe(
                tap(data => {
                    this.latestTemperatureData = data.temperature
                    this.latestHumidityData = data.humidity
                    this.latestLightData = data.light
                })
            );
    }
    updateConfigFields(device: any){
        return this.sensorService
            .getConfig(device)
            .pipe(
                tap(data => {
                    this.configTemperatureData = data.temperature;
                    this.configHumidityData = data.humidity;
                    this.configLightData = data.light;

                    if(this.configTemperatureData.max !== undefined && this.configTemperatureData.min !== undefined) {
                        this.configTemperature = (this.configTemperatureData.min + this.configTemperatureData.max) / 2;
                    } else if (this.configTemperatureData.min !== undefined && this.configTemperatureData.max === undefined) {
                        this.configTemperature = this.configTemperatureData.min
                    } else if (this.configTemperatureData.min === undefined && this.configTemperatureData.max !== undefined) {
                        this.configTemperature = this.configTemperatureData.max;
                    } else {
                        this.configTemperature = "--"
                    }

                    if(this.configHumidityData.max !== undefined && this.configHumidityData.min !== undefined) {
                        this.configHumidity = (this.configHumidityData.min + this.configHumidityData.max) / 2;
                    } else if (this.configHumidityData.min !== undefined && this.configHumidityData.max === undefined) {
                        this.configHumidity = this.configHumidityData.min
                    } else if (this.configHumidityData.min === undefined && this.configHumidityData.max !== undefined) {
                        this.configHumidity = this.configHumidityData.max;
                    } else {
                        this.configHumidity = "--"
                    }

                    if(this.latestTemperatureData.value! < this.configTemperature!) {
                        this.t_icon = "north_east";
                        this.t_state = "Chauffage activé"
                    } else if (this.latestTemperatureData.value! > this.configTemperature!) {
                        this.t_icon = "south_east";
                        this.t_state = "Climatisation activée"
                    } else {
                        this.t_icon = "horizontal_rule";
                    }
                    if(this.latestHumidityData.value! < this.configHumidity!) {
                        this.h_icon = "north_east";
                        this.h_state = "Humidification"
                    } else if (this.latestHumidityData.value! > this.configHumidity!) {
                        this.h_icon = "south_east";
                        this.h_state = "Déshumidification"
                    } else {
                        this.h_icon = "horizontal_rule";
                    }

                    if(this.latestLightData.value < 100) {
                        this.l_state = false
                    } else {
                        this.l_state = true
                    }
                })
            );
    }

    onSelect(event: any) {
        this.selectedDevice = event;
        of(null).pipe(
            concatMap(() => this.updateCardInfos()),
            concatMap(() => this.updateChart()),
            concatMap(() => this.updateConfigFields(this.selectedDevice.deviceEui))
        ).subscribe();
        this.updateConfigFields(this.selectedDevice.deviceEui);
    }

    onDayCountChange(event: any) {
        this.selectedDayCount = event;
        of(null).pipe(
            concatMap(() => this.updateCardInfos()),
            concatMap(() => this.updateChart())
        ).subscribe();
    }
}
