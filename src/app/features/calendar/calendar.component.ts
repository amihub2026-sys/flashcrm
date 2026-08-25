import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="Calendar & Schedule" subtitle="One calendar for service visits, AMC dates, EWC expiry, callbacks and technician schedules." primaryAction="+ Add Schedule" [cards]="cards" />`
})
export class CalendarComponent {
  cards = [
    { icon: 'D', title: 'Day View', text: 'Focus on today’s visits and follow-ups.' },
    { icon: 'W', title: 'Week View', text: 'Plan technician workload for the week.' },
    { icon: 'M', title: 'Month View', text: 'See future AMC/EWC and service commitments.' }
  ];
}
