import { Component, OnInit } from '@angular/core';
import { allUserQuizes } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-qr-code-convertor',
  templateUrl: './qr-code-convertor.component.html',
  styleUrls: ['./qr-code-convertor.component.css']
})
export class QrCodeConvertorComponent implements OnInit {

  quizzes : allUserQuizes[]
  originalQuizzes: allUserQuizes[];

  constructor(
    private quizService : QuizService,
  ) {    this.originalQuizzes = this.quizzes;}


  contentLoaded = true;

  public QRcodeText:string;

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe(quizzes => {
      this.quizzes = quizzes;
      this.originalQuizzes = quizzes;
      console.log(quizzes);
      this.contentLoaded = false;
      
    });
  }

  searchTerm: string;

  searchQuizzes() {
    if (!this.searchTerm) {
        this.quizzes = this.originalQuizzes;
    } else {
        this.quizzes = this.quizzes.filter(quiz => quiz.name.includes(this.searchTerm));
    }
}


}
