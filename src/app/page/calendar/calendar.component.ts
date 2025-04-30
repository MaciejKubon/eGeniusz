import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { UserCalendarComponent } from '../../component/user-calendar/user-calendar.component';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/http/auth/authorization.service';
import { NotificationService } from '../../services/service/notification/notification.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { authSucces } from '../../interfaces/authInterfaces';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [HeaderComponent, UserCalendarComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
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
