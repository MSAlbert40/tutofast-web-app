import { TestBed } from '@angular/core/testing';

import { TutorshipService } from './tutorship.service';

describe('TutorshipService', () => {
  let service: TutorshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
