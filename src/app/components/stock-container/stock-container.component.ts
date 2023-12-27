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

  getInventory(store?: string) {
    this.loading = true;
    this.inventoryService.getStock(store).subscribe((stock) => {
      this.stock = stock;
      console.log(stock);
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
