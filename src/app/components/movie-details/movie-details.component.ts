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
  BehaviorSubject,
  Subscription,
  take,
  tap
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
    RatingPipe
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  @Input() public details?: MovieDetails;
  @Input() public pageType: MediaType.Movie | MediaType.Tv = MediaType.Movie;

  private rateSubscription!: Subscription;
  public userRating = new BehaviorSubject<number | undefined>(undefined);

  constructor(
    private readonly apiService: ApiService,
    private readonly userRateService: UserRateService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    if (!this.details?.id) {
      return;
    }

    const userRatingValue = this.userRateService.getRatedList(this.pageType, this.details.id);

    if (!userRatingValue) {
      return;
    }

    this.userRating.next(userRatingValue);
    this.cdr.markForCheck();
  }

  public ngOnDestroy(): void {
    if (this.rateSubscription) {
      this.rateSubscription.unsubscribe();
    }
  }

  public rateMovieOrTv(rating: number): void {
    if (!this.details?.id) {
      return;
    }

    this.userRateService.setRate$(this.pageType, this.details.id, rating).pipe(
      take(1),
      tap((_) => {
        this.userRating.next(rating);
        this.cdr.markForCheck();
      }),
    ).subscribe();
  }
}
