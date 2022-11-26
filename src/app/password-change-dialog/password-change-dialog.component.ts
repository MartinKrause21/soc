import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { sentMail } from 'src/user';

@Component({
  selector: 'app-password-change-dialog',
  templateUrl: './password-change-dialog.component.html',
  styleUrls: ['./password-change-dialog.component.css']
})
export class PasswordChangeDialogComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  email: string = '';

  model = new sentMail('');

  ngOnInit(): void {}

  onSubmit() {
    this.authService.sendPasswordResetEmail(this.model.email);
    console.log(this.model.email);
  }

}
