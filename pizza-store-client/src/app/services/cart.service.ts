import { Injectable } from '@angular/core';
import { Pizza } from '../models/pizza.model';

export interface CartItem {
  pizzaId: number;
  name: string;
  unitPrice: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(pizza: Pizza, quantity: number = 1): void {
    const existing = this.items.find(i => i.pizzaId === pizza.pizzaId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({
        pizzaId: pizza.pizzaId,
        name: pizza.name,
        unitPrice: pizza.price,
        quantity: quantity
      });
    }
  }

  updateQuantity(pizzaId: number, quantity: number): void {
    const item = this.items.find(i => i.pizzaId === pizzaId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(pizzaId);
      }
    }
  }

  removeFromCart(pizzaId: number): void {
    this.items = this.items.filter(i => i.pizzaId !== pizzaId);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }

  clearCart(): void {
    this.items = [];
  }
}