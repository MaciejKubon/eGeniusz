import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderModalComponent } from '../../title/header-modal/header-modal.component';
import { CloseButtonComponent } from '../../buttons/close-button/close-button.component';
import { TermService } from '../../../services/http/calendar/term.service';
import {
  deleteClassSucces,
  deleteTermSucces,
  termDetailSucces,
  terms,
} from '../../../interfaces/calendarInterfaces';
import { NotificationService } from '../../../services/service/notification/notification.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { InformationModalComponent } from '../../title/information-modal/information-modal.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { DeleteWithTextButtonComponent } from '../../buttons/delete-with-text-button/delete-with-text-button.component';
import { AuthService } from '../../../services/service/auth/auth.service';
import { CancelWithTextButtonComponent } from '../../buttons/cancel-with-text-button/cancel-with-text-button.component';
import { ClassesService } from '../../../services/http/calendar/classes.service';

@Component({
  selector: 'app-detail-terms',
  standalone: true,
  imports: [
    HeaderModalComponent,
    CloseButtonComponent,
    InformationModalComponent,
    SpinnerComponent,
    DeleteWithTextButtonComponent,
    CancelWithTextButtonComponent,
  ],
  templateUrl: './detail-terms.component.html',
  styleUrl: './detail-terms.component.scss',
})
export class DetailTermsComponent {
  @Input() idTerm: number = 0;
  @Output() closeModal = new EventEmitter<boolean>();
  role: string = '';
  isLoadingResults: boolean = true;
  Term: string[] = [];
  termDetail: terms = {
    id: 0,
    start_date: '',
    end_date: '',
    teacher: {
      id: 0,
      firstName: '',
      lastName: '',
    },
    class: null,
  };
  constructor(
    private termService: TermService,
    private classService: ClassesService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.role = this.authService.getCurrentRole();
    this.Term = [];
    this.termService
      .getTermDetail(this.idTerm)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.message);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: termDetailSucces) => {
        this.termDetail = data.terms;
        this.Term.push(this.termDetail.start_date.split(' ')[0]);
        this.Term.push(this.termDetail.start_date.split(' ')[1]);
        this.Term.push(this.termDetail.end_date.split(' ')[1]);
        this.isLoadingResults = false;
      });
  }
  close() {
    this.closeModal.emit(false);
  }
  delete() {
    this.termService
      .deleteTerm(this.idTerm)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.message);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: deleteTermSucces) => {
        this.notificationService.showSuccess(data.message);
        this.closeModal.emit(true);
      });
  }
  cancel() {
    if (this.termDetail.class != null) {
      this.classService.deleteClass(this.termDetail.class.id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.message);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: deleteClassSucces) => {
        this.notificationService.showSuccess(data.message);
        this.closeModal.emit(true);
      });
    }
  }
}
