import { Component } from '@angular/core';
import { ModulePlaceholderComponent } from '../../shared/components/module-placeholder/module-placeholder.component';

@Component({
  selector: 'app-communications',
  standalone: true,
  imports: [ModulePlaceholderComponent],
  template: `<app-module-placeholder title="WhatsApp & Call Management" subtitle="Use free click-to-WhatsApp, click-to-call and record the result of every customer follow-up." primaryAction="Open Today’s Queue" [cards]="cards" />`
})
export class CommunicationsComponent {
  cards = [
    { icon: 'WA', title: 'WhatsApp Queue', text: 'Open pre-filled customer messages and mark sent.' },
    { icon: '☎', title: 'Call Queue', text: 'Call customers and record contacted/no-answer/callback.' },
    { icon: '✎', title: 'Templates', text: 'Maintain reusable service reminder messages.' }
  ];
}
