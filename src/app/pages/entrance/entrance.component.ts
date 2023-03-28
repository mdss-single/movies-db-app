import {
  AsyncPipe,
  NgForOf,
  NgIf
} from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  filter,
  Observable,
  switchMap,
} from 'rxjs';

import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { PersonCardComponent } from '../../components/person-card/person-card.component';
import { ScrollerComponent } from '../../components/scroller/scroller.component';
import { ThumbnailCardSelectorComponent } from '../../components/thumbnail-card-selector/thumbnail-card-selector.component';
import { ApiRequestType } from '../../shared/enums/api-request';
import { SearchMediaType } from '../../shared/enums/search';
import { MovieShortCard } from '../../shared/interfaces/movies';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'tmbd-entrance',
  standalone: true,
  imports: [
    ScrollerComponent,
    MovieCardComponent,
    PersonCardComponent,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    NgForOf,
    ThumbnailCardSelectorComponent,
    FilterPipe
  ],
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.scss']
})
export class EntranceComponent {
  private readonly minSearchSymbol = 2;
  public readonly cardType = SearchMediaType;

  private readonly popularMovies$: Observable<MovieShortCard[]> = this.apiService.getMovies$(ApiRequestType.MoviePopular);
  private readonly topRatedMovies$: Observable<MovieShortCard[]> = this.apiService.getMovies$(ApiRequestType.MovieTopRated);
  private readonly popularTv$: Observable<MovieShortCard[]> = this.apiService.getMovies$(ApiRequestType.TvPopular);
  private readonly topRatedTv$: Observable<MovieShortCard[]> = this.apiService.getMovies$(ApiRequestType.TvTopRated);

  public readonly upcomingMovies$: Observable<MovieShortCard[]> = this.apiService.getMovies$(ApiRequestType.MovieUpcoming);
  public readonly popular$ = combineLatest([this.popularMovies$, this.popularTv$]);
  public readonly rated$ = combineLatest([this.topRatedMovies$, this.topRatedTv$]);

  public searchInput = new FormControl('');
  public searchResult$ = this.searchInput.valueChanges.pipe(
    debounceTime(200),
    filter(Boolean),
    filter((searchString) => searchString.length > this.minSearchSymbol),
    switchMap((searchString) => this.apiService.search$(ApiRequestType.Search + searchString)),
  );

  constructor(private apiService: ApiService) {}
}
