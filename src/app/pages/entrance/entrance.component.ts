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
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchMap
} from 'rxjs';

import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { PersonCardComponent } from '../../components/person-card/person-card.component';
import { ScrollerComponent } from '../../components/scroller/scroller.component';
import { ThumbnailCardSelectorComponent } from '../../components/thumbnail-card-selector/thumbnail-card-selector.component';
import { ApiRequestType } from '../../shared/enums/api-request';
import { MediaType } from '../../shared/enums/media-types';
import { MovieShortCard } from '../../shared/interfaces/movies';
import { SearchCard } from '../../shared/interfaces/search';
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

  private readonly popularMovies$: Observable<MovieShortCard[]> = this.apiService.getMovieList$(ApiRequestType.MoviePopular);
  private readonly topRatedMovies$: Observable<MovieShortCard[]> = this.apiService.getMovieList$(ApiRequestType.MovieTopRated);
  private readonly popularTv$: Observable<MovieShortCard[]> = this.apiService.getTvList$(ApiRequestType.TvPopular);
  private readonly topRatedTv$: Observable<MovieShortCard[]> = this.apiService.getTvList$(ApiRequestType.TvTopRated);

  public readonly upcomingMovies$: Observable<MovieShortCard[]> = this.apiService.getMovieList$(ApiRequestType.MovieUpcoming);
  public readonly popular$ = combineLatest([this.popularMovies$, this.popularTv$]);
  public readonly rated$ = combineLatest([this.topRatedMovies$, this.topRatedTv$]);

  public readonly filterByPerson = (value: SearchCard) => value.type === MediaType.Person;
  public readonly filterByMovie = (value: SearchCard) => value.type !== MediaType.Person;

  public searchInput = new FormControl('');
  public isSearchHidden$ = this.searchInput.valueChanges.pipe(
    filter(Boolean),
    map(value => value.length >= this.minSearchSymbol),
  );

  public searchResult$ = this.searchInput.valueChanges.pipe(
    filter(Boolean),
    filter((searchString) => searchString.length > this.minSearchSymbol),
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((searchString) => this.apiService.search$(ApiRequestType.Search + searchString)),
  );

  constructor(private apiService: ApiService) {}

  public trackById(id: number, item: MovieShortCard | SearchCard): number {
    return item.id;
  }
}
