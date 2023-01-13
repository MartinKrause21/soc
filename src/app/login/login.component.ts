import { Component, OnInit, Inject } from '@angular/core';
import { user, userLogin } from 'src/user';
import { AuthService } from 'src/services/auth.service';
import { PasswordChangeDialogComponent } from '../password-change-dialog/password-change-dialog.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: user[] = [];

  model = new userLogin( '', '');

  hide = true;

  constructor(
    private readonly loginService: AuthService,
    private dialog : MatDialog, 
    private cookies : CookieService
  ) { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.loginService.login(this.model);
    console.log(this.model);
  }

  passwordChangeDialog() {
    this.dialog.open(PasswordChangeDialogComponent);
  }

}
