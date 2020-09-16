import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$: any = [];
  product: any = {};


  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product)
  }

  getAll() {
    this.products$ = [];
    return this.db.list('/products');
    
  }

  getProduct(pId) {
    this.products$ = [];
    return this.db.object('/products/' + pId).snapshotChanges().take(1)

  }

  update(pId,product) {
    return this.db.object('/products/' + pId).update(product)
  }

  delete(pId) {
    return this.db.object('/products/' + pId).remove();
  }
}
