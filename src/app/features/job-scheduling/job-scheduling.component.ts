import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-job-scheduling',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="Job Assignment & Scheduling" subtitle="Schedule service visits and assign one primary technician plus multiple support technicians." primaryAction="+ Schedule Job" [cards]="cards" />`
})
export class JobSchedulingComponent {
  cards = [
    { icon: '□', title: 'Daily Schedule', text: 'See service visits by date and time.' },
    { icon: '♙', title: 'Assignments', text: 'Assign primary and support technicians.' },
    { icon: '⌖', title: 'Location', text: 'Keep customer address and visit instructions together.' }
  ];
}
