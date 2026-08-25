import { Routes } from '@angular/router';

export const JOB_SCHEDULING_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./job-scheduling.component').then(m => m.JobSchedulingComponent) }
];
