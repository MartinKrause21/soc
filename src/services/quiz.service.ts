import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Quiz, allTeacherQuizes, quizUsers, resultQuiz, allUserQuizes,inputAnswer, allFavouriteQuizzes, favouriteQuiz, TeacherQuizzesPercentage } from '../quiz';
import { user } from '../user';
import { CookieService } from 'ngx-cookie-service';
import { CreateQuizDialogComponent } from 'src/app/create-quiz-dialog/create-quiz-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private dialog : MatDialog, 
    private dataServise: DataService,
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
    return this.http.get<any>( `https://teach-quiz.herokuapp.com/get/quiz/${quizName}`);
  }

  id: number = this.dataServise.getResultQuizId();

  setScore(id: number, score: number) {

    let authString = `${this.cookies.get("username")}:${this.cookies.get("password")}`

    fetch(`https://teach-quiz.herokuapp.com/save/score/${id}/${score}`, {  
      method: 'POST',
      headers: new Headers({
      'Authorization': 'Basic '+btoa(authString), 
      'Content-Type': "application/json; charset=utf8",
    }),
    })
    .then(() => {
      console.log('Success!');
      console.log(this.dataServise.getResultQuizId() + score);
    })
    .catch((error) => {
      console.error('Error:' , error);
    });
  }

  getScore(): Observable<any>{
    return this.http.get(`https://teach-quiz.herokuapp.com/score/{quizId}`, {headers: this.headerHttp})
  }

  createQuizDialog(): void {
    this.dialog.open(CreateQuizDialogComponent);
  }

  getAllTeacherQuizes(): Observable<allTeacherQuizes[]> {
    return this.http.get<allTeacherQuizes[]>(`https://teach-quiz.herokuapp.com/get/quiz/teacher`,  {headers: this.headerHttp});
  }

  getAllTeacherQuizzesPercentage(): Observable<TeacherQuizzesPercentage[]> {
    return this.http.get<TeacherQuizzesPercentage[]>(`https://teach-quiz.herokuapp.com/quiz/percentage/admin`,  {headers: this.headerHttp});
  }

  getAllUserQuizes(): Observable<allUserQuizes[]> {
    return this.http.get<allUserQuizes[]>(`https://teach-quiz.herokuapp.com/get/allUserQuizzes`,  {headers: this.headerHttp});
  }

  getAllUsersForQuiz(quizName:string): Observable<quizUsers[]> {
    return this.http.get<quizUsers[]>(`https://teach-quiz.herokuapp.com/users/${quizName}`,  {headers: this.headerHttp});
  }

  getUserDetailsForQuiz(resultQuizId:number , username: string): Observable<any> {
    return this.http.get<any[]>(`https://teach-quiz.herokuapp.com/users/${resultQuizId}/${username}`,  {headers: this.headerHttp});
  }

  getAllFavouriteQuizzes(): Observable<allFavouriteQuizzes[]> {
    return this.http.get<allFavouriteQuizzes[]>(`https://teach-quiz.herokuapp.com/get/favourite`,  {headers: this.headerHttp});
  }

  getQuizResultForUser(id:number): Observable<any[]> {
    //add authstring

    return this.http.get<any[]>(`https://teach-quiz.herokuapp.com/resultQuiz/${id}`,  {headers: this.headerHttp});
  }

  getAllQuizzes(): Observable<allUserQuizes[]> {
    return this.http.get<allUserQuizes[]>(`https://teach-quiz.herokuapp.com/all/quizzes`);
  }

  deleteQuiz(quizName: string) {
    return this.http.delete(`https://teach-quiz.herokuapp.com/delete/quiz/${quizName}`, {headers: this.headerHttp, responseType: 'text' });
  }

  deleteAdmin(adminName: string) {
    return this.http.delete(`https://teach-quiz.herokuapp.com/delete/admin/${adminName}`, {headers: this.headerHttp, responseType: 'text' });
  }

  deleteStudent(userName: string) {
    return this.http.delete(`https://teach-quiz.herokuapp.com/delete/student/${userName}`, {headers: this.headerHttp, responseType: 'text' });
  }

  deleteReport(reportId: number) {
    return this.http.delete(`https://teach-quiz.herokuapp.com/delete/support/${reportId}`, {headers: this.headerHttp, responseType: 'text' });
  }

  addQuiz(quiz: Quiz) {

    let authString = `${this.cookies.get("username")}:${this.cookies.get("password")}`

    fetch('https://teach-quiz.herokuapp.com/add/quiz', {  
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

  editQuiz(quizName:string, quiz: Quiz) {

    let authString = `${this.cookies.get("username")}:${this.cookies.get("password")}`

    fetch(`https://teach-quiz.herokuapp.com/update/quiz/${quizName}`, {  
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
    this.http.post('https://teach-quiz.herokuapp.com/add/resultQuiz', body, { headers: this.headerHttp }).subscribe((response: any) => {
      this.dataServise.updateResultQuizId(response.id);
    })
  }

  updateResultQuiz( ans: any, question : string) {

    let authString = `${this.cookies.get("username")}:${this.cookies.get("password")}`

    fetch(`https://teach-quiz.herokuapp.com/update/resultQuiz/${this.dataServise.getResultQuizId()}`, {  
      method: 'PUT',
      headers: new Headers({
      'Authorization': 'Basic '+btoa(authString), 
      'Content-Type': "application/json; charset=utf8",
    }),
      body: JSON.stringify({ "answerList": ans, "questionContent": question }),
    })
    .then(() => {
      console.log('Success!');

    })
    .catch((error) => {
      console.error('Error:' , error);
    });
  }

  updateResultQuizInput( question : string, answer: any){

    let authString = `${this.cookies.get("username")}:${this.cookies.get("password")}`

    fetch(`https://teach-quiz.herokuapp.com/update/resultQuiz/${this.dataServise.getResultQuizId()}`, {  
      method: 'PUT',
      headers: new Headers({
      'Authorization': 'Basic '+btoa(authString), 
      'Content-Type': "application/json; charset=utf8",
    }),
      body: JSON.stringify({ "questionContent": question , "answerList": answer} ),
    })
    .then(() => {
      console.log('Success!');

    })
    .catch((error) => {
      console.error('Error:' , error);
    });
  }

  getFavouriteQuizzes(): Observable<favouriteQuiz[]>{
    return this.http.get<any[]>(`https://teach-quiz.herokuapp.com/get/favourite`,  {headers: this.headerHttp});
  }

  setQuizFavourite(quizName:string) {

    let authString = `${this.cookies.get("username")}:${this.cookies.get("password")}`

    fetch(`https://teach-quiz.herokuapp.com/set/favourite/${quizName}`, {  
      method: 'PUT',
      headers: new Headers({
      'Authorization': 'Basic '+btoa(authString), 
      'Content-Type': "application/json; charset=utf8",
    }),
    })
    .then(() => {
      console.log('Success!');
    })
    .catch((error) => {
      console.error('Error:' , error);
    });
  }

  unsetFavourite(quizName: string){
    return this.http.put(`https://teach-quiz.herokuapp.com/unset/favourite/${quizName}`,  {headers: this.headerHttp});
  }

}
