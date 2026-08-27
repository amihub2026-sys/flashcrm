import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { DatePipe } from '@angular/common';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import {
  ContractTeamData,
  ContractTeamKycFile,
  ContractTeamMemberData,
  ContractTeamStore
} from '../../../core/services/contract-team-store';


@Component({
  selector: 'app-contract-team-details',
  standalone: true,

  imports: [
    RouterLink,
    DatePipe
  ],

  templateUrl: './contract-team-details.html',

  styleUrl: './contract-team-details.css',

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractTeamDetails
  implements OnInit, OnDestroy {


  // ============================================================
  // CURRENT TEAM
  // ============================================================

  team: ContractTeamData | undefined;


  // ============================================================
  // TEMPORARY OBJECT URLS
  // ============================================================

  private readonly objectUrls: string[] = [];


  // ============================================================
  // CONSTRUCTOR
  // ============================================================

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: ContractTeamStore
  ) {}


  // ============================================================
  // INITIALIZE
  // ============================================================

  ngOnInit(): void {

    const teamId =
      this.route.snapshot.paramMap.get('id');


    if (!teamId) {
      return;
    }


    this.team =
      this.store.getTeamById(teamId);
  }


  // ============================================================
  // CLEANUP
  // ============================================================

  ngOnDestroy(): void {

    this.objectUrls.forEach(
      url => URL.revokeObjectURL(url)
    );

    this.objectUrls.length = 0;
  }


  // ============================================================
  // MEMBERS
  // ============================================================

  get members(): ContractTeamMemberData[] {

    return this.team?.members ?? [];
  }


  // ============================================================
  // TOTAL KYC FILES
  // ============================================================

  get totalKycFiles(): number {

    return this.members.reduce(
      (
        total,
        member
      ) => {

        return total +
          (member.kycDocuments?.length ?? 0);
      },

      0
    );
  }


  // ============================================================
  // GET MEMBER KYC FILES
  // ============================================================

  getMemberKycFiles(
    member: ContractTeamMemberData
  ): ContractTeamKycFile[] {

    return member.kycDocuments ?? [];
  }


  // ============================================================
  // VIEW KYC FILE
  // ============================================================

  viewFile(
    kycDocument: ContractTeamKycFile
  ): void {

    if (!kycDocument?.file) {
      return;
    }


    const url =
      URL.createObjectURL(
        kycDocument.file
      );


    this.objectUrls.push(url);


    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );
  }


  // ============================================================
  // DOWNLOAD KYC FILE
  // ============================================================

  downloadFile(
    kycDocument: ContractTeamKycFile
  ): void {

    if (!kycDocument?.file) {
      return;
    }


    const url =
      URL.createObjectURL(
        kycDocument.file
      );


    this.objectUrls.push(url);


    /*
     * IMPORTANT:
     * Use window.document here.
     * The parameter is called kycDocument,
     * so there is no naming conflict.
     */

    const anchor =
      window.document.createElement('a');


    anchor.href = url;


    anchor.download =
      kycDocument.fileName ||
      kycDocument.file.name ||
      'kyc-document';


    window.document.body.appendChild(
      anchor
    );


    anchor.click();


    window.document.body.removeChild(
      anchor
    );
  }


  // ============================================================
  // FORMAT FILE SIZE
  // ============================================================

  formatFileSize(
    size: number
  ): string {

    if (!size) {

      return '0 KB';
    }


    if (size < 1024) {

      return `${size} B`;
    }


    if (
      size <
      1024 * 1024
    ) {

      return `${(
        size / 1024
      ).toFixed(1)} KB`;
    }


    return `${(
      size /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  }


  // ============================================================
  // FILE ICON
  // ============================================================

  getFileIcon(
    kycDocument: ContractTeamKycFile
  ): string {

    const mime =
      kycDocument.mimeType ||
      kycDocument.file?.type ||
      '';


    if (
      mime.startsWith('image/')
    ) {

      return '🖼️';
    }


    if (
      mime ===
      'application/pdf'
    ) {

      return '📄';
    }


    return '📎';
  }


  // ============================================================
  // STATUS CLASS
  // ============================================================

  getStatusClass(
    status: string
  ): string {

    return (
      status || ''
    )
      .toLowerCase()
      .replace(
        /\s+/g,
        '-'
      );
  }

}