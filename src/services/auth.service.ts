import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
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
       
          //console.log(this.cookies.get('username'));
          setTimeout(() => {
            //location.reload()
            this.router.navigateByUrl("/home").then(() => {
              location.reload();
            });
          },900);

          this.cookies.set('username', user.username);
          this.cookies.set('password', user.password);
          
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

    //     return this.http.get('http://localhost:8080/login', {
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
         this.showRegisterVerifyialog();
       })
       .catch((error) => {
         console.error('Error:' , error);
         alert("faileeedddd")
       });
   
     }

     createGuest(username: string, password = "password") 
     {
      fetch('http://localhost:8080/addUsername/' +username, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
      })
      .then(() => {
          this.cookies.set('username', username);
          this.cookies.set('password',password);
          console.log('guest Success!');
      })
      .catch((error) => {
          console.error('Error:' , error);
      });
  }
   
     logout() : void { 
       //this.cookies.deleteAll('/');
       //this.cookies.deleteAll('/quiz');
       //this.cookies.deleteAll('/profile-page');
       this.cookies.delete('username', '/', 'localhost', false, 'Lax');
       this.cookies.delete('username', '/quiz', 'localhost', false, 'Lax');

       this.cookies.delete('password', '/', 'localhost', false, 'Lax');
       this.cookies.delete('password', '/quiz', 'localhost', false, 'Lax');

       this.cookies.delete('role', '/', 'localhost', false, 'Lax');
       this.cookies.delete('role', '/quiz', 'localhost', false, 'Lax');
       
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