import { Injectable } from '@angular/core';

import {
  ContractTeamDocumentType
} from '../models/contract-team-document.model';

import {
  ContractTeamJob
} from '../models/contract-team-job.model';


export interface ContractTeamKycFile {
  documentType: ContractTeamDocumentType;

  file: File;

  fileName: string;

  fileSize: number;

  mimeType: string;
}


export interface ContractTeamMemberData {
  name: string;

  phone: string;

  alternatePhone: string;

  role: string;

  address: string;

  area: string;

  city: string;

  pincode: string;

  kycVerified: boolean;

  status: string;

  notes: string;

  kycDocuments: ContractTeamKycFile[];
}


export interface ContractTeamData {
  id: string;

  teamName: string;

  teamCode: string;

  contactPersonName: string;

  primaryPhone: string;

  alternatePhone: string;

  whatsappAvailable: boolean;

  preferredContact: string;

  email: string;

  address: string;

  area: string;

  city: string;

  pincode: string;

  status: string;

  notes: string;

  members: ContractTeamMemberData[];

  createdAt: string;
}


@Injectable({
  providedIn: 'root'
})
export class ContractTeamStore {

  // ============================================================
  // CONTRACT TEAMS
  // ============================================================

  private readonly teams: ContractTeamData[] = [];


  // ============================================================
  // CONTRACT TEAM JOBS
  // ============================================================

  private readonly jobs: ContractTeamJob[] = [];


  // ============================================================
  // ADD TEAM
  // ============================================================

  addTeam(
    team: ContractTeamData
  ): void {

    this.teams.push(team);
  }


  // ============================================================
  // GET ALL TEAMS
  // ============================================================

  getTeams(): ContractTeamData[] {

    return [
      ...this.teams
    ];
  }


  // ============================================================
  // GET TEAM BY ID
  // ============================================================

  getTeamById(
    id: string
  ): ContractTeamData | undefined {

    return this.teams.find(
      team =>
        team.id === id
    );
  }


  // ============================================================
  // UPDATE TEAM
  // ============================================================

  updateTeam(
    updatedTeam: ContractTeamData
  ): boolean {

    const index =
      this.teams.findIndex(
        team =>
          team.id === updatedTeam.id
      );


    if (index === -1) {

      return false;
    }


    this.teams[index] =
      updatedTeam;


    return true;
  }


  // ============================================================
  // DELETE TEAM
  // ============================================================

  deleteTeam(
    id: string
  ): boolean {

    const index =
      this.teams.findIndex(
        team =>
          team.id === id
      );


    if (index === -1) {

      return false;
    }


    this.teams.splice(
      index,
      1
    );


    // Also remove jobs belonging to this team.

    for (
      let i = this.jobs.length - 1;
      i >= 0;
      i--
    ) {

      if (
        this.jobs[i].teamId === id
      ) {

        this.jobs.splice(
          i,
          1
        );
      }
    }


    return true;
  }


  // ============================================================
  // TEAM COUNT
  // ============================================================

  getTotalTeams(): number {

    return this.teams.length;
  }


  // ============================================================
  // ACTIVE TEAM COUNT
  // ============================================================

  getActiveTeams(): number {

    return this.teams.filter(
      team =>
        team.status === 'Active'
    ).length;
  }


  // ============================================================
  // ADD JOB
  // ============================================================

  addJob(
    job: ContractTeamJob
  ): void {

    this.jobs.push(
      job
    );
  }


  // ============================================================
  // GET ALL JOBS
  // ============================================================

  getJobs(): ContractTeamJob[] {

    return [
      ...this.jobs
    ];
  }


  // ============================================================
  // GET JOB BY ID
  // ============================================================

  getJobById(
    id: string
  ): ContractTeamJob | undefined {

    return this.jobs.find(
      job =>
        job.id === id
    );
  }


  // ============================================================
  // GET JOBS FOR TEAM
  // ============================================================

  getJobsByTeamId(
    teamId: string
  ): ContractTeamJob[] {

    return this.jobs.filter(
      job =>
        job.teamId === teamId
    );
  }


  // ============================================================
  // UPDATE JOB
  // ============================================================

  updateJob(
    updatedJob: ContractTeamJob
  ): boolean {

    const index =
      this.jobs.findIndex(
        job =>
          job.id === updatedJob.id
      );


    if (index === -1) {

      return false;
    }


    this.jobs[index] =
      updatedJob;


    return true;
  }


  // ============================================================
  // DELETE JOB
  // ============================================================

  deleteJob(
    id: string
  ): boolean {

    const index =
      this.jobs.findIndex(
        job =>
          job.id === id
      );


    if (index === -1) {

      return false;
    }


    this.jobs.splice(
      index,
      1
    );


    return true;
  }


  // ============================================================
  // TOTAL JOBS
  // ============================================================

  getTotalJobs(): number {

    return this.jobs.length;
  }


  // ============================================================
  // ACTIVE JOBS
  // ============================================================

  getActiveJobs(): number {

    return this.jobs.filter(
      job =>
        job.status === 'Pending' ||
        job.status === 'Assigned' ||
        job.status === 'In Progress'
    ).length;
  }


  // ============================================================
  // PENDING TEAM SETTLEMENT
  // ============================================================

  getPendingTeamSettlement(): number {

    return this.jobs.reduce(
      (
        total,
        job
      ) => {

        return total +
          Math.max(
            Number(
              job.pendingTeamSettlement
            ) || 0,
            0
          );
      },

      0
    );
  }


  // ============================================================
  // TEAM PENDING SETTLEMENT
  // ============================================================

  getPendingSettlementByTeamId(
    teamId: string
  ): number {

    return this.jobs
      .filter(
        job =>
          job.teamId === teamId
      )
      .reduce(
        (
          total,
          job
        ) => {

          return total +
            Math.max(
              Number(
                job.pendingTeamSettlement
              ) || 0,
              0
            );
        },

        0
      );
  }


  // ============================================================
  // CLEAR ALL
  // ============================================================

  clear(): void {

    this.teams.length = 0;

    this.jobs.length = 0;
  }

}