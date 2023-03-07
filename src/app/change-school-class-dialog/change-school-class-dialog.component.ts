import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth.service';
import { addClassName } from 'src/user';

@Component({
  selector: 'app-change-school-class-dialog',
  templateUrl: './change-school-class-dialog.component.html',
  styleUrls: ['./change-school-class-dialog.component.css']
})
export class ChangeSchoolClassDialogComponent implements OnInit {

  constructor(
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  schoolName: string = this.data.schoolName;
  classNumber: string = this.data.classNumber;

  newClassNumber: string = '';

  model = new addClassName('');

  send : boolean = false

  ngOnInit(): void {}

  onSubmit() {
    this.authService.editSchoolClass(this.schoolName, this.classNumber ,this.model.newClassNumber);
    console.log(this.schoolName, this.classNumber, this.model.newClassNumber);
    this.send = true;
  }

  close(){
    location.reload();
  }

}
