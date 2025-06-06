import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-text',
  standalone: true,
  imports: [],
  templateUrl: './information-text.component.html',
  styleUrl: './information-text.component.scss'
})
export class InformationTextComponent {
  @Input() title:string|null ='';
}
