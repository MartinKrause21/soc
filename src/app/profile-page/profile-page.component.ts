import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from 'src/services/quiz.service';
import { allTeacherQuizes } from 'src/quiz';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(
    private cookies: CookieService,
    private quizService: QuizService
  ) { }
  
  allTeacherQuizes : allTeacherQuizes[] = [];
  loggedInUsername: string;

  ngOnInit(): void {

    this.loggedInUsername = this.cookies.get('username');

    this.quizService.getAllTeacherQuizes().subscribe(allTeacherQuizes => { 
      this.allTeacherQuizes = allTeacherQuizes;

      console.log(allTeacherQuizes);
      
    });

  }

 
}
