import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { ProductInterface } from '../../models/product';
import { ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-details-products',
  templateUrl: './details-products.component.html',
  styleUrls: ['./details-products.component.css']
})
export class DetailsProductsComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }
  public product: ProductInterface ={};
  
  ngOnInit() {
      const idProduct = this.route.snapshot.params['id'];
      this.getDetails(idProduct);
      
    }

    getDetails(idProduct: string): void{
      this.dataApi.getOneProduct(idProduct).subscribe( product =>{
        this.product = product;
    });
  
  }

}


