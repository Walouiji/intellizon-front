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
	@Input() actualValue!: any | undefined;
	@Input() goalValue!: number | undefined;
	@Input() unit!: string | undefined;

	@Input() state!: string;

	@Input() currentDevice: string | undefined

	@Input() type!: string;
	@Input() color!: string; // Au format "rrr, ggg, bbb"
	@Input() data!: { time: Date; value: number; }[];

	type_string!: string;
	@Input() icon!: string;

	ngOnInit(): void {
		this.type_string = types[this.type as keyof typeof types]
	}

}
