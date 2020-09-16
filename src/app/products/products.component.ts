import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { ShoppingCardService } from '../shopping-card.service';
import 'rxjs/add/operator/switchMap'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  products: any = [];
  @Input('shopping-card') shoppingCart;
  category: string;
  filteredProducts: any=[];
  cart: any;
  subscription:Subscription

  constructor(private prod: ProductService, 
    private cartService: ShoppingCardService, private route: ActivatedRoute) {


      
  }


  getQuantity(product) {
    if (this.cart) return 0;
    let item = {};
    this.cartService.items.forEach(element => {
      if (element.$key == product.$key) {
        item['quantity'] = element.quantity
      }
    });
    return item ? item['quantity'] : 0;
  }

  addCart(product) {
    this.cartService.addToCart(product);
  }


   async ngOnInit() {
      (await this.cartService.getCart()).snapshotChanges().subscribe(cart=>{
        this.cart =cart.payload.toJSON();
     })
    
    this.prod.getAll().snapshotChanges().switchMap(data=>{
      data.forEach(product=>{
        let p =product.payload.toJSON();
        p['key']=product.key; 
        this.products.push(p);
        product
      });
      return this.route.queryParamMap;
    })
    .subscribe(params=>{
      this.category =params.get('category');
      this.filteredProducts=[];

      (this.category)?
      this.products.filter(p=>{
        if (p.category === this.category)
          this.filteredProducts.push(p)
      })
    : this.filteredProducts=this.products;
  });
  }
  ngOnDestroy()  {
    this.subscription ? this.subscription.unsubscribe()
    : this.subscription
  }



}
