import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-ewc',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="EWC Management" subtitle="Track extended warranty coverage, policy information, covered parts and expiry reminders." primaryAction="+ Create EWC" [cards]="cards" />`
})
export class EwcComponent {
  cards = [
    { icon: '♢', title: 'EWC Contracts', text: 'Store plan, provider and policy details.' },
    { icon: '✓', title: 'Coverage', text: 'Record covered parts, labour and conditions.' },
    { icon: '◷', title: 'Expiry Reminders', text: 'Generate EWC expiry follow-ups automatically.' }
  ];
}
