import {
  DatePipe,
  NgIf,
  NgTemplateOutlet
} from '@angular/common';
import {
  Component,
  Input
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchCardDTO } from '../../shared/interfaces/search';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';
import { RatingPipe } from '../../shared/pipes/rating.pipe';

@Component({
  selector: 'tmbd-search-card',
  standalone: true,
  imports: [RouterLink, ImagePathPipe, RatingPipe, NgIf, NgTemplateOutlet, DatePipe],
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent {
  @Input() public card?: SearchCardDTO;
}
