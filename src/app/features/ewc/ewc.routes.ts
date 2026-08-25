import { Routes } from '@angular/router';

export const EWC_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./ewc.component').then(m => m.EwcComponent) }
];
