import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { ProductInterface } from '../models/product';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { UserInterface } from '../models/user';
import { Roles } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {


  constructor(private afs:AngularFirestore) { 
    this.productsCollection = afs.collection<ProductInterface>('products');
    this.products = this.productsCollection.valueChanges();
    this.usersCollection = afs.collection<UserInterface>('users');
    this.users = this.usersCollection.valueChanges();
  }


  private productsCollection: AngularFirestoreCollection<ProductInterface>;
  private products: Observable<ProductInterface[]>  
  private productsDoc: AngularFirestoreDocument<ProductInterface>;
  private product: Observable<ProductInterface>;
  public selectedProduct: ProductInterface = {
    id:null
  };


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
  addProduct(product: ProductInterface):void{ 
      this.productsCollection.add(product);
  }
  updateProduct(product: ProductInterface):void{
    let idProduct = product.id;
    this.productsDoc = this.afs.doc<ProductInterface>(`products/${idProduct}`);
    this.productsDoc.update(product);
   }
  deleteProduct(idProduct: string):void{
    this.productsDoc = this.afs.doc<ProductInterface>(`products/${idProduct}`);
    this.productsDoc.delete();

  }



  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private users: Observable<UserInterface[]>  
  private usersDoc: AngularFirestoreDocument<UserInterface>;
  private user: Observable<UserInterface>;
  public    roles: Roles;
  public selectedUser:  UserInterface = {
    id:null,    
    roles: this.roles
  };




  getAllUsers(){  
    return this.users = this.usersCollection.snapshotChanges()
    .map(changes =>{
      return changes.map(action =>{
        const data = action.payload.doc.data() as UserInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    });
  }

  getOneUsers(idUser: string){ 
    this.usersDoc = this.afs.doc<UserInterface>(`users/${idUser}`);
    return this.user = this.usersDoc.snapshotChanges().map(action =>{
      if(action.payload.exists == false){
        return null;
      }else{
        const data = action.payload.data() as UserInterface;
        data.id = action.payload.id;
        return data;
      }
    })
  }

  addUser(user: UserInterface):void{ 
      this.usersCollection.add(user);
  }

  updateUser(user: UserInterface):void{
    let idProduct = user.id;
    this.usersDoc = this.afs.doc<UserInterface>(`users/${user}`);
    this.usersDoc.update(user);
   }

  deleteUser(idUser: string):void{
    this.usersDoc = this.afs.doc<UserInterface>(`users/${idUser}`);
    this.usersDoc.delete();

  }
}

