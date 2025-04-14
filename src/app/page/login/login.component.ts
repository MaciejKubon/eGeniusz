import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';
import { LoginFormComponent } from '../../component/forms/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private notificationService: NotificationService
  ) {}

  turnon(){
    this.notificationService.showSuccess('Dane zapisane pomyślnie!');
  }

}
