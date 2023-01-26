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
  score: number;


  // quizName: string;
  // userName: string;
  // id: string;


  // constructor(private route: ActivatedRoute) {
  //   this.route.params.subscribe(params => {
  //     this.quizName = params.quizName;
  //     this.userName = params.userName;
  //     this.id = params.id;
  //   });
  // }

  public resultQuiz : any [] = [];
  public resultQuestionList : resultQuestion [] = [];

  constructor(
    private route: ActivatedRoute,
    private quizService : QuizService,
  ) { }

  panelOpenState = false;
  borderColor:string = 'none';
  contentLoaded: boolean = true;

  ngOnInit(): void {

    this.quizName =String(this.route.snapshot.paramMap.get('name'));
    this.username =String(this.route.snapshot.paramMap.get('username'));

    this.quizService.getUserDetailsForQuiz(this.quizName, this.username).subscribe(result => {
      this.resultQuiz[0] = result [0].resultQuiz.questionList;
      console.log(this.resultQuiz[0]);
      console.log(result);
      this.score = result[0].score;
      this.contentLoaded = false
    });

  }

}


