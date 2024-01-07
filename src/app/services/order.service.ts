import { Injectable } from '@angular/core';
import { Store } from '../store';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order, OrderItem } from '../interfaces';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Order[] = [];
  url = environment.orders_url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getOrders(): Observable<Order[]> {
    console.log({ url: this.url });
    return this.http.get<Order[]>(this.url).pipe(
      tap((_) => {
        console.log('fetched data');
      }),
      catchError(this.errorHandler('something is wrong', []))
    );
  }
  getOrder(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/orderid/${id}`).pipe(
      tap((_) => {
        console.log('fetched data');
      }),
      catchError(this.errorHandler('something is wrong'))
    );
  }
  createOrder(item: Order): Observable<Order> {
    return this.http
      .post<Order>(`${this.url}/create`, item, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log('created data');
        }),
        catchError(this.errorHandler<Order>('something is wrong'))
      );
  }
  updateOrder(id: string, items: OrderItem[]): Observable<Order> {
    return this.http
      .post<Order>(`${this.url}/save/${id}`, items, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log('created data');
        }),
        catchError(this.errorHandler<Order>('something is wrong'))
      );
  }

  errorHandler<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error.message);
      return of(result as T);
    };
  }
  constructor(private http: HttpClient) {}
}
