import {
  AsyncPipe,
  DatePipe,
  NgIf
} from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../shared/interfaces/movies';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';

@Component({
    selector: 'tmbd-movie-card',
    standalone: true,
    templateUrl: './movie-card.component.html',
  imports: [
    RouterLink,
    DatePipe,
    ImagePathPipe,
    AsyncPipe,
    NgIf
  ],
    styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input('card') public card!: Movie;
}
