import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from 'src/services/auth.service';
import { resendMail } from 'src/user';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-failed-login-dialog',
  templateUrl: './failed-login-dialog.component.html',
  styleUrls: ['./failed-login-dialog.component.css']
})
export class FailedLoginDialogComponent implements OnInit {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  constructor(
    private loginService: AuthService,
    public dialogRef: MatDialogRef<FailedLoginDialogComponent>,
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

  close(){
    this.dialogRef.close();
  } 
}
