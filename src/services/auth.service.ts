import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
 
 
// For try-catch mechanism.
import { Observable } from 'rxjs/internal/Observable';
 
@Injectable({
  providedIn: 'root'
})
 
export class AuthService {
 
  user: Observable<firebase.User>;
  err: String;
   
  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }
 
  // To sign up a new user.
  signup(emailAddress: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(emailAddress, password)
      .then(value => {
        console.log('Success! User is successfully registered.', value.user.email);
      })
      .catch(error => {
        this.err = error.message;
        console.log('Something went wrong:', error);
      });
  }
 
  // To login a valid user.
  login(emailAddress: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(emailAddress, password)
      .then(value => {
        console.log('User successfully logged in!');
      })
      .catch(error => {
        this.err = error.message;
        console.log('Something went wrong:', error);
      });
  }
 
  // To logout an authenticated user.
  logout() {
    this.firebaseAuth
      .signOut();
  }
}