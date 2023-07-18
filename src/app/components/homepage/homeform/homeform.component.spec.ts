import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeformComponent } from './homeform.component';

describe('HomeformComponent', () => {
  let component: HomeformComponent;
  let fixture: ComponentFixture<HomeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeformComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
