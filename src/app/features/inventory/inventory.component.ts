import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="Inventory Management" subtitle="Track spare parts, stock movement, selling price and low-stock alerts." primaryAction="+ Add Stock" [cards]="cards" />`
})
export class InventoryComponent {
  cards = [
    { icon: '◫', title: 'Parts Stock', text: 'Maintain quantities and part categories.' },
    { icon: '↕', title: 'Stock Movement', text: 'Record stock in and parts consumed in jobs.' },
    { icon: '!', title: 'Low Stock', text: 'Highlight items below the minimum quantity.' }
  ];
}
