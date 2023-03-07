import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { quizUsers } from 'src/quiz';
import { QuizService } from 'src/services/quiz.service';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Sort } from '@angular/material/sort';

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
  originalUsers : quizUsers [];
  quizName: string;
  userIds: number[];

  users$: Observable<quizUsers[]>;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private dataService: DataService,
  ) {    this.originalUsers = this.quizUsers; }

  ngOnInit(): void {

    this.quizName =String(this.route.snapshot.paramMap.get('name'));

    this.quizService.getAllUsersForQuiz(this.quizName).subscribe(response => {
      this.quizUsers = response;
      this.quizzUsers = response;
      this.originalUsers = this.quizUsers;
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

  searchTerm: string;

  searchUsers() {
    if (!this.searchTerm) {
      this.quizUsers = this.originalUsers;
    } else {
      this.quizUsers = this.quizUsers.filter(user => user.username.includes(this.searchTerm));
    }
  }

  sortData(sort: Sort) {
    const data = this.quizUsers.slice();
    if (!sort.active || sort.direction === '') {
      this.quizUsers = data;
      return;
    }

    this.quizUsers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.username, b.username, isAsc);
        case 'date':
          return compare(a.date, b.date, isAsc);

        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


