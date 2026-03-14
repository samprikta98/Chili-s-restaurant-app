import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationFormComponent implements OnInit, OnDestroy {
  timeElapsed: number = 0;
  private timerSubscription!: Subscription;

  reservationForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    date: ['', Validators.required],
    time: ['', Validators.required],
    guests: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.timeElapsed++;
      console.log('Time elapsed:', this.timeElapsed);
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      console.log('Reservation submitted:', this.reservationForm.value);
      alert('Reservation submitted successfully!');
      this.reservationForm.reset({ guests: 1 });
    }
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
