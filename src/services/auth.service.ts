import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {  user, userLogin } from 'src/user';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { RegisterVerifyDialogComponent } from 'src/app/register-verify-dialog/register-verify-dialog.component';
import { FailedLoginDialogComponent } from 'src/app/failed-login-dialog/failed-login-dialog.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userSubject = new Subject<void>();

  headers = new Headers();
  users : user[] = [];
  username!: string;
  role: string;

  constructor(
    private readonly http: HttpClient,
    private cookies: CookieService,
    private dialog : MatDialog, 
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
        return this.http.get<{role: string}>('http://localhost:8080/role',{ headers: this.headerHttp });
      }

      isLoggedIn(): boolean {
        return !!(this.cookies.get('username') && this.cookies.get('password'));
      }

    async login(user: userLogin){

        let authString = `${user.username}:${user.password}`
    
        this.headers.set('Authorization', 'Basic ' + btoa(authString))
        console.log(authString);
        
        try {
          const response = await fetch('http://localhost:8080/login', {
            method: 'GET',
            headers: this.headers,
          });
          const data_1 = await response.json();
          this.cookies.set('username', user.username);
          this.cookies.set('password', user.password);
          console.log(this.cookies.get('username'));

          //this.router.navigate(['home']);
          window.location.href="/home" 
        }
         catch (error) {
          console.log('Error:', error);
          this.showFailDialog();
        }
      }

      createUser (user:user) {
        fetch('http://localhost:8080/register', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(user),
       })
       .then(() => {
         console.log('create user Success!');
         this.cookies.deleteAll();
         //window.location.href="/login" 
         this.showRegisterVerifyialog();
       })
       .catch((error) => {
         console.error('Error:' , error);
         alert("faileeedddd")
       });
   
     }
   
     logout() : void { 
       this.cookies.delete ('username');
       this.cookies.delete('password');
       this.cookies.delete('role');
       //this.cookies.delete('selectedRole');
       this.userSubject.next();
       location.reload();
     }

      changePassword( email:string, password : string){

        fetch('http://localhost:8080/changePassword/'+ email + "/" + password, {
          method: 'PUT',
          headers: new Headers({
            'Content-Type': "application/json; charset=utf8",
        }),
      })
      .then(() => {
        console.log('passw reset Success!');
        window.location.href="/login"
      })
      .catch((error) => {
        console.error('Error:' , error);
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

        fetch('http://localhost:8080/changePasswordEmail/' + email, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': "application/json; charset=utf8",
        }),
      })
      .then(() => {
        console.log('passw email send Success!');
        //this.showPasswordDialog();
      })
      .catch((error) => {
        console.error('Error:' , error);
        alert("faileeedddd")
      });
  
    } 


    verifyUser(code: string) {

      fetch('http://localhost:8080/verify/' + code , {
        method: 'GET',
        headers: new Headers({
          'Content-Type': "application/json; charset=utf8",
      }),
    })
    .then(() => {
      console.log('verify Success!');
    })
    .catch((error) => {
      console.error('Error:' , error);

      alert("faileeedddd")
    });

  }

}