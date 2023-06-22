import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RssFeedComponent } from './rss-feed.component';

describe('RssFeedsComponent', () => {
  let component: RssFeedComponent;
  let fixture: ComponentFixture<RssFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RssFeedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RssFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
