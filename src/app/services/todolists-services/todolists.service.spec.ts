import { TestBed } from '@angular/core/testing';

import { TodolistsService } from './todolists-services/todolists.service';

describe('TodolistsService', () => {
  let service: TodolistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodolistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
