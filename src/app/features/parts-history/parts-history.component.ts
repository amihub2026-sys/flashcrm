import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-parts-history',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="Parts Replacement & Internal Notes" subtitle="Save every replaced spare part and private technical note against the exact customer AC." primaryAction="+ Add Part Note" [cards]="cards" />`
})
export class PartsHistoryComponent {
  cards = [
    { icon: '◫', title: 'Replacement History', text: 'Know exactly which part was changed and when.' },
    { icon: '✎', title: 'Internal Notes', text: 'Private technician/admin knowledge for future visits.' },
    { icon: '♢', title: 'Part Warranty', text: 'Track replacement warranty and show active warranty warnings.' }
  ];
}
