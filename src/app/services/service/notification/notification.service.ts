import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, duration: number = 30000) {
    this.snackBar.open(message, 'Zamknij', {
      duration,
      panelClass: ['snackbar-success']
    });
  }

  showError(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Zamknij', {
      duration,
      panelClass: ['snackbar-error']
    });
  }
}
