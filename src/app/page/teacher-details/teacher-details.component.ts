import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherDetailComponent } from '../../component/teachers-list/teacher-detail/teacher-detail.component';
import { HeaderComponent } from '../../component/header/header.component';

@Component({
  selector: 'app-teacher-details',
  standalone: true,
  imports: [HeaderComponent, TeacherDetailComponent],
  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.scss',
})
export class TeacherDetailsComponent {
  teacherId: string | null = null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.teacherId = this.route.snapshot.paramMap.get('id');
  }
}
