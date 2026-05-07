import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {

  confidence = 0.65;

  emailAlerts = true;

  telegramAlerts = true;

  recording = true;

  fps = 30;

  rtspUrl = 'rtsp://192.168.1.10/live';

}