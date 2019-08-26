import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public email: string;
  public password: string;
  public user: string;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }
    onSubmitAddUser(){
      this.authService.signupUser(this.email, this.password)
      .then((res) => { 
        this.router.navigate(['./admin']);
      }).catch((err) => {
        console.log('err', err.message);
      }) 
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
  onLoginRedirect() :void{
    this.router.navigate(['/adminpage']);
  } 
}
