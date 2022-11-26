import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { changePassword } from 'src/user';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.css']
})
export class PasswordResetFormComponent implements OnInit {

  constructor(
    private readonly loginService: AuthService,

  ) { }

  ngOnInit(): void {
  }

  password: string = ''; 
  confirmPassword: any ;

  model = new changePassword('');
  
  onSubmit() {
    //this.loginService.login(this.model);
    console.log(this.model);
  }
}
