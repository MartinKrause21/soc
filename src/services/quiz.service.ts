import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Quiz, allTeacherQuizes, quizUsers, resultQuiz, allUserQuizes } from '../quiz';
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

  resultQuiz : resultQuiz[];

  authString = `${this.cookies.get('username')}:${this.cookies.get('password')}`

  headerHttp = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa(this.authString)
  });

  getQuiz(quizName: string):Observable <any>  {
    return this.http.get<any>( `http://localhost:8080/get/quiz/${quizName}`);
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

  getAllTeacherQuizes(): Observable<allTeacherQuizes[]> {
    return this.http.get<allTeacherQuizes[]>(`http://localhost:8080/get/quiz/teacher`,  {headers: this.headerHttp});
  }

  getAllUserQuizes(): Observable<allUserQuizes[]> {
    return this.http.get<allUserQuizes[]>(`http://localhost:8080/get/allQuizzes`,  {headers: this.headerHttp});
  }

  getAllUsersForQuiz(quizName:string): Observable<quizUsers[]> {
    return this.http.get<quizUsers[]>(`http://localhost:8080/users/${quizName}`,  {headers: this.headerHttp});
  }

  getUserDetailsForQuiz(quizName:string , username: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/users/${quizName}/${username}`,  {headers: this.headerHttp});
  }

  deleteQuiz(quizName: string) {
    return this.http.delete(`http://localhost:8080/delete/quiz/${quizName}`, {headers: this.headerHttp, responseType: 'text' });
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

  postResultQuiz(quizName: string) {
    const body = { quizName };
    this.http.post('http://localhost:8080/add/resultQuiz', body, { headers: this.headerHttp }).subscribe();
  }

  updateResultQuiz(quizName: string, ans: any, question : string) {

    let authString = `${this.cookies.get("username")}:${this.cookies.get("password")}`

    fetch(`http://localhost:8080/update/resultQuiz/${quizName}`, {  
      method: 'PUT',
      headers: new Headers({
      'Authorization': 'Basic '+btoa(authString), 
      'Content-Type': "application/json; charset=utf8",
    }),
      body: JSON.stringify({ "questionContent": question , "answerList": [ { "answerContent": ans.content, "correct": ans.correct} ]} ),
    })
    .then(() => {
      console.log('Success!');

    })
    .catch((error) => {
      console.error('Error:' , error);
    });
  }

}
