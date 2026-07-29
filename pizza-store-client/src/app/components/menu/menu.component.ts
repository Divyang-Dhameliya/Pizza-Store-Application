import { Component, OnInit } from '@angular/core';
import { Pizza } from '../../models/pizza.model';
import { PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pizzas: Pizza[] = [];
  loading = true;
  error = '';

  constructor(
    private pizzaService: PizzaService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas(): void {
    this.loading = true;
    this.pizzaService.getActivePizzas().subscribe({
      next: (data) => {
        this.pizzas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load menu. Is the API running?';
        this.loading = false;
        console.error(err);
      }
    });
  }

  addToCart(pizza: Pizza): void {
    this.cartService.addToCart(pizza, 1);
    alert(`${pizza.name} added to cart`);
  }
}