import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { lesson, lessonSucces } from '../../../interfaces/lessonInterfaces';
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
  ],
  templateUrl: './lesson-table.component.html',
  styleUrl: './lesson-table.component.scss',
})
export class LessonTableComponent {
  isLoadingResults: boolean = true;
  isOpenAddForm: boolean = false;
  lessonData: MatTableDataSource<lesson>;
  displayedColumns: string[] = ['przedmiot', 'poziom', 'cena', 'action'];
  constructor(
    private httpLesson: LessonService,
    private notificationService: NotificationService
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
    this.httpLesson.getLessonList().subscribe((data: lessonSucces) => {
      this.lessonData = new MatTableDataSource(data.lessons);
      this.isLoadingResults = false;
    });
  }
  addNewLesson(send: boolean) {
    this.refleshDataTable();
    this.closeForm();
  }
  edit(id: number) {
    console.log(id);
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

  refleshDataTable() {
    this.isLoadingResults = true;
    this.httpLesson.getLessonList().subscribe((data: lessonSucces) => {
      this.lessonData = new MatTableDataSource(data.lessons);
      this.isLoadingResults = false;
    });
  }
}
