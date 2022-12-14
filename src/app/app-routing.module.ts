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
import { AdminQuizDetailComponent } from './admin-quiz-detail/admin-quiz-detail.component';
import { AdminUserDetail2Component } from './admin-user-detail2/admin-user-detail2.component';
import { AuthGuard } from 'src/services/auth.guard';
import { AdminGuard } from 'src/services/admin.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changePassword/:email', component: PasswordResetFormComponent },
  { path: 'quiz-overview', component: QuizOverviewComponent },
  { path: 'quiz/:name', component: QuizComponent },
  { path: 'verify/:code', component: VerifyPageComponent },
  { path: 'profile-page', component: ProfilePageComponent , canActivate: [AuthGuard]  },
  { path: 'create-quiz', component: CreateQuizComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'qr-convertor', component: QrCodeConvertorComponent },
  { path: 'qr-dialog', component: QrCodeDialogComponent },
  { path: 'admin-quiz-detail/:name', component: AdminQuizDetailComponent, canActivate: [AuthGuard, AdminGuard]  },
  { path: 'admin-user-detail/:name/:username', component: AdminUserDetail2Component, canActivate: [AuthGuard, AdminGuard]  },
  { path: 'unauthorized', component: UnauthorizedComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
