import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ContractTeamJob,
  ContractTeamJobMaterial,
  ContractTeamJobStatus,
  ContractTeamJobType,
  ContractTeamMaterialSource
} from '../../../core/models/contract-team-job.model';
import { ContractTeamData, ContractTeamMemberData, ContractTeamStore } from '../../../core/services/contract-team-store';
import { Material } from '../../../core/models/material.model';
import { MaterialStore } from '../../../core/services/material-store';

type MaterialRowSource =
  | 'Office'
  | 'Outside'
  | 'Customer';

@Component({
  selector: 'app-contract-team-job-form',
  standalone: true,
  imports: [DecimalPipe, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contract-team-job-form.html',
  styleUrl: './contract-team-job-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractTeamJobForm implements OnInit {
  readonly jobTypeOptions: readonly ContractTeamJobType[] = ['Installation', 'Service', 'Repair', 'Warranty', 'Other'];
  readonly jobStatusOptions: readonly ContractTeamJobStatus[] = ['Pending', 'Assigned', 'In Progress', 'Completed', 'Cancelled'];
  readonly materialSourceOptions: readonly ContractTeamMaterialSource[] = ['Office', 'Outside', 'Customer', 'None', 'Mixed'];
  readonly materialRowSourceOptions: readonly MaterialRowSource[] = [
    'Office',
    'Outside',
    'Customer'
  ];

  team: ContractTeamData | undefined;
  teamId = '';

  materials: Material[] = [];
  jobMaterials: ContractTeamJobMaterial[] = [];

  // Inventory material selected from MaterialStore.
  selectedMaterialId = '';

  // Used only when the user chooses "Other Material".
  otherMaterialName = '';

  // Search box for previously used Other Materials.
  otherMaterialSearch = '';

  /**
   * Other Materials are job-only materials.
   * They are remembered in browser storage so the next job can
   * search and reuse the same material instead of typing duplicates.
   */
  private readonly otherMaterialsStorageKey =
    'ac_crm_contract_team_other_materials';

  materialQuantity: number | null = null;

  materialRowSource: MaterialRowSource = 'Office';

  outsidePurchaseAmount: number | null = null;

  customerPaidForMaterial: number | null = null;

  // Names used by the material table template.
  materialCustomerPaid: number | null = null;

  readonly jobForm = this.fb.group({
    customerName: this.fb.control('', { validators: [Validators.required, Validators.maxLength(100)] }),
    customerPhone: this.fb.control('', { validators: [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)] }),
    customerAddress: this.fb.control('', { validators: [Validators.required, Validators.maxLength(500)] }),
    jobType: this.fb.control<ContractTeamJobType>('Installation', { validators: [Validators.required] }),
    serviceDescription: this.fb.control('', { validators: [Validators.required, Validators.maxLength(500)] }),
    serviceDate: this.fb.control('', { validators: [Validators.required] }),
    assignedMemberId: this.fb.control(''),
    status: this.fb.control<ContractTeamJobStatus>('Pending', { validators: [Validators.required] }),
    acQuantity: this.fb.control(1, { validators: [Validators.required, Validators.min(1)] }),
    ratePerAc: this.fb.control(1000, { validators: [Validators.required, Validators.min(0)] }),
    teamAmount: this.fb.control(0, { validators: [Validators.required, Validators.min(0)] }),
    customerAmount: this.fb.control(0, { validators: [Validators.required, Validators.min(0)] }),
    customerAmountCollected: this.fb.control(0, { validators: [Validators.required, Validators.min(0)] }),
    materialSource: this.fb.control<ContractTeamMaterialSource>('None', { validators: [Validators.required] }),
    technicianHeldAmount: this.fb.control(0, { validators: [Validators.required, Validators.min(0)] }),
    teamAmountPaid: this.fb.control(0, { validators: [Validators.required, Validators.min(0)] }),
    notes: this.fb.control('', { validators: [Validators.maxLength(1000)] })
  });

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: ContractTeamStore,
    private readonly materialStore: MaterialStore
  ) {}

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.teamId) return;
    this.team = this.store.getTeamById(this.teamId);
    this.loadMaterials();
    this.jobForm.controls.acQuantity.valueChanges.subscribe(() => this.syncJobAmount());
    this.jobForm.controls.ratePerAc.valueChanges.subscribe(() => this.syncJobAmount());
    this.jobForm.controls.teamAmount.valueChanges.subscribe(() => this.syncJobAmount());
    this.syncJobAmount();
  }

  get members(): ContractTeamMemberData[] { return this.team?.members ?? []; }

  loadMaterials(): void { this.materials = this.materialStore.getMaterials(); }

  isInvalid(control: FormControl): boolean { return control.invalid && (control.dirty || control.touched); }

  get jobType(): ContractTeamJobType {
    return this.jobForm.controls.jobType.value;
  }

  get isInstallationJob(): boolean {
    return this.jobType === 'Installation';
  }

  get isWarrantyJob(): boolean {
    return this.jobType === 'Warranty';
  }

  get jobCalculationTitle(): string {
    if (this.isInstallationJob) return 'AC Installation Calculation';
    if (this.isWarrantyJob) return 'Warranty Service Calculation';
    return `${this.jobType} Calculation`;
  }

  get jobCalculationDescription(): string {
    if (this.isInstallationJob) {
      return 'Calculate the contract team installation amount from AC quantity and rate.';
    }
    if (this.isWarrantyJob) {
      return 'Enter the service value for warranty work. Customer payment is normally ₹0.';
    }
    return `Enter the contract/service fee for this ${this.jobType.toLowerCase()} job.`;
  }

  get paymentTallyDescription(): string {
    if (this.isInstallationJob) {
      return 'Installation fee minus the material balance held by the technician gives the amount with the center.';
    }
    if (this.isWarrantyJob) {
      return 'Warranty service value minus the amount received from the customer gives the amount to account.';
    }
    return 'Service fee minus customer payment gives the remaining balance.';
  }

  get teamAmount(): number {
    if (this.isInstallationJob) {
      return this.totalInstallationAmount;
    }

    return Number(this.jobForm.controls.teamAmount.value) || 0;
  }

  get totalInstallationAmount(): number {
    const quantity = Number(this.jobForm.controls.acQuantity.value) || 0;
    const rate = Number(this.jobForm.controls.ratePerAc.value) || 0;
    return quantity * rate;
  }

  get customerAmountValue(): number {
    return Number(this.jobForm.controls.customerAmount.value) || 0;
  }

  get customerAmountCollectedValue(): number {
    return Number(this.jobForm.controls.customerAmountCollected.value) || 0;
  }

  get warrantyAccountAmount(): number {
    return Math.max(
      this.customerAmountValue - this.customerAmountCollectedValue,
      0
    );
  }

  private syncJobAmount(): void {
    const amount = this.teamAmount;
    const customerAmount = this.customerAmountValue;

    if (customerAmount === 0 || customerAmount === amount) {
      this.jobForm.controls.customerAmount.setValue(amount, { emitEvent: false });
    }
  }

  onJobTypeChange(): void {
    const type = this.jobType;

    if (type === 'Installation') {
      this.jobForm.controls.teamAmount.setValue(this.totalInstallationAmount, { emitEvent: false });
      this.jobForm.controls.customerAmount.setValue(this.totalInstallationAmount, { emitEvent: false });
      this.jobForm.controls.customerAmountCollected.setValue(0, { emitEvent: false });
      return;
    }

    if (type === 'Warranty') {
      this.jobForm.controls.customerAmount.setValue(this.teamAmount, { emitEvent: false });
      this.jobForm.controls.customerAmountCollected.setValue(0, { emitEvent: false });
      this.jobForm.controls.technicianHeldAmount.setValue(0, { emitEvent: false });
      return;
    }

    this.jobForm.controls.customerAmount.setValue(this.teamAmount, { emitEvent: false });
    this.jobForm.controls.customerAmountCollected.setValue(0, { emitEvent: false });
    this.jobForm.controls.technicianHeldAmount.setValue(0, { emitEvent: false });
  }

  get selectedMaterial(): Material | undefined {
    return this.materials.find(material => material.id === this.selectedMaterialId);
  }

  /**
   * True when the user selected the special Other Material option.
   */
  get isOtherMaterialSelected(): boolean {
    return this.selectedMaterialId === '__OTHER__';
  }

  /**
   * Existing non-inventory materials are taken from previous job rows.
   * Matching is case-insensitive and ignores repeated spaces.
   */
  get previousOtherMaterials(): string[] {
    const unique = new Map<string, string>();

    // Remembered Other Materials from earlier jobs.
    for (const name of this.getStoredOtherMaterials()) {
      const key = this.normalizeMaterialName(name);

      if (key && !this.isInventoryMaterialName(key)) {
        unique.set(key, name.trim());
      }
    }

    // Also include Other Materials already added in this job.
    for (const material of this.jobMaterials) {
      const key = this.normalizeMaterialName(
        material.materialName
      );

      if (key && !this.isInventoryMaterialName(key)) {
        unique.set(
          key,
          material.materialName.trim()
        );
      }
    }

    return [...unique.values()].sort((a, b) =>
      a.localeCompare(b)
    );
  }

  private isInventoryMaterialName(
    normalizedName: string
  ): boolean {
    return this.materials.some(
      material =>
        this.normalizeMaterialName(material.name) ===
        normalizedName
    );
  }

  private getStoredOtherMaterials(): string[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    try {
      const raw =
        localStorage.getItem(
          this.otherMaterialsStorageKey
        );

      if (!raw) {
        return [];
      }

      const parsed: unknown =
        JSON.parse(raw);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.filter(
        (value): value is string =>
          typeof value === 'string' &&
          value.trim().length > 0
      );
    } catch {
      return [];
    }
  }

  private rememberOtherMaterial(
    name: string
  ): void {
    const cleanName = name
      .trim()
      .replace(/\s+/g, ' ');

    if (!cleanName || typeof localStorage === 'undefined') {
      return;
    }

    const existing =
      this.getStoredOtherMaterials();

    const key =
      this.normalizeMaterialName(cleanName);

    const alreadyExists =
      existing.some(
        value =>
          this.normalizeMaterialName(value) === key
      );

    if (alreadyExists) {
      return;
    }

    localStorage.setItem(
      this.otherMaterialsStorageKey,
      JSON.stringify([
        ...existing,
        cleanName
      ])
    );
  }

  get filteredOtherMaterials(): string[] {
    const search = this.normalizeMaterialName(
      this.otherMaterialSearch
    );

    if (!search) {
      return this.previousOtherMaterials;
    }

    return this.previousOtherMaterials.filter(name =>
      this.normalizeMaterialName(name).includes(search)
    );
  }

  /**
   * One simple list for the Material dropdown:
   * Inventory materials + Other Material.
   */
  get materialDropdownOptions(): Material[] {
    return this.materials;
  }

  /**
   * The name that will be saved for the current material entry.
   */
  get currentMaterialName(): string {
    if (this.isOtherMaterialSelected) {
      return this.findExistingOtherMaterialName(
        this.otherMaterialName
      ) || this.otherMaterialName.trim();
    }

    return this.selectedMaterial?.name ?? '';
  }

  private normalizeMaterialName(name: string): string {
    return name
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase();
  }

  private findExistingOtherMaterialName(
    name: string
  ): string | undefined {
    const key = this.normalizeMaterialName(name);

    if (!key) {
      return undefined;
    }

    return this.previousOtherMaterials.find(
      existing =>
        this.normalizeMaterialName(existing) === key
    );
  }

  /**
   * Called by the Material dropdown.
   * Selecting an inventory material clears the Other Material input.
   */
  onMaterialSelectionChange(): void {
    if (!this.isOtherMaterialSelected) {
      this.otherMaterialName = '';
      this.otherMaterialSearch = '';
    }
  }

  /**
   * Select an existing previously-used Other Material.
   */
  selectPreviousOtherMaterial(name: string): void {
    this.selectedMaterialId = '__OTHER__';
    this.otherMaterialName = name;
    this.otherMaterialSearch = name;
  }

  get selectedMaterialRate(): number {
    return Number(this.selectedMaterial?.rate) || 0;
  }

  get materialAmountPreview(): number {
    /*
     * IMPORTANT BUSINESS RULE:
     * Office material is taken from our existing stock, so there is
     * no new cash purchase for this job.
     *
     * Outside = actual shop purchase amount.
     * Customer = customer supplied the material, so actual cost is 0.
     */
    if (this.materialRowSource === 'Outside') {
      return Number(this.outsidePurchaseAmount) || 0;
    }

    return 0;
  }

  get materialBalancePreview(): number {
    const customerPaid =
      Number(this.materialCustomerPaid) || 0;

    return Math.max(
      customerPaid - this.materialAmountPreview,
      0
    );
  }

  get calculatedOfficeMaterialCost(): number {
    return 0;
  }

  get calculatedOutsideMaterialCost(): number {
    return this.jobMaterials.filter(m => m.source === 'Outside').reduce((t, m) => t + (Number(m.outsidePurchaseAmount) || 0), 0);
  }

  get calculatedCustomerMaterialCost(): number {
    return 0;
  }

  get totalMaterialCost(): number { return this.calculatedOfficeMaterialCost + this.calculatedOutsideMaterialCost; }

  addMaterial(): void {
    const quantity = Number(this.materialQuantity) || 0;

    if (quantity <= 0) {
      return;
    }

    // Either an Inventory material or a valid Other Material is required.
    const material = this.selectedMaterial;
    const otherName = this.currentMaterialName;

    if (!material && !otherName) {
      return;
    }

    const source = this.materialRowSource;
    const outsideAmount =
      Number(this.outsidePurchaseAmount) || 0;

    const customerPaid =
      Number(
        this.materialCustomerPaid ??
        this.customerPaidForMaterial
      ) || 0;

    if (
      source === 'Outside' &&
      outsideAmount <= 0
    ) {
      return;
    }

    // Prevent duplicate spelling/case variants of the same Other Material.
    const finalMaterialName =
      material?.name ?? otherName;

    const existingOtherName =
      this.findExistingOtherMaterialName(
        finalMaterialName
      );

    const normalizedOtherName =
      existingOtherName ?? finalMaterialName;

    // Remember only non-inventory materials.
    // This makes White Tap available in the next job too,
    // without adding it to Office Inventory.
    if (!material) {
      this.rememberOtherMaterial(
        normalizedOtherName
      );
    }

    const materialId =
      material?.id;

    /*
     * Material cash-cost rules:
     *
     * Office:
     *   Taken from office stock.
     *   Actual cash cost for this job = ₹0.
     *
     * Outside:
     *   Actual cash cost = the amount paid at the outside shop.
     *
     * Customer:
     *   Customer supplied the material.
     *   Actual cash cost = ₹0.
     */
    const amount =
      source === 'Outside'
        ? outsideAmount
        : 0;

    /*
     * Balance is the customer's material amount remaining after
     * the actual purchase cost.
     *
     * Example:
     * Customer Paid ₹1000 - Outside Cost ₹700 = ₹300
     *
     * Office:
     * ₹1000 - ₹0 = ₹1000
     *
     * Customer supplied:
     * ₹1000 - ₹0 = ₹1000
     */
    const balance =
      Math.max(
        customerPaid - amount,
        0
      );

    const row: ContractTeamJobMaterial = {
      id: this.generateId(),

      // Inventory material has an ID.
      // Other Material intentionally has no Inventory ID.
      materialId,

      materialName:
        normalizedOtherName,

      // Inventory gives the real unit.
      // Other Material can be labelled "unit" until entered in Inventory.
      unit:
        material?.unit ?? 'unit',

      quantity,

      source,

      // Inventory rate is available automatically.
      // Other Material has no master rate yet.
      fixedRate:
        Number(material?.rate) || 0,

      outsidePurchaseAmount:
        source === 'Outside'
          ? outsideAmount
          : 0,

      customerPaid,

      amount,

      balance
    };

    this.jobMaterials = [...this.jobMaterials, row];
    this.updateMaterialSource();
    this.clearMaterialEntry();
  }

  removeMaterial(id: string): void {
    this.jobMaterials = this.jobMaterials.filter(m => m.id !== id);
    this.updateMaterialSource();
  }

  private updateMaterialSource(): void {
    if (this.jobMaterials.length === 0) {
      this.jobForm.controls.materialSource.setValue('None');
      return;
    }
    const sources = new Set(this.jobMaterials.map(m => m.source));
    this.jobForm.controls.materialSource.setValue(
      sources.size === 1 ? ([...sources][0] as ContractTeamMaterialSource) : 'Mixed'
    );
  }

  clearMaterialEntry(): void {
    this.selectedMaterialId = '';
    this.otherMaterialName = '';
    this.otherMaterialSearch = '';
    this.materialQuantity = null;
    this.materialRowSource = 'Office';
    this.outsidePurchaseAmount = null;
    this.customerPaidForMaterial = null;
    this.materialCustomerPaid = null;
  }

  get customerPendingAmount(): number {
    const amount = Number(this.jobForm.controls.customerAmount.value) || 0;
    const collected = Number(this.jobForm.controls.customerAmountCollected.value) || 0;
    return Math.max(amount - collected, 0);
  }

  get technicianHeldAmount(): number { return Number(this.jobForm.controls.technicianHeldAmount.value) || 0; }

  get centerAmount(): number {
    // Installation:
    // Installation Fee - Material Balance With Technician
    if (this.isInstallationJob) {
      return Math.max(
        this.totalInstallationAmount - this.technicianHeldAmount,
        0
      );
    }

    return 0;
  }

  get pendingTeamSettlement(): number {
    const paid = Number(this.jobForm.controls.teamAmountPaid.value) || 0;
    return Math.max(this.teamAmount - paid, 0);
  }

  get totalCost(): number { return this.totalMaterialCost + this.teamAmount; }

  get balanceAmount(): number {
    const customerAmount = Number(this.jobForm.controls.customerAmount.value) || 0;
    return customerAmount - this.totalCost;
  }

  saveJob(): void {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }
    if (!this.team) return;

    const value = this.jobForm.getRawValue();
    const selectedMember = this.members.find(member => member.name === value.assignedMemberId);
    const now = new Date().toISOString();

    const job: ContractTeamJob = {
      id: this.generateId(),
      teamId: this.team.id,
      customerName: value.customerName,
      customerPhone: value.customerPhone,
      customerAddress: value.customerAddress,
      jobType: value.jobType,
      serviceDescription: value.serviceDescription,
      serviceDate: value.serviceDate,
      assignedMemberId: value.assignedMemberId || undefined,
      assignedMemberName: selectedMember?.name,
      status: value.status,
      acQuantity: Number(value.acQuantity) || 0,
      ratePerAc: Number(value.ratePerAc) || 0,
      totalInstallationAmount: this.totalInstallationAmount,
      customerAmount: Number(value.customerAmount) || 0,
      customerAmountCollected: Number(value.customerAmountCollected) || 0,
      customerPendingAmount: this.customerPendingAmount,
      materialSource: value.materialSource,
      materials: this.jobMaterials.map(m => ({ ...m })),
      officeMaterialCost: this.calculatedOfficeMaterialCost,
      outsideMaterialCost: this.calculatedOutsideMaterialCost,
      customerMaterialCost: this.calculatedCustomerMaterialCost,
      totalMaterialCost: this.totalMaterialCost,
      technicianHeldAmount: this.technicianHeldAmount,
      centerAmount: this.centerAmount,
      teamAmount: this.teamAmount,
      teamAmountPaid: Number(value.teamAmountPaid) || 0,
      pendingTeamSettlement: this.pendingTeamSettlement,
      totalCost: this.totalCost,
      balanceAmount: this.balanceAmount,
      notes: value.notes,
      createdAt: now,
      updatedAt: now
    };

    this.store.addJob(job);
    this.router.navigate(['/contract-teams/details', this.teamId]);
  }

  cancel(): void { this.router.navigate(['/contract-teams/details', this.teamId]); }

  private generateId(): string { return crypto.randomUUID(); }
}
