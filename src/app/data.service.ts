import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  resultQuizIds: any[] = [];
  quizName: string = '';

  updateResultQuizIds(resultQuizIds: any[], quizName: string) {
    this.resultQuizIds = resultQuizIds;
    this.quizName = quizName;
    console.log(this.resultQuizIds);
  }

  getResultQuizIds() {
    console.log(this.resultQuizIds);
    console.log(this.quizName);
    
    return this.resultQuizIds;
  }
}
