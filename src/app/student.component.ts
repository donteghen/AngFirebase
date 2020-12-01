import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { StudentService } from 'src/model/student.service';
 
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  
})
export class StudentComponent implements OnInit {
    form: NgForm;
    message:string;
    constructor(public service: StudentService, private fireStore: AngularFirestore) { }
    ngOnInit(){
      this.form.resetForm();
    }

    resetForm(form?: NgForm) {
        if (form != null) {
          form.resetForm();
        }
        this.service.formData = {
          id: null,
          name:'',
          surName: '',
          branchName: '',
          rollNo: '',
          guardianPhoneNo: ''
        }
      }

      onSubmit(form: NgForm) {
        // Reset the message value.
        this.message = '';
     
        // Making the copy of the form and assigning it to the studentData.
        let studentData = Object.assign({}, form.value);
     
        // To avoid messing up the document id and just update the other details of the student. We will remove the 'property' from the student data.
        delete studentData.id;
     
        // Does the insert operation.
        if (form.value.id == null) {
          this.fireStore.collection('students').add(studentData);
          this.message = studentData.name + ' ' + studentData.surName + ' information is successfully saved!';
        } else {
          // Does the update operation for the selected student.
          // The 'studentData' object has the updated details of the student.
          this.fireStore.doc('students/' + form.value.id).update(studentData);
          this.message = 'Student successfully updated!';
        }
     
        // Reset the form if the operation is successful.
        this.resetForm(form);
      }
    }
