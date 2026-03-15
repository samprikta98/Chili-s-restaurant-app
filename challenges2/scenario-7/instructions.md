# Scenario 7: Order Customization Form

## Context

Build a complex **order customization form** for a **"Build Your Own Burger"** feature.

The form should support dynamic inputs, conditional validation, and real-time pricing.

---

# Requirements

## Form Structure

```typescript
interface BurgerOrder {
  base: {
    pattyType: 'beef' | 'chicken' | 'veggie' | 'impossible';
    pattyCount: number; // 1-3
    doneness?: 'rare' | 'medium' | 'well'; // only for beef
  };
  toppings: {
    id: string;
    name: string;
    extraCharge: number;
  }[];
  sauces: string[]; // max 3
  bun: 'regular' | 'brioche' | 'lettuce-wrap' | 'gluten-free';
  sides: {
    item: string;
    size: 'small' | 'medium' | 'large';
  }[];
  specialInstructions: string; // max 200 chars
}
```

---

# Validation Rules

Implement the following validation rules:

* At least **one patty** is required
* If `pattyType` is **beef**, `doneness` is required
* Maximum **3 sauces** allowed
* At least **one side required for combo meals** (detect via route param)
* **Special instructions**

  * maximum **200 characters**
  * must **not contain URLs**
  * must **not contain phone numbers**

---

# Dynamic Pricing

Calculate price dynamically based on selections.

Base price:

```
$12.99
```

Additional charges:

| Item                                       | Price                           |
| ------------------------------------------ | ------------------------------- |
| Extra patty                                | +$4.00 each                     |
| Premium toppings (bacon, avocado, truffle) | +$2.00 each                     |
| Brioche bun                                | +$1.00                          |
| Gluten-free bun                            | +$2.00                          |
| Sides                                      | Small $2 / Medium $3 / Large $4 |

---

# Implementation Tasks

## 1. Create the form with proper typing

Use **Angular Reactive Forms with strict typing**.

```typescript
// Use FormBuilder with strict typing
// Implement custom validators
// Handle conditional validation (doneness for beef)
```

---

## 2. Implement cross-field validation

Example scenario:

```typescript
// If "no bun" selected, cannot have "toasted" instruction
```

The validator should check **multiple form fields together**.

---

## 3. Dynamic Form Arrays

The form should support dynamic collections.

Requirements:

* Add/remove **toppings dynamically**
* Add/remove **sides dynamically**
* Reorder toppings using **drag-and-drop**

---

## 4. Real-time price calculation

Price should update automatically as the form changes.

Requirements:

* Listen to form value changes
* Update total price dynamically
* Show **itemized breakdown**
* Apply **active promotions**

---

## 5. Form state management

Improve user experience with draft persistence.

Requirements:

* Save form draft to **localStorage**
* Restore draft on **component initialization**
* Show **confirmation dialog** before navigating away if the form is dirty

---

# Acceptance Criteria

* [ ] Form uses **strictly typed reactive forms**
* [ ] Validation rules enforced correctly
* [ ] Conditional validation works for beef doneness
* [ ] Dynamic toppings and sides work properly
* [ ] Drag-and-drop reordering works
* [ ] Price updates in real time
* [ ] Draft saved and restored from localStorage
* [ ] Navigation warning appears when form is dirty
