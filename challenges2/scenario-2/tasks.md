# Tasks

Complete the following performance optimization tasks for the menu page.

---

## 1. Implement Virtual Scrolling

Use **`@angular/cdk/scrolling`** to optimize rendering for large datasets.

Requirements:

* Use **`cdk-virtual-scroll-viewport`** to render menu items efficiently.
* Maintain **visual consistency with the existing grid layout**.
* Ensure smooth scrolling even with **500+ menu items**.
* Handle **dynamic item heights** if menu cards vary in size.

Acceptance Criteria

* [ ] Virtual scrolling renders only visible items
* [ ] Grid layout appearance remains unchanged
* [ ] Scrolling performance is smooth with large datasets

---

## 2. Optimize Change Detection

The current implementation recalculates cart values on every change detection cycle.

Tasks:

* Convert `isItemInCart` to use **signals or memoization**
* Convert `getCartQuantity` to use **signals or memoization**
* Implement **`ChangeDetectionStrategy.OnPush`**
* Use a proper **track function with a unique identifier**

Example improvement target:

```typescript
@for (item of menuItems; track item.id) {
```

Acceptance Criteria

* [ ] Component uses **OnPush change detection**
* [ ] Cart lookups are **reactive or memoized**
* [ ] Track function prevents unnecessary re-renders

---

## 3. Implement Image Lazy Loading

Menu images should load only when needed.

Tasks:

* Load images **only when visible in the viewport**
* Add a **placeholder or skeleton loader** while images load
* Gracefully handle **image load failures**

Acceptance Criteria

* [ ] Images load lazily
* [ ] Placeholder appears while loading
* [ ] Broken images show a fallback UI

---

## 4. Add Search with Debounce

Implement a **client-side search feature**.

Requirements:

```typescript
// Implement a search that:
// - Debounces input by 300ms
// - Filters items client-side
// - Highlights matching text
// - Shows "No results" state
```

Acceptance Criteria

* [ ] Search input debounces by **300ms**
* [ ] Menu list filters correctly
* [ ] Matching text is **visually highlighted**
* [ ] "No results found" state is displayed when appropriate

---

## Bonus (Optional)

* Implement **keyboard navigation for search**
* Add **recent searches**
* Persist last search query in **localStorage**
