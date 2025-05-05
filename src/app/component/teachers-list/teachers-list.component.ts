import { Component } from '@angular/core';
import { HeaderTitleComponent } from '../title/header-title/header-title.component';
import { AddWithTextButtonComponent } from '../buttons/add-with-text-button/add-with-text-button.component';
import { CloseWithTextButtonComponent } from '../buttons/close-with-text-button/close-with-text-button.component';
import { FiltrWithTextButtonComponent } from '../buttons/filtr-with-text-button/filtr-with-text-button.component';
import { TeachersFiltrComponent } from '../forms/teachers-filtr/teachers-filtr.component';
import {
  teacherFilter,
  teacherList,
  teacherListSucces,
} from '../../interfaces/teacherListInterfaces';
import { TeacherListService } from '../../services/http/techerList/teacher-list.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../services/service/notification/notification.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-teachers-list',
  standalone: true,
  imports: [
    HeaderTitleComponent,
    FiltrWithTextButtonComponent,
    CloseWithTextButtonComponent,
    TeachersFiltrComponent,
    SpinnerComponent
  ],
  templateUrl: './teachers-list.component.html',
  styleUrl: './teachers-list.component.scss',
})
export class TeachersListComponent {
  isLoadingResults: boolean = true;
  isOpenAddForm: boolean = true;
  teacherFilter: teacherFilter = {
    subjects_id: [],
    levels_id: [],
    minPrice: null,
    maxPrice: null,
  };
  link: string = 'http://localhost:8000';
  teacherList: teacherList[] = [];
  constructor(
    private teacherListService: TeacherListService,
    private notificationService: NotificationService
  ) {}
  ngOnInit() {
    this.loadTeacherList();
  }

  openFiltr() {
    this.isOpenAddForm = true;
  }
  closeFiltr() {
    this.isOpenAddForm = false;
  }
  filter(filter: teacherFilter) {
    this.teacherFilter = filter;
    this.loadTeacherList();
  }
  routeTo(id: number) {
    console.log(id);
  }
  loadTeacherList() {
    this.isLoadingResults= true;
    this.teacherListService
      .getTeacherList(this.teacherFilter)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.error);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: teacherListSucces) => {
        this.isLoadingResults=false;
        this.teacherList = data.teachers;
      });
  }
}
