import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { ChartComponent } from '../chart/chart.component';

@Component({
	selector: 'card',
	standalone: true,
	imports: [MatCardModule, MatDividerModule, HttpClientModule, DatePipe, MatGridListModule, MatIconModule, ChartComponent],
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss'
})
export class CardComponent {
	@Input() tempActuel!: number;
	@Input() tempIdeal!: number;

	//pour le graphique
	@Input() type!: string;
    @Input() color!: string; // Au format "rrr, ggg, bbb"
    @Input() data!: { time: Date; value: number; }[];
}
