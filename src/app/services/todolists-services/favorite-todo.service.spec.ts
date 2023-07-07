import { TestBed } from '@angular/core/testing';

import { FavoriteTodoService } from './favorite-todo.service';

describe('FavoriteTodoService', () => {
  let service: FavoriteTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
