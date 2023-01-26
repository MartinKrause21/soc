import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from 'src/services/quiz.service';
import { allTeacherQuizes, allUserQuizes, Quiz } from 'src/quiz';
import { AuthService } from 'src/services/auth.service';
import {  sentMail } from 'src/user';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CopiedSnackbarComponent } from '../copied-snackbar/copied-snackbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteQuizDialogComponent } from '../delete-quiz-dialog/delete-quiz-dialog.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  @Output() resultQuizIdsChange = new EventEmitter<any[]>();

  constructor(
    private cookies: CookieService,
    private quizService: QuizService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private http : HttpClient, 
    private dialog : MatDialog,
    private dataService: DataService,
  ) { }
  
  allTeacherQuizes : allTeacherQuizes[] = [];
  allUserQuizes : allUserQuizes [] = []; 
  loggedInUsername: string;
  resultQuizIds: any[];

  email: string = '';

  model = new sentMail('');

  id : string

  resultID : number;

  quizName: string;

  isCopied = false;

  role : string;

   idS: any = [];
  ngOnInit(): void {

    this.loggedInUsername = this.cookies.get('username');

    this.resultID = Number(this.route.snapshot.paramMap.get('resultQuizIds'));

    this.quizService.getAllTeacherQuizes().subscribe(response => { 
      this.allTeacherQuizes = response;
    });

    this.quizService.getAllUserQuizes().subscribe(allUserQuizes => { 
      this.allUserQuizes = allUserQuizes;
      console.log(allUserQuizes);
      
        this.idS = allUserQuizes[0].resultQuizIds;
      
      this.dataService.updateResultQuizIds(this.idS);
      this.idS = this.dataService.getResultQuizIds();
     
    });

    this.role = this.cookies.get('role');
  }
  
  sendUserQuizId(id: number) {
    this.dataService.updateResultQuizId(id);
  }

  onSubmit() {
    this.authService.sendPasswordResetEmail(this.model.email);
    console.log(this.model.email);
  }

  sendId(quiz: any) {
    //check if ids belong to the same quiz
    this.dataService.updateResultQuizIds(quiz.resultQuizIds);
    console.log(quiz.resultQuizIds, 'robo');
    
    console.log(quiz.quizId);
    
    this.dataService.getResultQuizIds();
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
  
  openDialog(quizName: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      quizName: quizName
    };

    this.dialog.open(DeleteQuizDialogComponent, dialogConfig);
  }
}
