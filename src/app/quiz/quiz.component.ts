import { Component, OnInit } from '@angular/core';
import { Question, Quiz, resultQuiz } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { QrCodeDialogComponent } from '../qr-code-dialog/qr-code-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { guest } from 'src/user';
import { AuthService } from 'src/services/auth.service';
import { DataService } from '../data.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(
    private quizService: QuizService,
    private authService : AuthService,
    private dialog : MatDialog,
    private route: ActivatedRoute,
    private cookies : CookieService,
    private dataServise : DataService,
  ) { }

  answersQuestions: Question[] =[];
  selectedQuestion: Question;

  quizName: string
  quizId: number;

  quiz : Quiz;
  questionList: Question[];
  quizNum: number = 0;
  score: number = 0;

  resultQuiz : resultQuiz;

  quizStart = true;
  quizShow = false;

  loggedInUsername : string; 

  model = new guest ( '' , '')

  location = window.location.href;

  ngOnInit(): void {

    this.quizName =String(this.route.snapshot.paramMap.get('name'));
    this.quizId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.quizName , this.quizId);


    this.loggedInUsername = this.cookies.get('username');

    this.quizService.getQuiz(this.quizName).subscribe(response =>{
      console.log(response);
      
      this.quiz = response;
      this.questionList = response.questionList;
    })
  }

  qrCodeDialog() {
    this.dialog.open(QrCodeDialogComponent);
  }

  startQuiz() {
    this.quizService.postResultQuiz(this.quizName);
    
    this.quizStart = !this.quizStart;
    this.quizShow = !this.quizShow;
  }

  setGuestName() {
    this.authService.createGuest(this.model.username );
    console.log(this.model.username);
    setTimeout(() => {
      location.reload()
          },1500);
  }

  ans : string;
  question : string;
  result : boolean = false;

  sendAns(ans: any, correct: boolean , question : string){

    this.quizNum = this.quizNum + 1;

    this.quizService.updateResultQuiz(ans, question);
    console.log(ans, question, this.quizName);

    if (correct) {
      this.score = this.score + 10;
      console.log("Correct answer, Score: " + this.score);
    } 
    else {
      console.log("Incorrect answer, score 0");
    }

    if (this.quizNum === this.questionList.length) {
      this.quizService.setScore(this.dataServise.getResultQuizId(), this.score);
      this.result = true;
      console.log("Quiz result: ", this.dataServise.getResultQuizId(), this.score);
    }
  }

}
