import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RssFeedAllComponent } from './rss-feed-all.component';

describe('RssFeedsComponent', () => {
  let component: RssFeedAllComponent;
  let fixture: ComponentFixture<RssFeedAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RssFeedAllComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RssFeedAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
