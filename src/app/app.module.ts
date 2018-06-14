import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from '../environments/environment';
import { FlashMessagesModule } from "angular2-flash-messages";
import { FlashMessagesService } from "angular2-flash-messages";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AvataruploadService } from './services/avatarupload.service';
import { AvatarUploadFormComponent } from './components/avatar-upload-form/avatar-upload-form.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UserService } from './services/user.service';
import { SubjectService } from './services/subject.service';
import { SubjectsPageComponent } from './components/subjects-page/subjects-page.component';
import { NotesComponent } from './components/notes/notes.component';
import { SubjectInfoComponent } from './components/subject-info/subject-info.component';
import { StudentService } from './services/student.service';
import { SubjectInfoStudentComponent } from './components/subject-info-student/subject-info-student.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    NotFoundPageComponent,
    HeaderComponent,
    ProfilePageComponent,
    AvatarUploadFormComponent,
    SpinnerComponent,
    SubjectsPageComponent,
    NotesComponent,
    SubjectInfoComponent,
    SubjectInfoStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FlashMessagesModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthService, AuthGuard, FlashMessagesService, AvataruploadService, UserService, SubjectService, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
