import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MovieTvListComponent } from '../../components/movie-tv-list/movie-tv-list.component';
import { MediaType } from '../../shared/enums/media-types';

@Component({
  selector: 'tmbd-movie-list',
  standalone: true,
  template: '<tmbd-movie-tv-list [mediaType]="mediaType"></tmbd-movie-tv-list>',
  imports: [
    MovieTvListComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent {
  public readonly mediaType = MediaType.Movie;
}
