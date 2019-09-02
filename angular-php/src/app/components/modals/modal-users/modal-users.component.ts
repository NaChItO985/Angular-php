import { Component, OnInit, ViewChild,ElementRef,Input } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.component.html',
  styleUrls: ['./modal-users.component.css']
})
export class ModalUsersComponent implements OnInit {


  constructor(public dataApi: DataApiService) { }
  @ViewChild('btnClose', {static: false}) btnClose: ElementRef;
  @Input() userUid: string;


  ngOnInit() {
  }

  onSaveUser(userForm: NgForm): void{
    if(userForm.value.id == null){
      //New
      userForm.value.userUid = this.userUid;
      this.dataApi.addUser(userForm.value);
    }else{
      //update
      this.dataApi.updateUser(userForm.value);
    }
    userForm.resetForm();
    this.btnClose.nativeElement.click();
  }



}