import { Injectable } from '@angular/core';
import { Inventory } from '../inventory';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Medicine } from '../medicine';
export interface Stock {
  commodity: string;
  stock: number;
  unit: string;
  unit_value: number;
  expiry?: string;
}
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  inventories: Inventory[] = [];

  url = environment.inventories_url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  filterInventoriesByStore(store: any) {
    return this.inventories.filter((i) => {
      return i.outlet == store;
    });
  }
  getStock(store?: string): Observable<Stock[]> {
    // console.log({ url: this.url });
    if (store) {
      return this.http.get<Stock[]>(`${this.url}/stock/${store}`).pipe(
        tap((_) => {
          console.log('fetched data');
        }),
        catchError(this.errorHandler('something is wrong', []))
      );
    }
    return this.http.get<Stock[]>(`${this.url}/stock`).pipe(
      tap((_) => {
        console.log('fetched data');
      }),
      catchError(this.errorHandler('something is wrong', []))
    );
  }
  getSummary(keys: Medicine[], inventory: Inventory[]) {
    const modInventory: any = [];
    keys.forEach((key) => {
      const filtered = inventory.filter((i) => {
        return key.name == i.commodity;
      });
      if (!filtered.length) return;
      const inventoryItem: Inventory = {
        sn: 0,
        commodity: key.name,
        beginning: 0,
        unit: key.unit,
        unit_value: key.unit_value,
        inventory_level: 0,
        issued: [],
        dispensed: [],
        received: [],
      };

      filtered.forEach((filt) => {
        inventoryItem.inventory_level = !inventoryItem.inventory_level
          ? filt.inventory_level
          : inventoryItem.inventory_level;
        inventoryItem.beginning += filt.beginning;
        inventoryItem.dispensed.splice(0, 0, ...filt.dispensed);

        if (filt.isWarehouse) {
          inventoryItem.received.splice(0, 0, ...filt.received);
        }
      });
      modInventory.push(inventoryItem);
    });
    return modInventory
      .sort((a: any, b: any) => {
        if (a.commodity > b.commodity) return 1;
        if (a.commodity < b.commodity) return -1;
        return 0;
      })
      .map((i: Inventory, index: number) => {
        i.sn = index + 1;
        return i;
      });
  }
  getSummaryForAll(keys: Medicine[], inventory: Inventory[]) {
    const modInventory: any = [];
    keys.forEach((key) => {
      const filtered = inventory.filter((i) => {
        return key.name == i.commodity;
      });
      if (!filtered.length) return;
      const inventoryItem: Inventory = {
        sn: 0,
        commodity: key.name,
        beginning: 0,
        unit: key.unit,
        unit_value: key.unit_value,
        inventory_level: 0,
        issued: [],
        dispensed: [],
        received: [],
      };

      filtered.forEach((filt) => {
        inventoryItem.inventory_level = !inventoryItem.inventory_level
          ? filt.inventory_level
          : inventoryItem.inventory_level;
        inventoryItem.beginning += filt.beginning;
        inventoryItem.dispensed.splice(0, 0, ...filt.dispensed);

        if (filt.isWarehouse) {
          inventoryItem.received.splice(0, 0, ...filt.received);
        }
      });
      modInventory.push(inventoryItem);
    });
    return modInventory
      .sort((a: any, b: any) => {
        if (a.commodity > b.commodity) return 1;
        if (a.commodity < b.commodity) return -1;
        return 0;
      })
      .map((i: Inventory, index: number) => {
        i.sn = index + 1;
        return i;
      });
  }
  getAvailable(inventory: Inventory) {
    const dispensed =
      inventory.dispensed
        .map((i) => {
          return i.quantity;
        })
        .reduce((a: any, b: any) => {
          return a + b;
        }, 0) || 0;
    const received =
      inventory.received
        .map((i) => {
          return i.quantity;
        })
        .reduce((a: any, b: any) => {
          return a + b;
        }, 0) || 0;
    const issued =
      inventory.issued
        .map((i) => {
          return i.quantity;
        })
        .reduce((a: any, b: any) => {
          return a + b;
        }, 0) || 0;
    console.log({
      beginning: inventory.beginning,
      dispensed,
      issued,
      received,
    });
    return inventory.beginning + received - issued - dispensed;
  }
  getInventories(): Observable<Inventory[]> {
    // console.log({ url: this.url });
    return this.http.get<Inventory[]>(this.url).pipe(
      tap((_) => {
        console.log('fetched data');
      }),
      catchError(this.errorHandler('something is wrong', []))
    );
  }
  dispense(i: any): Observable<Inventory[]> {
    // console.log({ url: this.url });
    return this.http
      .post<any>(`${this.url}/dispense/${i.store}`, i.payload, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log('dispensed successful');
        }),
        catchError(this.errorHandler<Inventory[]>('something is wrong', []))
      );
  }
  uploadDispensed(i: any): Observable<Inventory[]> {
    const url = `${this.url}/upload/dispensed/${i.store}`;

    return this.http.post<Inventory[]>(url, i.items, this.httpOptions).pipe(
      tap((_) => {
        console.log('upload successful');
      }),
      catchError(this.errorHandler<Inventory[]>('something is wrong', []))
    );
  }
  uploadBeginning(i: any): Observable<Inventory[]> {
    const url = `${this.url}/beginnings/update/${i.store}`;

    return this.http.post<any>(url, i.items, this.httpOptions).pipe(
      tap((_) => {
        console.log('upload successful');
      }),
      catchError(this.errorHandler<Inventory[]>('something is wrong', []))
    );
  }
  updateExpiry(i: any): Observable<Inventory[]> {
    const url = `${this.url}/expiry/update`;

    return this.http.post<any>(url, i.items, this.httpOptions).pipe(
      tap((_) => {
        console.log('upload successful');
      }),
      catchError(this.errorHandler<Inventory[]>('something is wrong', []))
    );
  }
  issue(i: any) {
    // console.log({ url: this.url });
    return this.http
      .post<any>(`${this.url}/issue/${i.store}`, i.payload, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log('issued successfully');
        }),
        catchError(this.errorHandler<Inventory[]>('something is wrong', []))
      );
  }
  receive(i: any) {
    // console.log({ url: this.url });
    return this.http
      .post<any>(`${this.url}/receive/${i.store}`, i.payload, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log('received successfully');
        }),
        catchError(this.errorHandler<Inventory[]>('something is wrong', []))
      );
  }
  // issue(i: { client: string; outlet: string; items: any }) {
  //   return this.http
  //     .post<Inventory[]>(`${this.url}/issue`, i, this.httpOptions)
  //     .pipe(
  //       tap((_) => {
  //         console.log('issue successful');
  //       }),
  //       catchError(this.errorHandler<Inventory[]>('something is wrong', []))
  //     );
  // }
  getInventoryByStore(store: string): Observable<Inventory[]> {
    if (!store.length) return of([]);

    return this.http.get<Inventory[]>(`${this.url}/${store}`).pipe(
      tap((_) => {
        console.log(`fetched inventory for ${store} }`);
      }),
      catchError(this.errorHandler('something is wrong', []))
    );
  }
  getInventoryByURL(store: string, url: string): Observable<Inventory[]> {
    if (!store.length) return of([]);

    return this.http.get<Inventory[]>(`${url}`).pipe(
      tap((_) => {
        console.log(`fetched inventory for ${store} }`);
      }),
      catchError(this.errorHandler('something is wrong', []))
    );
  }
  importDispensedBy(store: string): Observable<Inventory[]> {
    if (!store.length) return of([]);

    return this.http.get<Inventory[]>(`${this.url}/store`).pipe(
      tap((_) => {
        console.log(`fetched inventory for ${store} }`);
      }),
      catchError(this.errorHandler('something is wrong', []))
    );
  }
  // setInventorys(x: Inventory[]) {
  //   if (this.Inventorys.length) return;
  //   this.getInventorys().subscribe((i) => {
  //     this.Inventorys = i;
  //     x = i;
  //     console.log(i);
  //   });
  // }
  errorHandler<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error.message);
      return of(result as T);
    };
  }
  constructor(private http: HttpClient) {}
}
