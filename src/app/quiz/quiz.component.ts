import { Component, OnInit } from '@angular/core';
import { Question, Quiz } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { QrCodeDialogComponent } from '../qr-code-dialog/qr-code-dialog.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(
    private quizService: QuizService,
    private dialog : MatDialog,
    private route: ActivatedRoute,
  ) { }

  answersQuestions: Question[] =[];
  selectedQuestion: Question;
  id: string

  quiz : Quiz;
  questionList: Question[];
  quizNum: number = 0;
  score: number = 0;

  quizStart = true;
  quizShow = false;

  location = window.location.href;

  ngOnInit(): void {

    //console.log( window.location.href);

    this.id =String(this.route.snapshot.paramMap.get('name'));

    this.quizService.getQuiz(this.id).subscribe(respone =>{
      console.log(respone);
      
      this.quiz = respone;
      this.questionList = respone.questionList;
    })

  }

  qrCodeDialog() {
    this.dialog.open(QrCodeDialogComponent);
  }

  toggleData() {
    this.quizStart = !this.quizStart;
    this.quizShow = !this.quizShow;
  }


  sendAns(ans: string, correct: boolean){
    this.quizNum = this.quizNum + 1;
    if(this.quizNum < this. questionList.length ){
      if(correct == true){
        this.score = this.score +10;
        console.log("dobra odpoved " + this.score);
      }
      else if (correct == false) { 
        console.log("zla odpoved" + this.score);
      }
    }
    else {
      this.quizService.setScore(this.score, this.id);
    }
  }
}
