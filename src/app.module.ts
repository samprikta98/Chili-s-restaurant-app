import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenuComponent } from './restaurant/menu/menu.component';
import { ReservationFormComponent } from './restaurant/reservation/reservation.component';
import { OrderTrackerComponent } from './restaurant/order-tracker/order-tracker.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    ReservationFormComponent,
    OrderTrackerComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
