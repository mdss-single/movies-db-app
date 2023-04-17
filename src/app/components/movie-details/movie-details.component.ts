import {
  DatePipe,
  NgForOf,
  NgIf
} from '@angular/common';
import {
  Component,
  Input,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiRequestType } from '../../shared/enums/api-request';
import { MediaType } from '../../shared/enums/media-types';
import { MovieDetails } from '../../shared/interfaces/movies';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';
import { ApiService } from '../../shared/services/api.service';
import { GuestSessionService } from '../../shared/services/guest-session.service';
import { MovieRatingComponent } from '../movie-rating/movie-rating.component';

@Component({
  selector: 'tmbd-movie-details',
  standalone: true,
  imports: [ImagePathPipe, NgIf, NgForOf, DatePipe, MovieRatingComponent],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnDestroy {
  @Input() public details?: MovieDetails;
  @Input() public pageType: MediaType.Movie | MediaType.Tv = MediaType.Movie;

  private guestSession = this.guestSessionService.guestSession;
  private rateSubscription!: Subscription;
  public isVoted = false;

  constructor(
    private readonly apiService: ApiService,
    private readonly guestSessionService: GuestSessionService,
  ) {}

  public rateMovieOrTv(rating: number): void {
    const rateParams = `${this.pageType}/${this.details?.id}/${ApiRequestType.Rating + this.guestSession}`;
    const rateValue = {
      value: rating,
    };

    this.rateSubscription = this.apiService.rateMovieOrTv$(rateParams, rateValue)
      .subscribe(_ => this.isVoted = true);
  }

  public ngOnDestroy(): void {
    if (this.rateSubscription) {
      this.rateSubscription.unsubscribe();
    }
  }
}
