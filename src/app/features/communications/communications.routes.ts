import { Routes } from '@angular/router';

export const COMMUNICATIONS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./communications.component').then(m => m.CommunicationsComponent) }
];
