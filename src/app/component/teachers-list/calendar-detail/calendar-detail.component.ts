import { Component, Input } from '@angular/core';
import { TeacherDetailsService } from '../../../services/http/teacherDetail/teacher-details.service';
import { NotificationService } from '../../../services/service/notification/notification.service';
import {
  calendarData,
  calnedar,
  claendarDataSucces,
} from '../../../interfaces/teacherDetails';
import { DatePipe } from '@angular/common';
import { ArrowBackComponent } from '../../buttons/arrow-back/arrow-back.component';
import { CalendarLegendComponent } from '../../bars/calendar-legend/calendar-legend.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { forkJoin, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DayCalendarDetailComponent } from './day-calendar-detail/day-calendar-detail.component';

@Component({
  selector: 'app-calendar-detail',
  standalone: true,
  imports: [
    ArrowBackComponent,
    CalendarLegendComponent,
    SpinnerComponent,
    DayCalendarDetailComponent,
  ],
  templateUrl: './calendar-detail.component.html',
  styleUrl: './calendar-detail.component.scss',
})
export class CalendarDetailComponent {
  teacherId: string | null = null;
  isLoadingResults: boolean = true;

  calendarData: calnedar = {
    date: '2025-05-01',
    teacherId: this.teacherId,
  };
  dataRangeDate = {
    start_date: new Date(),
    end_date: new Date(),
  };
  dataRange: { start_date: string; end_date: string } = {
    start_date: '2024-11-09',
    end_date: '2024-11-15',
  };
  dateList: calendarData[] = [];
  hourStart: number = 10;
  hourEnd: number = 23;
  hours: string[] = [];
  dateRangeBlocked = false;
  position = false;

  constructor(
    private route: ActivatedRoute,
    private teacherDetailService: TeacherDetailsService,
    private notificationService: NotificationService
  ) {
    this.teacherId = this.route.snapshot.paramMap.get('id');

    for (let i = this.hourStart; i <= this.hourEnd; i++) {
      this.hours.push(i + ':00');
    }
    this.dataRangeDate.start_date = new Date();
    this.dataRangeDate.end_date.setDate(
      this.dataRangeDate.start_date.getDate() + 6
    );

    this.setRange();
    this.setDataList();
  }
  ngOnInit() {}

  setRange() {
    this.dataRange.start_date = new DatePipe('en-US')
      .transform(this.dataRangeDate.start_date, 'yyyy-MM-dd')
      ?.toString()!;
    this.dataRange.end_date = new DatePipe('en-US')
      .transform(this.dataRangeDate.end_date, 'yyyy-MM-dd')
      ?.toString()!;
  }
  changeRange(days: number) {
    if (!this.dateRangeBlocked) {
      this.dateRangeBlocked = true;
      this.dataRangeDate.start_date.setDate(
        this.dataRangeDate.start_date.getDate() + days
      );
      this.dataRangeDate.end_date.setDate(
        this.dataRangeDate.end_date.getDate() + days
      );
      this.dateRangeBlocked = false;

      this.setRange();
      this.setDataList();
    }
  }
  setDataList() {
    const requests = [];
    this.isLoadingResults = true;
    for (
      let data = new Date(this.dataRangeDate.start_date);
      data <= this.dataRangeDate.end_date;
      data.setDate(data.getDate() + 1)
    ) {
      const dateStr = new DatePipe('en-US').transform(data, 'yyyy-MM-dd')!;
      const dateTerm: calnedar = { date: dateStr, teacherId: this.teacherId };
      const request$ = this.teacherDetailService.getCalendar(dateTerm).pipe(
        map((data: claendarDataSucces) => {
          const dayTerm: calendarData = {
            date: dateStr,
            studentTerms: data.studentTerms,
            teacherTerms: data.teacherTerms,
          };
          return dayTerm;
        })
      );
      requests.push(request$);
    }
    forkJoin(requests).subscribe({
      next: (dayTerms: calendarData[]) => {
        this.dateList = dayTerms;
      },
      error: (error) => {
        this.notificationService.showError('Błąd pobierania danych');
      },
      complete: () => {
        this.isLoadingResults = false;
      },
    });
  }
  relfleshCalendar(reflesh:boolean){
    if(reflesh) this.setDataList();
  }
}
