import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import { AvataruploadService } from '../../services/avatarupload.service';
import { AvatarUpload } from '../../classes/avatarupload';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-avatar-upload-form',
  templateUrl: './avatar-upload-form.component.html',
  styleUrls: ['./avatar-upload-form.component.scss']
})
export class AvatarUploadFormComponent implements OnInit {
  public selectedFiles: FileList;
  public currentUpload: AvatarUpload;
  public user: any

  constructor(private avatarService: AvataruploadService, private authService: AuthService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.flashMessage.show(`Avatar selected   ${this.selectedFiles[0].name}`, {cssClass: 'alert__success alert__profile', timeout: 2000})
  }

  uploadSingle() {
    this.authService.getAuth().subscribe(user => {
      this.user = {
        email: user.email,
        uid: user.uid
      }

      let file = this.selectedFiles.item(0)
      this.currentUpload = new AvatarUpload(file);
      this.avatarService.pushUpload(this.currentUpload, this.user)
    })
  }

}
