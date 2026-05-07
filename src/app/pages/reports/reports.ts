import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {

  totalAlerts = 128;
  restrictedZones = 67;
  accuracy = 95.4;
  activeCameras = 12;

  chartData = [40, 25, 60, 35, 80, 55, 70];

}