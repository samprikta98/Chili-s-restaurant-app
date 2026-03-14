# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Purpose of This Repository

This is a **pair-programming interview platform** for front-end engineer candidates at different seniority levels. The app is a Chili's restaurant management app built with Angular 21, Angular Material, and RxJS. Each session, the interviewer and candidate work together to solve one or more challenges from this file.

**Interview format:** The candidate shares their screen; Claude Code acts as co-pilot. Pick challenges appropriate to the candidate's level and work through them live.

---

## Commands

```bash
npm start          # Dev server at http://localhost:4200
npm run build      # Production build → dist/demo
ng test            # Unit tests (Karma)
ng lint            # Linting
ng generate component restaurant/<name>   # Scaffold a new component
```

---

## Architecture Overview

**Angular 21 standalone-component app** (no NgModule-based lazy loading — uses `bootstrapApplication` in `main.ts`).

```
src/
├── app.component.ts          # Root: navigation state (showMenu/showReservation/showTracker)
├── global_styles.css         # Global Material theme overrides
└── restaurant/
    ├── menu/                 # MenuComponent — displays hardcoded menu items
    ├── reservation/          # ReservationFormComponent — reactive form with timer
    ├── order-tracker/        # OrderTrackerComponent — subscribes to OrderTrackingService
    └── services/
        └── order-tracking.service.ts  # BehaviorSubject-based status simulator
```

Key patterns already in use:
- **Navigation** via boolean flags in `AppComponent` (a deliberate simplification — a challenge asks candidates to replace this with Angular Router)
- **Reactive Forms** in `ReservationFormComponent` with `OnInit`/`OnDestroy` lifecycle hooks
- **BehaviorSubject** in `OrderTrackingService` — emits random statuses on an `interval`
- **Angular Material** throughout (mat-card, mat-form-field, mat-toolbar, mat-slide-toggle)

---

## Interview Challenges

Challenges are grouped by seniority. Each challenge includes the **skill tested**, **starting point** in the code, and **what a strong answer looks like**.

---

### Junior Level

#### J1 — CSS: Responsive Menu Grid
**Tests:** CSS Grid/Flexbox, responsive design, hover states

**Starting point:** `src/restaurant/menu/menu.component.html` and `.css` — menu items are stacked in a basic layout.

**Task:** Make the menu cards display in a responsive grid:
- 3 columns on desktop, 2 on tablet (≤768px), 1 on mobile (≤480px)
- Add a smooth hover effect (elevation lift or border glow)
- Ensure the price badge is always right-aligned within the card

**Strong answer:** Uses CSS Grid with `auto-fill`/`minmax`, transitions on `transform`/`box-shadow`, and no JavaScript.

---

#### J2 — HTML & Accessibility: Semantic Markup Audit
**Tests:** Semantic HTML, ARIA, form accessibility

**Starting point:** `src/app.component.html` and `src/restaurant/reservation/reservation.component.html`

**Task:**
1. The nav buttons in `AppComponent` are `<button>` elements inside a toolbar — add `aria-pressed` states reflecting the currently active view.
2. The reservation form's `<mat-label>` elements don't have explicit `for`/`id` associations outside Material's system — add `aria-describedby` for validation error messages.
3. Add a visually-hidden skip-to-main-content link at the top of `index.html`.

**Strong answer:** Understands the difference between `aria-label`, `aria-labelledby`, and `aria-describedby`; knows when native semantics are sufficient vs. when explicit ARIA is needed.

---

#### J3 — JavaScript: Shopping Cart State
**Tests:** Array manipulation, basic state management, DOM updates without a framework

**Starting point:** `MenuComponent.addToCart()` currently only does `console.log`.

**Task:**
1. Maintain a `cartItems` array in `MenuComponent` (no service needed yet).
2. Display a badge count on an "Add to Cart" button showing how many of that item are in the cart.
3. Display a running total price below the menu.
4. Add a "Clear Cart" button.

**Strong answer:** Uses immutable array patterns (`[...cart, item]`), computes total with `reduce`, and binds everything to the template reactively.

