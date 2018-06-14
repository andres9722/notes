import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AvataruploadService } from '../../services/avatarupload.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from '../../models/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  public userData: User;
  public userActive: any;

  public userActiveEmail: string;
  public userActiveAvatar: string;

  public userInfo: any = {};

  public profileForm: FormGroup;

  constructor(private authService: AuthService,
              private avatarService: AvataruploadService,
              private flashMessage: FlashMessagesService,
              private userService: UserService,
              private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.authService.getAuth().subscribe(user => {
      this.userActiveEmail = user.email;

      this.userService.getUserList().snapshotChanges().subscribe(item => {

        item.forEach(element => {
          let el = element.payload.toJSON()
          if(user.uid === el['uid']) {
            this.userActive = el
          }
        })
      })

      this.avatarService.getAvatar().snapshotChanges().subscribe(item => {
        this.userActiveAvatar = ''
        item.forEach(users => {
          let active = users.payload.toJSON()
          if (user.uid === active['uid']) {
            this.userActiveAvatar = active['url']
          }
        })
      })
    })
  }

}
