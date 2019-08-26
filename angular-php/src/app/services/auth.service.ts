import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

    signupUser(email:string, pass: string){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject (err));
    });
    }

    loginUser(email:string, pass: string){
      return new Promise((resolve, reject)=>{
        this.afAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
        err => reject (err));
      });
      }
    getAuth(){
      this.afAuth.authState.map( auth => auth);
    }
    logout(){
    return this.afAuth.auth.signOut();
    }
}