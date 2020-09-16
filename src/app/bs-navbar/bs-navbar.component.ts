import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ShoppingCardService } from '../shopping-card.service';
@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser;
  allItemsCount:number =0;
  constructor(public authService:AuthService,private cartService : ShoppingCardService,
    private route : Router) { 
    this.appUser =  JSON.parse(localStorage.getItem('appUser'));

  }

  async ngOnInit() {
    this.appUser =  JSON.parse(localStorage.getItem('appUser'));
     let cart =   (await this.cartService.getCart()).snapshotChanges();
    cart.subscribe(items=>{
      this.allItemsCount=0;

     let results =  items.payload.toJSON();

    if(results){
      for(let product in results['items']){
        this.allItemsCount+=results['items'][product]['quantity'];
     }
    }
    })
  }

  logout(){
    localStorage.clear();
    this.ngOnInit()
    this.authService.logOut();
    this.route.navigate(['/']);
  }

}
