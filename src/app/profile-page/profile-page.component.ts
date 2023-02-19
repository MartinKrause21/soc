import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from 'src/services/quiz.service';
import { allFavouriteQuizzes, allTeacherQuizes, allUserQuizes, Quiz, TeacherQuizzesPercentage } from 'src/quiz';
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
import { DeleteAdminDialogComponent } from '../delete-admin-dialog/delete-admin-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { DeleteReportDialogComponent } from '../delete-report-dialog/delete-report-dialog.component';

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
  allFavouriteQuizzes : allFavouriteQuizzes [] = [];
  allTeacherQuizesPercentage: TeacherQuizzesPercentage [] = [];
  loggedInUsername: string;
  resultQuizIds: any[];
  allAdmins: allAdmins[];
  allUsers: allUsers[];
  quizzes : allUserQuizes[]
  allReports: allReports[];

  email: string = '';

  reason: string;

  model = new sentMail('');

  modelSendSupport = new sendSupport('', '')

  id : string

  resultID : number;

  quizName: string;
  contentLoaded : boolean = true

  isCopied = false;

  role : string;
  userPercentage: number | null = null;

   idS: any = [];
  ngOnInit(): void {

    this.loggedInUsername = this.cookies.get('username');

    this.resultID = Number(this.route.snapshot.paramMap.get('resultQuizIds'));

    this.quizService.getAllFavouriteQuizzes().subscribe(response => { 
      this.allFavouriteQuizzes = response;
      this.contentLoaded =false
      console.log("favourite:"+response);
    });

    this.quizService.getAllTeacherQuizes().subscribe(response => { 
      this.allTeacherQuizes = response;
      this.contentLoaded =false
    });

    this.quizService.getAllTeacherQuizzesPercentage().subscribe(response => { 
      this.allTeacherQuizesPercentage = response;
      console.log(response + "percentage");
      
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

    this.authService.getUserPercentage().subscribe(percentage => {
      this.userPercentage = parseFloat(percentage.toFixed(2));
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

  copyText(quiz: any): void {
    quiz.isCopied = true;
    navigator.clipboard.writeText(`https://soc-eight.vercel.app/quiz/` + quiz.name).then(() => {
      this.snackBar.openFromComponent(CopiedSnackbarComponent, {
        duration: this.durationInSeconds * 1000,
        panelClass: ['snackbar']
      });
      setTimeout(() => {
        quiz.isCopied = false;
      }, this.durationInSeconds * 1000);
    }, (error: any) => {
      console.error('Error:', error);
    });
  }
  
  openDeleteQuizDialog(quizName: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      quizName: quizName
    };

    this.dialog.open(DeleteQuizDialogComponent, dialogConfig);
  }

  openDeleteAdminDialog(adminName: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      adminName: adminName
    };

    this.dialog.open(DeleteAdminDialogComponent, dialogConfig);
  }

  openDeleteStudentDialog(userName: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      userName: userName
    };

    this.dialog.open(DeleteUserDialogComponent, dialogConfig);
  }

  openDeleteReportDialog(reportId: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      reportId: reportId
    };

    this.dialog.open(DeleteReportDialogComponent, dialogConfig);
  }

  sendSupport(){
    this.authService.sendSupport(this.reason, this.modelSendSupport.problem );
    console.log(this.reason, this.modelSendSupport.problem );
    setTimeout(() => {
      this.modelSendSupport.problem = '';
      this.reason = '';
      this.snackBar.openFromComponent(SendedSupportSnackbarComponent, {
        duration: 4000,
        panelClass: ['snackbar']
      });
    }, 1000);
  }

  getReasonIcon(reason: string) {
    switch (reason) {
      case 'HELP':
        return 'question_answer';
      case 'BUG':
        return 'bug_report';
      default:
        return 'help';
    }
  }

  progressValue = 70;
  
}
