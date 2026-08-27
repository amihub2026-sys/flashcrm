import { Routes } from '@angular/router';

import { CrmLayoutComponent } from './layout/crm-layout.component';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        m => m.LoginComponent
      )
  },

  {
    path: '',
    component: CrmLayoutComponent,

    children: [

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(
            m => m.DASHBOARD_ROUTES
          )
      },

      {
        path: 'customers',
        loadChildren: () =>
          import('./features/customers/customers.routes').then(
            m => m.CUSTOMERS_ROUTES
          )
      },

      {
        path: 'ac-units',
        loadChildren: () =>
          import('./features/ac-units/ac-units.routes').then(
            m => m.AC_UNITS_ROUTES
          )
      },

      {
        path: 'installations',
        loadChildren: () =>
          import('./features/installations/installations.routes').then(
            m => m.INSTALLATIONS_ROUTES
          )
      },

      {
        path: 'services',
        loadChildren: () =>
          import('./features/services/services.routes').then(
            m => m.SERVICES_ROUTES
          )
      },

      {
        path: 'amc',
        loadChildren: () =>
          import('./features/amc/amc.routes').then(
            m => m.AMC_ROUTES
          )
      },

      {
        path: 'ewc',
        loadChildren: () =>
          import('./features/ewc/ewc.routes').then(
            m => m.EWC_ROUTES
          )
      },

      {
        path: 'reminders',
        loadChildren: () =>
          import('./features/reminders/reminders.routes').then(
            m => m.REMINDERS_ROUTES
          )
      },

      {
        path: 'communications',
        loadChildren: () =>
          import('./features/communications/communications.routes').then(
            m => m.COMMUNICATIONS_ROUTES
          )
      },

      {
        path: 'notifications',
        loadChildren: () =>
          import('./features/notifications/notifications.routes').then(
            m => m.NOTIFICATIONS_ROUTES
          )
      },

      {
        path: 'technicians',
        loadChildren: () =>
          import('./features/technicians/technicians.routes').then(
            m => m.TECHNICIANS_ROUTES
          )
      },
{
  path: 'contract-teams',
  loadChildren: () =>
    import('./features/contract-teams/contract-teams.routes').then(
      m => m.CONTRACT_TEAMS_ROUTES
    )
},
      {
        path: 'job-scheduling',
        loadChildren: () =>
          import('./features/job-scheduling/job-scheduling.routes').then(
            m => m.JOB_SCHEDULING_ROUTES
          )
      },

      {
        path: 'job-cards',
        loadChildren: () =>
          import('./features/job-cards/job-cards.routes').then(
            m => m.JOB_CARDS_ROUTES
          )
      },

      {
        path: 'parts-history',
        loadChildren: () =>
          import('./features/parts-history/parts-history.routes').then(
            m => m.PARTS_HISTORY_ROUTES
          )
      },

      {
        path: 'inventory',
        loadChildren: () =>
          import('./features/inventory/inventory.routes').then(
            m => m.INVENTORY_ROUTES
          )
      },

      {
        path: 'quotations',
        loadChildren: () =>
          import('./features/quotations/quotations.routes').then(
            m => m.QUOTATIONS_ROUTES
          )
      },

      {
        path: 'billing',
        loadChildren: () =>
          import('./features/billing/billing.routes').then(
            m => m.BILLING_ROUTES
          )
      },

      {
        path: 'calendar',
        loadChildren: () =>
          import('./features/calendar/calendar.routes').then(
            m => m.CALENDAR_ROUTES
          )
      },

      {
        path: 'reports',
        loadChildren: () =>
          import('./features/reports/reports.routes').then(
            m => m.REPORTS_ROUTES
          )
      },

      {
        path: 'users',
        loadChildren: () =>
          import('./features/users/users.routes').then(
            m => m.USERS_ROUTES
          )
      },

      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.routes').then(
            m => m.SETTINGS_ROUTES
          )
      },

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }

];