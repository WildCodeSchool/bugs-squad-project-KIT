import { TestBed } from '@angular/core/testing';

import { CreateTodoService } from './create-todo.service';

describe('CreateTodoService', () => {
  let service: CreateTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
