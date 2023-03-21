import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Subject,
  tap
} from 'rxjs';

import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { PersonCardComponent } from '../../components/person-card/person-card.component';
import { ScrollerComponent } from '../../components/scroller/scroller.component';
import { SearchCardComponent } from '../../components/search-card/search-card.component';
import { SearchMediaType } from '../../shared/enums/search';
import { SearchCard } from '../../shared/interfaces/search';
import { MoviesService } from '../../shared/services/movies.service';

@Component({
  selector: 'tmbd-entrance',
  standalone: true,
  imports: [CommonModule, ScrollerComponent, MovieCardComponent, PersonCardComponent, SearchCardComponent],
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.scss']
})
export class EntranceComponent implements OnInit {
  private readonly popularMovies$ = this.moviesService.popularMovies$;
  private readonly topRatedMovies$ = this.moviesService.topRatedMovies$;
  private readonly popularTv$ = this.moviesService.popularTv$;
  private readonly topRatedTv$ = this.moviesService.topRatedTv$;

  private searchInputValue$ = new Subject<string>();

  public searchResultMovies$ = new BehaviorSubject<SearchCard[]>([]);
  public searchResultPersons$ = new BehaviorSubject<SearchCard[]>([]);

  public readonly popular$ = combineLatest([this.popularMovies$, this.popularTv$]);
  public readonly rated$ = combineLatest([this.topRatedMovies$, this.topRatedTv$]);
  public readonly upcomingMovies$ = this.moviesService.upcomingMovies$;

  public isSearchHidden = true;

  constructor(
    private readonly moviesService: MoviesService,
  ) {}

  public ngOnInit(): void {
    this.moviesService.loadPopularMovies();
    this.moviesService.loadTopRatedMovies();
    this.moviesService.loadUpcomingMovies();

    this.moviesService.loadPopularTv();
    this.moviesService.loadTopRatedTv();

    this.searchInputValue$.pipe(
      debounceTime(200),
      tap(value => {
        this.isSearchHidden = value.length < 3;
      }),
      filter(value => value.length > 2),
      distinctUntilChanged(),
    ).subscribe(str => {
      this.moviesService.searchMovies(str);
    });

    // search movies
    this.moviesService.searchResult$.pipe(
      map(movies => movies.filter(movie => {
        return movie.media_type === SearchMediaType.Movie || movie.media_type === SearchMediaType.Tv;
      }))
    ).subscribe(value => {
      this.searchResultMovies$.next(value);
    });

    // search persons
    this.moviesService.searchResult$.pipe(
      map(movies => movies.filter(movie => movie.media_type === SearchMediaType.Person))
    ).subscribe(value => {
      this.searchResultPersons$.next(value);
    });
  }

  public search(event: Event): void {
    const elem = event.target as HTMLInputElement;
    this.searchInputValue$.next(elem.value);
  }
}
