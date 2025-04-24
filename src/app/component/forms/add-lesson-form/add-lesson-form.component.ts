import { Component, EventEmitter, Output, signal } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { subject, subjectSucces } from '../../../interfaces/subjectIntefeces';
import {
  subjectLevel,
  subjectLevelSucces,
} from '../../../interfaces/subjectLevelInterfaces';
import { MatInput } from '@angular/material/input';
import { SaveWithTextButtonComponent } from '../../buttons/save-with-text-button/save-with-text-button.component';
import { SubjectService } from '../../../services/http/lessons/subject.service';
import { SubjectLevelService } from '../../../services/http/lessons/subject-level.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, merge, throwError } from 'rxjs';
import { NotificationService } from '../../../services/service/notification/notification.service';
import { LessonService } from '../../../services/http/lessons/lesson.service';
import {
  addLesson,
  addLessonSucces,
} from '../../../interfaces/lessonInterfaces';

@Component({
  selector: 'app-add-lesson-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    MatFormFieldModule,
    MatInput,
    SaveWithTextButtonComponent,
  ],
  templateUrl: './add-lesson-form.component.html',
  styleUrl: './add-lesson-form.component.scss',
})
export class AddLessonFormComponent {
  @Output() addNewLesson = new EventEmitter<boolean>();
  lessonData: addLesson = {
    subject_id: null,
    subject_level_id: null,
    price: null,
  };
  lessonForm = new FormGroup({});
  subject: subject[] = [];
  subjectValue = new FormControl(null, [Validators.required]);
  errorSubjectValueMessage = signal('');
  subjectLevel: subjectLevel[] = [];
  subjectLevelValue = new FormControl(null, [Validators.required]);
  errorSubjectLevelValueMessage = signal('');
  priceValue = new FormControl(null, [Validators.required, Validators.min(0)]);
  errorPriceValueMessage = signal('');
  sendRequest: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private subjectList: SubjectService,
    private subjectLevelList: SubjectLevelService,
    private lessonService: LessonService
  ) {
    merge(this.subjectValue.statusChanges, this.subjectValue.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateSubjectErrorMessage());
    merge(
      this.subjectLevelValue.statusChanges,
      this.subjectLevelValue.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateSubjectLevelErrorMessage());
    merge(this.priceValue.statusChanges, this.priceValue.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePriceErrorMessage());
  }
  ngOnInit() {
    this.subjectList
      .getSubjectList()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.error);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: subjectSucces) => {
        this.subject = data.subject;
      });
    this.subjectLevelList
      .getSubjectLevelList()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.error);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: subjectLevelSucces) => {
        this.subjectLevel = data.subjectLevel;
      });
  }

  updateSubjectErrorMessage() {
    if (this.subjectValue.hasError('required')) {
      this.errorSubjectValueMessage.set('Pole przedmiot nie może być puste');
    } else {
      this.errorSubjectValueMessage.set('');
    }
  }
  updateSubjectLevelErrorMessage() {
    if (this.subjectLevelValue.hasError('required')) {
      this.errorSubjectLevelValueMessage.set('Pole poziom nie może być puste');
    } else {
      this.errorSubjectLevelValueMessage.set('');
    }
  }
  updatePriceErrorMessage() {
    if (this.priceValue.hasError('required')) {
      this.errorPriceValueMessage.set('Pole cena nie może być puste');
    } else if (this.priceValue.hasError('min')) {
      this.errorPriceValueMessage.set('Cena musi być wieksza od 0');
    } else {
      this.errorPriceValueMessage.set('');
    }
  }
  onSubmit() {
    this.updateSubjectErrorMessage();
    this.updateSubjectLevelErrorMessage();
    this.updatePriceErrorMessage();

    if (
      this.subjectValue.invalid ||
      this.subjectLevelValue.invalid ||
      this.priceValue.invalid
    ) {
      this.notificationService.showError('Nieprawidłowe dane przedmiotu');
    } else {
      if (!this.sendRequest) {
        this.sendRequest = true;
        this.lessonData = {
          subject_id: this.subjectValue.value,
          subject_level_id: this.subjectLevelValue.value,
          price: this.priceValue.value,
        };
        this.lessonService
          .setLesson(this.lessonData)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              this.notificationService.showError(error.error.error);
              this.sendRequest = false;
              return throwError(() => new Error('Error fetching data'));
            })
          )
          .subscribe((data: addLessonSucces) => {
            this.notificationService.showError(data.message);
            this.sendRequest = false;
            this.addNewLesson.emit(true);
          });
      }
    }
  }
}
