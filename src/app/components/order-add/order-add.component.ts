import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from 'src/app/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { of } from 'rxjs';

import { ClientsService } from 'src/app/services/clients.service';

import { InventoryService } from 'src/app/services/inventory.service';

import { Router } from '@angular/router';
import { OrderItem, Stock } from 'src/app/interfaces';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
})
export class OrderAddComponent {
  @Output() getOrderItem = new EventEmitter<OrderItem>();
  @Output() isLoading = new EventEmitter<boolean>();
  interval!: any;
  message!: string;
  available: number = 0;

  medicines: Medicine[] = [];

  stocks: Stock[] = [];

  // stock item
  stockItem: Stock = {
    commodity: '',
    stock: 0,
    unit: '',
    unit_value: 0,
  };

  medicine: string = '';
  requested = 0;
  loading: boolean = false;

  constructor(
    private medicineService: MedicineService,

    private inventoryService: InventoryService
  ) {}
  ngOnInit(): void {
    this.getResources();
    this.iniatialize();
  }

  getDate(d: string | undefined) {
    if (!d) return '';
    return new Date(d).toLocaleDateString();
  }
  getAvailable() {
    console.log('running available');
    const item = this.stocks.find((i) => {
      return i.commodity == this.medicine;
    });
    if (!item) return;
    this.stockItem = item;
  }
  iniatialize() {
    this.loading = true;
    this.message = 'loading resources';
    // this.redirect();
    this.interval = setInterval(() => {
      const isLoading = !(this.medicines.length && this.stocks.length);
      if (isLoading) {
        return;
      }
      this.stopLoading();
    }, 5);
  }
  stopLoading() {
    this.loading = false;
    this.message = 'uploading......resource not added';
    clearInterval(this.interval);
  }

  getResources() {
    this.getMedicines();
    this.getStocks();
  }

  getStocks() {
    this.inventoryService.getStock().subscribe((i) => {
      this.stocks = i;
    });
  }
  getMedicines() {
    if (this.medicineService.medicines.length) {
      this.medicines = this.medicineService.medicines;
      return;
    }
    this.medicineService.getMedicines().subscribe((i) => {
      this.medicines = i;
      this.medicineService.medicines = i;
    });
  }

  add() {
    this.getOrderItem.emit({
      commodity: this.medicine,
      unit: this.stockItem.unit,
      quantity: this.requested,
    });
    this.clearForm();
  }
  clearForm() {
    this.requested = 0;
    this.medicine = '';
    this.stockItem = {
      commodity: '',
      stock: 0,
      unit: '',
      unit_value: 0,
    };
  }
}
