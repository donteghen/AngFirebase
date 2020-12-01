import { StudentService } from './../model/student.service';
import { StudentListComponent } from './studentList.component';
import { StudentComponent } from './student.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent, StudentComponent, StudentListComponent
  ],
  imports: [
    BrowserModule,FormsModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
