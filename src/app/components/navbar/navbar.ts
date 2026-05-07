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

  currentPage: string = 'لوحة التحكم';

  constructor() {

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {

        const url = event.urlAfterRedirects;

        if (url.includes('cameras')) {

          this.currentPage = 'الكاميرات';

        }

        else if (url.includes('alerts')) {

          this.currentPage = 'التنبيهات';

        }

        else if (url.includes('zones')) {

          this.currentPage = 'المناطق المحظورة';

        }

        else if (url.includes('reports')) {

          this.currentPage = 'التقارير';

        }

        else if (url.includes('settings')) {

          this.currentPage = 'الإعدادات';

        }

        else {

          this.currentPage = 'لوحة التحكم';

        }

      }

    });

  }

}