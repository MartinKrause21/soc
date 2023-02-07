import { Component, OnInit } from '@angular/core';
import { allUserQuizes } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-qr-code-convertor',
  templateUrl: './qr-code-convertor.component.html',
  styleUrls: ['./qr-code-convertor.component.css'],
  animations: [
    trigger('animateBottom', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(10%)',
        filter: 'blur(3px)'
      })),
      transition('hidden => visible', animate('300ms ease-in'))
    ])
  ]
})
export class QrCodeConvertorComponent implements OnInit {

  quizzes : allUserQuizes[]
  originalQuizzes: allUserQuizes[];

  constructor(
    private quizService : QuizService,
  ) { this.originalQuizzes = this.quizzes;}

  visibility = 'hidden';
  contentLoaded = true;

  public QRcodeText:string;

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe(quizzes => {
      this.quizzes = quizzes;
      this.originalQuizzes = quizzes;
      console.log(quizzes);
      this.contentLoaded = false;
      
    });

    setTimeout(() => {
      this.visibility = 'visible';
    }, 300);
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
