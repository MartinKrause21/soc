import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  password: string; 
  email: string;
  confirmPassword: any ;

  hide = true;
  hide2= true;

  model = new changePassword('');
  
  onSubmit() {

    this.email =String(this.route.snapshot.paramMap.get('email'));

    this.loginService.changePassword(this.email, this.model.password);
    console.log(this.model);
  }

  get isPasswordEqual() {
    return this.model.password === this.confirmPassword;
  }
}
