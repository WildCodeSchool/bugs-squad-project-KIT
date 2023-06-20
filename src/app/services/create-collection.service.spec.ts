import { TestBed } from '@angular/core/testing';

import { CreateCollectionService } from './create-collection.service';

describe('CreateCollectionService', () => {
  let service: CreateCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
