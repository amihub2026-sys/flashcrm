import { Routes } from '@angular/router';

export const SERVICES_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./services.component').then(
        m => m.ServicesComponent
      )
  },

  {
    path: 'new',
    loadComponent: () =>
      import('./service-form/service-form.component').then(
        m => m.ServiceFormComponent
      )
  }

];