import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-homepage',
  imports: [MatCardModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  totalorders: number = 50;
  totalproducts: number = 250;
  totalbrands: number = 10;
}


