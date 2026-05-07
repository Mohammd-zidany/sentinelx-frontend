import { Routes } from '@angular/router';
import { Zones } from './pages/zones/zones';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Reports } from './pages/reports/reports';
import { Dashboard } from './pages/dashboard/dashboard';
import { Cameras } from './pages/cameras/cameras';
import { Alerts } from './pages/alerts/alerts';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,

        children: [
            {
                path: '',
                component: Dashboard,
            },

            {
                path: 'cameras',
                component: Cameras,
            },

            {
                path: 'alerts',
                component: Alerts,
            },
            {
                path: 'zones',
                component: Zones,
            },
            {
                path: 'reports',
                component: Reports,
            }, {
                path: 'settings',
                component: Settings,
            },
        ],
    },
];