import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailCardSelectorComponent } from './thumbnail-card-selector.component';

describe('ThumbnailCardSelectorComponent', () => {
  let component: ThumbnailCardSelectorComponent;
  let fixture: ComponentFixture<ThumbnailCardSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ThumbnailCardSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThumbnailCardSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
