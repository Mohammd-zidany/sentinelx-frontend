import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Zone } from '../models/zone.model';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {

  private http = inject(HttpClient);

  private api =
    'http://127.0.0.1:8001/api';

  // =====================================================
  // GET ZONES
  // =====================================================

  getZones(
    cameraId: number
  ): Observable<Zone[]> {

    return this.http.get<Zone[]>(
      `${this.api}/zones/${cameraId}`
    );
  }

  // =====================================================
  // CREATE ZONE
  // =====================================================

  createZone(
    zone: Partial<Zone>
  ) {

    return this.http.post(
      `${this.api}/zones`,
      zone
    );
  }

  // =====================================================
  // DELETE
  // =====================================================

  deleteZone(id: number) {

    return this.http.delete(
      `${this.api}/zones/${id}`
    );
  }
}