import { TestBed } from '@angular/core/testing';

import { GridStackServiceService } from './grid-stack-service.service';

describe('GridStackServiceService', () => {
  let service: GridStackServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridStackServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
