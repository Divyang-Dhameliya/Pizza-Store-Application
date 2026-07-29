import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { PlaceOrderRequest } from '../../models/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  placingOrder = false;
  error = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshCart();
  }

  refreshCart(): void {
    this.items = this.cartService.getItems();
  }

  updateQuantity(pizzaId: number, quantity: number): void {
    this.cartService.updateQuantity(pizzaId, quantity);
    this.refreshCart();
  }

  removeItem(pizzaId: number): void {
    this.cartService.removeFromCart(pizzaId);
    this.refreshCart();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  placeOrder(): void {
    if (this.items.length === 0) return;

    this.placingOrder = true;
    this.error = '';

    const request: PlaceOrderRequest = {
      items: this.items.map(i => ({
        pizzaId: i.pizzaId,
        quantity: i.quantity,
        unitPrice: i.unitPrice
      }))
    };

    this.orderService.placeOrder(request).subscribe({
      next: (res) => {
        this.cartService.clearCart();
        this.placingOrder = false;
        alert(`Order placed! Order #${res.orderId}, Total: $${res.totalAmount}`);
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.placingOrder = false;
        this.error = err.error || 'Failed to place order.';
      }
    });
  }
}