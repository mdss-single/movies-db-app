import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvCastComponent } from './tv-cast.component';

describe('TvCastComponent', () => {
  let component: TvCastComponent;
  let fixture: ComponentFixture<TvCastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TvCastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
