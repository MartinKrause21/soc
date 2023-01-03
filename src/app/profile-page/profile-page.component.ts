import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from 'src/services/quiz.service';
import { allTeacherQuizes, Quiz } from 'src/quiz';
import { AuthService } from 'src/services/auth.service';
import { sentMail } from 'src/user';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CopiedSnackbarComponent } from '../copied-snackbar/copied-snackbar.component';

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
    private snackBar: MatSnackBar
  ) { }
  
  allTeacherQuizes : allTeacherQuizes[] = [];
  loggedInUsername: string;

  email: string = '';

  model = new sentMail('');

  id : string

  quizName: string;

  isCopied = false;


  ngOnInit(): void {

    this.loggedInUsername = this.cookies.get('username');

    this.quizName =String(this.route.snapshot.paramMap.get('name'));

    this.quizService.getAllTeacherQuizes().subscribe(allTeacherQuizes => { 
      this.allTeacherQuizes = allTeacherQuizes;
      console.log(allTeacherQuizes);
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
