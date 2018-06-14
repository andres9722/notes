import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Subject } from '../models/subject';

@Injectable()
export class SubjectService {
  private userList = this.firebaseDB.list('subjects');

  constructor(private firebaseDB: AngularFireDatabase) { }

  getSubjectList () {
    return this.userList;
  }

  createSubject(subject: Subject) {
    return new Promise((resolve, reject) => {
      this.userList.push({
        name: subject.name,
        code: subject.code
      })
      .then(subjectData => resolve(subjectData)),
      err => reject(err)
    })
  }

  removeSubject ($key: string) {
    return new Promise((resolve, reject) => {
      this.userList.remove($key)
      .then(()  => resolve()),
      err => reject(err)
    })
  }

}
