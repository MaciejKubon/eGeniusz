import { Component, EventEmitter, Input, Output } from '@angular/core';
import { selectTimeTerm } from '../../../interfaces/calendarInterfaces';
import { NewTermComponent } from '../../modals/new-term/new-term.component';

@Component({
  selector: 'app-day-calendar',
  standalone: true,
  imports: [NewTermComponent],
  templateUrl: './day-calendar.component.html',
  styleUrl: './day-calendar.component.scss',
})
export class DayCalendarComponent {
  @Input() day: string = '';
  @Output() relfleshCalendar = new EventEmitter<boolean>();
  isVisableTermForm: boolean = false;
  selectNewTerm: selectTimeTerm = { dataTerm: '', timeTerm: '' };
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
    this.selectNewTerm.dataTerm = this.day;
  }
  selectTerm(times: string) {
    this.selectNewTerm.timeTerm = times;
    this.isVisableTermForm = true;
  }

  closeModal(relflesh: boolean) {
    if (relflesh) this.relfleshCalendar.emit(true);
    this.isVisableTermForm = false;
  }
}
