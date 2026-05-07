import { Component } from '@angular/core';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {

  alerts = [

    {
      title: 'Intrusion Detected',
      camera: 'Main Entrance',
      level: 'HIGH',
      time: '10:24 PM',
    },

    {
      title: 'Restricted Time Access',
      camera: 'Parking Camera',
      level: 'MEDIUM',
      time: '09:12 PM',
    },

    {
      title: 'Motion Detected',
      camera: 'Warehouse Camera',
      level: 'HIGH',
      time: '08:41 PM',
    },

    {
      title: 'Unknown Person',
      camera: 'Back Door',
      level: 'LOW',
      time: '07:30 PM',
    },

  ];

}