import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-with-text-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule,CommonModule],
  templateUrl: './add-with-text-button.component.html',
  styleUrl: './add-with-text-button.component.scss',
})
export class AddWithTextButtonComponent {
  @Output() clicked = new EventEmitter<boolean>();

  clickAction() {
    this.clicked.emit(true);
  }
}
