import { Routes } from '@angular/router';

export const QUOTATIONS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./quotations.component').then(m => m.QuotationsComponent) }
];
