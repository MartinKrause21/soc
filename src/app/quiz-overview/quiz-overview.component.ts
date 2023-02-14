import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { allUserQuizes } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styleUrls: ['./quiz-overview.component.css'],
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
export class QuizOverviewComponent implements OnInit {

  constructor(
    private cookies : CookieService,
    private quizService: QuizService
  ) { }

  role : string
  loggedInUsername: string;
  visibility = 'hidden';

  quizzes : allUserQuizes[];

  ngOnInit(): void {
    this.role = this.cookies.get('role');
    this.loggedInUsername = this.cookies.get('username');

    this.quizService.getAllQuizzes().subscribe(quizzes => {
      this.quizzes = quizzes;
      console.log(quizzes);
    });

    setTimeout(() => {
      this.visibility = 'visible';
    }, 200);
  }

}
