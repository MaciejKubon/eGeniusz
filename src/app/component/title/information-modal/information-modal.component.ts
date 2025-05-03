import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-modal',
  standalone: true,
  imports: [],
  templateUrl: './information-modal.component.html',
  styleUrl: './information-modal.component.scss'
})
export class InformationModalComponent {
  @Input() title:string|null ='';

}
