import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Products[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {

    this.loadProducts();

  }

  loadProducts(){

    this.products = this.productService.getProducts();

  }

}
