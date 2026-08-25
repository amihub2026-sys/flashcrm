import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  readonly summaryCards = [
    {
      label: 'TOTAL NOTIFICATIONS',
      value: '0'
    },
    {
      label: 'SENT',
      value: '0'
    },
    {
      label: 'PENDING',
      value: '0'
    },
    {
      label: 'FAILED',
      value: '0'
    }
  ];

}