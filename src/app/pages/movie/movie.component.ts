import { Component } from '@angular/core';
import { MovieTvSelectorComponent } from '../../components/movie-tv-selector/movie-tv-selector.component';
import { PageDetailsType } from '../../shared/enums/page-types';

@Component({
  selector: 'tmbd-movie',
  standalone: true,
  templateUrl: './movie.component.html',
  imports: [
    MovieTvSelectorComponent
  ],
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {
  public pageType = PageDetailsType;
}
