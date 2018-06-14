import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLogin: boolean;
  public rol: any;
  public animatedMenu: boolean = false;
  public animatedIconMenu: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
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

  logout () {
    this.authService.logout()
  }

  showMenu () {
    this.animatedMenu = !this.animatedMenu
    this.animatedIconMenu = !this.animatedIconMenu
  }

}
