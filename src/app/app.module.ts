import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
import { QuizOverviewComponent } from './quiz-overview/quiz-overview.component';
import { VerifyPageComponent } from './verify-page/verify-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QrCodeConvertorComponent } from './all-quizzes/qr-code-convertor.component';
import { QRCodeModule } from 'angularx-qrcode';
import {MatTabsModule} from '@angular/material/tabs';
import { QrCodeDialogComponent } from './qr-code-dialog/qr-code-dialog.component';
import { NgxAbstractControlAsModule } from 'ngx-abstract-control-as';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CreateQuizDialogComponent } from './create-quiz-dialog/create-quiz-dialog.component';
import {MatStepperModule} from '@angular/material/stepper';
import { AdminQuizDetailComponent } from './admin-quiz-detail/admin-quiz-detail.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CopiedSnackbarComponent } from './copied-snackbar/copied-snackbar.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AdminUserDetail2Component } from './admin-user-detail2/admin-user-detail2.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { UserQuizDetailComponent } from './user-quiz-detail/user-quiz-detail.component';
import { DeleteQuizDialogComponent } from './delete-quiz-dialog/delete-quiz-dialog.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FaqComponent } from './faq/faq.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRadioModule} from '@angular/material/radio';

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
    QuizOverviewComponent,
    VerifyPageComponent,
    ProfilePageComponent,
    CreateQuizComponent,
    QrCodeConvertorComponent,
    QrCodeDialogComponent,
    CreateQuizDialogComponent,
    AdminQuizDetailComponent,
    CopiedSnackbarComponent,
    AdminUserDetail2Component,
    UnauthorizedComponent,
    UserQuizDetailComponent,
    DeleteQuizDialogComponent,
    FaqComponent,
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
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule,
    QRCodeModule, 
    MatTabsModule,
    NgxAbstractControlAsModule,
    MatTooltipModule, 
    MatStepperModule,
    ClipboardModule, 
    MatSnackBarModule,
    MatExpansionModule, 
    MatSlideToggleModule,   
    MatProgressSpinnerModule, 
    MatButtonToggleModule,
    MatRadioModule, 

  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
