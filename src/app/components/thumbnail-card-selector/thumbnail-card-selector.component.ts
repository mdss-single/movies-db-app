import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaType } from '../../shared/enums/media-types';
import { SearchCard } from '../../shared/interfaces/search';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { PersonCardComponent } from '../person-card/person-card.component';

@Component({
  selector: 'tmbd-thumbnail-card-selector',
  standalone: true,
  templateUrl: './thumbnail-card-selector.component.html',
  imports: [
    MovieCardComponent,
    NgIf,
    PersonCardComponent,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailCardSelectorComponent {
  public cardType = MediaType;

  @Input() public card?: SearchCard;
}
