import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { quizUsers } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-quiz-detail',
  templateUrl: './admin-quiz-detail.component.html',
  styleUrls: ['./admin-quiz-detail.component.css']
})
export class AdminQuizDetailComponent implements OnInit {

  @Input() resultQuizIds: any[];

  contentLoaded: boolean = true;
  username: string;

  public quizzUsers :  any[];
  public quizUsers :  quizUsers[];
  quizName: string;
  userIds: number[];

  users$: Observable<quizUsers[]>;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {

    this.quizName =String(this.route.snapshot.paramMap.get('name'));

    this.quizService.getAllUsersForQuiz(this.quizName).subscribe(response => {
      this.quizUsers = response;
      this.quizzUsers = response;
      this.contentLoaded =false
      console.log(response);
      
      
      this.resultQuizIds = this.dataService.getResultQuizIds();
      this.quizzUsers = this.quizzUsers.map(user => {
        return {
          username: user.username,
          id: this.resultQuizIds[this.quizzUsers.indexOf(user)]
        }
      });
      
    });

  
  }
}


