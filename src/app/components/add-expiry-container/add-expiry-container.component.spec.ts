import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpiryContainerComponent } from './add-expiry-container.component';

describe('AddExpiryContainerComponent', () => {
  let component: AddExpiryContainerComponent;
  let fixture: ComponentFixture<AddExpiryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExpiryContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExpiryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
