import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { LessonTableComponent } from '../../component/tables/lesson-table/lesson-table.component';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [HeaderComponent, LessonTableComponent],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent {

}
