import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/entrance/entrance.component').then(mod => mod.EntranceComponent)
  },
  {
    path: 'movie/:id',
    loadComponent: () => import('./pages/movie/movie.component').then(mod => mod.MovieComponent)
  },
  {
    path: 'tv/:id',
    loadComponent: () => import('./pages/movie/movie.component').then(mod => mod.MovieComponent)
  },
  {
    path: 'movie/:id/cast',
    loadComponent: () => import('./pages/cast/cast.component').then(mod => mod.CastComponent)
  },
  {
    path: 'tv/:id/cast',
    loadComponent: () => import('./pages/cast/cast.component').then(mod => mod.CastComponent)
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
