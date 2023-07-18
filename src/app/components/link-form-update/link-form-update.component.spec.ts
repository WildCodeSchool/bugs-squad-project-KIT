import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkFormUpdateComponent } from './link-form-update.component';

describe('LinkFormUpdateComponent', () => {
  let component: LinkFormUpdateComponent;
  let fixture: ComponentFixture<LinkFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkFormUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
