import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { CastDetailsComponent } from '../../components/cast-details/cast-details.component';
import { MediaType } from '../../shared/enums/media-types';

@Component({
  selector: 'tmbd-movie-cast',
  standalone: true,
  templateUrl: './movie-cast.component.html',
  imports: [
    CastDetailsComponent
  ],
  styleUrls: ['./movie-cast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCastComponent {
  public pageType = MediaType;
}
