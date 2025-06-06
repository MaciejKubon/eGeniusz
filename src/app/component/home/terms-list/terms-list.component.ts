import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { HeaderTitleComponent } from '../../title/header-title/header-title.component';
import { AuthService } from '../../../services/service/auth/auth.service';
import { TermsListService } from '../../../services/http/home/terms-list.service';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../services/service/notification/notification.service';
import {
  termsList,
  termsListSuccess,
} from '../../../interfaces/homeInterfaces';
import { InformationTextComponent } from '../../title/information-text/information-text.component';
import { CancelWithTextButtonComponent } from '../../buttons/cancel-with-text-button/cancel-with-text-button.component';
import { ConfirmWithTextButtonComponent } from '../../buttons/confirm-with-text-button/confirm-with-text-button.component';
import { CommonModule } from '@angular/common';
import { DeleteWithTextButtonComponent } from '../../buttons/delete-with-text-button/delete-with-text-button.component';
import { ClassesService } from '../../../services/http/calendar/classes.service';
import {
  confirmClass,
  confirmClassSuccess,
  deleteTermSucces,
} from '../../../interfaces/calendarInterfaces';
import { TermService } from '../../../services/http/calendar/term.service';
import { InformationModalComponent } from '../../title/information-modal/information-modal.component';

@Component({
  selector: 'app-terms-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    HeaderTitleComponent,
    SpinnerComponent,
    InformationTextComponent,
    CancelWithTextButtonComponent,
    ConfirmWithTextButtonComponent,
    DeleteWithTextButtonComponent,
    CommonModule,
    InformationModalComponent
  ],
  providers: [],
  templateUrl: './terms-list.component.html',
  styleUrl: './terms-list.component.scss',
})
export class TermsListComponent {
  role: string = '';
  isLoadingResults: boolean = true;
  termsList: termsList = {
    terms: [],
    classes: [],
    confirmClasses: [],
  };
  constructor(
    private authService: AuthService,
    private teacherTermsListService: TermsListService,
    private notificationService: NotificationService,
    private classesServices: ClassesService,
    private termService: TermService
  ) {}
  ngOnInit() {
    this.role = this.authService.getRole();
    this.getTermsList();
  }

  getTermsList() {
    this.isLoadingResults = true;
    if (this.role == 'teacher') {
      this.teacherTermsListService
        .getTeacherTermsList()
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showError(error.error.error);
            return throwError(() => new Error('Error fetching data'));
          })
        )
        .subscribe((data: termsListSuccess) => {
          this.termsList = data.term;
          this.isLoadingResults = false;
        });
    }
    if(this.role == 'student'){
      this.teacherTermsListService
        .getStudentTermsList()
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showError(error.error.error);
            return throwError(() => new Error('Error fetching data'));
          })
        )
        .subscribe((data: termsListSuccess) => {
          this.termsList = data.term;
          this.isLoadingResults = false;
        });
    }
  }

  confirm(id: number) {
    let confirmed: confirmClass = {
      terms_id: id,
      confirmed: 1,
    };
    this.classesServices
      .confitrClass(confirmed)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.error);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: confirmClassSuccess) => {
        this.notificationService.showSuccess(data.message);
        this.getTermsList();
      });
  }
  cancel(id: number) {
    this.classesServices
      .deleteClass(id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.error);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: confirmClassSuccess) => {
        this.notificationService.showSuccess(data.message);
        this.getTermsList();
      });
  }
  delete(id: number) {
    this.termService
      .deleteTerm(id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.error);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: deleteTermSucces) => {
        this.notificationService.showSuccess(data.message);
        this.getTermsList();
      });
  }
}
