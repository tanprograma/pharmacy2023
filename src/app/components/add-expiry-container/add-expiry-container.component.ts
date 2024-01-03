import { Component } from '@angular/core';

@Component({
  selector: 'app-add-expiry-container',
  templateUrl: './add-expiry-container.component.html',
  styleUrls: ['./add-expiry-container.component.css'],
})
export class AddExpiryContainerComponent {
  message: string = 'loading';

  loading!: boolean;
  load(isLoading: boolean) {
    this.loading = isLoading;
  }
}
