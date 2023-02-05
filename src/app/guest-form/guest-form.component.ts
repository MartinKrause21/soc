import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'; 
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/services/auth.service';
import { EmailPasswordForGuest } from 'src/user';


@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.css']
})
export class GuestFormComponent implements OnInit {

  updateGuestModel = new EmailPasswordForGuest( '', '');

  hide = true;
  hide2 = true;
  username: string;
  confirmPassword: any ;

  constructor(
    private authService: AuthService,
    private cookies: CookieService,
  ) { }

  ngOnInit(): void {
    this.username = this.cookies.get('username');  
    console.log(this.username);
    
  }
    
  onSubmit() {
    this.authService.updateGuest( this.username, this.updateGuestModel.password, this.updateGuestModel.email,);
    console.log(this.username, this.updateGuestModel);
  }

  get isPasswordEqual() {
    return this.updateGuestModel.password === this.confirmPassword;
  }

}
