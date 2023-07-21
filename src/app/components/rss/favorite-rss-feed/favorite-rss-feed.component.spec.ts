import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRssFeedComponent } from './favorite-rss-feed.component';

describe('FavoriteRssFeedComponent', () => {
  let component: FavoriteRssFeedComponent;
  let fixture: ComponentFixture<FavoriteRssFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteRssFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteRssFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
