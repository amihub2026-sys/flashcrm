import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="Invoices & Payments" subtitle="Track invoices, paid/partial/pending payments and customer balances." primaryAction="+ New Invoice" [cards]="cards" />`
})
export class BillingComponent {
  cards = [
    { icon: '₹', title: 'Invoices', text: 'Create itemized service invoices.' },
    { icon: '✓', title: 'Payments', text: 'Record cash, UPI, bank and partial payments.' },
    { icon: '!', title: 'Outstanding', text: 'Follow up customers with pending balances.' }
  ];
}
