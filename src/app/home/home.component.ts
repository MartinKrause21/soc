import { Component, ElementRef, HostListener, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private cookieService :CookieService, 
  ) { }

  isLoaded = false;
  timer = 500;

  ngOnInit() {
    if (window.innerWidth <= 720) {
      this.timer = 0;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoaded = true;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
        });
      });

      const hiddenElements = document.querySelectorAll('.animationLeft, .animationRight, .animationBottom');
      hiddenElements.forEach((element) => {
        observer.observe(element);
      });
    }, this.timer);
  }

}
