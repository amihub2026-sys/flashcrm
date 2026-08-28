import { Routes } from '@angular/router';

export const CONTRACT_TEAMS_ROUTES: Routes = [

  // ============================================================
  // CONTRACT TEAMS LIST
  // ============================================================
  {
    path: '',
    loadComponent: () =>
      import('./contract-teams').then(
        m => m.ContractTeams
      )
  },

  // ============================================================
  // ADD CONTRACT TEAM
  // ============================================================
  {
    path: 'new',
    loadComponent: () =>
      import('./contract-team-form/contract-team-form').then(
        m => m.ContractTeamForm
      )
  },

  // ============================================================
  // CONTRACT TEAM DETAILS
  // ============================================================
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./contract-team-details/contract-team-details').then(
        m => m.ContractTeamDetails
      )
  },

  // ============================================================
  // ADD JOB FOR CONTRACT TEAM
  // ============================================================
  {
    path: 'details/:id/job/new',
    loadComponent: () =>
      import('./contract-team-job-form/contract-team-job-form').then(
        m => m.ContractTeamJobForm
      )
  }

];