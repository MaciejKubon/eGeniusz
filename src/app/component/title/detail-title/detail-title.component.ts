import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-title.component.html',
  styleUrl: './detail-title.component.scss'
})
export class DetailTitleComponent {
  @Input() title:string ='';
}
