# Scenario 8: Zoneless Angular Debugging

## Context

The application has recently migrated to **Angular zoneless mode** to improve performance.

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
});
```

After the migration, users report several UI issues:

* Cart count does **not update immediately**
* Menu updates only after **manual interaction**
* Some async API responses **do not trigger UI refresh**

Your task is to debug and fix the issues.

---

# Current Problem Code

```typescript
@Component({
  selector: 'app-cart',
  template: `
    <div class="cart-badge">
      {{ cartItems.length }}
    </div>
  `
})
export class CartComponent {

  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
    });
  }
}
```

Service:

```typescript
@Injectable({ providedIn: 'root' })
export class CartService {

  items: CartItem[] = [];

  addItem(item: CartItem) {
    this.items.push(item);
  }

  get items$() {
    return of(this.items);
  }
}
```

---

# Observed Problem

When `addItem()` is called:

* The cart UI **does not update**
* UI refresh happens only after clicking somewhere on the page.

---

# Tasks

## 1. Identify the root cause

Explain why the UI does not update in **zoneless Angular**.

Consider:

* change detection triggering
* object mutation
* reactive state management

---

## 2. Fix the issue

Refactor the implementation so the UI updates correctly.

Possible solutions include:

* Using **Angular Signals**
* Using **ChangeDetectorRef**
* Refactoring to **observable streams**
* Using **immutable state updates**

---

## 3. Improve the implementation

Refactor the cart service using a **modern Angular state pattern**.

Example target architecture:

```ts
items = signal<CartItem[]>([]);

addItem(item: CartItem) {
  this.items.update(items => [...items, item]);
}
```

---

## 4. Explain your solution

Briefly explain:

* Why the bug occurred
* Why your fix works
* Why zoneless Angular requires different patterns

---

# Acceptance Criteria

* [ ] Root cause correctly identified
* [ ] Cart UI updates immediately after adding items
* [ ] Implementation works correctly in zoneless mode
* [ ] State updates follow reactive or immutable patterns

---

# Bonus Tasks

* Convert the cart service fully to **Signals**
* Implement **computed cart totals**
* Ensure components use **OnPush change detection**

---

# Discussion Questions

1. What is the purpose of **Zone.js** in Angular?
2. Why do some apps choose to run **zoneless**?
3. What patterns work best in zoneless Angular applications?

---

# Evaluation Focus

This scenario evaluates:

* Angular change detection knowledge
* Understanding of **zoneless Angular**
* Reactive state management
* Debugging skills
