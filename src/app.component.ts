import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './restaurant/menu/menu.component';
import { ReservationFormComponent } from './restaurant/reservation/reservation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { OrderTrackerComponent } from './restaurant/order-tracker/order-tracker.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    ReservationFormComponent,
    OrderTrackerComponent,
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showMenu = true;
  showReservation = false;
  showTracker = false;

  onToggleChange(event: any) {
    this.showTracker = event.checked;
  }
}
