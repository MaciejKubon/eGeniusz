import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { UserCalendarComponent } from '../../component/user-calendar/user-calendar.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [HeaderComponent, UserCalendarComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

}
