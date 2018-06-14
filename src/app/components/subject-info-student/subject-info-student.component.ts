import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-subject-info-student',
  templateUrl: './subject-info-student.component.html',
  styleUrls: ['./subject-info-student.component.scss']
})
export class SubjectInfoStudentComponent implements OnInit {
  public subject: any
  public studentList: any

  constructor(private studentService: StudentService, private router: Router, private route: ActivatedRoute, private subjectService: SubjectService,) { }

  ngOnInit() {
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

}
