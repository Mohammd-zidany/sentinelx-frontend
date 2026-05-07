import { Component } from '@angular/core';

@Component({
  selector: 'app-cameras',
  standalone: true,
  imports: [],
  templateUrl: './cameras.html',
  styleUrl: './cameras.css',
})
export class Cameras {

  cameras = [
    {
      name: 'Main Entrance',
      status: 'LIVE',
    },

    {
      name: 'Parking Area',
      status: 'LIVE',
    },

    {
      name: 'Back Door',
      status: 'LIVE',
    },

    {
      name: 'Warehouse',
      status: 'LIVE',
    },

    {
      name: 'Server Room',
      status: 'REC',
    },

    {
      name: 'Roof Camera',
      status: 'LIVE',
    },
  ];

}