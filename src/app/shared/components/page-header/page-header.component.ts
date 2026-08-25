import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent {

  @Input() eyebrow = 'AC SERVICE CRM';

  @Input({ required: true })
  title = '';

  @Input()
  subtitle = '';
}