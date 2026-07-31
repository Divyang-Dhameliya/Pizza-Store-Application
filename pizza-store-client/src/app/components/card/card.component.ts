import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pizza } from 'src/app/models/pizza.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() pizzaItem = {}; 

  @Output() addToCartEvent = new EventEmitter<Pizza>();

  addToCart(value: Pizza) {
    this.addToCartEvent.emit(value);
  }

  constructor() { }

  ngOnInit() {
  } 

}
