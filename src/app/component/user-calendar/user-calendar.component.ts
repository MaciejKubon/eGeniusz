import { Component } from '@angular/core';
import { HeaderTitleComponent } from '../title/header-title/header-title.component';
import { ArrowBackComponent } from '../buttons/arrow-back/arrow-back.component';
import { DatePipe } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { DayCalendarComponent } from './day-calendar/day-calendar.component';
import { TermService } from '../../services/http/calendar/term.service';
import {
  dateTerm,
  dayTerm,
  dayTermSucces,
  terms,
} from '../../interfaces/calendarInterfaces';
import { forkJoin, map } from 'rxjs';
import { AuthService } from '../../services/service/auth/auth.service';
import { ClassesService } from '../../services/http/calendar/classes.service';
import { CalendarLegendComponent } from '../bars/calendar-legend/calendar-legend.component';

@Component({
  selector: 'app-user-calendar',
  standalone: true,
  imports: [
    HeaderTitleComponent,
    ArrowBackComponent,
    SpinnerComponent,
    DayCalendarComponent,
    CalendarLegendComponent
  ],
  templateUrl: './user-calendar.component.html',
  styleUrl: './user-calendar.component.scss',
})
export class UserCalendarComponent {
  isLoadingResults: boolean = true;
  role: string = '';
  position = false;
  dataRangeDate = {
    start_date: new Date(),
    end_date: new Date(),
  };
  dataRange: { start_date: string; end_date: string } = {
    start_date: '2024-11-09',
    end_date: '2024-11-15',
  };
  dateList: dayTerm[] = [];
  dateRangeBlocked = false;
  hourStart: number = 10;
  hourEnd: number = 23;
  hours: string[] = [];
  terms: terms[] = [];

  constructor(
    private termService: TermService,
    private classService: ClassesService,
    private authService: AuthService
  ) {
    for (let i = this.hourStart; i <= this.hourEnd; i++) {
      this.hours.push(i + ':00');
    }
    this.dataRangeDate.start_date = new Date();
    this.dataRangeDate.end_date.setDate(
      this.dataRangeDate.start_date.getDate() + 6
    );

    this.setRange();
  }
  ngOnInit() {
    this.role = this.authService.getRole();

    this.setDataList();
  }

  setRange() {
    this.dataRange.start_date = new DatePipe('en-US')
      .transform(this.dataRangeDate.start_date, 'yyyy-MM-dd')
      ?.toString()!;
    this.dataRange.end_date = new DatePipe('en-US')
      .transform(this.dataRangeDate.end_date, 'yyyy-MM-dd')
      ?.toString()!;
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
      const dateTerm: dateTerm = { date: dateStr };
      if (this.role == 'teacher') {
        const request$ = this.termService.getTeacherTerm(dateTerm).pipe(
          map((data: dayTermSucces) => {
            const dayTerm: dayTerm = {
              date: dateStr,
              terms: data.terms,
            };
            return dayTerm;
          })
        );
        requests.push(request$);
      }
      else if(this.role == 'student'){       
        const request$ = this.classService.getStudentClass(dateTerm).pipe(
          map((data: dayTermSucces) => {
            const dayTerm: dayTerm = {
              date: dateStr,
              terms: data.terms,
            };
            return dayTerm;
          })
        );
        requests.push(request$);
      }
    }
    forkJoin(requests).subscribe({
      next: (dayTerms: dayTerm[]) => {
        this.dateList = dayTerms;
      },
      error: (error) => {
        console.error('Błąd pobierania danych:', error);
      },
      complete: () => {
        this.isLoadingResults = false;
      },
    });
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
      //this.refreshData();
    }
  }
  refleshCalendar(ref: boolean) {
    this.refreshData();
  }
  refreshData() {
    this.setDataList();
  }
}
