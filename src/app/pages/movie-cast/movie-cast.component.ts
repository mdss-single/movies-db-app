import { Component } from '@angular/core';
import { CastDetailsComponent } from '../../components/cast-details/cast-details.component';
import { PageDetailsType } from '../../shared/enums/page-types';

@Component({
  selector: 'tmbd-movie-cast',
  standalone: true,
  templateUrl: './movie-cast.component.html',
  imports: [
    CastDetailsComponent
  ],
  styleUrls: ['./movie-cast.component.scss']
})
export class MovieCastComponent {
  public pageType = PageDetailsType;
}
