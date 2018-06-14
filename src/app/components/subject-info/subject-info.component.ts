import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubjectService } from '../../services/subject.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-subject-info',
  templateUrl: './subject-info.component.html',
  styleUrls: ['./subject-info.component.scss']
})
export class SubjectInfoComponent implements OnInit {
  public subject: any
  public name: string;
  public lastName: string;
  public note1: string;
  public note2: string;
  public note3: string;
  public student: any
  public studentList: any
  public display: string = 'none'
  public updateStudent: any

  public nameUpdate: string
  public lastNameUpdate: string
  public note1Update: string
  public note2Update: string
  public note3Update: string

  public subjectForm: FormGroup
  public updateForm: FormGroup

  constructor(private router: Router,
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private flashMessage: FlashMessagesService,
    private studentService: StudentService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.subjectForm = this.fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'lastName': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'note1': [null, Validators.compose([Validators.required])],
      'note2': [null, Validators.compose([Validators.required])],
      'note3': [null, Validators.compose([Validators.required])]
    })

    this.updateForm = this.fb.group({
      'nameUpdate': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'lastNameUpdate': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'note1Update': [null, Validators.compose([Validators.required])],
      'note2Update': [null, Validators.compose([Validators.required])],
      'note3Update': [null, Validators.compose([Validators.required])]
    })

    this.getSubject(this.route.snapshot.params['key'])

    this.studentService.getStudentList().snapshotChanges().subscribe(student => {
      this.studentList = []
      student.forEach(element => {
        let el = element.payload.toJSON()
        el['$key'] = element.key
        if(this.subject.$key === el['groupId']) {
          this.studentList.push(el)
        }
      })
    })
  }

  getSubject ($key) {
    this.subject = this.subjectService.getSubjectList().snapshotChanges().subscribe(item => {
      this.subject = null
      item.forEach(element => {
        let el = element.payload.toJSON()
        el['$key'] = element.key
        if($key === el['$key']) {
          this.subject = el
        }
      })
    })
  }

  addStudent () {
    this.student = {
      name: this.name,
      lastName: this.lastName,
      note1: this.note1,
      note2: this.note2,
      note3: this.note3,
      groupId: this.subject.$key,
      subjectName: this.subject.name
    }

    this.studentService.createStudent(this.student)
      .then(subject => this.flashMessage.show('Estudiante agregado correctamente', {cssClass: 'alert__success  alert__profile', timeout: 3000}))
      .catch(err => this.flashMessage.show('Error al crear', {cssClass: 'alert__error', timeout: 3000}))

    this.name = ""
    this.lastName = ""
    this.note1 = ""
    this.note2 = ""
    this.note3 = ""
  }

  removeStudent ($key) {
    this.studentService.removeStudent($key)
      .then(() => this.flashMessage.show('Estudiante eliminado correctamente', {cssClass: 'alert__success  alert__profile', timeout: 3000}))
  }

  openModalToUpdate (student) {
    this.display = 'block'
    this.updateStudent = student
    this.updateForm.setValue({
      nameUpdate: student.name,
      lastNameUpdate: student.lastName,
      note1Update: student.note1,
      note2Update: student.note2,
      note3Update: student.note3,
    })
  }

  closeModal () {
    this.display = 'none'
    this.updateStudent = null
  }

  updateStudents () {
    this.student = {
      $key: this.updateStudent.$key,
      name: this.updateForm.controls['nameUpdate'].value,
      lastName: this.updateForm.controls['lastNameUpdate'].value,
      note1: this.updateForm.controls['note1Update'].value,
      note2: this.updateForm.controls['note2Update'].value,
      note3: this.updateForm.controls['note3Update'].value,
      groupId: this.subject.$key,
      subjectName: this.subject.name
    }

    this.studentService.updateStudent(this.student)
      .then(subject => {
        this.closeModal()
        this.flashMessage.show('Estudiante actualizado correctamente', {cssClass: 'alert__success  alert__profile', timeout: 3000})
      })
      .catch(err => this.flashMessage.show('Error al actualizar', {cssClass: 'alert__error  alert__profile', timeout: 3000}))

    this.nameUpdate = ""
    this.lastNameUpdate = ""
    this.note1Update = ""
    this.note2Update = ""
    this.note3Update = ""
  }

}
