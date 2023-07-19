import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionFormUpdateComponent } from './collection-form-update.component';

describe('CollectionFormUpdateComponent', () => {
  let component: CollectionFormUpdateComponent;
  let fixture: ComponentFixture<CollectionFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionFormUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
