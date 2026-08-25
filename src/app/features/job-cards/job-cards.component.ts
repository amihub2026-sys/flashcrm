import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-job-cards',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="Job Cards & Service History" subtitle="Capture complaint, diagnosis, work performed, parts used, technicians and completion notes." primaryAction="+ New Job Card" [cards]="cards" />`
})
export class JobCardsComponent {
  cards = [
    { icon: '▤', title: 'Job Cards', text: 'Create a structured record for every service visit.' },
    { icon: '✓', title: 'Completion', text: 'Capture completion status and customer confirmation.' },
    { icon: '⌁', title: 'History', text: 'Build permanent service history for each AC.' }
  ];
}
