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

  ngOnInit(): void {
    this.getStores();
    this.getInventory();
    this.date = new Date();
  }
}
