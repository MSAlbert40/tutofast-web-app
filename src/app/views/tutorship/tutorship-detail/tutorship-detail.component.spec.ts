import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorshipDetailComponent } from './tutorship-detail.component';

describe('TutorshipDetailComponent', () => {
  let component: TutorshipDetailComponent;
  let fixture: ComponentFixture<TutorshipDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorshipDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorshipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
