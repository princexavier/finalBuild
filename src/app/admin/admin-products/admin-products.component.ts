import { Product } from './../../models/product';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from 'src/app/data-table/data-table-datasource';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$: any = [];
  filteredProds: any=[];
  products:any=[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource=new MatTableDataSource();
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [2, 10, 25, 100];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title','category','price','empty'];

  constructor(private productsService: ProductService) { }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;

    this.products$ = this.productsService.getAll().
    snapshotChanges().forEach(sc => {
      sc.forEach(data => {
        let product = data.payload.toJSON()
        product['$key'] = data.key;
        this.products.push(product);
      });
      this.filter(null)
    });

  }

  filter(query:HTMLInputElement) {
    this.filteredProds=[];
    if (query && query.value) {
      this.products.filter(product => {
        if (product.title.toLowerCase().includes(query.value))
          this.filteredProds.push(product)

      });
      this.dataSource = new MatTableDataSource(this.filteredProds);

    }
    else {
      this.dataSource=this.filteredProds = this.products;
      this.dataSource = new MatTableDataSource(this.filteredProds);

    }
    this.dataSource.sort=this.sort;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

   // MatPaginator Output
   pageEvent: PageEvent;

   setPageSizeOptions(setPageSizeOptionsInput: string) {
     if (setPageSizeOptionsInput) {
       this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
     }
   }
}
