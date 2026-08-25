import { Routes } from '@angular/router';

export const AC_UNITS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./ac-units.component').then(m => m.AcUnitsComponent) }
];
