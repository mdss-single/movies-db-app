import {
  DatePipe,
  NgForOf,
  NgIf
} from '@angular/common';
import {
  Component,
  Input
} from '@angular/core';
import { MovieDetails } from '../../shared/interfaces/movies';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';

@Component({
  selector: 'tmbd-movie-details',
  standalone: true,
  imports: [ImagePathPipe, NgIf, NgForOf, DatePipe],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  @Input() public details?: MovieDetails;
}
