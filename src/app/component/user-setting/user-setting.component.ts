import { Component } from '@angular/core';
import { AuthService } from '../../services/service/auth/auth.service';
import { HeaderTitleComponent } from '../title/header-title/header-title.component';
import { UploadAvatarComponent } from '../forms/upload-avatar/upload-avatar.component';
import { InformationModalComponent } from '../title/information-modal/information-modal.component';
import { EditWithTextButtonComponent } from '../buttons/edit-with-text-button/edit-with-text-button.component';
import { UserDetailsService } from '../../services/http/user/user-details.service';
import {
  deleteUserAvatarSucces,
  getUserAvatarSucces,
  getUsetDetail,
  userDetail,
} from '../../interfaces/userInetrafces';
import { SpinnerComponent } from '../spinner/spinner.component';
import { UserDetailsFormsComponent } from '../forms/user-details-forms/user-details-forms.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../services/service/notification/notification.service';

@Component({
  selector: 'app-user-setting',
  standalone: true,
  imports: [
    HeaderTitleComponent,
    UploadAvatarComponent,
    InformationModalComponent,
    EditWithTextButtonComponent,
    SpinnerComponent,
    UserDetailsFormsComponent,
  ],
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.scss',
})
export class UserSettingComponent {
  isLoadingResults: boolean = true;
  isLoadingResultsAvatar: boolean = false;
  isActiveEdit: boolean = false;
  role: string = '';
  avatarLink = '';
  userDetails: userDetail = {
    firstName: null,
    lastName: null,
    birthday: null,
    description: null,
    avatar: null,
  };

  constructor(
    private authService: AuthService,
    private userDetailService: UserDetailsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.role = this.authService.getRole();
    this.loadUserData();
  }
  loadUserData() {
    this.isLoadingResults = true;
    this.userDetailService
      .getUserDetail()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.message);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: getUsetDetail) => {
        this.userDetails = data.userDetails;
        if (this.userDetails.avatar) this.setAvatar(this.userDetails.avatar);
        this.isLoadingResults = false;
      });
  }
  setAvatar(link: string) {
    link = 'http://localhost:8000' + link;
    this.avatarLink = link;
  }
  uploadAvatar(action: boolean) {
    this.isLoadingResultsAvatar = true;
    this.userDetailService
      .getUserAvatar()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.message);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: getUserAvatarSucces) => {
        this.notificationService.showError(data.message);

        this.setAvatar(data.avatar);
        this.isLoadingResultsAvatar = false;
      });
  }
  deleteAvatar() {
    this.isLoadingResultsAvatar = true;
    this.userDetailService.deleteUserAvatar().pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
        return throwError(() => new Error('Error fetching data'));
      })
    ).subscribe((data:deleteUserAvatarSucces)=>{
      this.notificationService.showError(data.message);
      this.setAvatar(data.avatar);
      this.isLoadingResultsAvatar = false;
    });

  }
  closeForm(ref: boolean) {
    this.isActiveEdit = false;
    if (ref) {
      this.loadUserData();
    }
  }
  edit(action: boolean) {
    this.isActiveEdit = true;
  }
}
