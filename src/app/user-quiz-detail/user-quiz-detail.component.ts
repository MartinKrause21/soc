import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { resultQuestion, resultQuiz } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';
import { DataService } from '../data.service';


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
    private dataService : DataService,
  ) { }

  panelOpenState = false;
  contentLoaded: boolean = true;

  resultAnswersForDisplay : any [] = [];
  id: number;
  resultAnswers : any [] = [];

  ngOnInit(): void {

    this.username =String(this.route.snapshot.paramMap.get('username'));

    this.id =Number(this.route.snapshot.paramMap.get('resultQuizIds'));

    // this.id = this.dataService.getResultQuizId();
    // console.log(this.id, "id");


    this.quizService.getQuizResultForUser(this.id).subscribe((result: any) => {

      this.resultQuiz[0] = result.resultQuiz.questionList;
      this.quizName = result.resultQuiz.quizName;
      this.score = result.score;
      console.log(this.resultQuiz, "resultQuiz");
      console.log(result);
      console.log(this.score, "score");
      //console.log(result.resultQuiz.questionList[1].answerList)
      this.contentLoaded = false;
      
    });

  }

}


