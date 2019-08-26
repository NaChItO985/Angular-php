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
      }).catch((err) => {
        console.log(err);
      })
  }  
}
