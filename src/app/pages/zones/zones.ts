import { Component, inject, signal, computed, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { CameraService } from '../../services/camera.service';

import { ZoneService } from '../../services/zone.service';

import { Camera } from '../../models/camera.model';

import { Zone } from '../../models/zone.model';

@Component({
  selector: 'app-zones',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './zones.html',

  styleUrl: './zones.css',
})
export class Zones implements OnInit {
  private cameraService = inject(CameraService);

  private zoneService = inject(ZoneService);

  // =====================================================
  // SIGNALS
  // =====================================================

  cameras = signal<Camera[]>([]);

  selectedCamera = signal<Camera | null>(null);

  zones = signal<Zone[]>([]);

  selectedZone = signal<Zone | null>(null);

  drawingMode = signal(false);

  polygonPoints = signal<{ x: number; y: number }[]>([]);

  zoom = signal(100);

  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {
    this.loadCameras();
  }

  // =====================================================
  // LOAD CAMERAS
  // =====================================================

  loadCameras(): void {
    this.cameraService.getCameras().subscribe({
      next: (cameras) => {
        this.cameras.set(cameras);
        this.loadCameraStatuses();
        if (cameras.length > 0) {
          this.selectCamera(cameras[0]);
        }
      },
    });
  }

  // =====================================================
  // SELECT CAMERA
  // =====================================================

  selectCamera(camera: Camera): void {
    this.selectedCamera.set(camera);

    this.loadZones(camera.id);
  }

  // =====================================================
  // LOAD ZONES
  // =====================================================

  loadZones(cameraId: number): void {
    this.zoneService.getZones(cameraId).subscribe({
      next: (zones) => {
        this.zones.set(zones);
      },
    });
  }

  // =====================================================
  // DRAW MODE
  // =====================================================

  startDrawing(): void {
    this.drawingMode.set(true);

    this.polygonPoints.set([]);
  }

  // =====================================================
  // RESET
  // =====================================================

  resetDrawing(): void {
    this.polygonPoints.set([]);
  }

  // =====================================================
  // ZOOM
  // =====================================================

  zoomIn(): void {
    this.zoom.update((v) => v + 10);
  }

  zoomOut(): void {
    this.zoom.update((v) => Math.max(10, v - 10));
  }

  loadCameraStatuses(): void {
    this.cameras().forEach((camera) => {
      this.cameraService.getCameraStatus(camera.id).subscribe({
        next: (status) => {
          this.cameras.update((cameras) =>
            cameras.map((c) =>
              c.id === camera.id
                ? {
                    ...c,
                    running: status.running,
                    has_frame: status.has_frame,
                  }
                : c,
            ),
          );

          // تحديث selectedCamera أيضًا
          if (this.selectedCamera()?.id === camera.id) {
            this.selectedCamera.set({
              ...camera,
              running: status.running,
              has_frame: status.has_frame,
            });
          }
        },

        error: () => {
          this.cameras.update((cameras) =>
            cameras.map((c) =>
              c.id === camera.id
                ? {
                    ...c,
                    running: false,
                    has_frame: false,
                  }
                : c,
            ),
          );
        },
      });
    });
  }

  onVideoClick(event: MouseEvent): void {
    // ممنوع الرسم إذا mode مغلق
    if (!this.drawingMode()) return;

    const rect = (event.target as HTMLElement).getBoundingClientRect();

    const x = event.clientX - rect.left;

    const y = event.clientY - rect.top;

    this.polygonPoints.update((points) => [...points, { x, y }]);
  }

  resetZones(): void {
    this.polygonPoints.set([]);
  }
  polygonSvgPoints(): string {
    return this.polygonPoints()
      .map((p) => `${p.x},${p.y}`)
      .join(' ');
  }

  finishDrawing(): void {
    this.drawingMode.set(false);
  }

saveZone(): void {

  if (
    this.polygonPoints().length < 3
  ) {

    alert(
      'يجب رسم منطقة أولاً'
    );

    return;
  }

  const camera =
    this.selectedCamera();

  if (!camera) return;

  this.zoneService
    .createZone({

      camera_id: camera.id,

      name:
        `Zone ${Date.now()}`,

      color: 'red',

      points:
        this.polygonPoints(),

      sensitivity: 75,

      intrusion_action:
        'alert',

      is_active: true,
    })

    .subscribe({

      next: () => {

        this.loadZones(
          camera.id
        );

        this.polygonPoints.set([]);

        this.drawingMode.set(false);
      },

      error: (err) => {

        console.error(err);
      }
    });
}
}
