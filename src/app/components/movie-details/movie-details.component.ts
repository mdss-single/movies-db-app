import {
  AsyncPipe,
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
  Observable,
  Subscription,
} from 'rxjs';
import { MediaType } from '../../shared/enums/media-types';
import { MovieDetails } from '../../shared/interfaces/movies';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';
import { RatingPipe } from '../../shared/pipes/rating.pipe';
import { ApiService } from '../../shared/services/api.service';
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
    RatingPipe,
    AsyncPipe
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  @Input() public details?: MovieDetails;
  @Input() public pageType: MediaType.Movie | MediaType.Tv = MediaType.Movie;

  private setRateSubscription: Subscription | undefined;
  public userRating$: Observable<number | undefined> | undefined;

  constructor(
    private readonly apiService: ApiService,
    private readonly userRateService: UserRateService,
  ) {}

  public ngOnInit(): void {
    if (!this.details?.id) {
      return;
    }

    this.userRating$ = this.userRateService.getRatingValue$(this.pageType, this.details.id);
  }

  public ngOnDestroy(): void {
    if (this.setRateSubscription) {
      this.setRateSubscription.unsubscribe();
    }
  }

  public rateMovieOrTv(rating: number): void {
    if (!this.details?.id) {
      return;
    }

    this.setRateSubscription = this.userRateService.setRate$(this.pageType, this.details.id, rating).subscribe();
  }
}
