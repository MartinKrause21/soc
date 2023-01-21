import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  resultQuizIds: any[] = [];
  quizName: string = '';
  resultQuizId: number;

  updateResultQuizIds(resultQuizIds: any[]) {
    this.resultQuizIds = resultQuizIds;
    console.log(this.resultQuizIds);
  }

  getResultQuizIds() {
    console.log(this.resultQuizIds);
    console.log(this.quizName);
    
    return this.resultQuizIds;
  }

  updateResultQuizId(resultQuizId: number) {
    this.resultQuizId = resultQuizId;
  }

  getResultQuizId() {
    return this.resultQuizId;
  }
}
