import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'tmbd-scroller',
  standalone: true,
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerComponent {}
