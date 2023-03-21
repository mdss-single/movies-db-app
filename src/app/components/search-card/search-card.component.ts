import {
  Component,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchCard } from '../../shared/interfaces/search';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';
import { RatingPipe } from '../../shared/pipes/rating.pipe';

@Component({
  selector: 'tmbd-search-card',
  standalone: true,
  imports: [CommonModule, RouterLink, ImagePathPipe, RatingPipe],
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent {
  @Input() public card?: SearchCard;
}
