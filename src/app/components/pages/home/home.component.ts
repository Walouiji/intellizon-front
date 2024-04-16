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

  constructor(private dataService: SensorService) { }

  ngOnInit() {
    this.dataService.getData('2cf7f1c04280041c', '2024-04-13', '').subscribe(data => {

      console.log(data);
      this.createChart(data);
    });
  }

  movingAverage(data: number[], range: number): number[] {
    return data.map((value, index, values) => {
      const window = values.slice(Math.max(index - range, 0), Math.min(index + range + 1, values.length));
      const sum = window.reduce((acc, val) => acc + val, 0);
      return sum / window.length;
    });
  }
  createChart(data: SensorData[]) {

    const dates = data.map(data => new Date(data.datetime).toLocaleDateString('fr-FR'));
    const temperatures = data.map(data => data.temperature.value);
    const smoothedTemperatures = this.movingAverage(temperatures, 5);
    const smoothedHumidity = this.movingAverage(data.map(data => data.humidity.value), 5);
    const smoothedLight = this.movingAverage(data.map(data => data.light.value), 5);

    new Chart('chart', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Température °C',
          data: temperatures,
          borderWidth: 1,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        },
        {
          label: 'Température °C',
          data: smoothedTemperatures,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.2,
          pointRadius: 0,
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.5)'
        },
        {
          label: 'Humidité %',
          data: smoothedHumidity,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.2,
          pointRadius: 0,
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.5)'
        },
        {
          label: 'Luminosité',
          data: smoothedLight,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.2,
          pointRadius: 0,
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.5)'
        }]
      },
      options: {
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 10
            }
          },
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
}
