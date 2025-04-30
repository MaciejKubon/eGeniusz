import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-legend',
  standalone: true,
  imports: [],
  templateUrl: './calendar-legend.component.html',
  styleUrl: './calendar-legend.component.scss'
})
export class CalendarLegendComponent {
 @Input() typeLegend:string=''
}
 