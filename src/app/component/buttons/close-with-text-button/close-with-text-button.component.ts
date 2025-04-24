import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-close-with-text-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule,CommonModule],
  templateUrl: './close-with-text-button.component.html',
  styleUrl: './close-with-text-button.component.scss'
})
export class CloseWithTextButtonComponent {
  @Output() clicked = new EventEmitter<boolean>();

  clickAction() {
    this.clicked.emit(true);
  }
}
