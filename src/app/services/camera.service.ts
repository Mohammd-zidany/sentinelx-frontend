import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Camera } from '../models/camera.model';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CameraService extends ApiService {
  getCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>(`${this.api}/cameras`);
  }

  addCamera(camera: Partial<Camera>) {
    return this.http.post(`${this.api}/cameras`, camera);
  }

  deleteCamera(id: number) {
    return this.http.delete(`${this.api}/cameras/${id}`);
  }

  updateCamera(camera: Camera) {
    return this.http.put(`${this.api}/cameras/${camera.id}`, camera);
  }

  getCameraStatus(id: number) {
    return this.http.get<any>(`${this.api}/monitoring/status/${id}`);
  }

  openVideo(path: string) {
    return this.http.post(
      `${this.api}/monitoring/open-video`,

      {
        path,
      },
    );
  }

  startWebcam(cameraId: number) {

  return this.http.post(

    `${this.api}/monitoring/start-webcam/${cameraId}`,

    {}
  );
}
}
