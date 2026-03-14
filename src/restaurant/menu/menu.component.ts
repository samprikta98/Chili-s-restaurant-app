import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

interface MenuItem {
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  @Input() item: any;

  menuItems: MenuItem[] = [
    {
      name: 'Spaghetti Carbonara',
      price: 12.99,
      description: 'Classic Italian pasta with eggs, cheese, and pancetta',
    },
    {
      name: 'Margherita Pizza',
      price: 10.99,
      description: 'Traditional pizza with tomatoes, mozzarella, and basil',
    },
    {
      name: 'Caesar Salad',
      price: 8.99,
      description: 'Crisp romaine lettuce with Caesar dressing and croutons',
    },
  ];

  addToCart(item: MenuItem) {
    console.log('Added to cart:', item);
  }
}
