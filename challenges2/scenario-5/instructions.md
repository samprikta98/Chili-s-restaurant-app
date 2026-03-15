# Scenario 5: Debugging Change Detection

## Context

Users report that the **cart badge does not update** when items are added.

Example code:

```typescript
addToCart(item) {
  this.cart.push(item);
}
```

The UI sometimes does not update.

---

# Tasks

### 1. Identify the problem

Explain why the UI does not update.

Consider:

* change detection strategy
* object mutation
* reactive state updates

---

### 2. Fix the bug

Refactor the code so the UI updates correctly.

Example approaches:

* Immutable state update
* Signals
* markForCheck

---

### 3. Explain your solution

Write a short explanation covering:

* why the bug happens
* why your fix works

---

# Acceptance Criteria

* [ ] Bug root cause identified
* [ ] Cart updates trigger UI updates
* [ ] Immutable state updates are used