---

### Mid-Level

#### M1 — Angular: Cart Service + Component
**Tests:** Angular services, component communication, BehaviorSubject

**Starting point:** J3 cart logic lives entirely in `MenuComponent`.

**Task:**
1. Extract cart logic into a new `CartService` using a `BehaviorSubject<CartItem[]>`.
2. Create a `CartComponent` (mat-drawer or mat-dialog) that lists items with quantity controls (+ / −) and a remove button.
3. `MenuComponent` injects `CartService` and calls `addToCart()`; `CartComponent` subscribes to the cart observable.
4. Show a cart item-count badge in the `AppComponent` toolbar.

**Strong answer:** Service is `providedIn: 'root'`, uses `map` to derive totals without storing redundant state, and the `CartComponent` unsubscribes correctly.

---

#### M2 — Angular Forms: Custom Validators & Multi-Step Form
**Tests:** Reactive forms, custom validators, FormArray, cross-field validation

**Starting point:** `ReservationFormComponent` — single-step form with basic validators.

**Task:**
1. Add a custom validator that rejects dates in the past.
2. Add a cross-field validator: if `guests > 6`, a "special event" checkbox must be checked.
3. Break the form into two steps using a `MatStepper`:
   - Step 1: name, email
   - Step 2: date, time, guests, special-event checkbox
4. Persist step-1 values if the user navigates back.

**Strong answer:** Implements `ValidatorFn` and `AbstractControl`-level validators correctly; understands `setErrors` vs. `addValidators`; knows that `MatStepper` can be linear or non-linear.

---

#### M3 — RxJS: Subscription & Error Handling
**Tests:** RxJS operators, memory-leak prevention, error handling

**Starting point:** `OrderTrackerComponent` subscribes manually without guaranteed cleanup. `OrderTrackingService` has no error handling.

**Task:**
1. Refactor `OrderTrackerComponent` to use `takeUntilDestroyed()` (Angular 16+ destroy ref) instead of manual `ngOnDestroy` unsubscription.
2. Add `catchError` in the service so a simulated failure (throw after 3 cycles) is handled gracefully and the stream restarts with `retry(2)`.
3. Add `distinctUntilChanged()` so duplicate consecutive statuses don't re-trigger the UI.
4. Add a `debounceTime(300)` to status updates to prevent flickering.

**Strong answer:** Understands hot vs. cold observables, knows `takeUntilDestroyed` requires `DestroyRef` injection, chains operators correctly.

---

### Senior Level

#### S1 — Angular Router: Replace View-Toggle Navigation
**Tests:** Angular Router, lazy loading, route guards, named outlets

**Starting point:** `AppComponent` uses `showMenu`/`showReservation`/`showTracker` boolean flags to switch views with `*ngIf` (or `@if`).

**Task:**
1. Configure `provideRouter` in `main.ts` with routes for `/menu`, `/reservations`, `/tracker`.
2. Lazy-load each feature using `loadComponent`.
3. Add a `canActivate` guard on `/tracker` that only allows access if an order has been started (signal or service).
4. Add a 404 route with a simple `NotFoundComponent`.
5. Preserve the active route highlight in the toolbar.

**Strong answer:** Uses `RouterLink` with `routerLinkActive`, understands `canActivate` vs. `canMatch`, knows that standalone components are directly lazy-loadable.

---

#### S2 — Angular Signals: Reactive State Refactor
**Tests:** Angular Signals API, computed, effect, signal-based inputs

**Starting point:** `OrderTrackingService` uses `BehaviorSubject`; `MenuComponent` uses class properties for cart state.

**Task:**
1. Refactor `OrderTrackingService` to use `signal<string>` and expose it as a `readonly` signal.
2. In `MenuComponent`, replace `cartItems: MenuItem[]` with `cartItems = signal<MenuItem[]>([])` and add a `computed` for `totalPrice`.
3. Use `effect()` to log to console whenever the cart changes (simulating analytics).
4. Update templates to use the signal call syntax (`cartItems()`) and verify `OnPush` change detection still works.

