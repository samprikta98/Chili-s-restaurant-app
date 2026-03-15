
---

### scenario-2-performance/instructions.md

```markdown
# Scenario 2: Menu Performance Optimization

## Context
The menu page loads 500+ items and has become sluggish. Users report slow scrolling and delayed interactions.

## Current Problem Code
```typescript
@Component({
  selector: 'app-menu-list',
  template: `
    <div class="menu-grid">
      @for (item of menuItems; track item) {
        <app-menu-card 
          [item]="item"
          [isInCart]="isItemInCart(item.id)"
          [cartQuantity]="getCartQuantity(item.id)"
          (addToCart)="onAddToCart($event)">
        </app-menu-card>
      }
    </div>
  `
})
export class MenuListComponent {
  menuItems = this.menuService.getAllItems(); // 500+ items
  
  isItemInCart(id: string): boolean {
    return this.cartService.items.some(i => i.id === id);
  }
  
  getCartQuantity(id: string): number {
    return this.cartService.items.find(i => i.id === id)?.quantity ?? 0;
  }
}
