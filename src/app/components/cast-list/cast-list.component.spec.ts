import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastListComponent } from './cast-list.component';

describe('CastListComponent', () => {
  let component: CastListComponent;
  let fixture: ComponentFixture<CastListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CastListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
