import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { User } from '../models/user';

@Injectable()
export class UserService {
  private userList = this.firebaseDB.list('users');

  constructor(private firebaseDB: AngularFireDatabase) { }

  getUserList () {
    return this.userList;
  }

  addUser(user: User) {
    this.userList.push({
      uid: user.uid,
      email: user.email,
      rol: user.rol
    })
  }
}
