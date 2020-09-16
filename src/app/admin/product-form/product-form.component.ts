import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: any = {};
  categories$;
  id: string;
  loader:boolean=false;
  constructor(private categoryService: CategoryService,
    private prod: ProductService, private activatedRoute: ActivatedRoute,
    private router: Router) {


  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) this.prod.getProduct(this.id).subscribe(data=>{
      this.product = data.payload.toJSON();
    })
    this.categories$ = this.categoryService.getCategories();
  }
  save(product) {
    this.loader=true;
    if (this.id) {
      let productt = this.prod.update(this.id,product.value).then(data=>{
        this.loader=false;
      });
    }
    else {
      this.prod.create(product.value);
    }
    this.router.navigate(['/admin/products']);

  }

  delete(){
   if( !confirm('Are You sure ?')) return;
   this.loader=true;

   this.prod.delete(this.id);
   this.loader=false;
   this.router.navigate(['/admin/products']);
  }

}
