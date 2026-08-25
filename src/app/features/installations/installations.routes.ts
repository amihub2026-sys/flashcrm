import { Routes } from '@angular/router';

export const INSTALLATIONS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./installations.component').then(m => m.InstallationsComponent) }
];
