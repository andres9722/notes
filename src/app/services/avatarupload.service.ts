import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";
import * as firebase from 'firebase'
import { AvatarUpload } from '../classes/avatarupload';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AvataruploadService {
  private basePath: string = 'uploads'
  private uploadTaks: firebase.storage.UploadTask
  private avatars: AngularFireList<any>

  constructor(private af: AngularFireModule, private firebaseDB: AngularFireDatabase, private flashMessage: FlashMessagesService) { }

  getAvatar () {
    this.avatars = this.firebaseDB.list('uploads');
    return this.avatars;
  }

  pushUpload(upload: AvatarUpload, user) {
    let storageRef = firebase.storage().ref()
    this.uploadTaks = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file)

    this.uploadTaks.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
      upload.progress = (this.uploadTaks.snapshot.bytesTransferred / this.uploadTaks.snapshot.totalBytes) * 100
    }, err => {
      this.flashMessage.show(err.message, {cssClass: 'alert__error', timeout: 3000})
    }, () => {
      upload.url = this.uploadTaks.snapshot.downloadURL
      upload.name = upload.file.name
      upload.email = user.email
      upload.uid = user.uid
      this.saveFileData(upload, user)
    })
  }

  private saveFileData(upload: AvatarUpload, user) {
    this.firebaseDB.list(`${this.basePath}/`).update(user.uid, upload);
    this.flashMessage.show('Avatar set correctly', {cssClass: 'alert__success alert__profile', timeout: 3000})
  }

  deleteUpload (upload: AvatarUpload) {
    this.deleteFileData(upload.$key)
      .then(() => {
        this.deleteFileStorage(upload.name)
      })
      .catch(err => this.flashMessage.show(err.message, {cssClass: 'alert__error', timeout: 3000}))
  }

  private deleteFileData($key: string) {
    return this.firebaseDB.list(`${this.basePath}/`).remove($key)
  }

  private deleteFileStorage(name: string) {
    let storageRef = firebase.storage().ref()
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

}
