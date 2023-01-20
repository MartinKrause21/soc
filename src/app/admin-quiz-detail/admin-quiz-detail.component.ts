import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { quizUsers } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin-quiz-detail',
  templateUrl: './admin-quiz-detail.component.html',
  styleUrls: ['./admin-quiz-detail.component.css']
})
export class AdminQuizDetailComponent implements OnInit {

  @Input() resultQuizIds: any[];

  contentLoaded: boolean = true;
  username: string;

  public quizUsers :  any[];
  quizName: string;
  userIds: number[];

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {

    this.quizName =String(this.route.snapshot.paramMap.get('name'));

    this.quizService.getAllUsersForQuiz(this.quizName).subscribe(quizUsers => {
      this.quizUsers = quizUsers;
      this.resultQuizIds = this.dataService.getResultQuizIds();
      this.quizUsers = this.quizUsers.map(user => {
        return {
          username: user.username,
          id: this.resultQuizIds[this.quizUsers.indexOf(user)]
        }
      });
    });
  }
}


