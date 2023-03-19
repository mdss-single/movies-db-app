import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tmbd-scroller',
  standalone: true,
  templateUrl: './scroller.component.html',
  imports: [
    CommonModule
  ],
  styleUrls: ['./scroller.component.scss']
})
export class ScrollerComponent {
  @Input('showMore') public showMore? = false;
}
