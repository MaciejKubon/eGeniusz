import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, merge, throwError } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';
import {
  register,
  registerError,
  registerSucces,
} from '../../../interfaces/authInterfaces';
import { NotificationService } from '../../../services/service/notification/notification.service';
import { RegisterService } from '../../../services/http/auth/register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { linkButton } from '../../../interfaces/buttonInterfaces';
import { LinkWithOutBackgroundButtonComponent } from '../../buttons/link-with-out-background-button/link-with-out-background-button.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatLabel,
    MatButtonModule,
    MatRadioModule,
    LinkWithOutBackgroundButtonComponent
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  registerData: register = {
    email: '',
    password: '',
    rePassword: '',
    role: '',
  };
  navLogin: linkButton = {
    path: 'login',
    text: 'Posiadasz konta? Zaloguj się.',
  };
  registerForm = new FormGroup({});
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  readonly rePassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  readonly accountType = new FormControl('3', [Validators.required]);
  private accont: string | null = null;
  errorEmailMessage = signal('');
  errorPasswordMessage = signal('');
  errorRePasswordMessage = signal('');
  hide = signal(true);
  hide2 = signal(true);
  constructor(
    private notificationService: NotificationService,
    private RegisterService: RegisterService
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
    merge(this.rePassword.statusChanges, this.rePassword.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateRePasswordErrorMessage());
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
    } else if (this.password.hasError('minlength')) {
      this.errorPasswordMessage.set('Hasło musi posiadać co najmniej 8 znaków');
    } else {
      this.errorPasswordMessage.set('');
    }
  }
  updateRePasswordErrorMessage() {
    if (this.rePassword.hasError('required')) {
      this.errorRePasswordMessage.set('Pole hasło nie możę być puste');
    } else if (this.rePassword.hasError('minlength')) {
      this.errorRePasswordMessage.set(
        'Hasło musi posiadać co najmniej 8 znaków'
      );
    } else {
      this.errorRePasswordMessage.set('');
    }
  }
  setError(errors: registerError) {
    if (errors?.email != null)
      this.password.setErrors({ apiError: errors.email[0] });
    if (errors?.password != null)
      this.password.setErrors({ apiError: errors.password[0] });
    if (errors?.rePassword != null)
      this.rePassword.setErrors({ apiError: errors.rePassword[0] });
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  clickEvent2(event: MouseEvent) {
    this.hide2.set(!this.hide2());
    event.stopPropagation();
  }
  onSubmit() {
    this.updateEmailErrorMessage();
    this.updatePasswordErrorMessage();
    this.updateRePasswordErrorMessage();
    if (
      this.email.invalid ||
      this.password.invalid ||
      this.rePassword.invalid ||
      this.accountType.invalid
    ) {
      this.notificationService.showError('Nieprawidłowe dane rejestracji');
    } else {
      if (this.accountType.value == '3') this.accont = 'student';
      else this.accont = 'teacher';
      this.registerData = {
        email: this.email.value,
        password: this.password.value,
        rePassword: this.rePassword.value,
        role: this.accont,
      };
      this.RegisterService.register(this.registerData)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showError(error.error.message);
            this.setError(error.error.error);
            return throwError(() => new Error('Error fetching data'));
          })
        )
        .subscribe((data: registerSucces) => {
          this.notificationService.showSuccess(data.message);
        });
    }
  }
}
