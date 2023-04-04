import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastDetailsComponent } from './cast-details.component';

describe('CastDetailsComponent', () => {
  let component: CastDetailsComponent;
  let fixture: ComponentFixture<CastDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CastDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
