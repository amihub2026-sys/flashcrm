import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-reminders',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="Reminder & Follow-up Management" subtitle="The reminder engine for AMC, EWC, service, payments, callbacks and reschedules." primaryAction="+ Add Follow-up" [cards]="cards" />`
})
export class RemindersComponent {
  cards = [
    { icon: '●', title: 'Due Today', text: 'Everything the team must contact today.' },
    { icon: '!', title: 'Overdue', text: 'Follow-ups that were not completed on time.' },
    { icon: '◷', title: 'Upcoming', text: 'Future reminders generated from service dates.' }
  ];
}
