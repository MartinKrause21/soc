import { Component, OnInit } from '@angular/core';
import { user } from 'src/user';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  password: string = ''; 
  email: any = '';
  confirmPassword: any ;

  isAdmin = false;
  checked = false;

  users: user[] = [];

  model = new user( '', '','', '', '' );

  hide = true;
  hide2= true;
  
  constructor(
    private readonly registerService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.isAdmin == false) {
      this.registerService.createUser(this.model)
      console.log( "user created" + this.model);
    }
    else if(this.isAdmin == true) {
      this.registerService.createAdmin(this.model)
      console.log("admin created" + this.model);
    }
  }

  get isPasswordEqual() {
    return this.model.password === this.confirmPassword;
  }

}
