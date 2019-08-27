import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Rx';
import { from } from 'rxjs';


import { UserInterface } from '../models/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

    signupUser(email: string, pass: string) {
      return new Promise((resolve, reject) => {
        this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
          .then(userData => {
            resolve(userData),
              this.updateUserData(userData.user)
          }).catch(err => console.log(reject(err)))
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
        .then(credential =>{this.updateUserData(credential.user)})

      }
      
      loginGoogleUser(){
        return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(credential =>{this.updateUserData(credential.user)})
      }
      
      getAuth(){
      return this.afsAuth.authState.map(auth => auth);
      }
      logout(){
      return this.afsAuth.auth.signOut();
      }
      
      private updateUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const data: UserInterface = {
          id: user.uid,
          email: user.email,
          roles: {
            admin:true
          }
        }
        return userRef.set(data, { merge: true })
      }

      isUserAdmin(userUid){
        return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
      }
}
