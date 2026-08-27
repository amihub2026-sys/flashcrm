import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [],
  templateUrl: './back-button.html',
  styleUrl: './back-button.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackButton {

  @Input() label = 'Back';

  constructor(
    private readonly location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }
}