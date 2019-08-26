import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogged: boolean = false;
  public username: string;
  public emailuser: string;

  constructor(public authService: AuthService, public afAuth: AngularFireAuth) { }

  ngOnInit() { 
    this.getCurrentUser();
  }

  getCurrentUser(){
      this.authService.getAuth().subscribe( auth =>{
      if (auth) {
        console.log('User logged');
        this.isLogged=true,
        this.username=auth.displayName;
        this.emailuser=auth.email;
      } else{
        console.log('NOT User logged');
        this.isLogged=false;
      }
    })
  }
  onClickLogout(){
    this.afAuth.auth.signOut();
  }
}
