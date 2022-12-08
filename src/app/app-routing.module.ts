import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetFormComponent } from './password-reset-form/password-reset-form.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizOverviewComponent } from './quiz-overview/quiz-overview.component';
import { VerifyPageComponent } from './verify-page/verify-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QrCodeConvertorComponent } from './qr-code-convertor/qr-code-convertor.component';
import { QrCodeDialogComponent } from './qr-code-dialog/qr-code-dialog.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'passw-reset-form', component: PasswordResetFormComponent },
  { path: 'quiz-overview', component: QuizOverviewComponent },
  { path: 'quiz/:name', component: QuizComponent },
  { path: 'verify/:code', component: VerifyPageComponent },
  { path: 'profile-page', component: ProfilePageComponent },
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'qr-convertor', component: QrCodeConvertorComponent },
  { path: 'qr-dialog', component: QrCodeDialogComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
