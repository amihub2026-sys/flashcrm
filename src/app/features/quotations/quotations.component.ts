import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-quotations',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="Quotation Management" subtitle="Create customer estimates containing service charges, spare parts, labour, tax and discount." primaryAction="+ New Quotation" [cards]="cards" />`
})
export class QuotationsComponent {
  cards = [
    { icon: '◧', title: 'Create Quote', text: 'Build itemized service quotations.' },
    { icon: '✓', title: 'Approval', text: 'Track pending, accepted and rejected quotes.' },
    { icon: 'PDF', title: 'PDF Output', text: 'Prepare quotation data for PDF generation later.' }
  ];
}
