import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorshipSelectComponent } from './tutorship-select.component';

describe('TutorshipSelectComponent', () => {
  let component: TutorshipSelectComponent;
  let fixture: ComponentFixture<TutorshipSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorshipSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorshipSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
