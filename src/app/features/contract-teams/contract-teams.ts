import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import { RouterLink } from '@angular/router';

import {
  ContractTeamData,
  ContractTeamStore
} from '../../core/services/contract-team-store';


@Component({
  selector: 'app-contract-teams',

  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './contract-teams.html',

  styleUrl: './contract-teams.css',

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractTeams implements OnInit {

  // ============================================================
  // DATA
  // ============================================================

  teams: ContractTeamData[] = [];

  searchTerm = '';


  constructor(
    private readonly store: ContractTeamStore
  ) {}


  // ============================================================
  // INIT
  // ============================================================

  ngOnInit(): void {

    this.loadTeams();
  }


  // ============================================================
  // LOAD TEAMS
  // ============================================================

  loadTeams(): void {

    this.teams =
      this.store.getTeams();
  }


  // ============================================================
  // FILTERED TEAMS
  // ============================================================

  get filteredTeams(): ContractTeamData[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();


    if (!search) {

      return this.teams;
    }


    return this.teams.filter(
      team =>
        team.teamName
          .toLowerCase()
          .includes(search) ||

        team.teamCode
          .toLowerCase()
          .includes(search) ||

        team.contactPersonName
          .toLowerCase()
          .includes(search) ||

        team.primaryPhone
          .includes(search) ||

        team.area
          .toLowerCase()
          .includes(search)
    );
  }


  // ============================================================
  // SUMMARY
  // ============================================================

  get totalTeams(): number {

    return this.teams.length;
  }


  get activeTeams(): number {

    return this.teams.filter(
      team =>
        team.status === 'Active'
    ).length;
  }


  get activeJobs(): number {

    /*
     * Jobs will be connected later
     * when Job Scheduling / Job Cards
     * are connected to Contract Teams.
     */
    return 0;
  }


  get pendingSettlement(): number {

    /*
     * Settlement calculation will be
     * connected later.
     */
    return 0;
  }


  // ============================================================
  // MEMBER COUNT
  // ============================================================

  getMemberCount(
    team: ContractTeamData
  ): number {

    return team.members?.length ?? 0;
  }


  // ============================================================
  // KYC COUNT
  // ============================================================

  getKycCount(
    team: ContractTeamData
  ): number {

    return team.members.reduce(
      (
        total,
        member
      ) =>
        total +
        (
          member.kycDocuments?.length ?? 0
        ),
      0
    );
  }


  // ============================================================
  // SEARCH
  // ============================================================

  onSearch(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    this.searchTerm =
      input.value;
  }


  // ============================================================
  // CLEAR SEARCH
  // ============================================================

  clearSearch(): void {

    this.searchTerm = '';
  }


  // ============================================================
  // TRACK BY
  // ============================================================

  trackByTeamId(
    index: number,
    team: ContractTeamData
  ): string {

    return team.id;
  }

}