import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Quiz } from '../quiz';
import { user } from '../user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) { }

  quizes : Quiz[];
  users : user[] = [];
  headers = new Headers();

  getQuiz(quizName: string):Observable <any>  {
    let authString = `${this.cookies.get('username')}:${this.cookies.get('password')}`


    let headerHttp = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(authString)
    });
    
    return this.http.get<any>( `http://localhost:8080/get/quiz/${quizName}`, { headers: headerHttp });
  }


}
