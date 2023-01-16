import { Component, OnInit } from '@angular/core';
import { allUserQuizes } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-qr-code-convertor',
  templateUrl: './qr-code-convertor.component.html',
  styleUrls: ['./qr-code-convertor.component.css']
})
export class QrCodeConvertorComponent implements OnInit {

  constructor(
    private quizService : QuizService,
  ) { }

  quizzes : allUserQuizes[]

  public QRcodeText:string;

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe(quizzes => {
      this.quizzes = quizzes;
      console.log(quizzes);
      
    });
  }

}
