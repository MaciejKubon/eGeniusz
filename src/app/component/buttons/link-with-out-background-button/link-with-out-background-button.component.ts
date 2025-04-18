import { Component, Input } from '@angular/core';
import { linkButton } from '../../../interfaces/buttonInterfaces';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-link-with-out-background-button',
  standalone: true,
  imports: [MatButtonModule, CommonModule, RouterModule],
  templateUrl: './link-with-out-background-button.component.html',
  styleUrl: './link-with-out-background-button.component.scss'
})
export class LinkWithOutBackgroundButtonComponent {
  @Input() navigation: linkButton = { path: '', text: ''};
  constructor(private route: ActivatedRoute) {}

}
