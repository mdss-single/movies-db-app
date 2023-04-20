import {
  DatePipe,
  NgForOf,
  NgIf
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  BehaviorSubject,
  Subscription,
  tap
} from 'rxjs';
import { ApiRequestType } from '../../shared/enums/api-request';
import { LocalStorageKeys } from '../../shared/enums/local-storage';
import { MediaType } from '../../shared/enums/media-types';
import {
  MovieDetails,
  MovieRating,
  MovieShortCard
} from '../../shared/interfaces/movies';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';
import { RatingPipe } from '../../shared/pipes/rating.pipe';
import { ApiService } from '../../shared/services/api.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { UserRateService } from '../../shared/services/user-rate.service';
import { MovieRatingComponent } from '../movie-rating/movie-rating.component';

@Component({
  selector: 'tmbd-movie-details',
  standalone: true,
  imports: [
    ImagePathPipe,
    NgIf,
    NgForOf,
    DatePipe,
    MovieRatingComponent,
    RatingPipe
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  @Input() public details?: MovieDetails;
  @Input() public pageType?: MediaType.Movie | MediaType.Tv;

  private guestSessionValue = this.userRate.guestSession;
  private ratedList = new BehaviorSubject<MovieShortCard[]>([]);
  private rateSubscription!: Subscription;
  private isUserTokenExist = this.localStorage.getItem(LocalStorageKeys.GuestSession);
  public userRating: number | null = null;

  constructor(
    private readonly apiService: ApiService,
    private readonly userRate: UserRateService,
    private localStorage: LocalStorageService,
  ) {}

  public ngOnInit(): void {
    if (!this.isUserTokenExist) {
      return;
    }

    this.ratedList.next(this.pageType === MediaType.Movie ?
      this.userRate.guestRatedMovies : this.userRate.guestRatedTv)
    this.checkMovieRating();
  }

  public ngOnDestroy(): void {
    if (this.rateSubscription) {
      this.rateSubscription.unsubscribe();
    }
  }

  public rateMovieOrTv(rating: number): void {
    const rateParams = `${this.pageType}/${this.details?.id}/${ApiRequestType.Rating + this.guestSessionValue}`;
    const rateValue = {
      value: rating,
    };

    this.rateSubscription = this.apiService.rateMovieOrTv$(rateParams, rateValue)
      .pipe(
        tap((value: MovieRating) => {
          if (!this.isUserTokenExist) {
            this.localStorage.setItem(LocalStorageKeys.GuestSession, this.guestSessionValue);
          }

          // update rated list logic here
          // this.ratedList.next(value);
          this.userRating = rateValue.value;
        }),
      )
      .subscribe();
  }

  private checkMovieRating(): void {
    if (!this.ratedList.value.length) {
      return;
    }

    const currentMovieOrTv = this.ratedList.value.find((movieOrTv: MovieShortCard) => movieOrTv.id === this.details?.id);

    if (!currentMovieOrTv) {
      return;
    }

    this.userRating = currentMovieOrTv.rating;
  }
}
