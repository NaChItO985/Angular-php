import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string='';
  public password: string='';
  public user: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
  }

  onloginFacebookUser(){
    //this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then((res) => {
      this.authService.loginFacebookUser().then((res) =>{
        console.log('resUser', res)
        this.onLoginRedirect();
      } ).catch((err) => console.log('err', err.message));  
  }
  onloginGoogleUser(){
    //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((res) => {
      this.authService.loginGoogleUser().then((res) =>{
        this.onLoginRedirect();
      }).catch((err) => {
      console.log('err', err.message);
    })  
  }
  onSubmitLogin(){
    this.authService.loginUser(this.email, this.password).then((res) => {
        this.onLoginRedirect();
    }).catch((err) => {
      console.log(err.message);
      this.router.navigate(['/login']);
    })
  }
 onLogout(){
   this.authService.logout();
 }
 onLoginRedirect() :void{
   this.router.navigate(['/adminpage']);
 }
}
