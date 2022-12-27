import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Quiz } from '../quiz';
import { user } from '../user';
import { CookieService } from 'ngx-cookie-service';
import { CreateQuizDialogComponent } from 'src/app/create-quiz-dialog/create-quiz-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private dialog : MatDialog, 
  ) { }

  quizes : Quiz[];
  users : user[] = [];

  authString = `${this.cookies.get('username')}:${this.cookies.get('password')}`

  headerHttp = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa(this.authString)
  });

  getQuiz(quizName: string):Observable <any>  {
    return this.http.get<any>( `http://localhost:8080/get/quiz/${quizName}`, { headers: this.headerHttp });
  }

  setScore(score: number, quizName: string): Observable<any> {
    console.log(score);
    
    return this.http.post(`http://localhost:8080/save/score/${quizName}/${score}`,  {headers: this.headerHttp});
  }

  getScore(): Observable<any>{
    return this.http.get(`http://localhost:8080/score/{quizId}`, {headers: this.headerHttp})
  }

  createQuizDialog(): void {
    this.dialog.open(CreateQuizDialogComponent);
  }

  addQuiz(quiz: Quiz) {

    let authString = `${this.cookies.get("username")}:${this.cookies.get("password")}`

    fetch('http://localhost:8080/add/quiz', {  
      method: 'POST',
      headers: new Headers({
      'Authorization': 'Basic '+btoa(authString), 
      'Content-Type': "application/json; charset=utf8",
    }),
      body: JSON.stringify(quiz),
    })
    .then(() => {
      console.log('Success!');
      this.createQuizDialog();

    })
    .catch((error) => {
      console.error('Error:' , error);
    });
  }


}
