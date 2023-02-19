import { Component, OnInit } from '@angular/core';
import { allFavouriteQuizzes, allUserQuizes, favouriteQuiz, Quiz } from 'src/quiz';
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

  quizzes: allUserQuizes[];
  originalQuizzes: allUserQuizes[];
  favouriteQuizzes: favouriteQuiz[];

  constructor(
    private quizService: QuizService,
  ) { this.originalQuizzes = this.quizzes; }

  visibility = 'hidden';
  contentLoaded = true;

  public QRcodeText: string;

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe(quizzes => {
      this.quizzes = quizzes;
      this.originalQuizzes = quizzes;
      console.log(quizzes, "hahhahahhahaaha");
      this.contentLoaded = false;
    });
      this.quizService.getFavouriteQuizzes().subscribe( result => {
        this.favouriteQuizzes = result;

        console.log(result);
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

  setFavourite(quiz: any) {

      //this.isFavourite = !this.isFavourite;
      const favouriteIndex = this.favouriteQuizzes.findIndex(f => f.quizName === quiz.name);
      if (favouriteIndex >= 0) {
        this.favouriteQuizzes[favouriteIndex].favourite = !this.favouriteQuizzes[favouriteIndex].favourite;
      }
      quiz.isFavourite = !quiz.isFavourite;
      this.quizService.setQuizFavourite(quiz.name);
  }

  unsetFavourite(quiz: any){
    quiz.isFavourite = !quiz.isFavourite;
    this.quizService.unsetFavourite(quiz.name);
  }

}
