import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { InformationModalComponent } from '../../title/information-modal/information-modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AuthService } from '../../../services/service/auth/auth.service';
import { SaveWithTextButtonComponent } from '../../buttons/save-with-text-button/save-with-text-button.component';
import { CancelWithTextButtonComponent } from '../../buttons/cancel-with-text-button/cancel-with-text-button.component';
import {
  updateUserDetailSuccess,
  userDetail,
} from '../../../interfaces/userInetrafces';
import { UserDetailsService } from '../../../services/http/user/user-details.service';
import { NotificationService } from '../../../services/service/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, merge, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-details-forms',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    InformationModalComponent,
    MatDatepickerModule,
    SaveWithTextButtonComponent,
    CancelWithTextButtonComponent,
  ],
  templateUrl: './user-details-forms.component.html',
  styleUrl: './user-details-forms.component.scss',
})
export class UserDetailsFormsComponent {
  @Input() userDetail: userDetail = {
    firstName: null,
    lastName: null,
    birthday: null,
    description: null,
    avatar: null,
  };
  @Output() closeForm = new EventEmitter<boolean>();
  userDetails: userDetail = {
    firstName: null,
    lastName: null,
    birthday: null,
    description: null,
  };
  role: string = '';
  userDetailsForm = new FormGroup({});
  firstNameValue = new FormControl();
  lastNameValue = new FormControl();
  bitrthdayValue = new FormControl();
  descriptionValue = new FormControl();
  errorFirstNameValueMessage = signal('');
  errorLastNameValueMessage = signal('');
  errorBitrthdayValueMessage = signal('');
  errorDescriptionValueMessage = signal('');
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private userDetailsService: UserDetailsService
  ) {
    merge(this.firstNameValue.statusChanges, this.firstNameValue.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateFirstNameErrorMessage());
    merge(this.lastNameValue.statusChanges, this.lastNameValue.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateLastNameErrorMessage());
    merge(this.bitrthdayValue.statusChanges, this.bitrthdayValue.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateLastNameErrorMessage());
    merge(
      this.descriptionValue.statusChanges,
      this.descriptionValue.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateDescriptionErrorMessage());
  }
  ngOnInit() {
    this.role = this.authService.getRole();
    this.firstNameValue = new FormControl(this.userDetail.firstName);
    this.lastNameValue = new FormControl(this.userDetail.lastName);
    this.bitrthdayValue = new FormControl(this.userDetail.birthday);
    this.descriptionValue = new FormControl(this.userDetail.description);
  }
  updateFirstNameErrorMessage() {}
  updateLastNameErrorMessage() {}
  updateBitrthdayErrorMessage() {}
  updateDescriptionErrorMessage() {}

  save(action: boolean) {
    if (
      this.firstNameValue.invalid ||
      this.lastNameValue.invalid ||
      this.bitrthdayValue.invalid ||
      this.descriptionValue.invalid
    ) {
      this.notificationService.showError('Nieprawidłowe dane przedmiotu');
    } else {
      const userBirthday = new Date(this.bitrthdayValue.value);
      let year = userBirthday.getFullYear();
      let month = '';
      let day = '';
      if (userBirthday.getMonth() < 9)
        month = '0' + (userBirthday.getMonth() + 1).toString();
      else month = (userBirthday.getMonth() + 1).toString();
      if (userBirthday.getDate() < 10)
        day = '0' + userBirthday.getDate().toString();
      else day = userBirthday.getDate().toString();

      this.bitrthdayValue = new FormControl(year + '-' + month + '-' + day);
      this.userDetails = {
        firstName: this.firstNameValue.value,
        lastName: this.lastNameValue.value,
        birthday: this.bitrthdayValue.value,
        description: this.descriptionValue.value,
      };
      this.userDetailsService
        .updateUserDetail(this.userDetails)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showError(error.error.message);
            return throwError(() => new Error('Error fetching data'));
          })
        )
        .subscribe((data: updateUserDetailSuccess) => {
          this.notificationService.showSuccess(data.message);
          this.closeForm.emit(true);
        });
    }
  }
  cancel(action: boolean) {
    this.closeForm.emit(false);
  }
  onSubmit() {}
}
