import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleEMailComponent } from './google-email.component';

describe('GoogleEMailComponent', () => {
  let component: GoogleEMailComponent;
  let fixture: ComponentFixture<GoogleEMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleEMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleEMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
