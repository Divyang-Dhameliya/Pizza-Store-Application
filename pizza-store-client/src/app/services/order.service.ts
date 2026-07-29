import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PlaceOrderRequest, Order, OrderDetailItem } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) { }

  placeOrder(request: PlaceOrderRequest): Observable<any> {
    return this.http.post(this.baseUrl, request);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getOrderDetails(id: number): Observable<{ order: Order, items: OrderDetailItem[] }> {
    return this.http.get<{ order: Order, items: OrderDetailItem[] }>(`${this.baseUrl}/${id}`);
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/status`, JSON.stringify(status), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}