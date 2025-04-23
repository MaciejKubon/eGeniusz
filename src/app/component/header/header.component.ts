import { Component } from '@angular/core';
import { NavButtonComponent } from '../buttons/nav-button/nav-button.component';
import { linkButton } from '../../interfaces/buttonInterfaces';
import { LogoutButtonComponent } from '../buttons/logout-button/logout-button.component';
import { MenuButtonComponent } from '../buttons/menu-button/menu-button.component';
import { CloseButtonComponent } from '../buttons/close-button/close-button.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/service/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NavButtonComponent,
    LogoutButtonComponent,
    MenuButtonComponent,
    CloseButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  activeMenu: boolean = false;
  role: string = '';
  nav: linkButton[] = [];
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.role = this.auth.getCurrentRole();
    if (this.role === 'student') {
      this.nav = [
        { path: 'home', text: 'home' },
        { path: 'student/calendar', text: 'kalendarz' },
        { path: 'student/teacher', text: 'nauczyciele' },
        { path: 'student/details', text: 'ustawienia' },
      ];
    } else {
      this.nav = [
        { path: 'home', text: 'home' },
        { path: 'lesson', text: 'przedmioty' },
        { path: 'student/details', text: 'ustawienia' },
      ];
    }
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }
  isUser(): boolean {
    return this.role === 'user';
  }
  showMenu(action: boolean) {
    this.activeMenu = true;
  }
  hideMenu(action: boolean) {
    this.activeMenu = false;
  }
}
