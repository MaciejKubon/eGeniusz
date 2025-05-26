import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CloseButtonComponent } from '../../buttons/close-button/close-button.component';
import { HeaderModalComponent } from '../../title/header-modal/header-modal.component';
import {
  addClass,
  addClasseError,
  addClassSuccess,
  termDetailSucces,
  terms,
} from '../../../interfaces/calendarInterfaces';
import { TermService } from '../../../services/http/calendar/term.service';
import { NotificationService } from '../../../services/service/notification/notification.service';
import { catchError, merge, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { InformationModalComponent } from '../../title/information-modal/information-modal.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { SaveWithTextButtonComponent } from '../../buttons/save-with-text-button/save-with-text-button.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../services/http/lessons/lesson.service';
import { lesson, lessonSucces } from '../../../interfaces/lessonInterfaces';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClassesService } from '../../../services/http/calendar/classes.service';

@Component({
  selector: 'app-reservation-term',
  standalone: true,
  imports: [
    HeaderModalComponent,
    CloseButtonComponent,
    InformationModalComponent,
    SpinnerComponent,
    SaveWithTextButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOption,
    MatSelect,
  ],
  templateUrl: './reservation-term.component.html',
  styleUrl: './reservation-term.component.scss',
})
export class ReservationTermComponent {
  @Input() idTerm: number = 2;
  @Output() closeModal = new EventEmitter<boolean>();
  price: number | undefined = undefined;
  teacherId: string | null = null;
  isLoadingResults: boolean = true;
  sendRequest: boolean = false;
  addClass: addClass = {
    terms_id: 0,
    lesson_id: 0,
    confirmed: 0,
  };
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
  Term: string[] = [];
  reserveTerm = new FormGroup({});
  lessonList: lesson[] = [];
  lesson = new FormControl(null, [Validators.required]);
  errorLessonValueMessage = signal('');
  constructor(
    private route: ActivatedRoute,
    private termService: TermService,
    private notificationService: NotificationService,
    private teacherLesson: LessonService,
    private classService: ClassesService
  ) {
    this.teacherId = this.route.snapshot.paramMap.get('id');
    merge(this.lesson.statusChanges, this.lesson.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateLessonErrorMessage();
        this.price = this.lessonList.find(
          (les) => les.id === this.lesson.value
        )?.price;
      });
  }

  ngOnInit() {
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

        this.teacherLesson
          .getTeacherLessonList(this.teacherId)
          .pipe()
          .subscribe((data: lessonSucces) => {
            this.lessonList = data.lessons;
            this.isLoadingResults = false;
          });
      });
  }
  updateLessonErrorMessage() {
    if (this.lesson.hasError('required')) {
      this.errorLessonValueMessage.set('Pole lekcja nie może być puste');
    } else {
      this.errorLessonValueMessage.set('');
    }
  }
  setError(error:addClasseError){
    if(error?.lesson_id!=null)
      this.lesson.setErrors({apiError: error.lesson_id})
  }
  onSubmit() {
    this.updateLessonErrorMessage();
    if (this.lesson.invalid) {
      this.notificationService.showError('Nieprawidłowe dane lekcji');
    } else {
      if (!this.sendRequest) {
        this.sendRequest = true;
        this.addClass = {
          terms_id: this.idTerm,
          lesson_id: this.lesson.value!,
          confirmed: 0,
        };
        this.classService
          .reservationClass(this.addClass)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              this.notificationService.showError(error.error.error);
              this.sendRequest = false;
              return throwError(() => new Error(error.error.message));
            })
          )
          .subscribe((data:addClassSuccess) => {
            this.notificationService.showSuccess(data.message);
            this.sendRequest = false;
            this.closeModal.emit(true);
          });
      }
    }
  }
  close() {
    this.closeModal.emit(false);
  }
}
