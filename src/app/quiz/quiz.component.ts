import { Component, OnInit } from '@angular/core';
import { Answer, inputAnswer, Question, Quiz, resultAnswer, resultQuiz } from 'src/quiz';
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
  answerModel = new inputAnswer ('')

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
  chosen: boolean = false;
  resultAns: resultAnswer;

  sendAns(ans: any, correct: boolean , question : string, answerContent: any, chosen: boolean, ansList: any){
      //this.quizService.updateResultQuiz(ans, question);
      for (var i = 0; i < ansList.length; i++) {      
        ansList[i].chosen = false;
        ansList[i].answerContent = ansList[i].content
      }
      
      ans.chosen = chosen;
      ans.correct = correct;

      if (this.quiz.questionList[this.quizNum].answerList.length > 1) {
        this.quizService.updateResultQuiz(ansList, question);
        console.log(ansList, question, this.quizName, chosen, ans.answerContent);
        this.quizNum = this.quizNum + 1;

      } else {
        this.quizService.updateResultQuizInput(this.answerModel.answerContent, question, this.answerModel.answerContent == answerContent);
        console.log(this.answerModel.answerContent, question, this.quizName, chosen);
        this.quizNum = this.quizNum + 1;
      }

    if (ans.correct && ansList.length > 1) {
      this.score = this.score + 10;
      console.log("Correct answer, Score: " + this.score);
      //console.log(correct, 'hej');
    } 
    else if ( this.answerModel.answerContent == answerContent ) {
      this.score = this.score + 10;
      console.log("Correct answer, Score: " + this.score);
      this.answerModel.answerContent = '';
    }
    else {
      console.log("Incorrect answer, score 0");
      this.answerModel.answerContent = '';
    }

    if (this.quizNum === this.questionList.length) {
      this.quizService.setScore(this.dataServise.getResultQuizId(), this.score);
      this.result = true;
      console.log("Quiz result: ", this.dataServise.getResultQuizId(), this.score);
    }
  }

  sendIncAns(ansList: any, ans: any, question: string){

    for(const item of ansList){
      if(item == ans){
        ansList.delete(item);
      }
    }
    if (this.quiz.questionList[this.quizNum].answerList.length > 1) {
      this.quizService.updateResultQuiz(ansList, question);
      console.log(ansList, this.quizName);
      this.quizNum = this.quizNum + 1;

    } else{
      console.log("No list of ans in input")
    }
  }

}
