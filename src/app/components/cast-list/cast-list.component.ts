import {
  NgForOf,
  NgIf,
  NgTemplateOutlet
} from '@angular/common';
import {
  Component,
  Input
} from '@angular/core';
import { CastCard } from '../../shared/interfaces/cast';
import { PersonCardComponent } from '../person-card/person-card.component';
import { ScrollerComponent } from '../scroller/scroller.component';

@Component({
  selector: 'tmbd-cast-list',
  standalone: true,
  templateUrl: './cast-list.component.html',
  imports: [
    PersonCardComponent,
    NgForOf,
    ScrollerComponent,
    NgIf,
    NgTemplateOutlet
  ],
  styleUrls: ['./cast-list.component.scss']
})
export class CastListComponent {
  @Input() public castList?: CastCard[];
  @Input() public insideScroller: boolean = false;
}
