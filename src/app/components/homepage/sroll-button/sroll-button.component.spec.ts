import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrollButtonComponent } from './sroll-button.component';

describe('SrollButtonComponent', () => {
  let component: SrollButtonComponent;
  let fixture: ComponentFixture<SrollButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrollButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SrollButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
