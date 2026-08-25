import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="Users, Roles & Permissions" subtitle="Control who can access customer data, internal notes, billing and settings." primaryAction="+ Add User" [cards]="cards" />`
})
export class UsersComponent {
  cards = [
    { icon: 'A', title: 'Administrators', text: 'Full access and system control.' },
    { icon: 'M', title: 'Managers', text: 'Operations, customers and follow-ups.' },
    { icon: 'T', title: 'Technicians', text: 'Assigned jobs and permitted service information.' }
  ];
}
