import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { AuthorizationService } from '../../services/http/auth/authorization.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { authSucces } from '../../interfaces/authInterfaces';
import { NotificationService } from '../../services/service/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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
