import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="Service & Complaint Management" subtitle="Register complaints and service requests, track progress, revisits and completion." primaryAction="+ New Service" [cards]="cards" />`
})
export class ServicesComponent {
  cards = [
    { icon: '⌁', title: 'Service Requests', text: 'General service, repair, gas filling and more.' },
    { icon: '!', title: 'Complaints', text: 'Track customer complaints and priority.' },
    { icon: '↻', title: 'Revisits', text: 'Handle recurring problems without losing history.' }
  ];
}
