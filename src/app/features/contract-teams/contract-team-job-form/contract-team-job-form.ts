import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import {
  ContractTeamJob,
  ContractTeamJobStatus,
  ContractTeamJobType,
  ContractTeamMaterialSource
} from '../../../core/models/contract-team-job.model';

import {
  ContractTeamData,
  ContractTeamMemberData,
  ContractTeamStore
} from '../../../core/services/contract-team-store';


@Component({
  selector: 'app-contract-team-job-form',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './contract-team-job-form.html',

  styleUrl: './contract-team-job-form.css',

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractTeamJobForm implements OnInit {

  // ============================================================
  // JOB TYPE OPTIONS
  // ============================================================

  readonly jobTypeOptions: readonly ContractTeamJobType[] = [
    'Installation',
    'Service',
    'Repair',
    'Other'
  ];


  // ============================================================
  // JOB STATUS OPTIONS
  // ============================================================

  readonly jobStatusOptions: readonly ContractTeamJobStatus[] = [
    'Pending',
    'Assigned',
    'In Progress',
    'Completed',
    'Cancelled'
  ];


  // ============================================================
  // MATERIAL SOURCE OPTIONS
  // ============================================================

  readonly materialSourceOptions:
    readonly ContractTeamMaterialSource[] = [
      'Our Center',
      'Outside Purchase',
      'Both',
      'None'
    ];


  // ============================================================
  // CURRENT TEAM
  // ============================================================

  team: ContractTeamData | undefined;

  teamId = '';


  // ============================================================
  // JOB FORM
  // ============================================================

  readonly jobForm = this.fb.group({

    // ----------------------------------------------------------
    // CUSTOMER
    // ----------------------------------------------------------

    customerName: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.maxLength(100)
      ]
    }),

    customerPhone: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/)
      ]
    }),

    customerAddress: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.maxLength(500)
      ]
    }),


    // ----------------------------------------------------------
    // SERVICE
    // ----------------------------------------------------------

    jobType: this.fb.control<ContractTeamJobType>(
      'Service',
      {
        validators: [
          Validators.required
        ]
      }
    ),

    serviceDescription: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.maxLength(500)
      ]
    }),

    serviceDate: this.fb.control('', {
      validators: [
        Validators.required
      ]
    }),

    assignedMemberId: this.fb.control(''),

    status: this.fb.control<ContractTeamJobStatus>(
      'Pending',
      {
        validators: [
          Validators.required
        ]
      }
    ),


    // ----------------------------------------------------------
    // CUSTOMER PAYMENT
    // ----------------------------------------------------------

    customerAmount: this.fb.control(0, {
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    }),

    customerAmountCollected: this.fb.control(0, {
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    }),


    // ----------------------------------------------------------
    // MATERIALS
    // ----------------------------------------------------------

    materialSource:
      this.fb.control<ContractTeamMaterialSource>(
        'None',
        {
          validators: [
            Validators.required
          ]
        }
      ),

    ourMaterialCost: this.fb.control(0, {
      validators: [
        Validators.min(0)
      ]
    }),

    outsideMaterialCost: this.fb.control(0, {
      validators: [
        Validators.min(0)
      ]
    }),


    // ----------------------------------------------------------
    // TEAM SETTLEMENT
    // ----------------------------------------------------------

    teamAmount: this.fb.control(0, {
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    }),

    teamAmountPaid: this.fb.control(0, {
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    }),


    // ----------------------------------------------------------
    // NOTES
    // ----------------------------------------------------------

    notes: this.fb.control('', {
      validators: [
        Validators.maxLength(1000)
      ]
    })

  });


  // ============================================================
  // CONSTRUCTOR
  // ============================================================

  constructor(
    private readonly fb: NonNullableFormBuilder,

    private readonly route: ActivatedRoute,

    private readonly router: Router,

    private readonly store: ContractTeamStore
  ) {}


  // ============================================================
  // INIT
  // ============================================================

  ngOnInit(): void {

    this.teamId =
      this.route.snapshot.paramMap.get('id') ?? '';


    if (!this.teamId) {
      return;
    }


    this.team =
      this.store.getTeamById(this.teamId);
  }


  // ============================================================
  // TEAM MEMBERS
  // ============================================================

  get members(): ContractTeamMemberData[] {

    return this.team?.members ?? [];
  }


  // ============================================================
  // FORM VALIDATION
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
  // TOTAL MATERIAL COST
  // ============================================================

  get totalMaterialCost(): number {

    const ourMaterial =
      Number(
        this.jobForm.controls.ourMaterialCost.value
      ) || 0;


    const outsideMaterial =
      Number(
        this.jobForm.controls.outsideMaterialCost.value
      ) || 0;


    return (
      ourMaterial +
      outsideMaterial
    );
  }


  // ============================================================
  // PENDING TEAM SETTLEMENT
  // ============================================================

  get pendingTeamSettlement(): number {

    const teamAmount =
      Number(
        this.jobForm.controls.teamAmount.value
      ) || 0;


    const teamPaid =
      Number(
        this.jobForm.controls.teamAmountPaid.value
      ) || 0;


    return Math.max(
      teamAmount - teamPaid,
      0
    );
  }


  // ============================================================
  // TOTAL COST
  // ============================================================

  get totalCost(): number {

    const materialCost =
      this.totalMaterialCost;


    const teamAmount =
      Number(
        this.jobForm.controls.teamAmount.value
      ) || 0;


    return (
      materialCost +
      teamAmount
    );
  }


  // ============================================================
  // BALANCE / PROFIT
  // ============================================================

  get balanceAmount(): number {

    const customerAmount =
      Number(
        this.jobForm.controls.customerAmount.value
      ) || 0;


    return (
      customerAmount -
      this.totalCost
    );
  }


  // ============================================================
  // SAVE JOB
  // ============================================================

  saveJob(): void {

    // ----------------------------------------------------------
    // VALIDATE FORM
    // ----------------------------------------------------------

    if (this.jobForm.invalid) {

      this.jobForm.markAllAsTouched();

      return;
    }


    // ----------------------------------------------------------
    // CHECK TEAM
    // ----------------------------------------------------------

    if (!this.team) {

      return;
    }


    // ----------------------------------------------------------
    // FORM VALUE
    // ----------------------------------------------------------

    const value =
      this.jobForm.getRawValue();


    // ----------------------------------------------------------
    // FIND SELECTED MEMBER
    //
    // The current ContractTeamMemberData model does not contain
    // a member ID, so the frontend uses the member name as the
    // selected value.
    // ----------------------------------------------------------

    const selectedMember =
      this.members.find(
        member =>
          member.name ===
          value.assignedMemberId
      );


    // ----------------------------------------------------------
    // CURRENT TIME
    // ----------------------------------------------------------

    const now =
      new Date().toISOString();


    // ----------------------------------------------------------
    // CREATE JOB
    // ----------------------------------------------------------

    const job: ContractTeamJob = {

      id:
        this.generateId(),

      teamId:
        this.team.id,


      // ========================================================
      // CUSTOMER
      // ========================================================

      customerName:
        value.customerName,

      customerPhone:
        value.customerPhone,

      customerAddress:
        value.customerAddress,


      // ========================================================
      // SERVICE
      // ========================================================

      jobType:
        value.jobType,

      serviceDescription:
        value.serviceDescription,

      serviceDate:
        value.serviceDate,


      assignedMemberId:
        value.assignedMemberId ||
        undefined,

      assignedMemberName:
        selectedMember?.name,


      status:
        value.status,


      // ========================================================
      // CUSTOMER PAYMENT
      // ========================================================

      customerAmount:
        Number(
          value.customerAmount
        ) || 0,

      customerAmountCollected:
        Number(
          value.customerAmountCollected
        ) || 0,


      // ========================================================
      // MATERIALS
      // ========================================================

      materialSource:
        value.materialSource,

      ourMaterialCost:
        Number(
          value.ourMaterialCost
        ) || 0,

      outsideMaterialCost:
        Number(
          value.outsideMaterialCost
        ) || 0,

      totalMaterialCost:
        this.totalMaterialCost,


      // ========================================================
      // TEAM SETTLEMENT
      // ========================================================

      teamAmount:
        Number(
          value.teamAmount
        ) || 0,

      teamAmountPaid:
        Number(
          value.teamAmountPaid
        ) || 0,

      pendingTeamSettlement:
        this.pendingTeamSettlement,


      // ========================================================
      // FINANCIAL SUMMARY
      // ========================================================

      totalCost:
        this.totalCost,

      balanceAmount:
        this.balanceAmount,


      // ========================================================
      // NOTES
      // ========================================================

      notes:
        value.notes,


      // ========================================================
      // DATES
      // ========================================================

      createdAt:
        now,

      updatedAt:
        now
    };


    // ==========================================================
    // SAVE TO CONTRACT TEAM STORE
    // ==========================================================

    this.store.addJob(
      job
    );


    // ==========================================================
    // RETURN TO TEAM DETAILS
    // ==========================================================

    this.router.navigate([
      '/contract-teams/details',
      this.teamId
    ]);
  }


  // ============================================================
  // GENERATE JOB ID
  // ============================================================

  private generateId(): string {

    return crypto.randomUUID();
  }


  // ============================================================
  // CANCEL
  // ============================================================

  cancel(): void {

    this.router.navigate([
      '/contract-teams/details',
      this.teamId
    ]);
  }

}