import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from 'src/services/quiz.service';
import { allTeacherQuizes, allUserQuizes, Quiz } from 'src/quiz';
import { AuthService } from 'src/services/auth.service';
import {  allAdmins, allReports, allUsers, sendSupport, sentMail } from 'src/user';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CopiedSnackbarComponent } from '../copied-snackbar/copied-snackbar.component';
import { PasswordChangeEmailSnackbarComponent } from '../password-change-email-snackbar/password-change-email-snackbar.component';
import { SendedSupportSnackbarComponent } from '../sended-support-snackbar/sended-support-snackbar.component';
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
  allAdmins: allAdmins[];
  allUsers: allUsers[];
  quizzes : allUserQuizes[]
  allReports: allReports[];

  email: string = '';

  selected: string;

  model = new sentMail('');

  modelSendSupport = new sendSupport('', '')

  id : string

  resultID : number;

  quizName: string;
  contentLoaded : boolean = true

  isCopied = false;

  role : string;

   idS: any = [];
  ngOnInit(): void {

    this.loggedInUsername = this.cookies.get('username');

    this.resultID = Number(this.route.snapshot.paramMap.get('resultQuizIds'));

    this.quizService.getAllTeacherQuizes().subscribe(response => { 
      this.allTeacherQuizes = response;
      this.contentLoaded =false
    });

    this.quizService.getAllUserQuizes().subscribe(allUserQuizes => { 
      this.allUserQuizes = allUserQuizes;
      console.log(allUserQuizes);
      this.contentLoaded =false
      
        this.idS = allUserQuizes[0].resultQuizIds;
      
      this.dataService.updateResultQuizIds(this.idS);
      this.idS = this.dataService.getResultQuizIds();
     
    });

    this.authService.getAllAdminsForSupervisor().subscribe(allAdmins => this.allAdmins = allAdmins);
    console.log(this.allAdmins);

    this.authService.getAllUsersForSupervisor().subscribe(allUsers => this.allUsers = allUsers);
    console.log(this.allUsers);

    this.authService.getAllReports().subscribe(allReports => this.allReports = allReports);
    console.log(this.allReports);

    this.quizService.getAllQuizzes().subscribe(quizzes => {
      this.quizzes = quizzes;
      console.log(quizzes);
      this.contentLoaded = false;
      
    });
    
    this.role = this.cookies.get('role');
  }
  
  sendUserQuizId(id: number) {
    this.dataService.updateResultQuizId(id);
  }

 sendPasswEmailChange() {
    this.authService.sendPasswordResetEmail(this.model.email);
    setTimeout(() => {
      this.model.email = '';
      this.snackBar.openFromComponent(PasswordChangeEmailSnackbarComponent, {
        duration: 4000,
        panelClass: ['snackbar']
      });
    }, 1000);
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
    this.isCopied = true;
    navigator.clipboard.writeText(`https://soc-eight.vercel.app/quiz/`+quizName).then(() => {
        this.snackBar.openFromComponent(CopiedSnackbarComponent, {
          duration: this.durationInSeconds * 1000,
          panelClass: ['snackbar']
        });
        setTimeout(() => {
          this.isCopied = false;
        }, this.durationInSeconds * 1000);

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

  sendSupport(){
    this.authService.sendSupport(this.modelSendSupport.problem , this.selected);
    console.log( this.modelSendSupport.problem , this.selected );
    setTimeout(() => {
      this.modelSendSupport.problem = '';
      this.selected = '';
      this.snackBar.openFromComponent(SendedSupportSnackbarComponent, {
        duration: 4000,
        panelClass: ['snackbar']
      });
    }, 1000);
  }
  
}
