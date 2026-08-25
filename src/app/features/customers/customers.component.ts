import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../core/services/mock-data.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    PageHeaderComponent
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  private readonly dataService = inject(MockDataService);

  readonly searchQuery = signal('');

  readonly customers = computed(() => {
    const query = this.searchQuery()
      .trim()
      .toLowerCase();

    if (!query) {
      return this.dataService.customers;
    }

    return this.dataService.customers.filter(customer =>
      customer.name.toLowerCase().includes(query) ||
      customer.primaryPhone.includes(query) ||
      customer.customerCode.toLowerCase().includes(query)
    );
  });

  updateSearch(value: string): void {
    this.searchQuery.set(value);
  }

  openWhatsApp(phone: string, customerName: string): void {
    const normalizedPhone = this.normalizeIndianPhone(phone);

    const message = [
      `Hello ${customerName},`,
      '',
      'This is a service reminder from our AC Service Center.',
      '',
      'Please contact us to confirm your convenient service time.'
    ].join('\n');

    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${normalizedPhone}?text=${encodedMessage}`,
      '_blank',
      'noopener,noreferrer'
    );
  }

  callCustomer(phone: string): void {
    const normalizedPhone = this.normalizePhoneForDialer(phone);

    window.location.href = `tel:${normalizedPhone}`;
  }

  private normalizeIndianPhone(phone: string): string {
    const digits = phone.replace(/\D/g, '');

    if (digits.startsWith('91') && digits.length === 12) {
      return digits;
    }

    return `91${digits}`;
  }

  private normalizePhoneForDialer(phone: string): string {
    const digits = phone.replace(/\D/g, '');

    if (digits.startsWith('91') && digits.length === 12) {
      return `+${digits}`;
    }

    return `+91${digits}`;
  }
}