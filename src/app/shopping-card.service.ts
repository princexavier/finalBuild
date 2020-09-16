import { Product } from './models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {

  items: any = [];
  itemsInCart: any = [];
  constructor(private db: AngularFireDatabase) { }

  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async addToCart(product) {
    this.items = [];
    let dummyObject = {};
    dummyObject['title'] = product.title;
    dummyObject['price'] = product.price;
    dummyObject['category'] = product.category;
    let cartId = await this.getOrCreateCartId();
    let items$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product['key'])

    items$.snapshotChanges().take(1).subscribe(item => {
      let result = item.payload.toJSON();
      if (result) {
        items$.update({ quantity: result['quantity'] + 1 });
      }
      else {
        items$.set({ "product": dummyObject, quantity: 1 })
      }

       result ? result['$key'] = product.key :result={};

      this.items.push(result);
    })
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
   
  }

  getAllItemsincart(cartId) {
    return this.db.list('/shopping-carts/' + cartId)

  }

  async getItem(cartId,product){
   return  this.db.object('/shopping-carts/' + cartId + '/items/' + product['key']);
  }

   async removeFromCart(product) {
    let cartId = await  this.getOrCreateCartId()
    let items$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product['key']);

    items$.snapshotChanges().take(1).subscribe(item=>{
      let result  = item.payload.toJSON();
      items$.update({product:product,quantity:(result['quantity'] || 0) - 1})
    })
  }

}
