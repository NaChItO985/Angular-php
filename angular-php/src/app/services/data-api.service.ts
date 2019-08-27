import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { ProductInterface } from '../models/product';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs:AngularFirestore) { 
    this.productsCollection = afs.collection<ProductInterface>('products');
    this.products = this.productsCollection.valueChanges();
  }
  private productsCollection: AngularFirestoreCollection<ProductInterface>;
  private products: Observable<ProductInterface[]>  
  private productsDoc: AngularFirestoreDocument<ProductInterface>;
  private product: Observable<ProductInterface>;

  getAllProducts(){  
    return this.products = this.productsCollection.snapshotChanges()
    .map(changes =>{
      return changes.map(action =>{
        const data = action.payload.doc.data() as ProductInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    });
  }
  getOneProduct(idproduct: string){ 
    this.productsDoc = this.afs.doc<ProductInterface>(`products/${idproduct}`);
    return this.product = this.productsDoc.snapshotChanges().map(action =>{
      if(action.payload.exists == false){
        return null;
      }else{
        const data = action.payload.data() as ProductInterface;
        data.id = action.payload.id;
        return data;
      }
    })
  }
  addProduct(){ }
  updateProduct(){ }
  deleteProduct(){}

}
