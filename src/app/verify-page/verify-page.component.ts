import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-verify-page',
  templateUrl: './verify-page.component.html',
  styleUrls: ['./verify-page.component.css']
})
export class VerifyPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { 
  }

  username:string;
  code:string;

  ngOnInit(): void {

    this.authService.verifyUser(this.username);
    console.log(this.username, this.code);
    
  }

}
