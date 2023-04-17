import {
  NgForOf,
  NgIf
} from '@angular/common';
import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'tmbd-movie-rating',
  standalone: true,
  templateUrl: './movie-rating.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./movie-rating.component.scss']
})
export class MovieRatingComponent {
  @Output() public movieRating = new EventEmitter<number>();

  public readonly stars = new Array(10);

  emitIndex(index: number): void {
    this.movieRating.emit(index + 1);
  }
}
