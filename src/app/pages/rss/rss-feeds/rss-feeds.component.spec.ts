import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssFeedsComponent } from './rss-feeds.component';

describe('RssFeedsComponent', () => {
  let component: RssFeedsComponent;
  let fixture: ComponentFixture<RssFeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RssFeedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RssFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
