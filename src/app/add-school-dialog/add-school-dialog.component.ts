import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { addSchoolName } from 'src/user';

@Component({
  selector: 'app-add-school-dialog',
  templateUrl: './add-school-dialog.component.html',
  styleUrls: ['./add-school-dialog.component.css']
})
export class AddSchoolDialogComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {}


  schoolName: string = '';

  model = new addSchoolName('');

  send : boolean = false

  ngOnInit(): void {}

  onSubmit() {
    this.authService.addSchool(this.model.schoolName);
    console.log(this.model.schoolName);
    this.send = true;
  }

  close(){
    location.reload();
  }

}
