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

  multipleAnswers : any[] = [];

  quizName: string
  quizId: number;

  multipleChoice: boolean;

  quiz : Quiz;
  questionList: Question[];
  quizNum: number = 0;
  score: number = 0;

  resultQuiz : resultQuiz;

  quizStart = true;
  quizShow = false;

  loggedInUsername : string; 

  model = new guest ( '' , '')
  answerModel = new inputAnswer ('', false, false)

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
  rightAns: any;

    sendAns(ans: any, correct: boolean , question : string, chosen: boolean, ansList: any){
        //this.quizService.updateResultQuiz(ans, question);
        for (var i = 0; i < ansList.length; i++) {      
          ansList[i].chosen = false;
          ansList[i].content = ansList[i].answerContent;
        }
        
        ans.chosen = chosen;
        ans.correct = correct;

        if (this.quiz.questionList[this.quizNum].answerList.length > 1) {
          this.quizService.updateResultQuiz(ansList, question);
          console.log(ansList, question, this.quizName, chosen, ans.answerContent);
          this.quizNum = this.quizNum + 1;

        }

      if (ans.correct && ansList.length > 1) {
        this.score = this.score + 1;
        console.log("Correct answer, Score: " + this.score);
        //console.log(correct, 'hej');
      } 

      if (this.quizNum === this.questionList.length) {
        this.quizService.setScore(this.dataServise.getResultQuizId(), this.score);
        this.result = true;
        console.log("Quiz result: ", this.dataServise.getResultQuizId(), this.score);
      }
    }

    sendAnsInput(correctAns: any, answerModelContent: any, question : string){
      //this.quizService.updateResultQuiz(ans, question);
      correctAns.content = correctAns.answerContent;
      this.answerModel.content = answerModelContent;
      
      if(answerModelContent != correctAns.answerContent){
          this.answerModel.correct = false;
          this.answerModel.chosen = true;
          let answerArr = [];
          answerArr.push(this.answerModel);
          answerArr.push(correctAns);
          this.quizService.updateResultQuizInput(question, answerArr);
        }else{
          let answerArr = [];
          this.answerModel.correct = true;
          this.answerModel.chosen = true;
          answerArr.push(this.answerModel)
          this.quizService.updateResultQuizInput(question, answerArr);
        }

        console.log(question, this.quizName, correctAns, "tentooooooo", this.answerModel);
        this.quizNum = this.quizNum + 1;
      

    if ( this.quiz.ignoredCase && this.answerModel.answerContent.toLocaleLowerCase == correctAns.answerContent.toLocaleLowerCase ||  this.quiz.ignoredCase && this.answerModel.answerContent.toLocaleLowerCase == correctAns.content.toLocaleLowerCase ) {
      this.score = this.score + 1;
      console.log("Correct answer, Score: " + this.score);
      this.answerModel.answerContent = '';
    } else if (this.answerModel.answerContent == correctAns.answerContent || this.answerModel.answerContent == correctAns.content) {
      this.score = this.score + 1;
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


  multipleAnswersAdd(ans: any, correct: boolean , question : string, chosen: boolean, ansList: any){
    console.log("toto nam treba teraZ" + ans, ans.answerContent, correct, question, chosen);
    
    ans.chosen = chosen;
    ans.correct = correct;
    this.question = question;

    if(this.multipleAnswers.includes(ans)) {
      this.multipleAnswers.splice(this.multipleAnswers.indexOf(ans), 1);
      console.log(this.multipleAnswers);

    } else{
      this.multipleAnswers.push(ans);
      console.log(this.multipleAnswers);
    }

  }

  sendMultipleAnswers(){
   
    console.log(this.multipleAnswers, this.question, this.quizName);
    this.quizService.updateResultQuiz(this.multipleAnswers, this.question);
    setTimeout(() => {
      this.multipleAnswers.length = 0;
    }, 900);

    const checkCorrectAnswrs = this.quiz.questionList[this.quizNum].answerList;
    console.log("asdsad" + checkCorrectAnswrs.length);
    
    var allAnswersCorrect = true;
    for (var i = 0; i < this.multipleAnswers.length; i++) {
      if (this.multipleAnswers[i].correct !== true) {
        allAnswersCorrect = false;
        break;
      }
    }

    let numberOfClickedAnswers = 0;

    if (allAnswersCorrect ) {
      for (var i = 0; i < checkCorrectAnswrs.length; i++) {
        if (checkCorrectAnswrs[i].correct == true) {
          numberOfClickedAnswers++;
        } 
      }
      console.log("adasasdasd"+checkCorrectAnswrs.length);
      
      if(numberOfClickedAnswers == this.multipleAnswers.length){
        this.score = this.score + 1;
      }

      console.log("Correct answer, Score: " + this.score); 
    } else {
      console.log("Incorrect answer, score 0");
    }
    
    this.quizNum = this.quizNum + 1;
    if (this.quizNum === this.questionList.length) {
      this.quizService.setScore(this.dataServise.getResultQuizId(), this.score);
      this.result = true;
      console.log("Quiz result: ", this.dataServise.getResultQuizId(), this.score);
    }
  }

}
