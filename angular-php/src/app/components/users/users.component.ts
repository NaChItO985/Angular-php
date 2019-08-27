import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  public products = [];
  public product = '';
  ngOnInit() {
    this.dataApi.getAllProducts().subscribe(products => {
      console.log('PRODUCTS', products);
      this.products = products;
    })
  }

}

