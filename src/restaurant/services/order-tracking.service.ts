import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderTrackingService {
  private orderStatus = new BehaviorSubject<string>('Not started');
  orderStatus$ = this.orderStatus.asObservable();
  private trackingSubscription: Subscription | undefined;
  statuses = [
    'Preparing',
    'Cooking',
    'Quality Check',
    'Out for Delivery',
    'Delivered',
  ];

  startTracking() {
    console.log('Tracking started'); // Add this for debugging
    // Clear any existing subscription to avoid multiple intervals
    this.stopTracking();

    this.trackingSubscription = interval(5000).subscribe(() => {
      const randomStatus =
        this.statuses[Math.floor(Math.random() * this.statuses.length)];
      this.orderStatus.next(randomStatus);
      console.log('New status:', randomStatus); // Add this for debugging
    });
  }

  stopTracking() {
    if (this.trackingSubscription) {
      this.trackingSubscription.unsubscribe();
    }
  }
}
