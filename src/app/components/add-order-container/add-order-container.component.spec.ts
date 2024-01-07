import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderContainerComponent } from './add-order-container.component';

describe('AddOrderContainerComponent', () => {
  let component: AddOrderContainerComponent;
  let fixture: ComponentFixture<AddOrderContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrderContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
