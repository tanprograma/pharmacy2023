import { Component, OnInit } from '@angular/core';
import { InventoryService, Stock } from 'src/app/services/inventory.service';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/store';

@Component({
  selector: 'app-stock-container',
  templateUrl: './stock-container.component.html',
  styleUrls: ['./stock-container.component.css'],
})
export class StockContainerComponent implements OnInit {
  stores: Store[] = [];
  stock: Stock[] = [];
  term = '';
  displayed!: Stock[];
  date!: Date;
  loading = false;
  store = '';
  load_message = '';

  constructor(
    private storeService: StoreService,
    private inventoryService: InventoryService
  ) {}
  getStores() {
    this.storeService.getStores().subscribe((stores) => (this.stores = stores));
  }
  onChange(v: string) {
    this.displayed = this.stock.filter((i) => {
      const regex = new RegExp(v, 'i');
      return regex.test(i.commodity);
    });
  }
  onClear() {
    this.displayed = this.stock;
    this.term = '';
  }
  getInventory(store?: string) {
    this.term = '';
    this.store = store ? store : '';
    this.loading = true;
    this.inventoryService.getStock(store).subscribe((stock) => {
      this.stock = stock;
      this.displayed = this.stock;
      this.loading = false;
    });
  }
  findIndex(item: Stock, stock: Stock[]) {
    return (
      stock.findIndex((i) => {
        return i.commodity == item.commodity;
      }) + 1
    );
  }
  approximate(item: Stock) {
    return Math.floor(item.stock / item.unit_value);
  }
  calcDate(date: string | undefined): string {
    if (typeof date == 'string') {
      return new Date(date).toLocaleDateString();
    }

    return '';
  }
  calcExpiry(date: string | undefined): boolean {
    if (typeof date == 'string') {
      const dayMillSecs = 1000 * 60 * 60 * 24;
      const diff = new Date(date).getTime() - Date.now();
      const isExpired = Math.round(diff / dayMillSecs) > 90 ? false : true;
      return isExpired;
    }
    return false;
  }
  withExpired(elem: HTMLInputElement) {
    this.displayed = elem.checked
      ? this.stock.filter((i) => {
          return this.calcExpiry(i.expiry);
        })
      : this.stock;
  }

  ngOnInit(): void {
    this.getStores();
    this.getInventory();
    this.date = new Date();
  }
}
