import { Component, OnInit } from '@angular/core';
import { OrderTrackingService } from '../services/order-tracking.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-tracker',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './order-tracker.component.html',
})
export class OrderTrackerComponent implements OnInit {
  currentStatus: string = 'Not started';
  private statusSubscription: Subscription | undefined;

  constructor(private orderTrackingService: OrderTrackingService) {}

  ngOnInit() {
    this.statusSubscription = this.orderTrackingService.orderStatus$.subscribe(
      (status) => (this.currentStatus = status)
    );
  }

  //simulating API call
  startTracking() {
    this.orderTrackingService.startTracking();
  }
}
