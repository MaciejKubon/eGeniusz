import { Component, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  addLesson,
  addLessonSucces,
  lesson,
  lessonSucces,
} from '../../../interfaces/lessonInterfaces';
import { LessonService } from '../../../services/http/lessons/lesson.service';
import { MatSortModule } from '@angular/material/sort';
import { EditButtonComponent } from '../../buttons/edit-button/edit-button.component';
import { DeleteButtonComponent } from '../../buttons/delete-button/delete-button.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { HeaderTitleComponent } from '../../title/header-title/header-title.component';
import { AddWithTextButtonComponent } from '../../buttons/add-with-text-button/add-with-text-button.component';
import { CloseWithTextButtonComponent } from '../../buttons/close-with-text-button/close-with-text-button.component';
import { AddLessonFormComponent } from '../../forms/add-lesson-form/add-lesson-form.component';
import { NotificationService } from '../../../services/service/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { subject, subjectSucces } from '../../../interfaces/subjectIntefeces';
import {
  subjectLevel,
  subjectLevelSucces,
} from '../../../interfaces/subjectLevelInterfaces';
import { MatInput } from '@angular/material/input';
import { SubjectLevelService } from '../../../services/http/lessons/subject-level.service';
import { SubjectService } from '../../../services/http/lessons/subject.service';
import { SaveButtonComponent } from '../../buttons/save-button/save-button.component';
import { CloseButtonComponent } from '../../buttons/close-button/close-button.component';

@Component({
  selector: 'app-lesson-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    EditButtonComponent,
    DeleteButtonComponent,
    SpinnerComponent,
    HeaderTitleComponent,
    AddWithTextButtonComponent,
    CloseWithTextButtonComponent,
    AddLessonFormComponent,
    FormsModule,
    MatOption,
    MatSelect,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInput,
    SaveButtonComponent,
    CloseButtonComponent,
  ],
  templateUrl: './lesson-table.component.html',
  styleUrl: './lesson-table.component.scss',
})
export class LessonTableComponent {
  isLoadingResults: boolean = true;
  isOpenAddForm: boolean = false;
  lesson: addLesson = {
    subject_id: null,
    subject_level_id: null,
    price: null,
  };
  lessonData: MatTableDataSource<lesson>;
  displayedColumns: string[] = ['przedmiot', 'poziom', 'cena', 'action'];
  lessonEdit = new FormGroup({});
  subject: subject[] = [];
  subjectValue = new FormControl(-1, [Validators.required, Validators.min(0)]);
  errorSubjectValueMessage = signal('');
  subjectLevel: subjectLevel[] = [];
  subjectLevelValue = new FormControl(-1, [
    Validators.required,
    Validators.min(0),
  ]);
  errorSubjectLevelValueMessage = signal('');
  priceValue = new FormControl(-1, [Validators.required, Validators.min(0)]);
  errorPriceValueMessage = signal('');
  activeForm: number = 0;
  constructor(
    private httpLesson: LessonService,
    private notificationService: NotificationService,
    private subjectList: SubjectService,
    private subjectLevelList: SubjectLevelService
  ) {
    const lesson: lesson = {
      id: 0,
      subject: { id: 0, name: '' },
      subject_level: { id: 0, name: '' },
      teacher: { id: 0, firstName: null, lastName: null },
      price: 0,
    };
    this.lessonData = new MatTableDataSource([lesson]);
  }
  ngOnInit() {
    this.httpLesson
      .getLessonList()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.error);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: lessonSucces) => {
        this.lessonData = new MatTableDataSource(data.lessons);
        this.isLoadingResults = false;
      });
  }
  addNewLesson(send: boolean) {
    this.refleshDataTable();
    this.closeForm();
  }
  edit(id: number, subjectId: number, subjectLevelId: number, price: number) {
    this.activeForm = 0;
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
        this.subject.forEach((e) => {
          if (e.id == subjectId)
            this.subjectValue = new FormControl(e.id, [Validators.required]);
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
            this.subjectLevel.forEach((e) => {
              if (e.id == subjectLevelId)
                this.subjectLevelValue = new FormControl(e.id, [
                  Validators.required,
                ]);
            });
            this.activeForm = id;
          });
        this.priceValue = new FormControl(price, [
          Validators.required,
          Validators.min(0),
        ]);
      });
  }

  delete(id: number) {
    this.httpLesson
      .deleteLesson(id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.message);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: lessonSucces) => {
        this.notificationService.showError(data.message);
        this.refleshDataTable();
      });
  }
  addForm() {
    this.isOpenAddForm = true;
  }
  closeForm() {
    this.isOpenAddForm = false;
  }
  close() {
    this.activeForm = 0;
    this.subjectValue = new FormControl(-1, [Validators.required]);
    this.subjectLevelValue = new FormControl(-1, [Validators.required]);
    this.priceValue = new FormControl(-1, [
      Validators.required,
      Validators.min(0),
    ]);
  }
  refleshDataTable() {
    this.isLoadingResults = true;
    this.httpLesson.getLessonList().subscribe((data: lessonSucces) => {
      this.lessonData = new MatTableDataSource(data.lessons);
      this.isLoadingResults = false;
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
  onSubmit(id: number) {
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
      this.lesson = {
        subject_id: this.subjectValue.value,
        subject_level_id: this.subjectLevelValue.value,
        price: this.priceValue.value,
      };
      this.httpLesson
        .updateLesson(id, this.lesson)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showError(error.error.error);
            return throwError(() => new Error('Error fetching data'));
          })
        )
        .subscribe((data: addLessonSucces) => {
          this.notificationService.showError(data.message);
          this.activeForm = 0;
          this.refleshDataTable();
        });
    }
  }
}
