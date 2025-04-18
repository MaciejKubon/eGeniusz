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
import { catchError, merge, throwError } from 'rxjs';
import { NotificationService } from '../../../services/service/notification/notification.service';
import { login, loginSucces } from '../../../interfaces/authInterfaces';
import { LoginService } from '../../../services/http/auth/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/service/auth/auth.service';
import { LinkWithOutBackgroundButtonComponent } from '../../buttons/link-with-out-background-button/link-with-out-background-button.component';
import { linkButton } from '../../../interfaces/buttonInterfaces';

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
    LinkWithOutBackgroundButtonComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loginData: login = { email: '', password: '' };
  navRegiester: linkButton = {
    path: 'register',
    text: 'Nie posiadasz konta? Zarejestruj się.',
  };
  navForgot: linkButton = { path: 'forgot-password', text: 'Przypomnij hasło' };

  loginForm = new FormGroup({});
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);
  errorEmailMessage = signal('');
  errorPasswordMessage = signal('');
  hide = signal(true);

  constructor(
    private notificationService: NotificationService,
    private LoginService: LoginService,
    private AuthSession: AuthService
  ) {
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

  setError(error: string) {
    this.password.setErrors({ apiError: error });
    this.email.setErrors({ apiError: error });
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
      this.LoginService.login(this.loginData)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showError(error.error.error);
            this.setError(error.error.error);
            return throwError(() => new Error('Error fetching data'));
          })
        )
        .subscribe((data: loginSucces) => {
          this.AuthSession.setToken(data.token);
          this.notificationService.showSuccess(data.message);
          console.log(data.role);
        });
    }
  }
}
