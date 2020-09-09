import { TestBed } from '@angular/core/testing';

import { MemberToDisplayService } from './member-to-display.service';

describe('MemberToDisplayService', () => {
  let service: MemberToDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberToDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
