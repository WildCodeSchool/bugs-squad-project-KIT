import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistsFavComponent } from './todolists-fav.component';

describe('TodolistsFavComponent', () => {
  let component: TodolistsFavComponent;
  let fixture: ComponentFixture<TodolistsFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistsFavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodolistsFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
