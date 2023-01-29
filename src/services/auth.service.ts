import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { user, userLogin } from 'src/user';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RegisterVerifyDialogComponent } from 'src/app/register-verify-dialog/register-verify-dialog.component';
import { FailedLoginDialogComponent } from 'src/app/failed-login-dialog/failed-login-dialog.component';
import { Router } from '@angular/router';

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

  sendPasswordResetEmail(email: string) {

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

  sendSupport(problem: string) {
    fetch('https://teach-quiz.herokuapp.com/support', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(problem),
    })
      .then(() => {
        console.log('create user Success!');
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

}