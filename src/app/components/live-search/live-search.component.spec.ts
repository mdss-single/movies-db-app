import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveSearchComponent } from './live-search.component';

describe('LiveSearchComponent', () => {
  let component: LiveSearchComponent;
  let fixture: ComponentFixture<LiveSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
