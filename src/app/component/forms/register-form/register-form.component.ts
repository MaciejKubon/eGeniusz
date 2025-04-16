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
import { merge } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';
import { register } from '../../../interfaces/authInterfaces';
import { NotificationService } from '../../../services/notification/notification.service';

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
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  registerData: register = { email: '', password: '', role: '' };
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

  errorEmailMessage = signal('');
  errorPasswordMessage = signal('');
  errorRePasswordMessage = signal('');
  hide = signal(true);
  hide2 = signal(true);
  constructor(private notificationService: NotificationService) {
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
      this.registerData = {
        email: this.email.value,
        password: this.password.value,
        role: this.accountType.value,
      };
      console.log(this.registerData);
    }
  }
}
