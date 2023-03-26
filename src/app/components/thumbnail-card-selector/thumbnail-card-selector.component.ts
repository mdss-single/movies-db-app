import { NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchMediaType } from '../../shared/enums/search';
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
  ]
})
export class ThumbnailCardSelectorComponent implements OnInit {
  public mediaType = SearchMediaType;
  public isMovieCard = false;

  @Input() public card?: SearchCard;

  public ngOnInit(): void {
    if (this.card?.type === SearchMediaType.Movie) {
      this.isMovieCard = true;
    }
  }
}
