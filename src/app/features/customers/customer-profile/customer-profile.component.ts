import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MockDataService } from '../../../core/services/mock-data.service';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dataService = inject(MockDataService);

  readonly customerId =
    this.route.snapshot.paramMap.get('id') ?? '';

  readonly customer = computed(() =>
    this.dataService.customers.find(
      customer => customer.id === this.customerId
    )
  );

  readonly acUnits = computed(() =>
    this.dataService.acUnits.filter(
      acUnit => acUnit.customerId === this.customerId
    )
  );

  readonly activeAcUnits = computed(() =>
    this.acUnits().filter(
      acUnit => acUnit.status === 'Active'
    )
  );

  goBack(): void {
    void this.router.navigate(['/customers']);
  }

  openWhatsApp(): void {

    const customer = this.customer();

    if (
      !customer ||
      !customer.whatsappAvailable
    ) {
      return;
    }

    const phone = this.normalizeIndianPhone(
      customer.primaryPhone
    );

    const message = encodeURIComponent(
      `Hello ${customer.name}, this is from our AC Service Center.`
    );

    window.open(
      `https://wa.me/${phone}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  }

  callCustomer(): void {

    const customer = this.customer();

    if (!customer) {
      return;
    }

    const phone = this.normalizePhoneForDialer(
      customer.primaryPhone
    );

    window.location.href = `tel:${phone}`;
  }

  startNewService(): void {

    const customer = this.customer();

    if (!customer) {
      return;
    }

    void this.router.navigate(
      ['/services/new'],
      {
        queryParams: {
          customerId: customer.id
        }
      }
    );
  }

  startServiceForAc(
    acUnitId: string
  ): void {

    const customer = this.customer();

    if (!customer) {
      return;
    }

    void this.router.navigate(
      ['/services/new'],
      {
        queryParams: {
          customerId: customer.id,
          acUnitId
        }
      }
    );
  }

  viewAc(
    acUnitId: string
  ): void {

    console.log(
      'View AC:',
      acUnitId
    );
  }

  addAc(): void {

    const customer = this.customer();

    if (!customer) {
      return;
    }

    console.log(
      'Add AC for customer:',
      customer.id
    );
  }

  getAcDisplayName(
    brand: string,
    type: string,
    tonnage?: string
  ): string {

    const parts = [
      brand,
      type
    ];

    if (tonnage) {
      parts.push(tonnage);
    }

    return parts.join(' • ');
  }

  displayValue(
    value?: string
  ): string {

    if (!value?.trim()) {
      return 'Not provided';
    }

    return value;
  }

  private normalizeIndianPhone(
    phone: string
  ): string {

    const digits =
      phone.replace(/\D/g, '');

    if (
      digits.startsWith('91') &&
      digits.length === 12
    ) {
      return digits;
    }

    return `91${digits}`;
  }

  private normalizePhoneForDialer(
    phone: string
  ): string {

    const digits =
      phone.replace(/\D/g, '');

    if (
      digits.startsWith('91') &&
      digits.length === 12
    ) {
      return `+${digits}`;
    }

    return `+91${digits}`;
  }
}