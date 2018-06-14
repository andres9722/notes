import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SubjectsPageComponent } from './components/subjects-page/subjects-page.component';
import { NotesComponent } from './components/notes/notes.component';
import { SubjectInfoComponent } from './components/subject-info/subject-info.component';
import { SubjectInfoStudentComponent } from './components/subject-info-student/subject-info-student.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'subjects', component: SubjectsPageComponent, canActivate: [AuthGuard] },
  { path: 'subjects/subject/:key', component: SubjectInfoComponent, canActivate: [AuthGuard] },
  { path: 'subjectss/subject/:key', component: SubjectInfoStudentComponent, canActivate: [AuthGuard] },
  { path: 'notes', component: NotesComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
