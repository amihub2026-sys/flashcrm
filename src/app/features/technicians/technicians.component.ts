import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-technicians',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="Technician Management" subtitle="Manage technician profiles, skills, availability, workload and performance." primaryAction="+ Add Technician" [cards]="cards" />`
})
export class TechniciansComponent {
  cards = [
    { icon: '♙', title: 'Technician Directory', text: 'Maintain phone, skills and active status.' },
    { icon: '▣', title: 'Workload', text: 'See active jobs and today’s assignments.' },
    { icon: '★', title: 'Performance', text: 'Track completed jobs, revisits and service quality.' }
  ];
}
