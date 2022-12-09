import { Component } from '@angular/core';
import { user } from 'src/user';
import { AuthService } from 'src/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private readonly loginService: AuthService,
    private cookies: CookieService,
  ){}

  users: user[] = [];

  loggedInUsername: string;

  ngOnInit(): void {
    console.log(this.cookies.get('username'))
    this.loggedInUsername = this.cookies.get('username');
  }

  showMenu = false;
  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }

  onlogout() { 
    this.loginService.logout();
    location.reload();
  }
}


