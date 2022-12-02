import { Component, OnInit } from '@angular/core';
import { Question } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(
    private quizService: QuizService,
  ) { }


  answersQuestions: Question[] =[];
  selectedQuestion: Question;
  id: string

  ngOnInit(): void {

  //   this.quizService.getQuizes(this.id).subscribe(response=> {
  //     console.log(response); 
  //     this.answersQuestions=response;
  //     this.selectedQuestion=response[0]

  //     //this.isContentLoaded = true
  //  });
  }

}
