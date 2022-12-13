import { Component, OnInit } from '@angular/core';
import { user, userLogin } from 'src/user';
import { AuthService } from 'src/services/auth.service';
import { PasswordChangeDialogComponent } from '../password-change-dialog/password-change-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: user[] = [];

  model = new userLogin( '', '');

  constructor(
    private readonly loginService: AuthService,
    private dialog : MatDialog, 
  ) { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.loginService.login(this.model).then(()=>{
      location.reload();
    });
    console.log(this.model);
  }

  passwordChangeDialog() {
    this.dialog.open(PasswordChangeDialogComponent);
  }

}
