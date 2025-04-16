import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { NotificationService } from '../../../services/notification/notification.service';
import { login } from '../../../interfaces/authInterfaces';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatLabel,
    MatButtonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loginData: login = { email: '', password: '' };
  loginForm = new FormGroup({});
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  readonly password = new FormControl('', [Validators.required]);
  errorEmailMessage = signal('');
  errorPasswordMessage = signal('');
  hide = signal(true);

  constructor(private notificationService: NotificationService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorEmailMessage.set('Pole email nie może być puste');
    } else if (this.email.hasError('email')) {
      this.errorEmailMessage.set('Nieprawidłowy email');
    } else {
      this.errorEmailMessage.set('');
    }
  }
  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.errorPasswordMessage.set('Pole hasło nie możę być puste');
    } else {
      this.errorPasswordMessage.set('');
    }
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  onSubmit() {
    this.updateEmailErrorMessage();
    this.updatePasswordErrorMessage();
    if (this.email.invalid || this.password.invalid) {
      this.notificationService.showError('Nieprawidłowe dane logowania');
    } else {
      this.loginData = {
        email: this.email.value,
        password: this.password.value,
      };
      console.log(this.loginData);
    }
  }
}
