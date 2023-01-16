import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { resultQuestion, resultQuiz } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';


@Component({
  selector: 'app-user-quiz-detail',
  templateUrl: './user-quiz-detail.component.html',
  styleUrls: ['./user-quiz-detail.component.css']
})
export class UserQuizDetailComponent implements OnInit {

  username : string
  quizName: string

  score: number;

  public resultQuiz : any [] = [];
  public resultQuestionList : resultQuestion [] = [];

  constructor(
    private route: ActivatedRoute,
    private quizService : QuizService,
  ) { }

  panelOpenState = false;

  ngOnInit(): void {

    this.quizName =String(this.route.snapshot.paramMap.get('name'));
    this.username =String(this.route.snapshot.paramMap.get('username'));

    this.quizService.getQuizResultForUser(this.quizName).subscribe(result => {
      this.resultQuiz[0] = result [0].resultQuiz.questionList;
      console.log(this.resultQuiz[0]);
      console.log(result);
      this.score = result[0].score;
    });

  }

}


