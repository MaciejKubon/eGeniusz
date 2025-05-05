import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { subject, subjectSucces } from '../../../interfaces/subjectIntefeces';
import { MatOption, MatSelect } from '@angular/material/select';
import { subjectLevel, subjectLevelSucces } from '../../../interfaces/subjectLevelInterfaces';
import { MatSliderModule } from '@angular/material/slider';
import { SaveWithTextButtonComponent } from '../../buttons/save-with-text-button/save-with-text-button.component';
import { teacherFilter } from '../../../interfaces/teacherListInterfaces';
import { SubjectService } from '../../../services/http/lessons/subject.service';
import { SubjectLevelService } from '../../../services/http/lessons/subject-level.service';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../../services/service/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-teachers-filtr',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    MatFormFieldModule,
    MatInput,
    MatSliderModule,
    SaveWithTextButtonComponent,
  ],
  templateUrl: './teachers-filtr.component.html',
  styleUrl: './teachers-filtr.component.scss',
})
export class TeachersFiltrComponent {
  @Output() filter = new EventEmitter<teacherFilter>;
  filterFrom = new FormGroup({});
  subjectValue = new FormControl([]);
  subjectLevelValue = new FormControl([]);
  minPrice = new FormControl(0);
  maxPrice = new FormControl(1000);
  subject: subject[] = [];
  subjectLevel: subjectLevel[] = [];
  constructor(
    private subjectList: SubjectService,
    private subjectLevelList: SubjectLevelService,
    private notificationService: NotificationService
  ) {}

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

  saveFilter() {
    this.filter.emit({
      subjects_id: this.subjectValue.value,
      levels_id: this.subjectLevelValue.value,
      minPrice: this.minPrice.value,
      maxPrice: this.maxPrice.value,
    })  
  }
}
