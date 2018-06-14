import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  public subjectList: any

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.getSubjectList().snapshotChanges().subscribe(subject => {
      this.subjectList = []

      subject.forEach(element => {
        let el = element.payload.toJSON()
        el['$key'] = element.key
        this.subjectList.push(el)
      })
    })
  }

}
