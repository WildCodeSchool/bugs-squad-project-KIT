import { TestBed } from '@angular/core/testing';

import { TodoDeleteService } from './todo-delete.service';

describe('TodoDeleteService', () => {
  let service: TodoDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
