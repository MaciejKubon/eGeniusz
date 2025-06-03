import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { lesson } from '../../../interfaces/lessonInterfaces';
import { teacherLesson } from '../../../interfaces/teacherDetails';

@Component({
  selector: 'app-teacher-lessons',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './teacher-lessons.component.html',
  styleUrl: './teacher-lessons.component.scss',
})
export class TeacherLessonsComponent {
  @Input() lessonData: teacherLesson[] = [];
  lesson: MatTableDataSource<teacherLesson>;
  displayedColumns: string[] = ['przedmiot', 'poziom', 'cena'];

  constructor() {
    const lessons: teacherLesson[] = [
      {
        id: 0,
        subject: { id: 0, name: 'aa' },
        subjectLevel: { id: 0, name: 'bb' },
        price: 0,
      },
    ];
    this.lesson = new MatTableDataSource(lessons);
  }
  ngOnInit() {
    this.lesson = new MatTableDataSource(this.lessonData);
  }
}
