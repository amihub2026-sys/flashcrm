import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import {
  ContractTeamContactPreference,
  ContractTeamStatus
} from '../../../core/models/contract-team.model';

import {
  ContractTeamMemberRole,
  ContractTeamMemberStatus
} from '../../../core/models/contract-team-member.model';

import {
  ContractTeamDocumentType
} from '../../../core/models/contract-team-document.model';

import {
  ContractTeamData,
  ContractTeamKycFile,
  ContractTeamStore
} from '../../../core/services/contract-team-store';

import { BackButton } from '../../../shared/back-button/back-button';


interface SelectedKycDocument {
  documentType: ContractTeamDocumentType;
  file: File;
  fileName: string;
  fileSize: number;
  mimeType: string;
}


@Component({
  selector: 'app-contract-team-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BackButton
  ],
  templateUrl: './contract-team-form.html',
  styleUrl: './contract-team-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractTeamForm implements OnInit, OnDestroy {

  // ============================================================
  // OPTIONS
  // ============================================================

  readonly statusOptions:
    readonly ContractTeamStatus[] = [
      'Active',
      'Inactive',
      'Suspended'
    ];

  readonly contactPreferenceOptions:
    readonly ContractTeamContactPreference[] = [
      'WhatsApp',
      'Call',
      'SMS'
    ];

  readonly memberRoleOptions:
    readonly ContractTeamMemberRole[] = [
      'Team Leader',
      'Technician',
      'Helper',
      'Electrician',
      'Other'
    ];

  readonly memberStatusOptions:
    readonly ContractTeamMemberStatus[] = [
      'Active',
      'Inactive'
    ];

  readonly documentTypeOptions:
    readonly ContractTeamDocumentType[] = [
      'Aadhaar',
      'PAN',
      'Address Proof',
      'Bank Proof',
      'Agreement',
      'Other'
    ];

  // ============================================================
  // KYC SETTINGS
  // ============================================================

  readonly maxKycFileSize = 5 * 1024 * 1024;

  private readonly allowedKycMimeTypes:
    readonly string[] = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf'
    ];

  // ============================================================
  // KYC FILES
  // ============================================================

  private readonly selectedKycDocuments =
    new Map<string, SelectedKycDocument>();

  private readonly kycFileErrors =
    new Map<string, string>();

  // ============================================================
  // FORM
  // ============================================================

  readonly contractTeamForm =
    this.fb.group({

      teamName: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.maxLength(100)
        ]
      }),

      teamCode: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.maxLength(30)
        ]
      }),

      contactPersonName:
        this.fb.control('', {
          validators: [
            Validators.required,
            Validators.maxLength(100)
          ]
        }),

      primaryPhone:
        this.fb.control('', {
          validators: [
            Validators.required,
            Validators.pattern(/^[6-9]\d{9}$/)
          ]
        }),

      alternatePhone:
        this.fb.control('', {
          validators: [
            Validators.pattern(/^$|^[6-9]\d{9}$/)
          ]
        }),

      whatsappAvailable:
        this.fb.control(false),

      preferredContact:
        this.fb.control<ContractTeamContactPreference>(
          'WhatsApp',
          {
            validators: [
              Validators.required
            ]
          }
        ),

      email:
        this.fb.control('', {
          validators: [
            Validators.email,
            Validators.maxLength(150)
          ]
        }),

      address:
        this.fb.control('', {
          validators: [
            Validators.required,
            Validators.maxLength(500)
          ]
        }),

      area:
        this.fb.control('', {
          validators: [
            Validators.required,
            Validators.maxLength(100)
          ]
        }),

      city:
        this.fb.control('Madurai', {
          validators: [
            Validators.required,
            Validators.maxLength(100)
          ]
        }),

      pincode:
        this.fb.control('', {
          validators: [
            Validators.required,
            Validators.pattern(/^\d{6}$/)
          ]
        }),

      status:
        this.fb.control<ContractTeamStatus>(
          'Active',
          {
            validators: [
              Validators.required
            ]
          }
        ),

      notes:
        this.fb.control('', {
          validators: [
            Validators.maxLength(1000)
          ]
        }),

      members:
        this.fb.array<FormGroup>([])
    });

  // ============================================================
  // CONSTRUCTOR
  // ============================================================

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly store: ContractTeamStore,
    private readonly router: Router
  ) {}

  // ============================================================
  // LIFECYCLE
  // ============================================================

  ngOnInit(): void {
    this.addMember();
  }

  ngOnDestroy(): void {
    this.selectedKycDocuments.clear();
    this.kycFileErrors.clear();
  }

  // ============================================================
  // MEMBERS
  // ============================================================

  get members(): FormArray<FormGroup> {
    return this.contractTeamForm.controls.members;
  }

  addMember(): void {

    this.members.push(
      this.fb.group({

        name: this.fb.control('', {
          validators: [
            Validators.required,
            Validators.maxLength(100)
          ]
        }),

        phone: this.fb.control('', {
          validators: [
            Validators.required,
            Validators.pattern(/^[6-9]\d{9}$/)
          ]
        }),

        alternatePhone: this.fb.control('', {
          validators: [
            Validators.pattern(/^$|^[6-9]\d{9}$/)
          ]
        }),

        role:
          this.fb.control<ContractTeamMemberRole>(
            'Technician',
            {
              validators: [
                Validators.required
              ]
            }
          ),

        address: this.fb.control('', {
          validators: [
            Validators.maxLength(500)
          ]
        }),

        area: this.fb.control('', {
          validators: [
            Validators.maxLength(100)
          ]
        }),

        city: this.fb.control('Madurai', {
          validators: [
            Validators.maxLength(100)
          ]
        }),

        pincode: this.fb.control('', {
          validators: [
            Validators.pattern(/^$|^\d{6}$/)
          ]
        }),

        kycVerified:
          this.fb.control(false),

        status:
          this.fb.control<ContractTeamMemberStatus>(
            'Active',
            {
              validators: [
                Validators.required
              ]
            }
          ),

        notes: this.fb.control('', {
          validators: [
            Validators.maxLength(500)
          ]
        })

      })
    );
  }

  removeMember(index: number): void {

    if (
      index < 0 ||
      index >= this.members.length
    ) {
      return;
    }

    for (
      const documentType of
      this.documentTypeOptions
    ) {

      const key =
        this.getKycKey(
          index,
          documentType
        );

      this.selectedKycDocuments.delete(key);
      this.kycFileErrors.delete(key);
    }

    this.members.removeAt(index);
  }

  // ============================================================
  // KYC FILE UPLOAD
  // ============================================================

  onKycFileSelected(
    event: Event,
    memberIndex: number,
    documentType: ContractTeamDocumentType
  ): void {

    const input =
      event.target as HTMLInputElement;

    const file =
      input.files?.[0];

    const key =
      this.getKycKey(
        memberIndex,
        documentType
      );

    this.kycFileErrors.delete(key);

    if (!file) {
      return;
    }

    if (
      !this.allowedKycMimeTypes.includes(
        file.type
      )
    ) {

      this.kycFileErrors.set(
        key,
        'Only JPG, PNG, WEBP or PDF files are allowed.'
      );

      input.value = '';

      return;
    }

    if (file.size <= 0) {

      this.kycFileErrors.set(
        key,
        'The selected file is empty.'
      );

      input.value = '';

      return;
    }

    if (
      file.size >
      this.maxKycFileSize
    ) {

      this.kycFileErrors.set(
        key,
        'File size must be 5 MB or less.'
      );

      input.value = '';

      return;
    }

    const selectedDocument:
      SelectedKycDocument = {

      documentType,

      file,

      fileName:
        file.name,

      fileSize:
        file.size,

      mimeType:
        file.type
    };

    this.selectedKycDocuments.set(
      key,
      selectedDocument
    );

    input.value = '';
  }

  // ============================================================
  // KYC HELPERS
  // ============================================================

  private getKycKey(
    memberIndex: number,
    documentType: ContractTeamDocumentType
  ): string {

    return `${memberIndex}::${documentType}`;
  }

  hasKycDocument(
    memberIndex: number,
    documentType: ContractTeamDocumentType
  ): boolean {

    return this.selectedKycDocuments.has(
      this.getKycKey(
        memberIndex,
        documentType
      )
    );
  }

  getSelectedKycDocument(
    memberIndex: number,
    documentType: ContractTeamDocumentType
  ): SelectedKycDocument | undefined {

    return this.selectedKycDocuments.get(
      this.getKycKey(
        memberIndex,
        documentType
      )
    );
  }

  removeKycDocument(
    memberIndex: number,
    documentType: ContractTeamDocumentType
  ): void {

    const key =
      this.getKycKey(
        memberIndex,
        documentType
      );

    this.selectedKycDocuments.delete(key);
    this.kycFileErrors.delete(key);
  }

  getKycFileError(
    memberIndex: number,
    documentType: ContractTeamDocumentType
  ): string | undefined {

    return this.kycFileErrors.get(
      this.getKycKey(
        memberIndex,
        documentType
      )
    );
  }

  formatFileSize(
    size: number
  ): string {

    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(
        size / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      size / (1024 * 1024)
    ).toFixed(1)} MB`;
  }

  // ============================================================
  // VALIDATION
  // ============================================================

  isInvalid(
    control: FormControl
  ): boolean {

    return (
      control.invalid &&
      (
        control.dirty ||
        control.touched
      )
    );
  }

  // ============================================================
  // SAVE
  // ============================================================

  submit(): void {

    if (
      this.contractTeamForm.invalid
    ) {

      this.contractTeamForm.markAllAsTouched();

      return;
    }

    const rawValue =
      this.contractTeamForm.getRawValue();

    const members =
      rawValue.members.map(
        (
          member,
          memberIndex
        ) => {

          const kycDocuments:
            ContractTeamKycFile[] = [];

          for (
            const documentType of
            this.documentTypeOptions
          ) {

            const selected =
              this.getSelectedKycDocument(
                memberIndex,
                documentType
              );

            if (!selected) {
              continue;
            }

            kycDocuments.push({

              documentType:
                selected.documentType,

              file:
                selected.file,

              fileName:
                selected.fileName,

              fileSize:
                selected.fileSize,

              mimeType:
                selected.mimeType
            });
          }

          /*
           * IMPORTANT:
           * Use bracket notation here because Angular's
           * typed reactive-form rawValue uses an
           * index signature.
           */
          return {

            name:
              member['name'],

            phone:
              member['phone'],

            alternatePhone:
              member['alternatePhone'],

            role:
              member['role'],

            address:
              member['address'],

            area:
              member['area'],

            city:
              member['city'],

            pincode:
              member['pincode'],

            kycVerified:
              member['kycVerified'],

            status:
              member['status'],

            notes:
              member['notes'],

            kycDocuments
          };
        }
      );

    const team:
      ContractTeamData = {

      id:
        this.generateId(),

      teamName:
        rawValue.teamName.trim(),

      teamCode:
        rawValue.teamCode.trim(),

      contactPersonName:
        rawValue.contactPersonName.trim(),

      primaryPhone:
        rawValue.primaryPhone,

      alternatePhone:
        rawValue.alternatePhone,

      whatsappAvailable:
        rawValue.whatsappAvailable,

      preferredContact:
        rawValue.preferredContact,

      email:
        rawValue.email.trim(),

      address:
        rawValue.address.trim(),

      area:
        rawValue.area.trim(),

      city:
        rawValue.city.trim(),

      pincode:
        rawValue.pincode,

      status:
        rawValue.status,

      notes:
        rawValue.notes.trim(),

      members,

      createdAt:
        new Date().toISOString()
    };

    // Save to frontend store
    this.store.addTeam(team);

    console.log(
      'Contract team saved successfully:',
      team
    );

    // Go back to Contract Teams
    this.router.navigate([
      '/contract-teams'
    ]);
  }

  // ============================================================
  // RESET
  // ============================================================

  resetForm(): void {

    this.contractTeamForm.reset({

      teamName: '',
      teamCode: '',
      contactPersonName: '',
      primaryPhone: '',
      alternatePhone: '',
      whatsappAvailable: false,
      preferredContact: 'WhatsApp',
      email: '',
      address: '',
      area: '',
      city: 'Madurai',
      pincode: '',
      status: 'Active',
      notes: ''
    });

    this.members.clear();

    this.selectedKycDocuments.clear();

    this.kycFileErrors.clear();

    this.addMember();
  }

  // ============================================================
  // ID
  // ============================================================

  private generateId(): string {

    if (
      typeof crypto !== 'undefined' &&
      typeof crypto.randomUUID === 'function'
    ) {

      return crypto.randomUUID();
    }

    return (
      'team-' +
      Date.now().toString(36) +
      '-' +
      Math.random()
        .toString(36)
        .substring(2, 10)
    );
  }
}