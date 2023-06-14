import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssComponent } from './rss.component';

describe('RssComponent', () => {
  let component: RssComponent;
  let fixture: ComponentFixture<RssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
