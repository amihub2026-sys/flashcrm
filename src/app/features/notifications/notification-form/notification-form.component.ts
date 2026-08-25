import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type AudienceType =
  | 'all'
  | 'amc'
  | 'ewc'
  | 'selected';

interface DemoCustomer {
  id: string;
  name: string;
  phone: string;
  whatsappAvailable: boolean;
  hasAmc: boolean;
  hasEwc: boolean;
}

@Component({
  selector: 'app-notification-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './notification-form.component.html',
  styleUrl: './notification-form.component.css'
})
export class NotificationFormComponent {

  /* =========================================================
     AUDIENCE
  ========================================================= */

  readonly audience = signal<AudienceType>('all');

  readonly selectedCustomerIds = signal<string[]>([]);

  /* =========================================================
     IMAGE UPLOAD
  ========================================================= */

  imagePreview: string | null = null;

  selectedImage: File | null = null;

  /* =========================================================
     DEMO CUSTOMERS
  ========================================================= */

  readonly demoCustomers: DemoCustomer[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      phone: '9876543210',
      whatsappAvailable: true,
      hasAmc: true,
      hasEwc: false
    },
    {
      id: '2',
      name: 'Meena Stores',
      phone: '9840011223',
      whatsappAvailable: true,
      hasAmc: true,
      hasEwc: true
    },
    {
      id: '3',
      name: 'Suresh Babu',
      phone: '9790012345',
      whatsappAvailable: false,
      hasAmc: false,
      hasEwc: true
    },
    {
      id: '4',
      name: 'A1 Office Solutions',
      phone: '9092555500',
      whatsappAvailable: true,
      hasAmc: true,
      hasEwc: false
    }
  ];

  /* =========================================================
     MESSAGE
  ========================================================= */

  template = 'custom';

  message =
    'Hello {{customerName}}, this is from AC Service Center. We have an important service update for you. Please contact us for more details.';

  searchTerm = '';

  demoSent = false;

  /* =========================================================
     RECIPIENTS
  ========================================================= */

  readonly recipients = computed(() => {

    switch (this.audience()) {

      case 'amc':
        return this.demoCustomers.filter(
          customer => customer.hasAmc
        );

      case 'ewc':
        return this.demoCustomers.filter(
          customer => customer.hasEwc
        );

      case 'selected':
        return this.demoCustomers.filter(
          customer =>
            this.selectedCustomerIds().includes(customer.id)
        );

      default:
        return this.demoCustomers;
    }
  });

  readonly whatsappRecipients = computed(() =>
    this.recipients().filter(
      customer => customer.whatsappAvailable
    )
  );

  readonly unavailableRecipients = computed(() =>
    this.recipients().filter(
      customer => !customer.whatsappAvailable
    )
  );

  /* =========================================================
     AUDIENCE SELECTION
  ========================================================= */

  selectAudience(
    audience: AudienceType
  ): void {

    this.audience.set(audience);

    this.demoSent = false;
  }

  /* =========================================================
     TEMPLATE
  ========================================================= */

  selectTemplate(): void {

    switch (this.template) {

      case 'amc':
        this.message =
          'Hello {{customerName}}, your AMC service is due. Please contact AC Service Center to schedule your service.';
        break;

      case 'ewc':
        this.message =
          'Hello {{customerName}}, your Extended Warranty coverage requires attention. Please contact AC Service Center for details.';
        break;

      case 'service':
        this.message =
          'Hello {{customerName}}, this is a reminder regarding your upcoming AC service. Please contact us if you need to reschedule.';
        break;

      case 'offer':
        this.message =
          'Hello {{customerName}}, we have a special AC service offer available for you. Contact AC Service Center for more details.';
        break;

      default:
        this.message =
          'Hello {{customerName}}, this is from AC Service Center. We have an important service update for you. Please contact us for more details.';
    }

    this.demoSent = false;
  }

  /* =========================================================
     CUSTOMER SELECTION
  ========================================================= */

  toggleCustomer(
    customerId: string
  ): void {

    const selected = this.selectedCustomerIds();

    if (selected.includes(customerId)) {

      this.selectedCustomerIds.set(
        selected.filter(
          id => id !== customerId
        )
      );

    } else {

      this.selectedCustomerIds.set([
        ...selected,
        customerId
      ]);
    }

    this.demoSent = false;
  }

  isCustomerSelected(
    customerId: string
  ): boolean {

    return this.selectedCustomerIds()
      .includes(customerId);
  }

  filteredCustomers(): DemoCustomer[] {

    const search =
      this.searchTerm.trim().toLowerCase();

    if (!search) {
      return this.demoCustomers;
    }

    return this.demoCustomers.filter(
      customer =>
        customer.name.toLowerCase().includes(search) ||
        customer.phone.includes(search)
    );
  }

  /* =========================================================
     AUDIENCE NAME
  ========================================================= */

  getAudienceName(): string {

    switch (this.audience()) {

      case 'amc':
        return 'AMC Customers';

      case 'ewc':
        return 'EWC Customers';

      case 'selected':
        return 'Selected Customers';

      default:
        return 'All Customers';
    }
  }

  /* =========================================================
     IMAGE SELECT
  ========================================================= */

  onImageSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    const file =
      input.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp'
    ];

    if (!allowedTypes.includes(file.type)) {

      alert(
        'Please select a JPG, PNG or WEBP image.'
      );

      input.value = '';

      return;
    }

    /*
     * 5 MB maximum for the frontend demo.
     */

    if (file.size > 5 * 1024 * 1024) {

      alert(
        'Image size must be less than 5 MB.'
      );

      input.value = '';

      return;
    }

    this.selectedImage = file;

    const reader =
      new FileReader();

    reader.onload = () => {

      this.imagePreview =
        reader.result as string;
    };

    reader.readAsDataURL(file);

    this.demoSent = false;
  }

  /* =========================================================
     REMOVE IMAGE
  ========================================================= */

  removeImage(): void {

    this.selectedImage = null;

    this.imagePreview = null;

    const input =
      document.getElementById(
        'notificationImage'
      ) as HTMLInputElement | null;

    const changeInput =
      document.getElementById(
        'notificationImageChange'
      ) as HTMLInputElement | null;

    if (input) {
      input.value = '';
    }

    if (changeInput) {
      changeInput.value = '';
    }

    this.demoSent = false;
  }

  /* =========================================================
     SEND DEMO
  ========================================================= */

  sendDemoNotification(): void {

    if (
      this.whatsappRecipients().length === 0 ||
      !this.message.trim()
    ) {
      return;
    }

    /*
     * DEMO ONLY.
     *
     * No WhatsApp API request is made here.
     *
     * Later:
     * Frontend -> Backend -> WhatsApp Business API
     */

    this.demoSent = true;
  }

  /* =========================================================
     RESET
  ========================================================= */

  reset(): void {

    this.audience.set('all');

    this.selectedCustomerIds.set([]);

    this.template = 'custom';

    this.searchTerm = '';

    this.demoSent = false;

    this.removeImage();

    this.selectTemplate();
  }
}