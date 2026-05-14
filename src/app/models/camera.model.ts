export interface Camera {
  id: number;

  name: string;

  rtsp_url: string;

  ip_address?: string;

  location?: string;

  fps?: number;

  is_active: boolean;

  created_at?: string;

  running?: boolean;

  has_frame?: boolean;

  status?: string;
}
