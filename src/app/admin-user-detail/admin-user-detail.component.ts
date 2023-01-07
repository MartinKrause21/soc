import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { resultQuiz } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.css']
})
export class AdminUserDetailComponent implements OnInit {

  username : string
  quizName: string

  public resultQuiz : resultQuiz [];

  constructor(
    private route: ActivatedRoute,
    private quizService : QuizService,
  ) { }
  

  ngOnInit(): void {

    this.quizName =String(this.route.snapshot.paramMap.get('name'));
    this.username =String(this.route.snapshot.paramMap.get('username'));

    this.quizService.getUserDetailsForQuiz(this.quizName, this.username).subscribe(resultQuiz => { 
        this.resultQuiz = resultQuiz;
        console.log(resultQuiz);
      })
    }

}
