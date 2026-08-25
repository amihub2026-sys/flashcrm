import { Routes } from '@angular/router';

export const AMC_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./amc.component').then(m => m.AmcComponent) }
];
