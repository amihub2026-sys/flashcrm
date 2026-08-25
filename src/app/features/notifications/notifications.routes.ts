import { Routes } from '@angular/router';

export const NOTIFICATIONS_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./notifications.component').then(
        m => m.NotificationsComponent
      )
  },

  {
    path: 'new',
    loadComponent: () =>
      import('./notification-form/notification-form.component').then(
        m => m.NotificationFormComponent
      )
  }

];