import { Component } from '@angular/core';
import { NavButtonComponent } from '../buttons/nav-button/nav-button.component';
import { linkButton } from '../../interfaces/buttonInterfaces';
import { LogoutButtonComponent } from '../buttons/logout-button/logout-button.component';
import { MenuButtonComponent } from '../buttons/menu-button/menu-button.component';
import { CloseButtonComponent } from '../buttons/close-button/close-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavButtonComponent,
    LogoutButtonComponent,
    MenuButtonComponent,
    CloseButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  navigation: linkButton = { path: 'aaa', text: 'aaa' };
  showMenu(action: boolean) {
    console.log(action);
  }
  hideMenu(action: boolean) {
    console.log(action);
  }
}
