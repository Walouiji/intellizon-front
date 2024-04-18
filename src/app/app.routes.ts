import { Routes } from '@angular/router';
import { ConfigComponent } from './components/pages/config/config.component';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'config',
        component: ConfigComponent,
    }
];
