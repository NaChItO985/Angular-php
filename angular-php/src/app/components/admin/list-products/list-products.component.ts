import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { ProductInterface } from '../../../models/product';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']

})
export class ListProductsComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  public products: ProductInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListProducts();
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

  getListProducts() {
    this.dataApi.getAllProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  onDeleteBook(idProduct: string): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.dataApi.deleteProduct(idProduct);
    }
  }

  onPreUpdateBook(product: ProductInterface) {
    this.dataApi.selectedProduct = Object.assign({}, product);
  }
}

