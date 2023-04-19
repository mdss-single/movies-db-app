import {
  AsyncPipe,
  NgIf
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';
import {
  filter,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { ApiRequestType } from '../../shared/enums/api-request';
import { MediaType } from '../../shared/enums/media-types';
import { CastAndCrew } from '../../shared/interfaces/cast';
import { MovieDetails } from '../../shared/interfaces/movies';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';
import { ApiService } from '../../shared/services/api.service';
import { CastListComponent } from '../cast-list/cast-list.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'tmbd-movie-tv-selector',
  standalone: true,
  templateUrl: './movie-tv-selector.component.html',
  styleUrls: ['./movie-tv-selector.component.scss'],
  imports: [
    AsyncPipe,
    ImagePathPipe,
    NgIf,
    RouterLink,
    CastListComponent,
    MovieDetailsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieTvSelectorComponent {
  @Input() public pageType?: MediaType.Movie | MediaType.Tv;

  private pageId$: Observable<string> = this.route.params.pipe(
    map(value => value['id']),
    filter(Boolean)
  );

  public pageDetails$: Observable<MovieDetails> = this.pageId$.pipe(
    switchMap((pageId) => {
      const params = `${this.pageType}/` + pageId;

      if (this.pageType === MediaType.Movie) {
        return this.apiService.getMovieDetails$(params);
      }

      return this.apiService.getTvDetails$(params);
    }),
  );

  public cast$: Observable<CastAndCrew> = this.pageId$.pipe(
    switchMap(pageId => {
      const params = `${this.pageType}/` + pageId + ApiRequestType.Credits;

      return this.apiService.getMovieOrTvCast$(params, {
        top_ten: true,
      })
    }),
  );

  constructor(
    private apiService: ApiService,
    private readonly route: ActivatedRoute,
  ) {}
}
