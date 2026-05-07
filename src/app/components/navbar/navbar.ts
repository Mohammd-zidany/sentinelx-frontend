import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  router = inject(Router);

  currentPage = 'Dashboard';

  constructor() {

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {

        const url = event.urlAfterRedirects;

        if (url.includes('cameras')) {
          this.currentPage = 'Cameras';
        } else if (url.includes('alerts')) {
          this.currentPage = 'Alerts';
        } else if (url.includes('zones')) {
          this.currentPage = 'Restricted Zones';
        } else if (url.includes('reports')) {
          this.currentPage = 'Reports';
        } else if (url.includes('settings')) {
          this.currentPage = 'Settings';
        }
        else {
          this.currentPage = 'Dashboard';
        }

      }

    });

  }

}