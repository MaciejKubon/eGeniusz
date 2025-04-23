import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { lesson, lessonSucces } from '../../../interfaces/lessonInterfaces';
import { LessonService } from '../../../services/http/lessons/lesson.service';
import { MatSortModule } from '@angular/material/sort';
import { EditButtonComponent } from '../../buttons/edit-button/edit-button.component';
import { DeleteButtonComponent } from '../../buttons/delete-button/delete-button.component';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-lesson-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    EditButtonComponent,
    DeleteButtonComponent,
    SpinnerComponent,
  ],
  templateUrl: './lesson-table.component.html',
  styleUrl: './lesson-table.component.scss',
})
export class LessonTableComponent {
  isLoadingResults: boolean = true;
  lessonData: MatTableDataSource<lesson>;
  displayedColumns: string[] = ['przedmiot', 'poziom', 'cena', 'action'];
  constructor(private httpLesson: LessonService) {
    const lesson: lesson = {
      id: 0,
      subject: { id: 0, name: '' },
      subject_level: { id: 0, name: '' },
      teacher: { id: 0, firstName: null, lastName: null },
      price: 0,
    };
    this.lessonData = new MatTableDataSource([lesson]);
  }
  ngOnInit() {
    this.httpLesson.getLessonList().subscribe((data: lessonSucces) => {
      this.lessonData = new MatTableDataSource(data.lessons);
      this.isLoadingResults=false;
    });
  }

  edit(id: number) {
    console.log(id);
  }

  delete(id: number) {
    console.log(id);
  }
}
