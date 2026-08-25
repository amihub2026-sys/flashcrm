import { Routes } from '@angular/router';

export const PARTS_HISTORY_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./parts-history.component').then(m => m.PartsHistoryComponent) }
];
