import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Student } from '../models/student';

@Injectable()
export class StudentService {
  private studentList = this.firebaseDB.list('students');

  constructor(private firebaseDB: AngularFireDatabase) { }

  getStudentList () {
    return this.studentList;
  }

  createStudent (student: Student) {
    return new Promise((resolve, reject) => {
      this.studentList.push({
        name: student.name,
        lastName: student.lastName,
        note1: student.note1,
        note2: student.note2,
        note3: student.note3,
        groupId: student.groupId,
        subjectName: student.subjectName
      })
      .then(studentData => resolve(studentData)),
      err => reject(err)
    })
  }

  removeStudent ($key: string) {
    return new Promise((resolve, reject) => {
      this.studentList.remove($key)
      .then(()  => resolve()),
      err => reject(err)
    })
  }

  updateStudent (student: Student) {
    console.log(student)
    return new Promise((resolve, reject) => {
      this.studentList.update(student.$key, {
        groupId: student.groupId,
        lastName: student.lastName,
        name: student.name,
        note1: student.note1,
        note2: student.note2,
        note3: student.note3,
        subjectName: student.subjectName
      })
      .then(() => resolve()),
      err => reject(err)
    })
  }

}
