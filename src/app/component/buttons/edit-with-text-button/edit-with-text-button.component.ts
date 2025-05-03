import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-with-text-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule,CommonModule],
  templateUrl: './edit-with-text-button.component.html',
  styleUrl: './edit-with-text-button.component.scss'
})
export class EditWithTextButtonComponent {
  @Output() clicked = new EventEmitter<boolean>();

  clickAction() {
    this.clicked.emit(true);
  }
}
