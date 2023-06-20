import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTvListComponent } from './movie-tv-list.component';

describe('MovieTvListComponent', () => {
  let component: MovieTvListComponent;
  let fixture: ComponentFixture<MovieTvListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MovieTvListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
