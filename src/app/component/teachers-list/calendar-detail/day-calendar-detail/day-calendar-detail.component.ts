import { Component, EventEmitter, Input, Output } from '@angular/core';
import { calendarData } from '../../../../interfaces/teacherDetails';
import { CommonModule } from '@angular/common';
import { DetailTermsComponent } from '../../../modals/detail-terms/detail-terms.component';
import { ReservationTermComponent } from '../../../modals/reservation-term/reservation-term.component';

@Component({
  selector: 'app-day-calendar-detail',
  standalone: true,
  imports: [
    CommonModule,
    DetailTermsComponent,
    ReservationTermComponent,
  ],
  templateUrl: './day-calendar-detail.component.html',
  styleUrl: './day-calendar-detail.component.scss',
})
export class DayCalendarDetailComponent {
  @Input() day: calendarData = {
    date: '',
    studentTerms: [],
    teacherTerms: [],
  };
  @Output() relfleshCalendar = new EventEmitter<boolean>();

  isVisableTermDetail: boolean = false;
  isVisableNoConfirmDetail: boolean = false;
  idTerm: number = 0;
  hourStart: number = 10;
  hourEnd: number = 23;
  hours: {
    hh: string;
    mm: string[];
  }[] = [];

  constructor() {
    for (let i = this.hourStart; i <= this.hourEnd; i++) {
      let minutes: string[] = ['00', '15', '30', '45'];
      this.hours.push({ hh: i.toString(), mm: minutes });
    }
  }

  ngOnInit() {
    this.calculatePosition();
  }

  calculatePosition() {
    if (this.day.studentTerms != null) {
      this.day.studentTerms.forEach((e) => {
        let dat = new Date(e.start_date.split(' ')[0] + ' 10:00:00');
        let sDate = new Date(e.start_date);
        let eDate = new Date(e.end_date);
        let diff = Math.ceil(
          Math.abs(sDate.getTime() - dat.getTime()) / (1000 * 60) / 60 + 2
        );
        e.diffTime =
          Math.ceil(Math.abs(eDate.getTime() - sDate.getTime()) / (1000 * 60)) -
          2;
        e.posTop =
          diff +
          Math.ceil(Math.abs(sDate.getTime() - dat.getTime()) / (1000 * 60));
      });
    }
    if (this.day.teacherTerms != null) {
      this.day.teacherTerms.forEach((e) => {
        let dat = new Date(e.start_date.split(' ')[0] + ' 10:00:00');
        let sDate = new Date(e.start_date);
        let eDate = new Date(e.end_date);
        let diff = Math.ceil(
          Math.abs(sDate.getTime() - dat.getTime()) / (1000 * 60) / 60 + 2
        );
        e.diffTime =
          Math.ceil(Math.abs(eDate.getTime() - sDate.getTime()) / (1000 * 60)) -
          2;
        e.posTop =
          diff +
          Math.ceil(Math.abs(sDate.getTime() - dat.getTime()) / (1000 * 60));
      });
    }
  }
  detailTerm(id: number) {
    this.idTerm = id;
    this.isVisableTermDetail = true;
  }
  noConfirmClass(id: number) {
    this.idTerm = id;
    this.isVisableNoConfirmDetail = true;
  }
  ConfirmClass(id: number) {
    this.idTerm = id;
    this.isVisableNoConfirmDetail = true;
  }
  closeModal(relflesh: boolean) {
    if (relflesh) this.relfleshCalendar.emit(true);
    this.isVisableTermDetail = false;
    this.isVisableNoConfirmDetail = false;
  }
}
