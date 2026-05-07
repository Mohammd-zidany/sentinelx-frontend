import { Component } from '@angular/core';

@Component({
  selector: 'app-zones',
  standalone: true,
  imports: [],
  templateUrl: './zones.html',
  styleUrl: './zones.css',
})
export class Zones {

  zones = [

    {
      name: 'Main Entrance',
      sensitivity: 85,
      active: true,
      color: 'red',
    },

    {
      name: 'Parking Area',
      sensitivity: 70,
      active: true,
      color: 'orange',
    },

    {
      name: 'Warehouse',
      sensitivity: 90,
      active: false,
      color: 'emerald',
    },

    {
      name: 'Server Room',
      sensitivity: 95,
      active: true,
      color: 'cyan',
    },

  ];

}