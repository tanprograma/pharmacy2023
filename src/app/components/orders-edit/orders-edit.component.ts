import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Order, OrderItem } from 'src/app/interfaces';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.css'],
})
export class OrdersEditComponent implements OnInit {
  orders: Order[] = [
    {
      _id: '1',
      title: 'new order',
      created_date: new Date('12/1/2023').getTime(),
      updated_date: new Date('11/29/2023').getTime(),
      items: [
        { commodity: 'paracetamol', unit: 'strip', quantity: 200 },
        { commodity: 'ceftriaxone', unit: 'each', quantity: 978 },
      ],
    },
    {
      _id: '2',
      title: 'another order',
      created_date: new Date('12/1/2023').getTime(),
      updated_date: new Date('4/30/2023').getTime(),
      items: [{ commodity: 'paracetamol', unit: 'strip', quantity: 500 }],
    },
  ];
  order?: Order;
  edit = false;
  isDelete = false;
  editItem!: OrderItem;
  ngOnInit(): void {
    this.getOrder();
  }
  showEdit(i: OrderItem) {
    this.edit = true;
    this.editItem = i;
  }
  loading = false;
  getOrder() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (!id) return;
    this.loading = true;
    this.orderService.getOrder(id).subscribe((order: Order) => {
      this.order = order;
      this.displayed = order.items;
      this.loading = false;
    });
  }
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}
  saveItem() {
    if (!this.order) return;
    this.order.items = this.order.items.map((i) => {
      return i.commodity == this.editItem.commodity ? this.editItem : i;
    });
    this.editItem = {
      _id: '',
      commodity: '',
      unit: '',
      quantity: 0,
    };
    this.edit = false;
  }
  deleteItem(item: OrderItem) {
    if (!this.order) {
      return;
    }
    this.message = `delete ${item.commodity} from order?`;
    this.shouldConfirm = true;
    this.confirm = () => {
      if (!this.order) {
        return;
      }

      this.order.items = this.order.items.filter((i) => {
        return i != item;
      });
      this.message = '';
      this.shouldConfirm = false;
    };
  }
  saveAll() {
    if (!this.order) {
      return;
    }
    this.message = `save changes to data?`;
    this.shouldConfirm = true;
    this.confirm = () => {
      this.shouldConfirm = false;
      if (!this.order?._id) {
        return;
      }
      this.loading = true;
      this.orderService
        .updateOrder(this.order._id, this.order.items)
        .subscribe((o) => {
          this.message = '';
          this.loading = false;
          this.displayed = o.items;
        });
    };
  }
  message: string = '';
  shouldConfirm = false;
  shouldAdd = false;
  confirm = () => {};
  // logic for filtering

  displayed: OrderItem[] = [];
  onChange(v: string) {
    if (!this.order?.items) return;
    this.displayed = this.order.items.filter((i) => {
      const regex = new RegExp(v, 'i');
      return regex.test(i.commodity);
    });
  }
  onClear() {
    this.displayed = this.order?.items ?? [];
  }
  add(item: OrderItem) {
    if (this.order?.items) {
      this.order.items.splice(0, 0, item);
      this.displayed = this.order.items;
    }
  }
  close() {
    this.shouldAdd = false;
  }
  openAdd() {
    this.shouldAdd = true;
  }
}
