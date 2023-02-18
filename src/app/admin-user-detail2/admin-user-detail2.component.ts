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
  score: number;
  quizName: string
  percentage: number;

  public resultQuiz : any [] = [];
  public resultQuestionList : resultQuestion [] = [];

  constructor(
    private route: ActivatedRoute,
    private quizService : QuizService,
  ) { }

  resultQuizId: number;
  panelOpenState = false;
  borderColor:string = 'none';
  contentLoaded: boolean = true;

  ngOnInit(): void {

    this.resultQuizId =Number(this.route.snapshot.paramMap.get('id'));
    //this.quizName =String(this.route.snapshot.paramMap.get('id'));
    this.username =String(this.route.snapshot.paramMap.get('username'));
    //this.quizName = this.resultQuiz[0].resultAnswer;


    this.quizService.getUserDetailsForQuiz(this.resultQuizId, this.username).subscribe(resultt => {

      this.quizName = resultt.resultQuiz.quizName;
      this.resultQuiz[0] = resultt.resultQuiz.questionList;
      console.log(this.resultQuiz[0]);
      console.log(resultt);
      this.score = resultt.score;
      this.percentage = resultt.percentage;
      this.contentLoaded = false
    });

  }

}


