import { Routes } from '@angular/router';

export const TECHNICIANS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./technicians.component').then(m => m.TechniciansComponent) }
];
