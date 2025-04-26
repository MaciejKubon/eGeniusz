import { Component } from '@angular/core';
import { HeaderTitleComponent } from '../title/header-title/header-title.component';
import { ArrowBackComponent } from '../buttons/arrow-back/arrow-back.component';
import { DatePipe } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { DayCalendarComponent } from './day-calendar/day-calendar.component';


@Component({
  selector: 'app-user-calendar',
  standalone: true,
  imports: [
    HeaderTitleComponent,
    ArrowBackComponent,
    SpinnerComponent,
    DayCalendarComponent,
  ],
  templateUrl: './user-calendar.component.html',
  styleUrl: './user-calendar.component.scss',
})
export class UserCalendarComponent {
  isLoadingResults: boolean = true;
  position = false;
  dataRangeDate = {
    start_date: new Date(),
    end_date: new Date(),
  };
  dataRange: { start_date: string; end_date: string } = {
    start_date: '2024-11-09',
    end_date: '2024-11-15',
  };
  dateList: string[] = [];
  dateRangeBlocked = false;
  hourStart: number = 10;
  hourEnd: number = 23;
  hours: string[] = [];

  constructor() {
    for (let i = this.hourStart; i <= this.hourEnd; i++) {
      this.hours.push(i + ':00');
    }
    this.dataRangeDate.start_date = new Date();
    this.dataRangeDate.end_date.setDate(
      this.dataRangeDate.start_date.getDate() + 6
    );
    this.setDataList();
    this.setRange();
    this.isLoadingResults = false;
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
    this.dateList = [];
    for (
      let data = this.dataRangeDate.start_date;
      data <= this.dataRangeDate.end_date;
      data.setDate(data.getDate() + 1)
    ) {
      this.dateList.push(
        new DatePipe('en-US').transform(data, 'yyyy-MM-dd')?.toString()!
      );
    }
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
      this.setRange();
      this.refreshData();
    }
  }
  refleshCalendar(ref:boolean){
    this.refreshData();
  }
  refreshData() {
    this.isLoadingResults = true;
    this.isLoadingResults = false;
    this.dateRangeBlocked = false;
  }
}
