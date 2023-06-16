import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFeedsComponent } from './favorite-feeds.component';

describe('FavoriteFeedsComponent', () => {
  let component: FavoriteFeedsComponent;
  let fixture: ComponentFixture<FavoriteFeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteFeedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
