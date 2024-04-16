import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ConfigComponent } from './components/pages/config/config.component';
import { CardComponent } from './components/information/card.component';
import { ChartComponent } from './components/chart/chart.component';

export const routes: Routes = [
    {
        'path': '',
        'component': HomeComponent,
    },
    {
        'path': 'configuration',
        'component': ConfigComponent
    },
    {
        'path': 'card',
        'component': CardComponent
    },
    {
        'path': 'chart',
        'component': ChartComponent
    }
];
