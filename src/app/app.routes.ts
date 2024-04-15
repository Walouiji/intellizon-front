import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ConfigComponent } from './components/pages/config/config.component';
import { InformationComponent } from './components/information/information.component';
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
        'path': 'info',
        'component': InformationComponent
    },
    {
        'path': 'chart',
        'component': ChartComponent
    }
];
