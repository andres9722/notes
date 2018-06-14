import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from '../../models/subject';

@Component({
  selector: 'app-subjects-page',
  templateUrl: './subjects-page.component.html',
  styleUrls: ['./subjects-page.component.scss']
})
export class SubjectsPageComponent implements OnInit {
  public name: string;
  public code: string;
  public subject: Subject
  public subjectForm: FormGroup;
  public subjectList: any

  constructor(private flashMessage: FlashMessagesService,
    private fb: FormBuilder,
    private subjectService: SubjectService,
  ) { }

  ngOnInit() {
    this.subjectForm = this.fb.group({
      'name': [null, Validators.compose([Validators.required])],
      'code': [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    })

    this.subjectService.getSubjectList().snapshotChanges().subscribe(subject => {
      this.subjectList = []

      subject.forEach(element => {
        let el = element.payload.toJSON()
        el['$key'] = element.key
        this.subjectList.push(el)
      })
    })
  }

  addSubject () {
    this.subject = {
      name: this.name,
      code: this.code
    }

    this.subjectService.createSubject(this.subject)
    .then(subject => {this.flashMessage.show('Grupo creado correctamente', {cssClass: 'alert__success  alert__profile', timeout: 3000})})
    .catch(err => this.flashMessage.show('Error al crear', {cssClass: 'alert__error', timeout: 3000}))

    this.name = null
    this.code = null
  }

  removeSubject ($key) {
    console.log('key', $key)
    this.subjectService.removeSubject($key)
      .then(() => this.flashMessage.show('Grupo eliminado correctamente', {cssClass: 'alert__success  alert__profile', timeout: 3000}))
      .catch(err => this.flashMessage.show('Error al eliminar', {cssClass: 'alert__error', timeout: 3000}))
  }

}
