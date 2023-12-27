import { Component, Input, OnInit } from '@angular/core';
import { Stock } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  @Input() stock!: Stock[];
  @Input() store!: string;
  date!: Date;
  ngOnInit(): void {
    this.date = new Date();
  }

  findIndex(item: Stock) {
    return (
      this.stock.findIndex((i) => {
        i.commodity == item.commodity;
      }) + 1
    );
  }
  approximate(item: Stock) {
    return Math.floor(item.stock / item.unit_value);
  }
}
