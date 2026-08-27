import { Routes } from '@angular/router';

export const CONTRACT_TEAMS_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./contract-teams').then(
        m => m.ContractTeams
      )
  },

  {
    path: 'new',
    loadComponent: () =>
      import('./contract-team-form/contract-team-form').then(
        m => m.ContractTeamForm
      )
  },

  {
    path: 'details/:id',
    loadComponent: () =>
      import('./contract-team-details/contract-team-details').then(
        m => m.ContractTeamDetails
      )
  }

];