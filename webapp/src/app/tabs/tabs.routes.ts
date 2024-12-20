import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'input',
        loadComponent: () =>
          import('../input/input.page').then((m) => m.InputPageComponent),
      },
      {
        path: 'report',
        loadComponent: () =>
          import('../report/report.page').then((m) => m.ReportPageComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../settings/settings.page').then(
            (m) => m.SettingsPageComponent
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/settings',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/settings',
    pathMatch: 'full',
  },
];
