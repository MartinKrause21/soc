import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showMenu = false;
  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }
}
