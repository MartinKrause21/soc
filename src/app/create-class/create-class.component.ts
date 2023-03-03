import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { allTeacherQuizes, allUserQuizes } from 'src/quiz';
import { AuthService } from 'src/services/auth.service';
import { QuizService } from 'src/services/quiz.service';
import { allUsers, userClass } from 'src/user';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private quizService: QuizService,
  ) { }

   allUsers: allUsers[];
   allTeacherQuizes : allTeacherQuizes[]

   quizName:string
   usernames:string[] = []
   filteredUsers: any[] = [];

   classNumber: string = '';
   schoolName: string = '';

   classNameTouched = false;
   checked = false;
   quizNameTouched = false;
   usernamesTouched = false;

   createClassModel = new userClass( '', '', []);

    ngOnInit(): void {

   
    }

  createClass() {
    this.authService.createClass(this.quizName, this.createClassModel.className, this.usernames);
    console.log(this.quizName, this.createClassModel.className, this.usernames);
  }

}