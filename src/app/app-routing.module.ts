import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/entrance/entrance.component').then(mod => mod.EntranceComponent)
  },
  {
    path: 'person/:id',
    loadComponent: () => import('./pages/person/person.component').then(mod => mod.PersonComponent)
  },
  {
    path: 'movie/:id',
    loadComponent: () => import('./pages/movie/movie.component').then(mod => mod.MovieComponent)
  },
  {
    path: 'tv/:id',
    loadComponent: () => import('./pages/tv/tv.component').then(mod => mod.TvComponent)
  },
  {
    path: 'movie/:id/cast',
    loadComponent: () => import('./pages/movie-cast/movie-cast.component').then(mod => mod.MovieCastComponent)
  },
  {
    path: 'tv/:id/cast',
    loadComponent: () => import('./pages/tv-cast/tv-cast.component').then(mod => mod.TvCastComponent)
  },
  {
    path: 'peoples',
    loadComponent: () => import('./pages/person-list/person-list.component').then(mod => mod.PersonListComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(mod => mod.NotFoundComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
