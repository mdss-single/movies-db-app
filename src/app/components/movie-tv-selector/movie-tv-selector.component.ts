import {
  AsyncPipe,
  NgIf
} from '@angular/common';
import {
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
import { CastCard } from '../../shared/interfaces/cast';
import { MovieDetails } from '../../shared/interfaces/movies';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';
import { ApiService } from '../../shared/services/api.service';
import { CastListComponent } from '../cast-list/cast-list.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'tmbd-movie-tv-selector',
  standalone: true,
  templateUrl: './movie-tv-selector.component.html',
  imports: [
    AsyncPipe,
    ImagePathPipe,
    NgIf,
    RouterLink,
    CastListComponent,
    MovieDetailsComponent
  ],
})
export class MovieTvSelectorComponent {
  @Input() public pageType: 'movie' | 'tv' = 'movie';

  public $movieId: Observable<string> = this.route.params.pipe(
    map(value => value['id']),
    filter(Boolean)
  );

  public pageDetails$: Observable<MovieDetails> = this.$movieId.pipe(
    switchMap(movieId => {
      const params = `${this.pageType}/` + movieId;

      return this.apiService.getMovieDetails$(params);
    }),
  );

  public cast$: Observable<CastCard[]> = this.$movieId.pipe(
    switchMap(movieId => {
      const params = `${this.pageType}/` + movieId + ApiRequestType.Credits;

      return this.apiService.getMovieCast$(params, {
        topTen: true,
      })
    }),
  );

  constructor(
    private apiService: ApiService,
    private readonly route: ActivatedRoute,
  ) {}
}
