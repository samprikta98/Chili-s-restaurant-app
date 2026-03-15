# Scenario 1: Cart State Management with Signals

## Context

The restaurant app needs a robust cart system. Currently, cart state is scattered across components.
Implement a **centralized cart state using Angular Signals**.

---

# Requirements

## 1. Create a CartStore service (`cart.service.ts`)

Implement the following interfaces:

```typescript
interface CartState {
  items: CartItem[];
  appliedCoupon: string | null;
  tipPercentage: number;
}

interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}
```

---

## 2. Implement these **computed signals**

Create computed signals that derive values from the cart state.

* **subtotal**
  Sum of `(price × quantity)` for all items in the cart.

* **discount**
  Calculate discount based on applied coupon:

  * `SAVE10` → 10% discount
  * `SAVE20` → 20% discount

* **tip**
  Calculate based on **subtotal** and **tipPercentage**.

* **total**

  ```
  total = subtotal - discount + tip
  ```

* **itemCount**
  Total number of items in the cart.

---

## 3. Implement the following methods

```typescript
addItem(item: MenuItem, quantity: number, instructions?: string)

removeItem(menuItemId: string)

updateQuantity(menuItemId: string, quantity: number)

applyCoupon(code: string): boolean
// returns false if coupon is invalid

setTip(percentage: number)

clearCart()
```

---

## 4. Bonus Requirements

Implement the following advanced features:

* Persist cart state to **localStorage**
* Implement **undo functionality** for the last action
* Add **optimistic updates with rollback** on failure

---

# Acceptance Criteria

* [ ] All signals update **reactively**
* [ ] Cart state **persists across page refreshes**
* [ ] Invalid coupon codes are **rejected with clear user feedback**
* [ ] Quantity **cannot go below 1** (remove item instead)
