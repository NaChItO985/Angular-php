import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( public authService: AuthService, private router: Router, private storage: AngularFireStorage){  
  }
  
  @ViewChild('imageUser') inputImageUser: ElementRef;
  public email: string='';
  public password: string='';
  
  

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  user: any;

  
  

  ngOnInit() {
  }

    onUpload(e){
      const id = Math.random().toString(36).substring(2);
      const file = e.target.files[0];
      const filepath = `uploads/profile_${id}`;
      const ref = this.storage.ref(filepath);
      const task = this.storage.upload(filepath, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(()=> this.urlImage = ref.getDownloadURL())).subscribe();
    }

    onSubmitAddUser(){
      this.authService.signupUser(this.email, this.password)
      .then((res) => { 
        this.authService.getAuth().subscribe( user=>{    
        if(user){
            user.updateProfile({
            displayName: '',
            photoURL: this.inputImageUser.nativeElement.value
          }).then(()=>{
          }).catch((error)=>{console.log('error', error);})
        }
        })
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
