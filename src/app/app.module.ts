import { ShoppingCardService } from './shopping-card.service';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AuthService } from './auth.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { SpinnerComponent } from './spinner/spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDemoComponent } from './mat-demo/mat-demo.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    SpinnerComponent,
    MatDemoComponent,
    DataTableComponent,
    ProductCardComponent,
    ShoppingCardComponent,
    ProductFilterComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },

      { path: 'check-out', component: CheckOutComponent ,canActivate:[AuthGuardService]},
      { path: 'order-success', component: OrderSuccessComponent,canActivate:[AuthGuardService] },
      { path: 'my/orders', component: MyOrdersComponent,canActivate:[AuthGuardService] },
      { path: 'admin/products/new', component: ProductFormComponent,canActivate:[AdminAuthGuardService] },
      { path: 'admin/products/:id', component: ProductFormComponent,canActivate:[AdminAuthGuardService] },
      { path: 'admin/products', component: AdminProductsComponent ,canActivate:[AdminAuthGuardService]},


          
      { path: 'admin/orders', component: AdminOrdersComponent,canActivate:[AdminAuthGuardService] },


    ]),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,MatFormFieldModule,MatInputModule 
  ],
  providers: [AuthService,AuthGuardService,UserService,
    AdminAuthGuardService,CategoryService,ProductService,
  ShoppingCardService,{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
