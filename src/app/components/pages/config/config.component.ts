import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { SensorService } from '../../../services/sensor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent implements OnInit {
  deviceList: any = []
  selectedDevice: any;

  fullConfig = {}
  selectedType: string = 'temperature';
  selectedMin: number = 0;
  selectedMax: number = 0;
  selectedConfig: string = "";

  constructor(private sensorService: SensorService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.selectedDevice = params.get('currentDevice');
    });

    this.sensorService
      .getDevices().subscribe(devices => {
        this.deviceList = devices
        devices.map((device: any) => {
          if (device.deviceEui === this.selectedDevice) {
            this.selectedDevice = device
          }
        });
        this.sensorService.getConfig(this.selectedDevice.deviceEui).subscribe(config => {
          this.fullConfig = config;
          if(config.temperature) {
            this.selectedType = 'temperature';
          } else if(config.humidity) {
            this.selectedType = 'humidity';
          } else if(config.light) {
            this.selectedType = 'light';
          }
          this.selectedMin = config[this.selectedType].min;
          this.selectedMax = config[this.selectedType].max;

          console.log(this.selectedType, this.selectedMin, this.selectedMax, this.fullConfig);
        });
      });

      
  }

  onSelect(event: any) {
    this.selectedDevice = event;
  }

  addConfig() {
    const config = {
      [this.selectedType]: {
        min: this.selectedMin,
        max: this.selectedMax
      }
    };
    this.fullConfig = {
      ...this.fullConfig,
      ...config
    };
    this.sensorService.putConfig(this.selectedDevice.deviceEui, this.fullConfig).subscribe(() => {
      this.selectedConfig = JSON.stringify(this.fullConfig, null, 2);
    });
  }

  onChangeType() {
    console.log(this.fullConfig)
    
    if((this.fullConfig as any).temperature) {
      this.selectedMin = (this.fullConfig as any).temperature.min
      this.selectedMax = (this.fullConfig as any).temperature.max
    } 
    if((this.fullConfig as any).humidity) {
      this.selectedMin = (this.fullConfig as any).humidity.min
      this.selectedMax = (this.fullConfig as any).humidity.max
    } 
    if((this.fullConfig as any).light) {
      this.selectedMin = (this.fullConfig as any).light.min
      this.selectedMax = (this.fullConfig as any).light.max
    }
    console.log(this.selectedType, this.selectedMin, this.selectedMax);
    
  }
}
