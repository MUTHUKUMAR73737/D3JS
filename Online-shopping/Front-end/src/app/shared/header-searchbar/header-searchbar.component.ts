import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'e-shopping-header-searchbar',
  templateUrl: './header-searchbar.component.html',
  styleUrls: ['./header-searchbar.component.css']
})
export class HeaderSearchbarComponent implements OnInit {

  productType: any;

  result: String[] = [
    'Watches', 'mobile'
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sendProductType() {

if (this.productType !== undefined) {
  this.router.navigate([`productList/${this.productType}`]);
} else {
  Swal('Information', 'Please select your product type you want to search!', 'info');
}

  }

}
