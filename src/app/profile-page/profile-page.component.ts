import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(
    private cookies: CookieService
  ) { }

  ngOnInit(): void {

    this.loggedInUsername = this.cookies.get('username');

  }


  loggedInUsername: string;

}
