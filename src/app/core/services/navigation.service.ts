import { Injectable } from '@angular/core';

export interface NavigationItem {
  label: string;
  icon: string;
  route: string;
  section?: string;
}

@Injectable({ providedIn: 'root' })
export class NavigationService {
  readonly items: NavigationItem[] = [
    { label: 'Dashboard', icon: '▦', route: '/dashboard', section: 'MAIN' },

    { label: 'Customers', icon: '◎', route: '/customers', section: 'WORK' },

    { label: 'Today\'s Follow-ups', icon: '◷', route: '/reminders' },

    { label: 'Services', icon: '⌁', route: '/services' },

    { label: 'AMC & EWC', icon: '↻', route: '/amc' },

    { label: 'Technicians', icon: '♙', route: '/technicians', section: 'OPERATIONS' },

    { label: 'Billing', icon: '₹', route: '/billing' },

    { label: 'Inventory', icon: '◫', route: '/inventory' },

    { label: 'Calendar', icon: '□', route: '/calendar', section: 'INSIGHTS' },

    { label: 'Reports', icon: '⌁', route: '/reports' },

    { label: 'Settings', icon: '⚙', route: '/settings', section: 'ADMIN' }
  ];
}