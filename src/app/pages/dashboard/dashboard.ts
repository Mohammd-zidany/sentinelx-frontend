import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  cameras = 12;
  alerts = 7;
  accuracy = 95.4;
  detectedPeople = 23;
}