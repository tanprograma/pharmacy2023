import { Component } from '@angular/core';

@Component({
  selector: 'app-add-inventory-container',
  templateUrl: './add-inventory-container.component.html',
  styleUrls: ['./add-inventory-container.component.css'],
})
export class AddInventoryContainerComponent {
  message: string = 'loading';

  loading!: boolean;
  load(isLoading: boolean) {
    this.loading = isLoading;
  }
}
