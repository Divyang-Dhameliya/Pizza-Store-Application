import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderDetailItem } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: Order | null = null;
  items: OrderDetailItem[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrderDetails(orderId);
  }

  loadOrderDetails(orderId: number): void {
    this.loading = true;
    this.orderService.getOrderDetails(orderId).subscribe({
      next: (data) => {
        this.order = data.order;
        this.items = data.items;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load order details.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
