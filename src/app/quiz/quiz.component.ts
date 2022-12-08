import { Component, OnInit } from '@angular/core';
import { Question } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { QrCodeDialogComponent } from '../qr-code-dialog/qr-code-dialog.component';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(
    private quizService: QuizService,
    private dialog : MatDialog,
  ) { }


  answersQuestions: Question[] =[];
  selectedQuestion: Question;
  id: string

  quizStart = true;
  quiz = false;

  location = window.location.href;

  ngOnInit(): void {

    console.log( window.location.href);

  //   this.quizService.getQuizes(this.id).subscribe(response=> {
  //     console.log(response); 
  //     this.answersQuestions=response;
  //     this.selectedQuestion=response[0]

  //     //this.isContentLoaded = true
  //  });
  }

  qrCodeDialog() {
    this.dialog.open(QrCodeDialogComponent);
  }

  toggleData() {
    this.quizStart = !this.quizStart;
    this.quiz = !this.quiz;
  }


}
