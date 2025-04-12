import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
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
