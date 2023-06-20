import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvListComponent } from './tv-list.component';

describe('TvListComponent', () => {
  let component: TvListComponent;
  let fixture: ComponentFixture<TvListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TvListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
