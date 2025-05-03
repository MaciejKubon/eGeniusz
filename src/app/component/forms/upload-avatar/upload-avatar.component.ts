import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { SaveWithTextButtonComponent } from '../../buttons/save-with-text-button/save-with-text-button.component';
import { UserDetailsService } from '../../../services/http/user/user-details.service';
import { setUserAvatarSucces } from '../../../interfaces/userInetrafces';
import { NotificationService } from '../../../services/service/notification/notification.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-avatar',
  standalone: true,
  imports: [
    SaveWithTextButtonComponent,
    MatInputModule,
    MatIconModule,
    MatLabel,
    MatButtonModule,
  ],
  templateUrl: './upload-avatar.component.html',
  styleUrl: './upload-avatar.component.scss',
})
export class UploadAvatarComponent {
  @Output() saveFile = new EventEmitter<boolean>();
  fileName = '';
  selectedFile: File | null = null;

  constructor(
    private userDetails: UserDetailsService,
    private notificationService: NotificationService
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    if (this.selectedFile != null) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      this.userDetails
        .updateUserAvatar(formData)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showError(error.error.message);
            return throwError(() => new Error('Error fetching data'));
          })
        )
        .subscribe((data: setUserAvatarSucces) => {
          this.notificationService.showSuccess(data.message);
          this.saveFile.emit(true);
        });
    }
  }
}
