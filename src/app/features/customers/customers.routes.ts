import { Routes } from '@angular/router';

export const CUSTOMERS_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./customers.component').then(
        m => m.CustomersComponent
      )
  },

  {
    path: 'new',
    loadComponent: () =>
      import('./customer-form/customer-form.component').then(
        m => m.CustomerFormComponent
      )
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./customer-profile/customer-profile.component').then(
        m => m.CustomerProfileComponent
      )
  }

];