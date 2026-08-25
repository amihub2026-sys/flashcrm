import { Component, computed, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MockDataService } from '../../../core/services/mock-data.service';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.css'
})
export class ServiceFormComponent {

  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dataService = inject(MockDataService);

  /*
   * CUSTOMER / AC FROM URL
   *
   * Example:
   * /services/new?customerId=1&acUnitId=ac-1001
   */

  readonly customerId =
    this.route.snapshot.queryParamMap.get('customerId') ?? '';

  readonly acUnitId =
    this.route.snapshot.queryParamMap.get('acUnitId') ?? '';


  /*
   * CURRENT CUSTOMER
   */

  readonly customer = computed(() =>
    this.dataService.customers.find(
      customer => customer.id === this.customerId
    )
  );


  /*
   * CUSTOMER AC UNITS
   *
   * Needed when New Service is started
   * from the customer level instead of
   * a particular AC card.
   */

  readonly customerAcUnits = computed(() =>
    this.dataService.acUnits.filter(
      ac => ac.customerId === this.customerId
    )
  );


  /*
   * SELECTED AC
   */

  readonly selectedAc = computed(() => {

    const selectedId =
      this.serviceForm.controls.acUnitId.value;

    return this.dataService.acUnits.find(
      ac =>
        ac.id === selectedId &&
        ac.customerId === this.customerId
    );

  });


  /*
   * TECHNICIANS
   */

  readonly technicians =
    this.dataService.technicians;


  /*
   * SERVICE FORM
   */

  readonly serviceForm =
    this.formBuilder.nonNullable.group({

      acUnitId: [
        this.acUnitId,
        Validators.required
      ],

      serviceType: [
        '',
        Validators.required
      ],

      complaint: [
        '',
        [
          Validators.required,
          Validators.maxLength(1000)
        ]
      ],

      technicianIds: this.formBuilder.nonNullable.control<string[]>(
        []
      ),

      workDone: [
        '',
        Validators.maxLength(1500)
      ],

      partsChanged: [
        '',
        Validators.maxLength(1000)
      ],

      internalNote: [
        '',
        Validators.maxLength(1500)
      ],

      nextFollowUpDate: [
        ''
      ],

      status: [
        'Open',
        Validators.required
      ]

    });


  /*
   * TECHNICIAN SELECTION
   *
   * One service can have multiple technicians.
   */

  toggleTechnician(
    technicianId: string
  ): void {

    const control =
      this.serviceForm.controls.technicianIds;

    const selected =
      control.value;

    if (selected.includes(technicianId)) {

      control.setValue(
        selected.filter(
          id => id !== technicianId
        )
      );

      return;
    }

    control.setValue([
      ...selected,
      technicianId
    ]);
  }


  isTechnicianSelected(
    technicianId: string
  ): boolean {

    return this.serviceForm.controls
      .technicianIds
      .value
      .includes(technicianId);
  }


  /*
   * SAVE
   *
   * Frontend only for now.
   * Backend API will replace this later.
   */

  saveService(): void {

    this.serviceForm.markAllAsTouched();

    if (this.serviceForm.invalid) {
      return;
    }

    const serviceRecord = {

      customerId: this.customerId,

      ...this.serviceForm.getRawValue()

    };

    console.log(
      'SERVICE RECORD:',
      serviceRecord
    );

    /*
     * Later:
     *
     * POST /api/services
     */

    void this.router.navigate([
      '/customers',
      this.customerId
    ]);
  }


  cancel(): void {

    if (this.customerId) {

      void this.router.navigate([
        '/customers',
        this.customerId
      ]);

      return;
    }

    void this.router.navigate([
      '/services'
    ]);
  }

}