import { Component } from '@angular/core';
import { HeaderTitleComponent } from '../../title/header-title/header-title.component';
import { HeaderModalComponent } from '../../title/header-modal/header-modal.component';
import { InformationModalComponent } from '../../title/information-modal/information-modal.component';
import { DetailTitleComponent } from '../../title/detail-title/detail-title.component';
import { TeacherLessonsComponent } from '../../tables/teacher-lessons/teacher-lessons.component';
import { TeacherDetailsService } from '../../../services/http/teacherDetail/teacher-details.service';
import { ActivatedRoute } from '@angular/router';
import {
  teacherDetails,
  teacherDetailsSucces,
} from '../../../interfaces/teacherDetails';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../../services/service/notification/notification.service';
import { CalendarDetailComponent } from '../calendar-detail/calendar-detail.component';

@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [
    HeaderTitleComponent,
    HeaderModalComponent,
    InformationModalComponent,
    DetailTitleComponent,
    TeacherLessonsComponent,
    SpinnerComponent,
    CalendarDetailComponent,
  ],
  templateUrl: './teacher-detail.component.html',
  styleUrl: './teacher-detail.component.scss',
})
export class TeacherDetailComponent {
  isLoadingResults = true;
  teacherId: string | null = null;
  teacher: teacherDetails = {
    id: 0,
    firstName: '',
    lastName: '',
    avatar: '',
    description: '',
    lessons: [],
  };
  constructor(
    private route: ActivatedRoute,
    private teacherDetailService: TeacherDetailsService,
    private notificationService: NotificationService
  ) {
    this.teacherId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.teacherDetailService
      .getTeacherDetails(this.teacherId)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.message);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: teacherDetailsSucces) => {
        this.teacher = data.teacher;
        this.isLoadingResults = false;
      });
  }
}
