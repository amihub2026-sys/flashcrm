import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    ModulePlaceholderComponent,
    RouterLink
  ],
  template: `
    <app-module-placeholder
      title="Inventory Management"
      subtitle="Track spare parts, stock movement, selling price and low-stock alerts."
      primaryAction="+ Add Stock"
      [cards]="cards"
    />

    <section class="materials-entry">
      <div>
        <span>PRICE MASTER</span>
        <h2>Materials & Fixed Rates</h2>
        <p>
          Manage materials and their fixed rates used in customer services.
        </p>
      </div>

      <a
        routerLink="/inventory/materials"
        class="materials-btn"
      >
        Manage Materials →
      </a>
    </section>
  `,
  styles: [`
    .materials-entry {
      margin-top: 22px;
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      box-sizing: border-box;
    }

    .materials-entry span {
      display: block;
      margin-bottom: 6px;
      color: #0284c7;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1px;
    }

    .materials-entry h2 {
      margin: 0;
      color: #0f172a;
      font-size: 20px;
      font-weight: 800;
    }

    .materials-entry p {
      margin: 6px 0 0;
      color: #64748b;
      font-size: 13px;
    }

    .materials-btn {
      flex: 0 0 auto;
      padding: 12px 18px;
      border-radius: 10px;
      background: #0284c7;
      color: #ffffff;
      text-decoration: none;
      font-size: 13px;
      font-weight: 800;
    }

    @media (max-width: 650px) {
      .materials-entry {
        align-items: stretch;
        flex-direction: column;
      }

      .materials-btn {
        text-align: center;
      }
    }
  `]
})
export class InventoryComponent {

  cards = [
    {
      icon: '◫',
      title: 'Parts Stock',
      text: 'Maintain quantities and part categories.'
    },
    {
      icon: '↕',
      title: 'Stock Movement',
      text: 'Record stock in and parts consumed in jobs.'
    },
    {
      icon: '!',
      title: 'Low Stock',
      text: 'Highlight items below the minimum quantity.'
    }
  ];

}