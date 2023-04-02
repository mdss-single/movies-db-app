import {
  AsyncPipe,
  DatePipe,
  JsonPipe,
  NgForOf,
  NgIf
} from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';
import { Observable } from 'rxjs';
import { PersonCardComponent } from '../../components/person-card/person-card.component';
import { ScrollerComponent } from '../../components/scroller/scroller.component';
import { ApiRequestType } from '../../shared/enums/api-request';
import { CastCard } from '../../shared/interfaces/cast';
import { MovieDetails } from '../../shared/interfaces/movies';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'tmbd-movie',
  standalone: true,
  templateUrl: './movie.component.html',
  imports: [
    AsyncPipe,
    JsonPipe,
    NgIf,
    ImagePathPipe,
    NgForOf,
    DatePipe,
    ScrollerComponent,
    PersonCardComponent,
    RouterLink
  ],
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  private isMovie = false;
  public movieId!: number;

  public pageDetails$!: Observable<MovieDetails>;
  public cast$!: Observable<CastCard[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  public ngOnInit(): void {
    const routeSnapshot = this.route.snapshot;

    if (routeSnapshot.routeConfig && routeSnapshot.routeConfig.path) {
      this.isMovie = routeSnapshot.routeConfig.path.includes(ApiRequestType.MovieDetails);
    }

    this.movieId = this.route.snapshot.params['id'];
    const requestType = this.isMovie ? ApiRequestType.MovieDetails : ApiRequestType.TvDetails;

    this.pageDetails$ = this.apiService.getMovieDetails$(requestType + this.movieId);
    this.cast$ = this.apiService.getMovieCast$(requestType + this.movieId + ApiRequestType.Credits, {
      topTen: true,
    });
  }
}
