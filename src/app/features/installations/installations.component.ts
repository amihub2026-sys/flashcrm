import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-installations',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="Installation Management" subtitle="Create installation jobs, assign technicians and generate future follow-up dates." primaryAction="+ New Installation" [cards]="cards" />`
})
export class InstallationsComponent {
  cards = [
    { icon: '▣', title: 'New Installations', text: 'Plan and track new AC installations.' },
    { icon: '♙', title: 'Technician Assignment', text: 'Assign a primary and support technicians.' },
    { icon: '◷', title: 'Follow-up Dates', text: 'Generate first service and installation follow-ups.' }
  ];
}
