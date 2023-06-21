import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssModalComponent } from './rss-modal.component';

describe('RssModalComponent', () => {
  let component: RssModalComponent;
  let fixture: ComponentFixture<RssModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RssModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RssModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
