import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCardService } from '../shopping-card.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product:Product;
  @Input('shopping-cart') shoppingCart;
  constructor(private cartService :ShoppingCardService) { }

  ngOnInit(): void {
  }
  addToCart(){
    this.cartService.addToCart(this.product);
  }
  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item;
    this.shoppingCart['items'] ? 
    item = this.shoppingCart['items'][this.product.key] : item =item ;
   return item ? item.quantity : 0;
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }
}
