export interface Alert {
  id: number;

  camera_id: number;

  message: string;

  severity: 'low' | 'medium' | 'high';

  created_at: string;
}