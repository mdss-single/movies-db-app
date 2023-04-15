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
  switchMap
} from 'rxjs';
import { ApiRequestType } from '../../shared/enums/api-request';
import { MediaType } from '../../shared/enums/media-types';
import { CastAndCrew } from '../../shared/interfaces/cast';
import { MovieDetails } from '../../shared/interfaces/movies';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';
import { ApiService } from '../../shared/services/api.service';
import { CastListComponent } from '../cast-list/cast-list.component';

@Component({
  selector: 'tmbd-cast-details',
  standalone: true,
  imports: [ImagePathPipe, CastListComponent, AsyncPipe, NgIf, RouterLink],
  templateUrl: './cast-details.component.html',
  styleUrls: ['./cast-details.component.scss']
})
export class CastDetailsComponent {
  @Input() public pageType: MediaType.Movie | MediaType.Tv = MediaType.Movie;

  public pageId$: Observable<string> = this.route.params.pipe(
    map(value => value['id']),
    filter(Boolean)
  );

  public pageDetails$: Observable<MovieDetails> = this.pageId$.pipe(
    switchMap(pageId => {
      const params = `${this.pageType}/` + pageId;

      return this.apiService.getMovieDetails$(params);
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
