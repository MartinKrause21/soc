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

  quizes : Quiz[];

  quizStart = true;
  quizShow = false;

  location = window.location.href;

  ngOnInit(): void {

    //console.log( window.location.href);

    this.id =String(this.route.snapshot.paramMap.get('name'));

    this.quizService.getQuizName(this.id).subscribe(response=> {
      console.log(response); 
      this.answersQuestions=response;
      this.selectedQuestion=response[0]
      //this.isContentLoaded = true
   });

  }

  qrCodeDialog() {
    this.dialog.open(QrCodeDialogComponent);
  }

  toggleData() {
    this.quizStart = !this.quizStart;
    this.quizShow = !this.quizShow;
  }


}
