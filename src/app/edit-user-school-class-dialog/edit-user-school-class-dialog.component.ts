import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth.service';
import { editClassName, user } from 'src/user';

@Component({
  selector: 'app-edit-user-school-class-dialog',
  templateUrl: './edit-user-school-class-dialog.component.html',
  styleUrls: ['./edit-user-school-class-dialog.component.css']
})
export class EditUserSchoolClassDialogComponent implements OnInit {

  constructor(
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  editClassNameForm = new editClassName('')

  schoolName: string = this.data.schoolName;
  classNumber: string = this.data.classNumber;
  username: string = this.data.username;

  send: boolean = false;

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.editClassForUser(this.schoolName ,this.editClassNameForm.classNumber, this.username);
    //console.log(this.schoolName, this.classNumber, this.model.newClassNumber);
    this.send = true;
  }

  close(){
    location.href = "/profile-page";
  }

}
