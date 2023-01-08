import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { resultQuestion, resultQuiz } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';


@Component({
  selector: 'app-admin-user-detail2',
  templateUrl: './admin-user-detail2.component.html',
  styleUrls: ['./admin-user-detail2.component.css']
})
export class AdminUserDetail2Component implements OnInit {

  username : string
  quizName: string

  public resultQuiz : resultQuiz [];
  public resultQuestionList : resultQuestion [] = [];

  constructor(
    private route: ActivatedRoute,
    private quizService : QuizService,
  ) { }

  panelOpenState = false;

  ngOnInit(): void {

    this.quizName =String(this.route.snapshot.paramMap.get('name'));
    this.username =String(this.route.snapshot.paramMap.get('username'));

    // this.quizService.getUserDetailsForQuiz(this.quizName, this.username).subscribe(response =>{
    //   console.log(response);
      
    //   this.resultQuiz = response;
    //   //this.resultQuestionList = response.resultQuestionList;
    // })

    this.quizService.getUserDetailsForQuiz(this.quizName, this.username).subscribe(results => {
      this.resultQuiz = results;
      console.log(results);
    });

    }

}


