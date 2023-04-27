import {
  AsyncPipe,
  DatePipe,
  NgIf
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';
import { RatingPipe } from '../../shared/pipes/rating.pipe';

type MovieCard = {
  id: number;
  title: string;
  type: string;
  poster: string;
  rating?: number;
  date?: Date | string;
}

@Component({
  selector: 'tmbd-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  imports: [
    RouterLink,
    DatePipe,
    ImagePathPipe,
    AsyncPipe,
    NgIf,
    RatingPipe
  ],
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  @Input() public card?: MovieCard;
}
