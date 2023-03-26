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
  distinctUntilChanged,
  filter,
  map,
  Observable,
  take,
  tap
} from 'rxjs';

import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { PersonCardComponent } from '../../components/person-card/person-card.component';
import { ScrollerComponent } from '../../components/scroller/scroller.component';
import { SearchCardComponent } from '../../components/search-card/search-card.component';
import { ApiRequest } from '../../shared/enums/api-request';
import { SearchMediaType } from '../../shared/enums/search';
import { MovieDTO } from '../../shared/interfaces/movies';
import { SearchCardDTO } from '../../shared/interfaces/search';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'tmbd-entrance',
  standalone: true,
  imports: [
    ScrollerComponent,
    MovieCardComponent,
    PersonCardComponent,
    SearchCardComponent,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    NgForOf,
  ],
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.scss']
})
export class EntranceComponent implements OnInit {
  private readonly popularMovies$: Observable<MovieDTO[]> = this.apiService.getMovies$(ApiRequest.MoviePopular);
  private readonly topRatedMovies$: Observable<MovieDTO[]> = this.apiService.getMovies$(ApiRequest.MovieTopRated);
  private readonly popularTv$: Observable<MovieDTO[]> = this.apiService.getMovies$(ApiRequest.TvPopular);
  private readonly topRatedTv$: Observable<MovieDTO[]> = this.apiService.getMovies$(ApiRequest.TvTopRated);

  public readonly upcomingMovies$: Observable<MovieDTO[]> = this.apiService.getMovies$(ApiRequest.MovieUpcoming);
  public readonly popular$ = combineLatest([this.popularMovies$, this.popularTv$]);
  public readonly rated$ = combineLatest([this.topRatedMovies$, this.topRatedTv$]);

  public searchInput = new FormControl('');
  public searchResult$ = new BehaviorSubject<SearchCardDTO[]>([]);
  public searchResultMovies$ = new BehaviorSubject<SearchCardDTO[]>([]);
  public searchResultPersons$ = new BehaviorSubject<SearchCardDTO[]>([]);

  constructor(private apiService: ApiService) {}

  public ngOnInit(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(200),
      filter(Boolean),
      tap(value => {
        if (value.length < 2) {
          this.searchResult$.next([]);
        }
      }),
      filter(value => value.length > 2),
      distinctUntilChanged(),
    ).subscribe(str => {
      this.apiService.search$(ApiRequest.Search + str).pipe(
        take(1),
      ).subscribe(value => this.searchResult$.next(value));
    });

    // search movies
    this.searchResult$.pipe(
      map(movies => movies.filter(movie => {
        return movie.media_type === SearchMediaType.Movie || movie.media_type === SearchMediaType.Tv;
      }))
    ).subscribe(value => {
      this.searchResultMovies$.next(value);
    });

    // search persons
    this.searchResult$.pipe(
      map(movies => movies.filter(movie => movie.media_type === SearchMediaType.Person))
    ).subscribe(value => {
      this.searchResultPersons$.next(value);
    });
  }
}
