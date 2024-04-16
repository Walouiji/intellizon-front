import { Component, OnInit } from '@angular/core';
import { SensorService } from '../../../services/sensor.service';
import { SensorData } from '../../../models/sensor-data/sensor-data.interface';
import { Chart } from 'chart.js/auto';
import { CardComponent } from '../../information/card.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

    public temperatureData!: { time: Date; value: number; }[];
    public humidityData!: { time: Date; value: number; }[];
    public lightData!: { time: Date; value: number; }[];

    constructor(private sensorService: SensorService) { }

    ngOnInit() {
        this.getChartData('2cf7f1c04280041c', new Date('2024-04-16'), new Date('2024-04-17'));
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
}
