
---

### scenario-3-testing/instructions.md

```markdown
# Scenario 3: Comprehensive Unit Testing

## Context
Write tests for the cart functionality and menu components.

## Tasks

### 1. Test the CartService
```typescript
describe('CartStore', () => {
  // Test cases to implement:
  
  describe('addItem', () => {
    it('should add a new item to empty cart');
    it('should increment quantity if item already exists');
    it('should preserve special instructions');
    it('should update all computed values');
  });
  
  describe('applyCoupon', () => {
    it('should apply valid coupon code');
    it('should reject invalid coupon code');
    it('should replace existing coupon');
    it('should calculate discount correctly');
  });
  
  describe('computed signals', () => {
    it('should calculate subtotal correctly');
    it('should calculate tip based on subtotal');
    it('should calculate total with discount and tip');
  });
  
  describe('persistence', () => {
    it('should save to localStorage on changes');
    it('should restore from localStorage on init');
    it('should handle corrupted localStorage data');
  });
});
