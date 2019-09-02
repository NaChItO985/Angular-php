import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isAdmin: boolean;
  public isLogged: boolean = false;
  public username: string;
  public emailuser: string;

  constructor(public authService: AuthService, public afAuth: AngularFireAuth) { }
  
  public userUid: string = null;
  
  ngOnInit() { 
    this.getCurrentUser();
    this.getCurrentUserAdmin();
  }

  getCurrentUser(){
      this.authService.getAuth().subscribe( auth =>{
      if (auth) {
        this.isLogged=true,
        this.username=auth.displayName;
        this.emailuser=auth.email;
      } else{
        this.isLogged=false;
      }
    })
  }

  getCurrentUserAdmin() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
      }
    })
  }
  onClickLogout(){
    this.afAuth.auth.signOut();
  }
}
