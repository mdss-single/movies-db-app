import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { concat } from 'rxjs';
import { MoviesService } from '../../shared/services/movies.service';

import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { ScrollerComponent } from '../../components/scroller/scroller.component';

@Component({
  selector: 'tmbd-entrance',
  standalone: true,
  imports: [CommonModule, ScrollerComponent, MovieCardComponent],
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.scss']
})
export class EntranceComponent implements OnInit {
  private readonly popularMovies$ = this.moviesService.popularMovies$;
  private readonly topRatedMovies$ = this.moviesService.topRatedMovies$;

  private readonly popularTv$ = this.moviesService.popularTv$;
  private readonly topRatedTv$ = this.moviesService.topRatedTv$;

  public readonly popular$ = concat(this.popularMovies$, this.popularTv$);
  public readonly rated$ = concat(this.topRatedMovies$, this.topRatedTv$);
  public readonly upcomingMovies$ = this.moviesService.upcomingMovies$;

  constructor(
    private readonly moviesService: MoviesService,
  ) {}

  public ngOnInit(): void {
    this.moviesService.loadPopularMovies();
    this.moviesService.loadTopRatedMovies();
    this.moviesService.loadUpcomingMovies();

    this.moviesService.loadPopularTv();
    this.moviesService.loadTopRatedTv();
  }
}
