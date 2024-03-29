import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from 'src/services/quiz.service';
import { allFavouriteQuizzes, allTeacherQuizes, allUserQuizes, Quiz, TeacherQuizzesPercentage } from 'src/quiz';
import { AuthService } from 'src/services/auth.service';
import {  allAdmins, allReports, allUsers, sendSupport, sentMail, userClass, userData } from 'src/user';
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
import { DeleteClassDialogComponent } from '../delete-class-dialog/delete-class-dialog.component';
import { AddSchoolDialogComponent } from '../add-school-dialog/add-school-dialog.component';
import { ChangeSchoolClassDialogComponent } from '../change-school-class-dialog/change-school-class-dialog.component';
import {Sort} from '@angular/material/sort';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  @Output() resultQuizIdsChange = new EventEmitter<any[]>();
  classNames$: Observable<string[]>;

  constructor(
    private cookies: CookieService,
    private quizService: QuizService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private http : HttpClient, 
    private dialog : MatDialog,
    private dataService: DataService,
  ) { 
    this.originalUserQuizzes = this.allUserQuizes;

  }
  panelOpenState:boolean = false;
  
  allTeacherQuizes : allTeacherQuizes[] = [];
  allUserQuizes : allUserQuizes [] = []; 
  originalUserQuizzes : allUserQuizes [] = [];
  allFavouriteQuizzes : allFavouriteQuizzes [] = [];
  allTeacherQuizesPercentage: TeacherQuizzesPercentage [] = [];
  loggedInUsername: string;
  resultQuizIds: any[];
  allAdmins: allAdmins[];
  allUsers: allUsers[];
  quizzes : allUserQuizes[]
  allReports: allReports[];
  userClass: userClass[];
  userData: { schoolName: string, classNumber: string } = { schoolName: '', classNumber: '' };

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
   

    this.authService.getUserData().subscribe(
      ({ schoolName, classNumber }) => {
        this.userData = { schoolName, classNumber };

        this.classNames$ = this.authService.getAllSchoolClasses(this.userData.schoolName);
      },
      (error) => {
        console.error(error);
      }
    );
  

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

    this.authService.getAllTeacherClasses().subscribe(response => { 
      this.userClass = response;
      this.contentLoaded = false
    });

    this.quizService.getAllUserQuizes().subscribe(allUserQuizes => { 
      this.allUserQuizes = allUserQuizes;
      this.originalUserQuizzes = allUserQuizes;
      console.log(allUserQuizes);
      this.contentLoaded =false
      
        this.idS = allUserQuizes[0].resultQuizId;
      
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
    navigator.clipboard.writeText(`https://queasy.vercel.app/quiz/` + quiz.name).then(() => {
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

  openEditClassNameDialog(schoolName: string, classNumber: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      schoolName: schoolName,
      classNumber: classNumber
    };

    this.dialog.open(ChangeSchoolClassDialogComponent, dialogConfig);
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

  openDeleteClassDialog(className: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      className: className
    };

    this.dialog.open(DeleteClassDialogComponent, dialogConfig);
  }

  addSchoolDialog() {
    this.dialog.open(AddSchoolDialogComponent);
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

  sortData(sort: Sort) {
    const data = this.allUserQuizes.slice();
    if (!sort.active || sort.direction === '') {
      this.allUserQuizes = data;
      return;
    }

    this.allUserQuizes = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'adminName':
          return compare(a.creatorName, b.creatorName, isAsc);
        case 'date':
          return compare(a.date, b.date, isAsc);

        default:
          return 0;
      }
    });
  }

  searchTerm: string;

  searchQuizzes() {
    if (!this.searchTerm) {
      this.allUserQuizes = this.originalUserQuizzes;
    } else {
      this.allUserQuizes = this.allUserQuizes.filter(quiz => quiz.name.includes(this.searchTerm));
    }
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

