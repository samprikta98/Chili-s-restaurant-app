# Scenario 4: Component Architecture Refactor

## Context

The current menu page mixes UI rendering, business logic, and cart interactions in a single component.

This makes the component difficult to maintain and scale.

Your task is to refactor the architecture.

---

# Tasks

Refactor the menu page into smaller reusable components.

Target structure:

```
menu-list
 ├── menu-category
 │    └── menu-card
 └── cart-summary
```

---

## Requirements

### 1. Create presentational components

* `menu-card`
* `menu-category`
* `cart-summary`

These components should:

* Use `@Input()` for data
* Use `@Output()` for events
* Avoid direct service calls

---

### 2. Container Component

`menu-list` should act as a **smart component**.

Responsibilities:

* Fetch menu items from the service
* Manage cart state
* Pass data to child components

---

### 3. Data Flow

Implement **unidirectional data flow**:

```
service → container → presentational component
events → container → service
```

---

# Acceptance Criteria

* [ ] Business logic moved out of presentational components
* [ ] Components are reusable
* [ ] Clear separation of smart vs dumb components
* [ ] Data flows in one direction
