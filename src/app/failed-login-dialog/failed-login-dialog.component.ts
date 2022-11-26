import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from 'src/services/auth.service';
import { resendMail } from 'src/user';

@Component({
  selector: 'app-failed-login-dialog',
  templateUrl: './failed-login-dialog.component.html',
  styleUrls: ['./failed-login-dialog.component.css']
})
export class FailedLoginDialogComponent implements OnInit {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  constructor(
    private loginService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  send: boolean = false;
  model = new resendMail( '');

  onSubmit() {
    //this.loginService.resendMail(this.model.email);
    console.log(this.model);
  }

  sendButton(){
    this.send = true;
  }
}
