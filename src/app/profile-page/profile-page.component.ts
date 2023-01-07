import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from 'src/services/quiz.service';
import { allTeacherQuizes, Quiz } from 'src/quiz';
import { AuthService } from 'src/services/auth.service';
import {  sentMail } from 'src/user';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CopiedSnackbarComponent } from '../copied-snackbar/copied-snackbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {


  constructor(
    private cookies: CookieService,
    private quizService: QuizService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private http : HttpClient
  ) { }


  // authString = `${this.cookies.get('username')}:${this.cookies.get('password')}`

  // headerHttp = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: 'Basic ' + btoa(this.authString)
  // });
  
  allTeacherQuizes : allTeacherQuizes[] = [];
  loggedInUsername: string;

  email: string = '';

  model = new sentMail('');

  id : string

  quizName: string;

  isCopied = false;

  role : string;


  ngOnInit(): void {

    this.loggedInUsername = this.cookies.get('username');

    this.quizName =String(this.route.snapshot.paramMap.get('name'));

    this.quizService.getAllTeacherQuizes().subscribe(allTeacherQuizes => { 
      this.allTeacherQuizes = allTeacherQuizes;
      console.log(allTeacherQuizes);
    });

    // this.http.get<{role: string}>('http://localhost:8080/role ',  {headers: this.headerHttp}).subscribe(response => {
    //   this.role = response.role;
    // });

    this.authService.getUserRole().subscribe(response => {
      this.role = response.role;
    });
  }
  
  onSubmit() {
    this.authService.sendPasswordResetEmail(this.model.email);
    console.log(this.model.email);
  }

  delete(quizName: string) {
    this.quizService.deleteQuiz(quizName).subscribe(() => {
      console.log('Success!');
      location.reload()
    }, error => {
      console.error('Error:' , error);
    });
  }

  durationInSeconds = 2;

  copyText(quizName : string): void {
    navigator.clipboard.writeText(`http://localhost:4200/quiz/`+quizName).then(() => {
        this.snackBar.openFromComponent(CopiedSnackbarComponent, {
          duration: this.durationInSeconds * 1000,
          panelClass: ['snackbar']
        });
    }, (error: any) => {
      console.error('Error:' , error);
    });
  }
}
