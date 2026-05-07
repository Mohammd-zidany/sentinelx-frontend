import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main-layout/main-layout';

import { Dashboard } from './pages/dashboard/dashboard';
import { Cameras } from './pages/cameras/cameras';
import { Alerts } from './pages/alerts/alerts';
import { Zones } from './pages/zones/zones';
import { Reports } from './pages/reports/reports';
import { Settings } from './pages/settings/settings';

import { Login } from './pages/login/login';

export const routes: Routes = [

  {
    path: 'login',
    component: Login,
  },

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
      },

      {
        path: 'settings',
        component: Settings,
      },

    ],
  },

];