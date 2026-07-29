import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pizza } from '../models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private baseUrl = `${environment.apiUrl}/pizzas`;

  constructor(private http: HttpClient) { }

  getActivePizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.baseUrl);
  }

  getAllPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${this.baseUrl}/all`);
  }

  getPizzaById(id: number): Observable<Pizza> {
    return this.http.get<Pizza>(`${this.baseUrl}/${id}`);
  }

  addPizza(pizza: Partial<Pizza>): Observable<any> {
    return this.http.post(this.baseUrl, pizza);
  }

  updatePizza(id: number, pizza: Partial<Pizza>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, pizza);
  }

  hidePizza(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/hide`, {});
  }

  unhidePizza(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/unhide`, {});
  }

  deletePizza(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}