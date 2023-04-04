import { Component } from '@angular/core';
import { MovieTvSelectorComponent } from '../../components/movie-tv-selector/movie-tv-selector.component';
import { PageDetailsType } from '../../shared/enums/page-types';

@Component({
  selector: 'tmbd-tv',
  standalone: true,
  templateUrl: './tv.component.html',
  imports: [
    MovieTvSelectorComponent
  ],
  styleUrls: ['./tv.component.scss']
})
export class TvComponent {
  public pageType = PageDetailsType;
}
