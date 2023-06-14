import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCollectionsComponent } from './dash-collections.component';

describe('DashCollectionsComponent', () => {
  let component: DashCollectionsComponent;
  let fixture: ComponentFixture<DashCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashCollectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
