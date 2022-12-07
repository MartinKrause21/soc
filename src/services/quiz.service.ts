import { HttpClient } from '@angular/common/http';
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

  getQuizes(quizName: string):Observable <any[]>  {
    return this.http.get<any[]>('http://localhost:8080/quiz/' + quizName)
  }
}
