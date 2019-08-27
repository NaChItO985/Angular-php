import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Rx';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afsAuth: AngularFireAuth) { }

    signupUser(email:string, pass: string){
    return new Promise((resolve, reject)=>{
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject (err));
    });
    }

    loginUser(email:string, pass: string){
      return new Promise((resolve, reject)=>{
        this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
        err => reject (err));
      });
      }

      loginFacebookUser(){
        return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      }
      
      loginGoogleUser(){
        return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      }
      
      getAuth(){
      return this.afsAuth.authState.map(auth => auth);
    }
    logout(){
    return this.afsAuth.auth.signOut();
    }
}
