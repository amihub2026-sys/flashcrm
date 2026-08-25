import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-ac-units',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="AC Unit Management" subtitle="Maintain every AC separately under the correct customer, with model, serial, installation and warranty history." primaryAction="+ Add AC Unit" [cards]="cards" />`
})
export class AcUnitsComponent {
  cards = [
    { icon: '❄', title: 'AC Registry', text: 'Search and manage every installed AC unit.' },
    { icon: '⌂', title: 'Installation Data', text: 'Track installation date, technician and warranty.' },
    { icon: '⌁', title: 'Unit History', text: 'See services, repairs, parts and notes for one AC.' }
  ];
}
