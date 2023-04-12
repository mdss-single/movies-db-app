import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCastComponent } from './person-cast.component';

describe('PersonCastComponent', () => {
  let component: PersonCastComponent;
  let fixture: ComponentFixture<PersonCastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PersonCastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
