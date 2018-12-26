import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/Model/product';

@Component({
  selector: 'e-shopping-product-comparison',
  templateUrl: './product-comparison.component.html',
  styleUrls: ['./product-comparison.component.css']
})
export class ProductComparisonComponent implements OnInit {
  totalProduct: Product[];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductDetails().subscribe(
      response => {
        this.totalProduct = response;
        console.log(this.totalProduct);
      },
      error => {
        console.log('Error at product comparison');
      }
    );
  }
}
