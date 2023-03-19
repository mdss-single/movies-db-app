import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  public readonly popularMovies$ = this.moviesService.movies$;
  public readonly topRatedMovies$ = this.moviesService.movies$;

  constructor(
    private readonly moviesService: MoviesService,
  ) {}

  public ngOnInit(): void {
    this.moviesService.loadPopularMovies();
    this.moviesService.loadTopRatedMovies();
  }
}
