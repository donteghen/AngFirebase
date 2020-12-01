import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Student } from 'src/model/student.model';
import { StudentService } from 'src/model/student.service';
 
@Component({
  selector: 'app-student-list',
  templateUrl: 'studentList.component.html',
 
})
export class StudentListComponent implements OnInit {
 
  deleteMessage: string;
  studentList: Student[];
  constructor(public service: StudentService, private fireStore: AngularFirestore) { }
 
  ngOnInit() {
    this.service.getAllStudents().subscribe(response => {
      this.studentList = response.map(document => {
        return {
          id: document.payload.doc.id,
          ...document.payload.doc.data() as {}    // Attention - Require typescript version >3 to work!!
        } as Student;
      })
 
      // Sorting the student-list in ascending order.
      this.studentList = this.studentList.sort((obj1, obj2) => (obj1 as any).rollNo - (obj2 as any).rollNo);
    });
  }
 
  onEdit(student: Student) {
    this.service.formData = Object.assign({}, student);
  }
 
  onDelete(student: Student) {
    this.fireStore.doc('students/' + student.id).delete();
    this.deleteMessage = student.name + ' ' + student.surName + ' ' + ' information is successfully deleted!';
  }
}