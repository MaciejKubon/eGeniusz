import { Component, Input } from '@angular/core';
import { linkButton } from '../../../interfaces/buttonInterfaces';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [MatButtonModule, RouterModule, CommonModule],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
})
export class NavButtonComponent {
  @Input() navigation: linkButton = { path: '', text: '' };
  constructor(private route: ActivatedRoute, private router: Router) {}
}
