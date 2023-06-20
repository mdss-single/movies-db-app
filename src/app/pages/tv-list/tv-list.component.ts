import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MovieTvListComponent } from '../../components/movie-tv-list/movie-tv-list.component';
import { MediaType } from '../../shared/enums/media-types';

@Component({
  selector: 'tmbd-tv-list',
  standalone: true,
  template: '<tmbd-movie-tv-list [mediaType]="mediaType"></tmbd-movie-tv-list>',
  imports: [
    MovieTvListComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvListComponent {
  public readonly mediaType = MediaType.Tv;
}
