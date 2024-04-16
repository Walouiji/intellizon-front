import { Component, OnInit } from '@angular/core';
import { SensorService } from '../../../services/sensor.service';
import { InformationComponent } from '../../information/information.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'home',
  standalone: true,
  imports: [InformationComponent, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  deviceList: any;
  selectedDevice: any;

  constructor(private dataService: SensorService) { }

  ngOnInit() {
    // this.dataService.getData('2cf7f1c04280041c', '2024-04-13', '').subscribe(data => {

      // console.log(data);
      // this.createChart(data);
    // });
    this.dataService.getDevices().subscribe(data => {
      this.deviceList = data;
      console.log(this.deviceList);
    });
  }

}
