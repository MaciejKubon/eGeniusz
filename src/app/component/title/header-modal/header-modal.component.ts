import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-modal.component.html',
  styleUrl: './header-modal.component.scss'
})
export class HeaderModalComponent {
  @Input() title:string ='';
}
