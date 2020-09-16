import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories: any[];
  fiteredProducts: any = [];
  products: any = [];

  @Input('category') category:string; 

  constructor(private categoryService: CategoryService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }


}
