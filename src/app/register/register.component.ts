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

  users: user[] = [];

  model = new user( '', '','' );

  hide = true;
  hide2= true;
  
  constructor(
    private readonly registerService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.registerService.createUser(this.model)
    console.log(this.model);
  }

  get isPasswordEqual() {
    return this.model.password === this.confirmPassword;
  }
}
