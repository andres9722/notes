import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public email: string;
  public password: string;
  public loginForm: FormGroup;
  public rol: any;

  constructor(private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private flashMessage: FlashMessagesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(4)])]
    })

    this.authService.getAuth().subscribe(user => {

      this.userService.getUserList().snapshotChanges().subscribe(item => {

        item.forEach(element => {
          let el = element.payload.toJSON()
          if(user.uid === el['uid']) {
            this.rol = el['rol']
          }
        })
      })
    })
  }

  loginUser () {
    this.authService.login(this.email, this.password)
      .then(response => {
        this.flashMessage.show('Inicio sesión correctamente', {cssClass: 'alert__success', timeout: 3000})
        this.rol === 'Estudiante' ?
          this.router.navigate(['/notes'])
          : this.router.navigate(['/subjects'])
      })
      .catch(err => {
        this.flashMessage.show(err.message, {cssClass: 'alert__error', timeout: 3000})
        this.router.navigate(['/login'])
      })
  }

  resetPassword () {
    this.authService.resetPassword(this.email)
      .then(response => this.flashMessage.show('Se envió un correo para recuperar contraseña', {cssClass: 'alert__success', timeout: 3000}))
      .catch(err => this.flashMessage.show(err.message, {cssClass: 'alert__error', timeout: 3000}))
  }

}
