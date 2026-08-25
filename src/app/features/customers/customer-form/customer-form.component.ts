import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {

  readonly currentStep = signal(1);

  readonly saved = signal(false);

  /*
   * =====================================================
   * TEMPORARY FRONTEND MASTER DATA
   * =====================================================
   *
   * These values are used only while developing frontend.
   *
   * During backend development these will come from:
   *
   * Node.js
   * +
   * MongoDB
   *
   * through master-data APIs.
   */

  readonly authorizedBrands = [
    'O General',
    'Amstrad',
    'Cruise'
  ];

  readonly otherBrands = signal<string[]>([
    'LG',
    'Samsung',
    'Voltas',
    'Daikin',
    'Blue Star',
    'Carrier',
    'Panasonic',
    'Hitachi',
    'Whirlpool',
    'Godrej',
    'Haier',
    'Lloyd'
  ]);

  readonly acTypes = [
    'Split AC',
    'Window AC',
    'Cassette AC',
    'Tower AC',
    'Ductable AC',
    'Central AC',
    'Other'
  ];

  readonly tonnageOptions = [
    '0.75 Ton',
    '1 Ton',
    '1.2 Ton',
    '1.5 Ton',
    '1.8 Ton',
    '2 Ton',
    '2.5 Ton',
    '3 Ton',
    'Other'
  ];


  /*
   * =====================================================
   * FORMS
   * =====================================================
   */

  readonly customerForm;

  readonly acForm;

  readonly servicePlanForm;


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {

    /*
     * =====================================================
     * STEP 1 — CUSTOMER DETAILS
     * =====================================================
     */

    this.customerForm = this.formBuilder.nonNullable.group({

      customerName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],

      primaryPhone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/)
        ]
      ],

      whatsappAvailable: [
        true
      ],

      alternatePhone: [
        '',
        [
          Validators.pattern(/^$|^[6-9]\d{9}$/)
        ]
      ],

      address: [
        '',
        [
          Validators.required,
          Validators.maxLength(250)
        ]
      ],

      area: [
        '',
        [
          Validators.maxLength(100)
        ]
      ],

      city: [
        'Madurai'
      ],

      pincode: [
        '',
        [
          Validators.pattern(/^$|^\d{6}$/)
        ]
      ]

    });


    /*
     * =====================================================
     * STEP 2 — AC DETAILS
     * =====================================================
     */

    this.acForm = this.formBuilder.nonNullable.group({

      brand: [
        '',
        [
          Validators.required
        ]
      ],

      customBrand: [
        '',
        [
          Validators.maxLength(100)
        ]
      ],

      acType: [
        '',
        [
          Validators.required
        ]
      ],

      tonnage: [
        ''
      ],

      indoorModelNumber: [
        '',
        [
          Validators.maxLength(100)
        ]
      ],

      indoorSerialNumber: [
        '',
        [
          Validators.maxLength(100)
        ]
      ],

      outdoorModelNumber: [
        '',
        [
          Validators.maxLength(100)
        ]
      ],

      outdoorSerialNumber: [
        '',
        [
          Validators.maxLength(100)
        ]
      ],

      installationDate: [
        ''
      ]

    });


    /*
     * =====================================================
     * STEP 3 — SERVICE / PLAN
     * =====================================================
     */

    this.servicePlanForm = this.formBuilder.nonNullable.group({

      /*
       * Main operator selection
       */

      requirementType: [
        '',
        [
          Validators.required
        ]
      ],


      /*
       * Installation
       */

      installationScheduleDate: [
        ''
      ],


      /*
       * Service / Complaint
       */

      serviceDate: [
        ''
      ],

      complaint: [
        '',
        [
          Validators.maxLength(500)
        ]
      ],


      /*
       * AMC
       */

      amcStartDate: [
        ''
      ],

      amcDurationMonths: [
        12
      ],

      amcServiceCount: [
        4
      ],


      /*
       * EWC
       */

      ewcStartDate: [
        ''
      ],

      ewcEndDate: [
        ''
      ],

      ewcReferenceNumber: [
        '',
        [
          Validators.maxLength(100)
        ]
      ]

    });

  }


  /*
   * =====================================================
   * STEP 1 → STEP 2
   * =====================================================
   */

  continueToAc(): void {

    this.customerForm.markAllAsTouched();

    if (this.customerForm.invalid) {
      return;
    }

    this.currentStep.set(2);
  }


  /*
   * =====================================================
   * STEP 2 → STEP 3
   * =====================================================
   */

  continueToService(): void {

    this.acForm.markAllAsTouched();

    if (this.acForm.invalid) {
      return;
    }


    /*
     * Prevent ADD_NEW from becoming
     * an actual stored AC brand.
     */

    if (
      this.acForm.controls.brand.value ===
      'ADD_NEW'
    ) {

      this.acForm.controls.customBrand
        .markAsTouched();

      return;
    }


    this.currentStep.set(3);
  }


  /*
   * =====================================================
   * STEP 3 → STEP 4
   * =====================================================
   */

  continueToReview(): void {

    this.servicePlanForm.markAllAsTouched();

    if (
      this.servicePlanForm.controls
        .requirementType.invalid
    ) {
      return;
    }


    const requirementType =
      this.servicePlanForm.controls
        .requirementType.value;


    /*
     * INSTALLATION VALIDATION
     */

    if (
      requirementType === 'INSTALLATION' &&
      !this.servicePlanForm.controls
        .installationScheduleDate.value
    ) {
      return;
    }


    /*
     * SERVICE / COMPLAINT VALIDATION
     */

    if (
      requirementType === 'SERVICE' &&
      !this.servicePlanForm.controls
        .serviceDate.value
    ) {
      return;
    }


    /*
     * AMC VALIDATION
     */

    if (
      requirementType === 'AMC' &&
      !this.servicePlanForm.controls
        .amcStartDate.value
    ) {
      return;
    }


    /*
     * EWC VALIDATION
     */

    if (
      requirementType === 'EWC' &&
      (
        !this.servicePlanForm.controls
          .ewcStartDate.value ||
        !this.servicePlanForm.controls
          .ewcEndDate.value
      )
    ) {
      return;
    }


    this.currentStep.set(4);
  }


  /*
   * =====================================================
   * NAVIGATION
   * =====================================================
   */

  goBackToCustomer(): void {
    this.currentStep.set(1);
  }


  goBackToAc(): void {
    this.currentStep.set(2);
  }


  goBackToService(): void {
    this.currentStep.set(3);
  }


  /*
   * =====================================================
   * SERVICE / PLAN HELPERS
   * =====================================================
   */

  selectRequirement(
    requirementType: string
  ): void {

    this.servicePlanForm.controls
      .requirementType
      .setValue(requirementType);

  }


  isRequirementSelected(
    requirementType: string
  ): boolean {

    return (
      this.servicePlanForm.controls
        .requirementType.value ===
      requirementType
    );

  }


  /*
   * =====================================================
   * AUTHORIZED BRAND
   * =====================================================
   */

  isAuthorizedBrand(
    brand: string
  ): boolean {

    return this.authorizedBrands.some(
      authorizedBrand =>
        authorizedBrand.toLowerCase() ===
        brand.toLowerCase()
    );

  }


  /*
   * =====================================================
   * ADD NEW AC BRAND
   * =====================================================
   *
   * Frontend-only functionality.
   *
   * Later:
   *
   * Angular
   * ↓
   * Brand API
   * ↓
   * Node.js
   * ↓
   * MongoDB
   */

  addCustomBrand(): void {

    const brandName =
      this.acForm.controls
        .customBrand.value
        .trim();


    /*
     * Empty brand protection
     */

    if (!brandName) {

      this.acForm.controls
        .customBrand
        .setErrors({
          required: true
        });

      this.acForm.controls
        .customBrand
        .markAsTouched();

      return;
    }


    /*
     * Check authorized brands
     */

    const existingAuthorizedBrand =
      this.authorizedBrands.find(
        brand =>
          brand.toLowerCase() ===
          brandName.toLowerCase()
      );


    /*
     * Check general brands
     */

    const existingOtherBrand =
      this.otherBrands().find(
        brand =>
          brand.toLowerCase() ===
          brandName.toLowerCase()
      );


    /*
     * Authorized brand already exists
     */

    if (existingAuthorizedBrand) {

      this.acForm.controls
        .brand
        .setValue(
          existingAuthorizedBrand
        );

      this.acForm.controls
        .customBrand
        .reset();

      return;
    }


    /*
     * General brand already exists
     */

    if (existingOtherBrand) {

      this.acForm.controls
        .brand
        .setValue(
          existingOtherBrand
        );

      this.acForm.controls
        .customBrand
        .reset();

      return;
    }


    /*
     * Add temporary frontend brand
     */

    this.otherBrands.update(
      brands => [
        ...brands,
        brandName
      ]
    );


    /*
     * Select newly added brand
     */

    this.acForm.controls
      .brand
      .setValue(
        brandName
      );


    /*
     * Clear custom brand input
     */

    this.acForm.controls
      .customBrand
      .reset();

  }


  /*
   * =====================================================
   * STEP 4 — REVIEW & FRONTEND SAVE
   * =====================================================
   */

  getRequirementLabel(): string {
    switch (this.servicePlanForm.controls.requirementType.value) {
      case 'INSTALLATION': return 'Installation';
      case 'SERVICE': return 'Service / Complaint';
      case 'AMC': return 'AMC';
      case 'EWC': return 'EWC';
      case 'REGISTER_ONLY': return 'Register AC Only';
      default: return '-';
    }
  }

  displayValue(value: string | number | null | undefined): string {
    return value === null || value === undefined || value === ''
      ? 'Not provided'
      : String(value);
  }

  saveCustomer(): void {
    if (this.customerForm.invalid || this.acForm.invalid ||
        this.servicePlanForm.controls.requirementType.invalid) {
      return;
    }

    const customerPayload = {
      customer: this.customerForm.getRawValue(),
      ac: this.acForm.getRawValue(),
      servicePlan: this.servicePlanForm.getRawValue()
    };

    console.log('CUSTOMER ONBOARDING PAYLOAD', customerPayload);
    this.saved.set(true);
  }

  startAnotherCustomer(): void {
    this.customerForm.reset({
      customerName: '', primaryPhone: '', whatsappAvailable: true,
      alternatePhone: '', address: '', area: '', city: 'Madurai', pincode: ''
    });
    this.acForm.reset({
      brand: '', customBrand: '', acType: '', tonnage: '',
      indoorModelNumber: '', indoorSerialNumber: '', outdoorModelNumber: '',
      outdoorSerialNumber: '', installationDate: ''
    });
    this.servicePlanForm.reset({
      requirementType: '', installationScheduleDate: '', serviceDate: '',
      complaint: '', amcStartDate: '', amcDurationMonths: 12, amcServiceCount: 4,
      ewcStartDate: '', ewcEndDate: '', ewcReferenceNumber: ''
    });
    this.saved.set(false);
    this.currentStep.set(1);
  }


  /*
   * =====================================================
   * CANCEL CUSTOMER ONBOARDING
   * =====================================================
   */

  cancel(): void {

    void this.router.navigate([
      '/customers'
    ]);

  }

}
