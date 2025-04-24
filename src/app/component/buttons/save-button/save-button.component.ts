import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './save-button.component.html',
  styleUrl: './save-button.component.scss'
})
export class SaveButtonComponent {
  @Output() clicked = new EventEmitter<boolean>();

  clickAction() {
    this.clicked.emit(true);
  }
}
