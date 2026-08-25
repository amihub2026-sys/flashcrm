import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="Settings & Master Data" subtitle="Configure company information, plans, service types, message templates and CRM defaults." primaryAction="Save Settings" [cards]="cards" />`
})
export class SettingsComponent {
  cards = [
    { icon: '⚙', title: 'Company Settings', text: 'Logo, contact, address and invoice preferences.' },
    { icon: '▤', title: 'Master Data', text: 'AC brands, service types, AMC/EWC plans and parts categories.' },
    { icon: '✎', title: 'Message Templates', text: 'Maintain WhatsApp and call follow-up text templates.' }
  ];
}
