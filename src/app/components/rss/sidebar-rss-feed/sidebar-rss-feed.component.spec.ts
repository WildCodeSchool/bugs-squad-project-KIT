import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRssFeedComponent } from './sidebar-rss-feed.component';

describe('SidebarRssFeedComponent', () => {
  let component: SidebarRssFeedComponent;
  let fixture: ComponentFixture<SidebarRssFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarRssFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarRssFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
