import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FailedLoginDialogComponent } from './failed-login-dialog/failed-login-dialog.component';
import { RegisterVerifyDialogComponent } from './register-verify-dialog/register-verify-dialog.component';
import { PasswordChangeDialogComponent } from './password-change-dialog/password-change-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PasswordResetFormComponent } from './password-reset-form/password-reset-form.component';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    FailedLoginDialogComponent,
    RegisterVerifyDialogComponent,
    PasswordChangeDialogComponent,
    PasswordResetFormComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule, 
    MatToolbarModule, 
    BrowserAnimationsModule, 
    MatSidenavModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDividerModule, 
    MatFormFieldModule, 
    MatCardModule,
    HttpClientModule, 
    MatInputModule, 
    FormsModule,
    MatDialogModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
