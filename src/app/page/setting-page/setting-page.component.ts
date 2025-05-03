import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { UserSettingComponent } from '../../component/user-setting/user-setting.component';

@Component({
  selector: 'app-setting-page',
  standalone: true,
  imports: [HeaderComponent, UserSettingComponent],
  templateUrl: './setting-page.component.html',
  styleUrl: './setting-page.component.scss'
})
export class SettingPageComponent {

}
