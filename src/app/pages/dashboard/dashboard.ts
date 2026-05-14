import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Observable, map, tap } from 'rxjs';

import { CameraService } from '../../services/camera.service';

import { Camera } from '../../models/camera.model';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css',
})
export class Dashboard {

  private cameraService = inject(CameraService);

  // Statistics
  alerts = 7;

  accuracy = 95.4;

  detectedPeople = 23;

  // Weekly alerts
  weeklyAlerts = [
    { day: '15', value: 16 },
    { day: '16', value: 10 },
    { day: '17', value: 11 },
    { day: '18', value: 7 },
    { day: '19', value: 14 },
    { day: '20', value: 7 },
    { day: '21', value: 16 },
  ];

  // Cameras Observable
  cameras$: Observable<Camera[]> =
    this.cameraService.getCameras();

  // Cameras Count
  camerasCount$: Observable<number> =
    this.cameras$.pipe(
      map(cameras => cameras.length)
    );

  // Selected Camera
  selectedCamera?: Camera;

  constructor() {

    this.cameras$
      .pipe(
        tap((cameras) => {

          if (cameras.length > 0 && !this.selectedCamera) {

            this.selectedCamera = cameras[0];
          }
        })
      )
      .subscribe();
  }

  changeCamera(camera: Camera): void {

    this.selectedCamera = camera;
  }
}