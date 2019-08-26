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

  public email: string;
  public password: string;
  public user: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
  }

  onloginFacebookUser(){
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then((res) => {
      this.router.navigate(['/adminpage']);
    }).catch((err) => {
      console.log(err);
      this.router.navigate(['/login']);
    })
    
  }
  
  onloginGoogleUser(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((res) => {
      this.router.navigate(['/adminpage']);
    }).catch((err) => {
      console.log(err);
      this.router.navigate(['/login']);
    })  
  }

  onloginTwitterUser(){
    this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider()).then((res) => {
      this.router.navigate(['/adminpage']);
    }).catch((err) => {
      console.log(err);
      this.router.navigate(['/login']);
    })
  }
  
  onSubmitLogin(){
    this.authService.loginUser(this.email, this.password).then((res) => {
        this.router.navigate(['/adminpage']);
    }).catch((err) => {
      console.log(err);
      this.router.navigate(['/login']);
    })
  }

}
