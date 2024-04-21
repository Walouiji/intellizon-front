import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { ChartComponent } from '../chart/chart.component';
import { SensorService } from '../../services/sensor.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { types } from '../../models/enumerators/types.enum';
@Component({
	selector: 'card',
	standalone: true,
	imports: [MatCardModule, MatDividerModule, HttpClientModule, DatePipe, MatGridListModule, MatIconModule, ChartComponent, MatButtonModule, RouterModule],
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
	@Input() actualValue!: number | undefined;
	@Input() goalValue!: { min: number, max: number } | undefined;
	@Input() unit!: string | undefined;

	@Input() currentDevice: string | undefined

	@Input() type!: string;
	@Input() color!: string; // Au format "rrr, ggg, bbb"
	@Input() data!: { time: Date; value: number; }[];

	type_string!: string;
	goal_number!: number;
	icon!: string;

	ngOnInit(): void {
		if(this.goalValue?.min && this.goalValue?.max) {
			this.goal_number = (this.goalValue.min + this.goalValue.max) / 2;
		} else if(this.goalValue?.min && !this.goalValue?.max) {
			this.goal_number = this.goalValue.min;
		} else if(!this.goalValue?.min && this.goalValue?.max) {
			this.goal_number = this.goalValue.max;
		}

		if(this.actualValue! < this.goal_number!) {
			console.log("inferieur")
			this.icon = "north_east";
		} else if (this.actualValue! > this.goal_number!) {
			console.log("supérieur")
			this.icon = "south_east";
		} else {
			console.log("égal")
			this.icon = "horizontal_rule";
		}
		this.type_string = types[this.type as keyof typeof types]
	}

}
