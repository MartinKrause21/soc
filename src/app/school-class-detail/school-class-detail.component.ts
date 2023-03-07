import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { QuizService } from 'src/services/quiz.service';
import { schoolUsers } from 'src/user';
import { EditUserSchoolClassDialogComponent } from '../edit-user-school-class-dialog/edit-user-school-class-dialog.component';
import { RemoveUserDialogComponent } from '../remove-user-dialog/remove-user-dialog.component';

@Component({
  selector: 'app-school-class-detail',
  templateUrl: './school-class-detail.component.html',
  styleUrls: ['./school-class-detail.component.css']
})
export class SchoolClassDetailComponent implements OnInit {


  contentLoaded: boolean = true;
  classNumber: string;
  schoolName: string;

  public schoolUsers :  schoolUsers[];

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private dialog : MatDialog,
  ) { }

  ngOnInit(): void {

    this.classNumber =String(this.route.snapshot.paramMap.get('classNumber'));  
    this.schoolName =String(this.route.snapshot.paramMap.get('schoolName'));

    this.quizService.getAllUsersForSchool(this.schoolName, this.classNumber).subscribe(response => {
      this.schoolUsers = response;
      this.contentLoaded =false
      console.log(response);
    });
  
  }


  openEditUser(username: string,schoolName: string, classNumber:string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      username: username,
      schoolName: schoolName,
      classNumber: classNumber
    };

    this.dialog.open(EditUserSchoolClassDialogComponent, dialogConfig);
  }

  removeUserFromClass(username: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      username: username
    };

    this.dialog.open(RemoveUserDialogComponent, dialogConfig);
  }

  // /update/student/{schoolName}/{className}/{username}

}
