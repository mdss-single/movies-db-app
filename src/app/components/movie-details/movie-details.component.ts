import {
  DatePipe,
  NgForOf,
  NgIf
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  Subscription,
  tap
} from 'rxjs';
import { ApiRequestType } from '../../shared/enums/api-request';
import { LocalStorageKeys } from '../../shared/enums/local-storage';
import { MediaType } from '../../shared/enums/media-types';
import { RatedCard } from '../../shared/interfaces/general';
import {
  MovieDetails,
  MovieRating,
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
  @Input() public pageType: MediaType.Movie | MediaType.Tv = MediaType.Movie;

  private guestSessionValue = this.userRate.guestSession;
  private ratedList: RatedCard[] = [];
  private rateSubscription!: Subscription;
  public userRating: number | null = null;

  constructor(
    private readonly apiService: ApiService,
    private readonly userRate: UserRateService,
    private readonly localStorage: LocalStorageService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    if (!this.guestSessionValue) {
      return;
    }

    this.ratedList = this.pageType === MediaType.Movie ?
      this.userRate.guestRatedMovies : this.userRate.guestRatedTv;
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
        tap((_: MovieRating) => {
          if (!this.guestSessionValue) {
            this.localStorage.setItem(LocalStorageKeys.GuestSession, this.guestSessionValue);
          }

          this.userRate.updateRateList(this.pageType, this.details?.id ?? 0, rateValue.value);
          this.userRating = rateValue.value;
          this.cdr.markForCheck();
        }),
      )
      .subscribe();
  }

  private checkMovieRating(): void {
    if (!this.ratedList.length) {
      return;
    }

    const currentMovieOrTv = this.ratedList.find((movieOrTv: RatedCard) => movieOrTv.id === this.details?.id);

    if (!currentMovieOrTv) {
      return;
    }

    this.userRating = currentMovieOrTv.rating;
    this.cdr.markForCheck();
  }
}
