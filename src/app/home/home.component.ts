import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private cookieService :CookieService, 
  ) { }

  ngOnInit(): void {
    this.authService.getUserRole().subscribe(data => {
      const role = data.role;
      // set role to cookies
      this.cookieService.set('role', role);
      console.log(role);
      
  });
  }


}
