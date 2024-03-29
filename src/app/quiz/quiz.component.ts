import { Component, OnInit } from '@angular/core';
import { Answer, inputAnswer, Question, Quiz, resultAnswer, resultQuiz } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { QrCodeDialogComponent } from '../qr-code-dialog/qr-code-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { guest } from 'src/user';
import { AuthService } from 'src/services/auth.service';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';
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
    private http: HttpClient
  ) {  }

  answersQuestions: Question[] =[];
  selectedQuestion: Question;

  multipleAnswers : any[] = [];

  quizName: string
  quizId: number;

  multipleChoice: boolean;

  quiz : Quiz;
  questionList: Question[];
  quizNum: number = 0;
  prevQuizNum: number = 0;
  score: number = 0;

  resultQuiz : resultQuiz;

  quizStart = true;
  quizShow = false;

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageId: number ;
  imageName: string;
  timeLimit: number;

  loggedInUsername : string; 

  model = new guest ( '' , '')
  answerModel = new inputAnswer ('', false, false)

  //timerValue: number = 80;

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
      this.timeLimit = response.questionList[0].timeLimit;
      this.emptyQuestion = response.questionList[0].questionContent;
      
      if( response.questionList[0].image.id != null ){
        this.imageId = response.questionList[0].image.id;
        this.getImage(this.imageId);
        this.switch = true;
      } else {
        this.switch = false;
      }

    });

  }

  openFullSize(imageId : number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      imageId: imageId,
    };

    this.dialog.open(FileUploadDialogComponent, dialogConfig);
  }

  getImage(imageId: number) {
    console.log("zavolana get image");
  
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.http.get('https://teach-quiz.herokuapp.com/image/get/' + imageId)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

   timerID: any;

   emptyQuestion: string;

   startTimer() {
    console.log("Starting timer");
    clearInterval(this.timerID); // clear the old interval
    if (this.timeLimit > 0) {
    
    const timerId = setInterval(() => {
      
      if (this.timeLimit > 0) {
        this.timeLimit--;
        console.log("Counting down: ", this.timeLimit);
      } 
      else {
        // stop the interval
        console.log("Interval stopped");
        this.getQuestionContent(this.emptyQuestion);
        this.quizNum++;
        if (this.quizNum < this.quiz.questionList.length){
          this.timeLimit = this.quiz.questionList[this.quizNum].timeLimit;
          console.log("Starting new interval with time limit: ", this.timeLimit);

        } else {
          this.quizService.setScore(this.dataServise.getResultQuizId(), this.score);
          this.result = true;
          console.log("Quiz result: ", this.dataServise.getResultQuizId(), this.score);
          clearInterval(timerId);
        }
      }
    }, 1000);
    
    this.timerID = timerId;
  } 

  }
  

  restartTimer() {
    console.log("Restarting timer");
    clearInterval(this.timerID); // clear the old interval
    //this.quizNum++; // increment quiz number or set to 0 if necessary

    if(this.quizNum < this.quiz.questionList.length) {
      this.timeLimit = this.quiz.questionList[this.quizNum].timeLimit; 
     
    } else {
      this.timeLimit = 0 ;
      
    }
    console.log("New time limit: ", this.timeLimit);
    this.startTimer(); // start new timer
  }
  

  qrCodeDialog() {
    this.dialog.open(QrCodeDialogComponent);
  }

  startQuiz() {
    this.quizService.postResultQuiz(this.quizName);
    
    this.quizStart = !this.quizStart;
    this.quizShow = !this.quizShow;

    // this.startTimer();
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

  switch : boolean;

    sendAns(ans: any, correct: boolean , question : string, chosen: boolean, ansList: any){


      // if(this.timeLimit > 0) {
      //   this.restartTimer();
      // }
    
      this.quizNum = this.prevQuizNum

        //this.quizService.updateResultQuiz(ans, question);
        for (var i = 0; i < ansList.length; i++) {      
          ansList[i].chosen = false;
          ansList[i].content = ansList[i].answerContent;
        }
        
        ans.chosen = chosen;
        ans.correct = correct;

        console.log(this.quizNum + "preco to nejde");
        
        if (this.quiz.questionList[this.quizNum].answerList.length > 1) {
          this.quizService.updateResultQuiz(ansList, question);
          console.log(ansList, question, this.quizName, chosen, ans.answerContent);

          if(this.quiz.questionList.length > this.quizNum ){
            this.quizNum = this.quizNum + 1;
            console.log(this.quizNum, this.quiz.questionList.length);
          }

          if(this.quizNum > this.prevQuizNum && this.quizNum < this.quiz.questionList.length){
            //this.getImage(this.imageId);
            if(this.quiz.questionList[this.quizNum ].image == null){
              this.switch = false;
              this.getImage(this.imageId +1); 
            } else if (this.quiz.questionList[this.quizNum ].image != null) {
              this.switch = true;
            }
          } 

          // if(this.quiz.questionList[this.quizNum].image == null){
          //   this.getImage(this.imageId +1);
          //   this.switch = false
          //     // toto my malo ist 
          // } else if (this.quiz.questionList[this.quizNum].image != null){
          //   this.switch = true
          // }

          if( this.quizNum < this.quiz.questionList.length && this.quiz.questionList[this.quizNum].image != null){
        
            this.imageId = this.quiz.questionList[this.quizNum].image.id;
            this.getImage(this.imageId);
            console.log(this.quizNum + "tu by to malo uz ist :)" + this.imageId);
          } 
    
        }

      if (ans.correct && ansList.length > 1) {
        this.score = this.score + 1;
        console.log("Correct answer, Score: " + this.score);
        //console.log(correct, 'hej');
      } 

      if (this.quizNum === this.questionList.length ) {
        this.quizService.setScore(this.dataServise.getResultQuizId(), this.score);
        this.result = true;
        console.log("Quiz result: ", this.dataServise.getResultQuizId(), this.score);
      }
      
      this.prevQuizNum = this.quizNum;

     

      // this.startTimer();
    }

    sendAnsInput(correctAns: any, answerModelContent: any, question : string){

      // if(this.timeLimit > 0) {
      //   this.restartTimer();
      // }

      this.quizNum = this.prevQuizNum;
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

        if(this.quiz.questionList.length > this.quizNum ){
          this.quizNum = this.quizNum + 1;
          console.log(this.quizNum, this.quiz.questionList.length);
        }

        if(this.quizNum > this.prevQuizNum && this.quizNum < this.quiz.questionList.length){
          //this.getImage(this.imageId);
          if(this.quiz.questionList[this.quizNum ].image == null){
            this.switch = false;
            this.getImage(this.imageId +1); 
          } else if (this.quiz.questionList[this.quizNum ].image != null) {
            this.switch = true;
          }
        } 

        // if( this.quiz.questionList.length == this.quizNum +1 && this.quiz.questionList[this.quizNum].image == null){
        //   this.switch = false
        //   this.getImage(this.imageId +1); 
        // } else if (this.quiz.questionList.length == this.quizNum +1 && this.quiz.questionList[this.quizNum].image != null){
        //   this.switch = true
        // }

        if( this.quizNum < this.quiz.questionList.length && this.quiz.questionList[this.quizNum].image != null){
        
          this.imageId = this.quiz.questionList[this.quizNum].image.id;
          this.getImage(this.imageId);
          console.log(this.quizNum + "tu by to malo uz ist :)" + this.imageId);
        } 
      

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

    this.prevQuizNum = this.quizNum;
    // this.startTimer();
  }


  multipleAnswersAdd(ans: any, correct: boolean , question : string, chosen: boolean, ansList: any){

    // if(this.timeLimit > 0) {
    //   this.restartTimer();
    // }

    this.quizNum = this.prevQuizNum;
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
    
  
    if(this.quiz.questionList.length > this.quizNum ){
      this.quizNum = this.quizNum + 1;
      console.log(this.quizNum, this.quiz.questionList.length);
    }

    if(this.quizNum > this.prevQuizNum && this.quizNum < this.quiz.questionList.length){
      //this.getImage(this.imageId);
      if(this.quiz.questionList[this.quizNum ].image == null){
        this.switch = false;
        this.getImage(this.imageId +1); 
      } else if (this.quiz.questionList[this.quizNum ].image != null) {
        this.switch = true;
      }
    } 

    // if( this.quiz.questionList.length == this.quizNum +1 && this.quiz.questionList[this.quizNum].image == null){
    //   this.switch = false
    //   this.getImage(this.imageId +1); 
    // } else if (this.quiz.questionList.length == this.quizNum +1 && this.quiz.questionList[this.quizNum].image != null){
    //   this.switch = true
    // }

    if( this.quizNum < this.quiz.questionList.length && this.quiz.questionList[this.quizNum].image != null){
        
      this.imageId = this.quiz.questionList[this.quizNum].image.id;
      this.getImage(this.imageId);
      console.log(this.quizNum + "tu by to malo uz ist :)" + this.imageId);
    } 
    if (this.quizNum === this.questionList.length) {
      this.quizService.setScore(this.dataServise.getResultQuizId(), this.score);
      this.result = true;
      console.log("Quiz result: ", this.dataServise.getResultQuizId(), this.score);
    }

    this.prevQuizNum = this.quizNum;

    // this.startTimer();
  }

  emptyAnswer: any
  emptyAnswerList: any[] = [];

  getQuestionContent(emptyQuestion: string) {

    this.emptyAnswerList

     if(this.timeLimit == 0) {
        this.quizService.updateResultQuiz(this.emptyAnswerList, emptyQuestion);
        console.log("dosiel cas "+ emptyQuestion);
      }

  }

}
