import { Observable } from 'rxjs/internal/Observable';
import { Student } from './student.model';
import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'

@Injectable({
    providedIn:'root'
})
export class StudentService{
    formData: Student;
   
    constructor(private firestore:AngularFirestore){}
    getAllStudents(){
        return this.firestore.collection('students').snapshotChanges();
    }

}