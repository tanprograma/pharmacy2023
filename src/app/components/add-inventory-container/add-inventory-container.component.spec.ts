import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInventoryContainerComponent } from './add-inventory-container.component';

describe('AddInventoryContainerComponent', () => {
  let component: AddInventoryContainerComponent;
  let fixture: ComponentFixture<AddInventoryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInventoryContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInventoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
