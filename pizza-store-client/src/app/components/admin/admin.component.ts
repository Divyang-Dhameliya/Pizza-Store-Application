import { Component, OnInit } from '@angular/core';
import { Pizza } from '../../models/pizza.model';
import { PizzaService } from '../../services/pizza.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  pizzas: Pizza[] = [];
  loading = true;
  error = '';

  // form state
  editingPizza: Pizza | null = null;
  formName = '';
  formDescription = '';
  formPrice: number = 0;
  formStock: number = 0;
  isEditMode = false;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas(): void {
    this.loading = true;
    this.pizzaService.getAllPizzas().subscribe({
      next: (data) => {
        this.pizzas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load pizzas.';
        this.loading = false;
      }
    });
  }

  resetForm(): void {
    this.editingPizza = null;
    this.formName = '';
    this.formDescription = '';
    this.formPrice = 0;
    this.formStock = 0;
    this.isEditMode = false;
  }

  startEdit(pizza: Pizza): void {
    this.editingPizza = pizza;
    this.formName = pizza.name;
    this.formDescription = pizza.description;
    this.formPrice = pizza.price;
    this.formStock = pizza.stockQuantity;
    this.isEditMode = true;
  }

  saveForm(): void {
    const dto = {
      name: this.formName ? this.formName.trim() : '',
      description: this.formDescription ? this.formDescription.trim() : '',
      price: this.formPrice,
      stockQuantity: this.formStock
    };

    if (
      !dto.name ||
      !dto.description ||
      dto.price <= 0 ||
      dto.stockQuantity < 0
    ) {
      this.error = 'Please enter valid values for all fields.';
      return;
    }

    if (this.isEditMode && this.editingPizza) {
      this.pizzaService.updatePizza(this.editingPizza.pizzaId, dto).subscribe({
        next: () => {
          this.resetForm();
          this.loadPizzas();
        },
        error: (err) => this.error = 'Failed to update pizza.',
        complete: () => { 
          this.error = "" ;
        }
      });
    } else {
      this.pizzaService.addPizza(dto).subscribe({
        next: () => {
          this.resetForm();
          this.loadPizzas();
        },
        error: (err) => this.error = 'Failed to add pizza.',
        complete: () => { 
          this.error = "" ;
        }
      });
    }
  }

  toggleHide(pizza: Pizza): void {
    const action = pizza.isActive
      ? this.pizzaService.hidePizza(pizza.pizzaId)
      : this.pizzaService.unhidePizza(pizza.pizzaId);

    action.subscribe({
      next: () => this.loadPizzas(),
      error: (err) => this.error = 'Failed to update visibility.'
    });
  }

  deletePizza(pizza: Pizza): void {
    if (!confirm(`Delete ${pizza.name} permanently?`)) return;

    this.pizzaService.deletePizza(pizza.pizzaId).subscribe({
      next: () => this.loadPizzas(),
      error: (err) => this.error = 'Failed to delete pizza (it may be referenced by an order).'
    });
  }
}