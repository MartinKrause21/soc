import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-remove-user-dialog',
  templateUrl: './remove-user-dialog.component.html',
  styleUrls: ['./remove-user-dialog.component.css']
})
export class RemoveUserDialogComponent implements OnInit {

  constructor(
    private authservice : AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  username: string = this.data.username;

  remove(username : string) {
    this.authservice.removeStudentFromClass(username);
  }
}
