export interface Point {

  x: number;

  y: number;
}

export interface Zone {

  id: number;

  camera_id: number;

  name: string;

  color: string;

  points: Point[];

  sensitivity: number;

  intrusion_action: string;

  is_active: boolean;
}