import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from '../../models/user';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public email: string;
  public password: string;
  public rol: string;
  public registerForm: FormGroup;
  public user: User;

  constructor(private authService: AuthService, private UserService: UserService, private router: Router, private flashMessage: FlashMessagesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'rol': [null, Validators.compose([Validators.required])]
    })
  }

  registerUser () {
    this.authService.registerUser(this.email, this.password)
      .then(response => {
        this.flashMessage.show('Usuario creado correctamente', {cssClass: 'alert__success', timeout: 3000})
        this.user = {
          uid: response['uid'],
          email: response['email'],
          rol: this.rol
        }
        this.createUser()
        this.rol === 'Estudiante' ?
          this.router.navigate(['/notes'])
          : this.router.navigate(['/subjects'])
      })
      .catch(err => {
        this.flashMessage.show(err.message, {cssClass: 'alert__error', timeout: 3000})
      })
  }

  createUser () {
    this.UserService.addUser(this.user)
  }
}
