import { Component } from '@angular/core';
import { AuthService } from '../../../services/service/auth/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss',
})
export class LogoutButtonComponent {
  constructor(private auth: AuthService, private router: Router) {}
  logout() {
    this.auth.removeToken();
    this.router.navigate(['/login']);
  }
}
