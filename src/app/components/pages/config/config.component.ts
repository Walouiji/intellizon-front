

import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { SensorService } from '../../../services/sensor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../../../models/device/device.interface';


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
    deviceList: Device[] = [];
    selectedDevice: any;

    connectedLightsList: any[] = [];

    selectedType: string = 'temperature';

    minTemperature = -100;
    maxTemperature = 100;
    minHumidity = 0;
    maxHumidity = 100;
    selectedLight = "";
    lightValue = 0;

    configTemperature: { temperature: { min: number, max: number } } | undefined;
    configHumidity: { humidity: { min: number, max: number } } | undefined;
    configLight: { light: { toggle: number, controlledLights: string[] } } | undefined;

    constructor(
        private sensorService: SensorService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const deviceEui = params['deviceEui'];  // <url>/config?deviceEui=<deviceEui>
            this.selectedDevice = deviceEui;

            this.getDeviceList();
        });

        // Requête pour récupérer la liste des lumières connectées
        this.sensorService.getConnectedLight().subscribe((connectedlights) => {
            this.connectedLightsList = connectedlights;
        });
    }

    // Requête pour récupérer la liste des appareils
    getDeviceList(): void {
        this.sensorService.getDevices().subscribe((devices) => {
            this.deviceList = devices;
            this.selectedDevice = this.deviceList.find(
                (device) => device.deviceEui === this.selectedDevice
            );
        });
    }

    // Changer d'appareil avec le dropdown
    onSelect(event: any) {
        this.selectedDevice = event;
        this.router.navigate(['config'], {  // <url>/config?deviceEui=<deviceEui>
            queryParams: { deviceEui: this.selectedDevice.deviceEui }
        });
    }


    /* Entrées de formulaire */


    saveTempConfig() {
        switch (this.selectedType) {
            case 'temperature':
                this.configTemperature = {
                    temperature: {
                        min: this.minTemperature,
                        max: this.maxTemperature
                    }
                }
                break;
            case 'humidity':
                this.configHumidity = {
                    humidity: {
                        min: this.minHumidity,
                        max: this.maxHumidity
                    }
                }
                break;
            case 'light':
                this.configLight = {
                    light: {
                        toggle: this.lightValue,
                        controlledLights: [this.selectedLight]
                    }
                }
                break;
        }
    }

    getLightName(uuid: string): string {
        const cl = this.connectedLightsList.find((cl) => cl.id === uuid);
        return cl ? cl.name : cl.id;
    }

}