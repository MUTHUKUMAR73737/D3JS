import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'e-shopping-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  cols: any[];
  brands: any[];
  colors: any[];
  type: any[];
  priceFilter: number;
  priceTimeout: any;
  colorArray = new Array();
  brandArray = new Array();
  discountArray = new Array();
  stockArray = new Array();
  nameArray = new Array();
  typeArray = new Array();

  totalAdminProductRequest: Object;
  totalAdminProductResponse: any;
  productResponse: any[];

  deleteProductResponse: any;
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.totalAdminProductRequest = {
      admin: localStorage.getItem('userId')
    };
    this.adminService
      .getTotalAdminProduct(this.totalAdminProductRequest)
      .subscribe(
        response => {
          this.totalAdminProductResponse = response;
          if (this.totalAdminProductResponse.message === 'success') {
            this.totalAdminProductResponse = this.totalAdminProductResponse.result;
            this.productResponse = this.totalAdminProductResponse;

            for (const product of this.productResponse) {
              this.nameArray.push(product.productName);
              this.colorArray.push({
                label: product.productColor,
                value: product.productColor
              });
              // this.brandArray.push(product.productBrand);
              // this.discountArray.push(product.productDiscount);
              // this.stockArray.push(product.stock);
              // this.typeArray.push(product.productType);
            }
          } else if (this.totalAdminProductResponse.message === 'failure') {
            this.totalAdminProductResponse = null;
          }
        },
        error => {
          console.log('Error at getting total admin product ');
        }
      );

    console.log(
      this.nameArray,
      this.typeArray,
      this.colorArray,
      this.brandArray,
      this.stockArray,
      this.discountArray
    );
    this.brands = [{ label: 'All Brands', value: null }];

    this.type = [
      { label: 'All Types', value: null },
      { label: 'Mobile', value: 'mobile' },
      { label: 'Watch', value: 'Watches' }
    ];

    this.colors = this.colorArray;

    this.cols = [
      { field: 'productName', header: 'Name' },
      { field: 'productType', header: 'Type' },
      { field: 'productBrand', header: 'Brand' },
      { field: 'productPrice', header: 'Price' },
      { field: 'productColor', header: 'Color' },
      // { field: 'stock', header: 'Stock' },
      // { field: 'productDiscount', header: 'Discount' }
    ];
  }

  onPriceChange(event, dt) {
    if (this.priceTimeout) {
      clearTimeout(this.priceTimeout);
    }

    this.priceTimeout = setTimeout(() => {
      dt.filter(event.value, 'productPrice', 'gt');
    }, 250);
  }


  updateProduct(productName) {
    this.router.navigate([`/admin/updateProduct/${productName}`]);
  }

  deleteProduct(productName) {
    console.log('Delete = ', name);

    Swal({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.adminService.deleteProduct(productName).subscribe(
          response => {
            this.deleteProductResponse = response;
            if (this.deleteProductResponse.message === 'success') {
              // Swal(
              //   'Deleted!',
              //   'Your product has been deleted.',
              //   'success'
              // );

              const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });

              toast({
                type: 'success',
                title: 'Your product has been deleted successfully'
              });
            } else if (this.deleteProductResponse.message === 'failure') {
              Swal(
                'Error!',
                `Your product hasn't yet deleted.`,
                'warning'
              );
            }
          }, error => {
            console.log('Error at product deletion');
          }
        );

      }
    });
  }
}
