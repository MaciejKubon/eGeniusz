import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { TeachersListComponent } from '../../component/teachers-list/teachers-list.component';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [HeaderComponent, TeachersListComponent],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.scss'
})
export class TeacherListComponent {

}
