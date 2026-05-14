import { Component, inject, signal, computed, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { CameraService } from '../../services/camera.service';

import { Camera } from '../../models/camera.model';

@Component({
  selector: 'app-cameras',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './cameras.html',

  styleUrl: './cameras.css',
})
export class Cameras implements OnInit {
  private cameraService = inject(CameraService);

  // =====================================================
  // SIGNALS
  // =====================================================

  cameras = signal<Camera[]>([]);

  camerasCount = computed(() => this.cameras().length);

  selectedCamera = signal<Camera | null>(null);

  showAddModal = signal(false);

  successMessage = signal('');

  errorMessage = signal('');

  isSaving = signal(false);
private statusInterval: any;
  // =====================================================
  // NEW CAMERA
  // =====================================================

  newCamera: Partial<Camera> = {
    name: '',

    location: '',

    rtsp_url: '',

    ip_address: '',

    fps: 25,

    is_active: true,
  };

  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {
    this.loadCameras();

    this.statusInterval = setInterval(() => {
      this.loadStatuses();
    }, 1000);
  }
ngOnDestroy(): void {
  clearInterval(this.statusInterval);
}
  // =====================================================
  // LOAD CAMERAS
  // =====================================================

  loadCameras(): void {
    this.cameraService.getCameras().subscribe({
      next: (cameras) => {
        this.cameras.set(cameras);

        this.loadStatuses();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  // =====================================================
  // LOAD STATUS
  // =====================================================

  loadStatuses(): void {
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
                    fps: status.fps,
                  }
                : c,
            ),
          );
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

  // =====================================================
  // ADD MODAL
  // =====================================================

  openAddModal(): void {
    this.showAddModal.set(true);
  }

  closeAddModal(): void {
    this.showAddModal.set(false);
  }

  // =====================================================
  // SETTINGS
  // =====================================================

  openSettings(camera: Camera): void {
    this.selectedCamera.set({ ...camera });
  }

  closeSettings(): void {
    this.selectedCamera.set(null);
  }

  // =====================================================
  // SAVE CHANGES
  // =====================================================

  saveChanges(): void {
    const camera = this.selectedCamera();

    if (!camera) return;

    this.cameraService.updateCamera(camera).subscribe({
      next: () => {
        this.successMessage.set('تم حفظ التعديلات بنجاح');

        this.closeSettings();

        this.loadCameras();

        setTimeout(() => {
          this.successMessage.set('');
        }, 3000);
      },

      error: (err) => {
        console.error(err);

        this.errorMessage.set('فشل حفظ التعديلات');

        setTimeout(() => {
          this.errorMessage.set('');
        }, 3000);
      },
    });
  }

  // =====================================================
  // DELETE
  // =====================================================

  deleteCamera(camera: Camera): void {
    const confirmed = confirm(`هل تريد حذف ${camera.name} ؟`);

    if (!confirmed) return;

    this.cameraService.deleteCamera(camera.id).subscribe({
      next: () => {
        this.successMessage.set('تم حذف الكاميرا');

        this.loadCameras();

        setTimeout(() => {
          this.successMessage.set('');
        }, 3000);
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  // =====================================================
  // FULLSCREEN
  // =====================================================

  toggleFullscreen(element: HTMLElement): void {
    if (!document.fullscreenElement) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  // =====================================================
  // ADD CAMERA
  // =====================================================

  addCamera(): void {
    if (this.isSaving()) return;

    this.isSaving.set(true);

    this.cameraService.addCamera(this.newCamera).subscribe({
      next: () => {
        this.successMessage.set('تمت إضافة الكاميرا بنجاح');

        this.closeAddModal();

        this.loadCameras();

        this.newCamera = {
          name: '',

          location: '',

          rtsp_url: '',

          ip_address: '',

          fps: 25,

          is_active: true,
        };

        this.isSaving.set(false);

        setTimeout(() => {
          this.successMessage.set('');
        }, 3000);
      },

      error: (err) => {
        console.error(err);

        this.errorMessage.set('حدث خطأ أثناء الحفظ');

        this.isSaving.set(false);

        setTimeout(() => {
          this.errorMessage.set('');
        }, 3000);
      },
    });
  }

  showVideoModal = signal(false);

  videos = signal<any[]>([]);

  newVideo = signal({
    name: '',
    path: '',
  });

  openVideoModal(): void {
    this.showVideoModal.set(true);
  }

  closeVideoModal(): void {
    this.showVideoModal.set(false);
  }
  addVideo(): void {
    this.cameraService
      .openVideo(this.newVideo().path)

      .subscribe({
        next: () => {
          const video: Camera = {
            id: 0,

            name: this.newVideo().name,

            location: 'Video File',

            rtsp_url: '',

            ip_address: '',

            fps: 20,

            is_active: true,

            running: true,

            has_frame: true,
          };

          this.videos.update((v) => [...v, video]);

          this.newVideo.set({
            name: '',
            path: '',
          });

          this.showVideoModal.set(false);
        },

        error: (err) => {
          console.error(err);
        },
      });
  }

  startWebcam(): void {
    this.cameraService
      .startWebcam(999)

      .subscribe({
        next: () => {
          const webcam: Camera = {
            id: 999,

            name: 'Webcam',

            location: 'Local Device',

            rtsp_url: '',

            ip_address: '',

            fps: 20,

            is_active: true,

            running: true,

            has_frame: true,
          };

          // منع التكرار
          const exists = this.cameras().some((c) => c.id === 999);

          if (!exists) {
            this.cameras.update((c) => [webcam, ...c]);
          }

          this.successMessage.set('تم تشغيل كاميرا الحاسب');

          setTimeout(() => {
            this.successMessage.set('');
          }, 3000);
        },

        error: (err) => {
          console.error(err);

          this.errorMessage.set('فشل تشغيل الكاميرا');

          setTimeout(() => {
            this.errorMessage.set('');
          }, 3000);
        },
      });
  }

  trackByCamera(index: number, camera: Camera): number {
  return camera.id;
}
}
