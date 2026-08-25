import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="Reports & Analytics" subtitle="Analyze service activity, revenue, AMC/EWC, technicians, parts and follow-up performance." primaryAction="Export Report" [cards]="cards" />`
})
export class ReportsComponent {
  cards = [
    { icon: '⌁', title: 'Service Reports', text: 'Daily/monthly jobs and service types.' },
    { icon: '₹', title: 'Revenue Reports', text: 'Billing, collection and pending amount.' },
    { icon: '♙', title: 'Technician Reports', text: 'Assignments, completions and revisits.' }
  ];
}