**Strong answer:** Understands signals are synchronous, knows when `computed` vs. `effect` is appropriate, recognizes that signals integrate with `OnPush` without `async` pipe.

---

#### S3 — Performance: Change Detection & Rendering
**Tests:** OnPush strategy, trackBy, virtual scrolling, profiling

**Starting point:** All components use default change detection; menu is a small hardcoded list.

**Task:**
1. Add `changeDetection: ChangeDetectionStrategy.OnPush` to all three feature components — fix any breakage this causes.
2. Expand the menu to 50 items (programmatically) and implement `@for` with `track item.id`.
3. Implement `CdkVirtualScrollViewport` for the menu list.
4. Open Chrome DevTools → Performance panel, record scrolling before and after, and explain the difference.

**Strong answer:** Knows `OnPush` requires observable + `async` pipe or signal; explains that `trackBy`/`track` avoids full DOM re-renders; understands virtual scrolling viewport constraints.

---

### Architect Level

#### A1 — Modern Angular Control Flow & Deferred Views
**Tests:** Angular 17+ built-in control flow, @defer, SSR awareness

**Starting point:** Templates use `*ngIf`, `*ngFor`, `*ngSwitch` structural directives.

**Task:**
1. Migrate all templates to the new built-in control flow (`@if`, `@for`, `@switch`, `@empty`).
2. Wrap the `OrderTrackerComponent` inclusion in `AppComponent` with `@defer (on interaction)` so it only loads when the user clicks "Order Tracker".
3. Add `@placeholder` and `@loading` blocks with skeleton UI.
4. Discuss: what would need to change to enable Angular SSR (`@angular/ssr`) for this app, and what are the hydration implications of `@defer`?

**Strong answer:** Understands `@defer` trigger types (`on idle`, `on viewport`, `on interaction`, `when`); knows SSR requires `provideClientHydration`; identifies `BehaviorSubject` timer as a server-incompatible side effect.

---

#### A2 — State Management Architecture
**Tests:** Architecture decision-making, NgRx vs. Signals store, scalability

**Starting point:** State is scattered — cart in `MenuComponent`, order status in `OrderTrackingService`, form data local to `ReservationFormComponent`.

**Task (open-ended design + implementation):**
1. Design a global state shape for this app (whiteboard or sketch in comments).
2. Implement a lightweight signal-based store (without NgRx) that manages: `cart`, `currentOrderStatus`, and `reservations[]`.
3. Justify when you would reach for NgRx (DevTools, time-travel debugging, large team) vs. staying with signals.
4. Add a `computed` selector for "has active order" that drives the route guard from S1.

**Strong answer:** Produces a store with clear read (signals/computed) and write (methods) surfaces; avoids two-way binding to store state; can articulate NgRx trade-offs without dogma.

---

#### A3 — Code Review & Architectural Critique
**Tests:** Code quality judgment, security awareness, API design

**Starting point:** The entire codebase.

**Task (discussion + refactoring):**
Review the codebase and identify at minimum:
1. **Memory leak risk** — where subscriptions may not be cleaned up.
2. **Missing error boundaries** — what happens if `OrderTrackingService` throws?
3. **Tight coupling** — `AppComponent` directly controls which child is visible instead of using the router.
4. **Hardcoded data** — menu items are in the component; propose a service + HTTP call architecture using `HttpClient` with typed responses.
5. **Accessibility gaps** — at least two issues beyond J2.

Then implement fixes for items 1, 2, and 4.

**Strong answer:** Prioritises fixes by user impact; proposes `HttpClient` with an interceptor for auth/error handling; knows `ErrorHandler` for global Angular error catching.

---

## Interviewer Notes

- Start by asking the candidate to read the relevant component(s) aloud and explain what they see — this reveals comprehension speed.
- For junior challenges, provide the Angular docs URL if asked; for senior+, expect independent recall.
- Challenges can be combined: e.g., do J3 → M1 as a progression within one session.
- The deliberate "bugs" and stubs (`addToCart` console.log, no router, missing unsubscription) are intentional — do not fix them before sessions.
