import { Injectable, signal, computed } from '@angular/core';
import { CartState, CartItem } from './cart.types';
import { MenuItem } from './menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartStore {

  private state = signal<CartState>({
    items: [],
    appliedCoupon: null,
    tipPercentage: 0
  });

  // TODO: implement computed signals

  subtotal = computed(() => {
    // implement
    return 0;
  });

  discount = computed(() => {
    // implement
    return 0;
  });

  tip = computed(() => {
    // implement
    return 0;
  });

  total = computed(() => {
    // implement
    return 0;
  });

  itemCount = computed(() => {
    // implement
    return 0;
  });

  // TODO: implement methods

  addItem(item: MenuItem, quantity: number, instructions?: string) {}

  removeItem(menuItemId: string) {}

  updateQuantity(menuItemId: string, quantity: number) {}

  applyCoupon(code: string): boolean {
    return false;
  }

  setTip(percentage: number) {}

  clearCart() {}
}