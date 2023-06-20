import {
  AsyncPipe,
  NgForOf,
  NgIf
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import {
  Observable,
  Subscription,
  tap
} from 'rxjs';
import { MediaType } from '../../shared/enums/media-types';
import {
  MovieShortCard,
  MovieTvGenre
} from '../../shared/interfaces/movies';
import { SearchParams } from '../../shared/interfaces/search';
import { ApiService } from '../../shared/services/api.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';

type SearchGenre = {
  checked: boolean;
} & MovieTvGenre;

type SortType = {
  type: string;
  title: string;
}[];

@Component({
  selector: 'tmbd-movie-tv-list',
  standalone: true,
  templateUrl: './movie-tv-list.component.html',
  styleUrls: ['./movie-tv-list.component.scss'],
  imports: [
    NgIf,
    AsyncPipe,
    MovieCardComponent,
    NgForOf,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieTvListComponent implements OnInit, OnDestroy {
  @Input() public mediaType: MediaType.Movie | MediaType.Tv = MediaType.Movie;

  public movieOrTvList$?: Observable<MovieShortCard[]>;
  public filterForm?: FormGroup;
  public isSearchButtonDisabled = false;

  public readonly sortType: SortType = [
    { type: 'popularity.asc', title: 'Popularity ascending'},
    { type: 'popularity.desc', title: 'Popularity descending'},
    { type: 'revenue.asc', title: 'Revenue ascending'},
    { type: 'revenue.desc', title: 'Revenue descending'},
    { type: 'primary_release_date.asc', title: 'Release date ascending'},
    { type: 'primary_release_date.desc', title: 'Release date descending'},
    { type: 'vote_average.asc', title: 'Vote ascending'},
    { type: 'vote_average.desc', title: 'Vote descending'},
    { type: 'vote_count.asc', title: 'Votes count ascending'},
    { type: 'vote_count.desc', title: 'Votes count descending'}
  ];

  private searchParams: SearchParams = {
    sort: '',
    dateFrom: '',
    dateTo: '',
    genres: [],
  }

  private genresSubscription?: Subscription;

  constructor(
    private readonly apiService: ApiService,
  ) {}

  public ngOnInit(): void {
    this.loadMoviesOrTv();

    this.genresSubscription = this.apiService.getMovieOrTvGenres$(this.mediaType).pipe(
      tap((genres: MovieTvGenre[]) => {
        this.filterForm = new FormGroup({
          'sort': new FormControl(''),
          'dateFrom': new FormControl(''),
          'dateTo': new FormControl(''),
          'genres': new FormArray(this.getGenresFormArray(genres)),
        });
      }),
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.genresSubscription?.unsubscribe();
  }

  public get genres(): FormArray {
    return this.filterForm?.controls['genres'] as FormArray;
  }

  public loadMoviesOrTv(): void {
    this.movieOrTvList$ = this.apiService.getDefaultMovieOrTvList$(this.mediaType, this.searchParams);
  }

  public search(): void {
    this.isSearchButtonDisabled = true;

    Object.entries(this.filterForm?.value as SearchParams).forEach((entry) => {
      const [type, value] = entry;

      if (value === '') {
        return;
      }

      switch (type) {
        case 'sort':
        case 'dateFrom':
        case 'dateTo':
          this.searchParams[type] = value;
          break;

        case 'genres':
          const mappedGenreList = value.reduce((acc: number[], genre: SearchGenre) => {
            if (genre.checked) {
              acc.push(genre.id);
            }

            return acc;
          }, []);
          this.searchParams.genres = mappedGenreList;
          break;
      }
    });

    this.isSearchButtonDisabled = false;
    this.loadMoviesOrTv();
  }

  private getGenresFormArray(genres: MovieTvGenre[]): FormGroup[] {
    return genres.map((genre: MovieTvGenre) => new FormGroup({
      id: new FormControl(genre.id),
      name: new FormControl(genre.name),
      checked: new FormControl(false),
    }));
  }
}
