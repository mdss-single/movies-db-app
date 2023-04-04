import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTvSelectorComponent } from './movie-tv-selector.component';

describe('MovieTvSelectorComponent', () => {
  let component: MovieTvSelectorComponent;
  let fixture: ComponentFixture<MovieTvSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MovieTvSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTvSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
