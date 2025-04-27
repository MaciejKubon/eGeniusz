import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  dayTerm,
  selectTimeTerm,
} from '../../../interfaces/calendarInterfaces';
import { NewTermComponent } from '../../modals/new-term/new-term.component';
import { TermService } from '../../../services/http/calendar/term.service';
import { AuthService } from '../../../services/service/auth/auth.service';
import { DetailTermsComponent } from '../../modals/detail-terms/detail-terms.component';

@Component({
  selector: 'app-day-calendar',
  standalone: true,
  imports: [NewTermComponent, DetailTermsComponent],
  templateUrl: './day-calendar.component.html',
  styleUrl: './day-calendar.component.scss',
})
export class DayCalendarComponent {
  @Input() day: dayTerm = {
    date: '',
    terms: [],
  };
  @Output() relfleshCalendar = new EventEmitter<boolean>();
  isVisableTermForm: boolean = false;
  isVisableTermDetail: boolean = false;
  idTerm:number = 0;
  selectNewTerm: selectTimeTerm = { dataTerm: '', timeTerm: '' };
  hourStart: number = 10;
  hourEnd: number = 23;
  role: string = '';
  hours: {
    hh: string;
    mm: string[];
  }[] = [];

  constructor(private termService: TermService, private auth: AuthService) {
    this.role = auth.getCurrentRole();
    for (let i = this.hourStart; i <= this.hourEnd; i++) {
      let minutes: string[] = ['00', '15', '30', '45'];
      this.hours.push({ hh: i.toString(), mm: minutes });
    }
  }
  ngOnInit() {
    this.calculatePosition();
    this.selectNewTerm.dataTerm = this.day.date;
  }
  selectTerm(times: string) {
    this.selectNewTerm.timeTerm = times;
    this.isVisableTermForm = true;
  }
  detailTerm(id:number){
    this.idTerm = id;
    this.isVisableTermDetail = true;
  }
  closeModal(relflesh: boolean) {
    if (relflesh) this.relfleshCalendar.emit(true);
    this.isVisableTermForm = false;
    this.isVisableTermDetail = false;
  }
  calculatePosition() {
    if (this.day.terms != null) {
      this.day.terms.forEach((e) => {
        let sDate = new Date(e.start_date);
        let eDate = new Date(e.end_date);
        e.diffTime =
          Math.ceil(Math.abs(eDate.getTime() - sDate.getTime()) / (1000 * 60)) -
          2;
        e.posTop =
          3 +
          Math.ceil(Math.abs(sDate.getTime() - eDate.getTime()) / (1000 * 60));
      });
    }
  }
}
