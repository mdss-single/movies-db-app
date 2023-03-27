import {
  AsyncPipe,
  NgForOf,
  NgIf
} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  map,
  Observable,
  switchMap,
  tap
} from 'rxjs';

import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { PersonCardComponent } from '../../components/person-card/person-card.component';
import { ScrollerComponent } from '../../components/scroller/scroller.component';
import { ThumbnailCardSelectorComponent } from '../../components/thumbnail-card-selector/thumbnail-card-selector.component';
import { ApiRequestType } from '../../shared/enums/api-request';
import { SearchMediaType } from '../../shared/enums/search';
import { MovieShortCard } from '../../shared/interfaces/movies';
import { SearchCard } from '../../shared/interfaces/search';
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
    ThumbnailCardSelectorComponent
  ],
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.scss']
})
export class EntranceComponent implements OnInit {
  private readonly minSearchSymbol = 3;

  private readonly popularMovies$: Observable<MovieShortCard[]> = this.apiService.getMovies$(ApiRequestType.MoviePopular);
  private readonly topRatedMovies$: Observable<MovieShortCard[]> = this.apiService.getMovies$(ApiRequestType.MovieTopRated);
  private readonly popularTv$: Observable<MovieShortCard[]> = this.apiService.getMovies$(ApiRequestType.TvPopular);
  private readonly topRatedTv$: Observable<MovieShortCard[]> = this.apiService.getMovies$(ApiRequestType.TvTopRated);

  public readonly upcomingMovies$: Observable<MovieShortCard[]> = this.apiService.getMovies$(ApiRequestType.MovieUpcoming);
  public readonly popular$ = combineLatest([this.popularMovies$, this.popularTv$]);
  public readonly rated$ = combineLatest([this.topRatedMovies$, this.topRatedTv$]);

  public searchInput = new FormControl('');
  public searchResult$ = new BehaviorSubject<SearchCard[]>([]);
  public searchResultMovies$ = new BehaviorSubject<SearchCard[]>([]);
  public searchResultPersons$ = new BehaviorSubject<SearchCard[]>([]);

  constructor(private apiService: ApiService) {}

  public ngOnInit(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(200),
      filter(Boolean),
      tap(searchString => {
        if (searchString.length < this.minSearchSymbol) {
          this.searchResult$.next([]);
        }
      }),
      filter(searchString => searchString.length > this.minSearchSymbol),
      switchMap(searchString => this.apiService.search$(ApiRequestType.Search + searchString)),
      tap(searchResult => this.searchResult$.next(searchResult))
    ).subscribe();

    // search movies
    this.searchResult$.pipe(
      map(movies => movies.filter(movie => {
        return movie.type === SearchMediaType.Movie || movie.type === SearchMediaType.Tv;
      }))
    ).subscribe(value => {
      this.searchResultMovies$.next(value);
    });

    // search persons
    this.searchResult$.pipe(
      map(movies => movies.filter(movie => movie.type === SearchMediaType.Person))
    ).subscribe(value => {
      this.searchResultPersons$.next(value);
    });
  }
}
