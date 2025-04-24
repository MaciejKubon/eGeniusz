import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { LessonTableComponent } from '../../component/tables/lesson-table/lesson-table.component';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/http/auth/authorization.service';
import { NotificationService } from '../../services/service/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { authSucces } from '../../interfaces/authInterfaces';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [HeaderComponent, LessonTableComponent],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss',
})
export class LessonComponent {
  constructor(
    private auth: AuthorizationService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.auth
      .authorization()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError('Brak uprawnień');
          this.router.navigate(['/login']);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe((data: authSucces) => {});
  }
}
