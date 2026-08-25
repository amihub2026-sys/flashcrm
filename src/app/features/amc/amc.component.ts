import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-amc',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="AMC Management" subtitle="Manage maintenance contracts, service frequencies, used services and renewal dates." primaryAction="+ Create AMC" [cards]="cards" />`
})
export class AmcComponent {
  cards = [
    { icon: '↻', title: 'AMC Contracts', text: 'Create and manage active contracts.' },
    { icon: '□', title: 'Service Schedule', text: 'Generate AMC service dates automatically.' },
    { icon: '◷', title: 'Renewals', text: 'Track upcoming AMC expiry and renewal follow-ups.' }
  ];
}
