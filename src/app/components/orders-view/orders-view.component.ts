import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.css'],
})
export class OrdersViewComponent implements OnInit {
  orders: Order[] = [];
  displayed: Order[] = [];
  loading = false;
  ngOnInit(): void {
    this.getOrders();
  }

  constructor(private orderService: OrderService, private router: Router) {}
  getOrders() {
    this.loading = true;
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      this.displayed = orders;
      this.loading = false;
    });
  }
  getDate(date?: string | Date | number): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }
  redirect(id?: string) {
    if (!id) return;
    this.router.navigate([`/orders/edit/${id}`]);
  }
  // filter logic
  term: string = '';
  onChange() {
    this.displayed = this.orders.filter((o) => {
      return;
    });
  }
  onClear() {}
}
