import { Routes } from '@angular/router';

export const JOB_CARDS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./job-cards.component').then(m => m.JobCardsComponent) }
];
