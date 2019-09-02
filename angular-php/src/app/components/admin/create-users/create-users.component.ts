import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';


 

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  public users: UserInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListUsers();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
      }
    })
  }

  getListUsers() {
    this.dataApi.getAllUsers()
      .subscribe(user => {
        this.users = user;
      });
  }

  onDeleteUser(idUser: string): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.dataApi.deleteProduct(idUser);
    }
  }

  onPreUpdateUser(user: UserInterface) {
    this.dataApi.selectedUser = Object.assign({}, user);
  }
}



