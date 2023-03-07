import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { allAdmins, allReports, allSchoolNames, allUsers, classUsers, sendSupport, user, userClass, userData, userLogin } from 'src/user';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RegisterVerifyDialogComponent } from 'src/app/register-verify-dialog/register-verify-dialog.component';
import { FailedLoginDialogComponent } from 'src/app/failed-login-dialog/failed-login-dialog.component';
import { Router } from '@angular/router';
import { SucessCreateClassDialogComponent } from 'src/app/sucess-create-class-dialog/sucess-create-class-dialog.component';
import { allTeacherQuizes } from 'src/quiz';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userSubject = new Subject<void>();

  headers = new Headers();
  users: user[] = [];
  username!: string;
  role: string;

  constructor(
    private readonly http: HttpClient,
    private cookies: CookieService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  authString = `${this.cookies.get('username')}:${this.cookies.get('password')}`

  headerHttp = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa(this.authString)
  });

  getToken(): string {
    const authString = `${this.cookies.get('username')}:${this.cookies.get('password')}`
    return 'Basic ' + btoa(authString);
  }

  getUserRole() {
    return this.http.get<{ role: string }>('https://teach-quiz.herokuapp.com/role', { headers: this.headerHttp });
  }

  getUserData()  {
    return this.http.get<{ schoolName: string, classNumber: string }>('https://teach-quiz.herokuapp.com/data/of/current/user', { headers: this.headerHttp });
  }

  getUserPercentage():Observable <number>  {
    return this.http.get<number>('https://teach-quiz.herokuapp.com/currentUser/percentage', { headers: this.headerHttp })  
  } 

  isLoggedIn(): boolean {
    return !!(this.cookies.get('username') && this.cookies.get('password'));
  }

  async login(user: userLogin) {
    let authString = `${user.username}:${user.password}`

    this.headers.set('Authorization', 'Basic ' + btoa(authString))
    console.log(authString);

    try {
      const response = await fetch('https://teach-quiz.herokuapp.com/login', {
        method: 'GET',
        headers: this.headers,
      });
      const data_1 = await response.json();

      //console.log(this.cookies.get('username'));
      setTimeout(() => {
        this.router.navigateByUrl("/home").then(() => {
          location.reload();
        });
      }, 900);

      this.cookies.set('password', user.password);
      this.cookies.set('username', user.username );

    }
    catch (error) {
      console.log('Error:', error);
      this.showFailDialog();
    }
  }



  //   login(user: userLogin) {

  //     let authString = `${user.username}:${user.password}`

  //       this.headers.set('Authorization', 'Basic ' + btoa(authString))
  //       console.log(authString);

  //     return this.http.get('https://teach-quiz.herokuapp.com/login', {
  //         params: new HttpParams().set('user', JSON.stringify(user)), 
  //     }).subscribe(response => {
  //         if (response) {
  //             this.cookies.set('username', user.username);
  //             this.cookies.set('password', user.password);

  //             setTimeout(() => {
  //               location.reload()
  //                   },1200);
  //         }
  //     },
  //     (error: HttpErrorResponse) => {
  //         console.error('Error: ' + error.message);
  //         this.showFailDialog();
  //     });
  // }

  createUser(user: user) {
    fetch('https://teach-quiz.herokuapp.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(() => {
        console.log('create user Success!');
        this.cookies.deleteAll();
        this.showRegisterVerifyialog();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("faileeedddd")
      });

  }

  createAdmin(user: user) {
    fetch('https://teach-quiz.herokuapp.com/register/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(() => {
        console.log('create user Success!');
        this.cookies.deleteAll();
        this.showRegisterVerifyialog();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("faileeedddd")
      });

  }

  createGuest(username: string, password = "password") {
    fetch('https://teach-quiz.herokuapp.com/addUsername/' + username, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        this.cookies.set('username', username);
        this.cookies.set('password', password);
        console.log('guest Success!');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  logout(): void {
    this.cookies.delete('username' );
    this.cookies.delete('password' );
    this.cookies.delete('role' );
    location.reload()
  }

  changePassword(email: string, password: string) {

    fetch('https://teach-quiz.herokuapp.com/changePassword/' + email + "/" + password, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': "application/json; charset=utf8",
      }),
    })
      .then(() => {
        console.log('passw reset Success!');
        window.location.href = "/login"
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("faileeedddd")
      });

  }

  showFailDialog(): void {
    this.dialog.open(FailedLoginDialogComponent);
  }

  showRegisterVerifyialog(): void {
    this.dialog.open(RegisterVerifyDialogComponent);
  }


  sendPasswordResetEmail(email: string):void {

    fetch('https://teach-quiz.herokuapp.com/changePasswordEmail/' + email, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': "application/json; charset=utf8",
      }),
    })
      .then(() => {
        console.log('passw email send Success!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("faileeedddd")
      });

  }

  verifyUser(code: string) {

    fetch('https://teach-quiz.herokuapp.com/verify/' + code, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': "application/json; charset=utf8",
      }),
    })
      .then(() => {
        console.log('verify Success!');
      })
      .catch((error) => {
        console.error('Error:', error);

        alert("faileeedddd")
      });

  }

  sendSupport(reason: string, report: string) {
    fetch('https://teach-quiz.herokuapp.com/support', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic '+btoa(this.authString), 
        'Content-Type': "application/json; charset=utf8",
      },
      body: JSON.stringify( {reason: reason, message: report} ),
    })
      .then(() => {
        console.log('support send Success!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("faileeedddd")
      });

  }

  updateGuest(username: string, password: string, email: string) {
    fetch(`https://teach-quiz.herokuapp.com/update/guest/${username}/${password}/${email}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic '+btoa(this.authString), 
        'Content-Type': "application/json; charset=utf8",
      },
    })
      .then(() => {
        console.log('update guest send Success!');
        this.showRegisterVerifyialog();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("faileeedddd")
      });

  }

  getAllAdminsForSupervisor(): Observable<allAdmins[]> {
    return this.http.get<allAdmins[]>(`https://teach-quiz.herokuapp.com/all/admins`,  {headers: this.headerHttp});
  }
  
  getAllUsersForSupervisor(): Observable<allUsers[]> {
    return this.http.get<allUsers[]>(`https://teach-quiz.herokuapp.com/all/students`,  {headers: this.headerHttp});
  }

  getAllSchoolNames(): Observable<allSchoolNames[]> {
    return this.http.get<allSchoolNames[]>(`https://teach-quiz.herokuapp.com/get/all/schoolNames`,  {headers: this.headerHttp});
  }

  getAllFiltredUsers(schoolName: string, classNumber: string): Observable<allUsers[]> {
    return this.http.get<allUsers[]>(`https://teach-quiz.herokuapp.com/school/class/students/${schoolName}/${classNumber}`,  {headers: this.headerHttp});
  }

  getAllReports(): Observable<allReports[]> {
    return this.http.get<allReports[]>(`https://teach-quiz.herokuapp.com/get/support`,  {headers: this.headerHttp});
  }

  createClass(quizName: string, className: string, usernames: string[]) {
    fetch('https://teach-quiz.herokuapp.com/save/userTable', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic '+btoa(this.authString), 
        'Content-Type': "application/json; charset=utf8",
      },
      body: JSON.stringify( {quizName: quizName, className: className, usernames: usernames} ),
    })
      .then(() => {
        console.log('sucess create class!');
        this.createClassDialog();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("faileeedddd")
      });

  }

  createClassDialog(): void {
    this.dialog.open(SucessCreateClassDialogComponent);
  }

  getAllTeacherClasses(): Observable<userClass[]> {
    return this.http.get<userClass[]>(`https://teach-quiz.herokuapp.com/get/classes`,  {headers: this.headerHttp});
  }

  getAllSchoolClasses(schoolName:string): Observable<string[]> {
    return this.http.get<string[]>(`https://teach-quiz.herokuapp.com/get/all/classNames/${schoolName}`,  {headers: this.headerHttp});
  }

  getAllClassUsers(className: string): Observable<classUsers[]> {
    return this.http.get<classUsers[]>(`https://teach-quiz.herokuapp.com/get/users/table/${className}`,  {headers: this.headerHttp});
  }

  // deleteClass(className: string) {
  //   return this.http.put(`https://teach-quiz.herokuapp.com/delete/table/${className}`, {headers: this.headerHttp });
  // }

  deleteClass(className: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.authString)
    });
    return this.http.put(`https://teach-quiz.herokuapp.com/delete/table/${className}`, {}, { headers });
  }

  getAllAdminQuizzesSupervisor(teacherName: string): Observable<allTeacherQuizes[]> {
    return this.http.get<allTeacherQuizes[]>(`https://teach-quiz.herokuapp.com/get/quiz/teacher/${teacherName}`,  {headers: this.headerHttp});
  }

  addSchool(schoolName: string) {
    fetch(`https://teach-quiz.herokuapp.com/teacher/update/school/${schoolName}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic '+btoa(this.authString), 
        'Content-Type': "application/json; charset=utf8",
      },
    })
      .then(() => {
        console.log('update guest send Success!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("faileeedddd")
      });

  }

  ///update/class/{schoolName}/{oldClassName}/{newClassName}
  editSchoolClass(schoolName: string, classNumber: string, newClassNumber: string) {
    fetch(`https://teach-quiz.herokuapp.com/update/class/${schoolName}/${classNumber}/${newClassNumber}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic '+btoa(this.authString), 
        'Content-Type': "application/json; charset=utf8",
      },
    })
      .then(() => {
        console.log('update guest send Success!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("faileeedddd")
      });

  }

  editClassForUser(schoolName: string, classNumber: string, username: string) {
    fetch(`https://teach-quiz.herokuapp.com/update/student/${schoolName}/${classNumber}/${username}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic '+btoa(this.authString), 
        'Content-Type': "application/json; charset=utf8",
      },
    })
      .then(() => {
        console.log('update guest send Success!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("faileeedddd")
      });

  }

  removeStudentFromClass(username: string) {
    fetch(`https://teach-quiz.herokuapp.com/delete/school/user/${username}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic '+btoa(this.authString), 
        'Content-Type': "application/json; charset=utf8",
      },
    })
      .then(() => {
        console.log('update guest send Success!');
        location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("faileeedddd")
      });

  }

}