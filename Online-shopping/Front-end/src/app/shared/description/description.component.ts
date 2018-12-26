import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit
} from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/Model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { OrderService } from '../../service/order.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'e-shopping-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  providers: [MessageService]
})
export class DescriptionComponent implements OnInit, AfterViewInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  product: any[]; // to get individual product details from back-end
  breadCrumbItems: any; // bread crumb item details
  home: MenuItem[]; // bread crumb item - home
  productName: any; // to get product name from product list component URL
  currentImage: any; // Product image selection
  userEmail: String;
  userPhone: String;

  isAuthenticatedUser: Boolean = false;

  cartRequest: Object;
  cartResponse: any;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.productName = {
        productName: params.get('productName')
      };
    });



    this.userEmail = localStorage.getItem('email');
    this.userPhone = localStorage.getItem('phone');

    this.productService.getProduct(this.productName).subscribe(
      response => {
        this.product = response;
        console.log(this.product);
        this.currentImage = this.product[0]['imageLocation'].normal;
        this.isAuthenticatedUser = this.authService.isAuthenticatedUser();
        console.log(this.isAuthenticatedUser);
        // Breadcrumb items
        this.breadCrumbItems = [
          { icon: 'pi pi-home', routerLink: '/home' },
          {
            label: `${this.product[0].productType}`,
            routerLink: `/productList/${this.product[0].productType}`
          },
          { label: `${this.product[0].productName}` }
        ];
      },
      error => {
        console.log('Error at product description', error);
      }
    );
  }

  ngAfterViewInit() {}

  sendImage(image) {
    this.currentImage = image;
  }

  addToCart(productName) {
    if (this.userEmail !== null) {
      console.log(this.userEmail);
      console.log('%%%%%%%%%%');

      this.cartRequest = {
        productName: productName,
        email: this.userEmail,
        phone: this.userPhone
      };

      this.orderService.addToCart(this.cartRequest).subscribe(
        response => {
          this.cartResponse = response;
          if (this.cartResponse.message === 'success') {
            this.router.navigateByUrl('/users/cart');
          } else if (this.cartResponse.message === 'Product-exist') {
            this.messageService.add({
              severity: 'success',
              summary: 'Add To Cart',
              detail: 'This product is already in cart'
            });
          }
        },
        error => {
          console.log('Error at add TO cart from description page', error);
        }
      );
    } else {
      Swal('Authentication Failed', 'Authentication Failed .....Please Login', 'info');
    }


  }

  addOrderItem(productName) {

    if (this.userEmail !== null) {
      this.router.navigate(['users/placeOrder'], {queryParams: {name: `${productName}`}});
    } else {
      Swal('Authentication Failed', 'Authentication Failed .....Please Login', 'info');
    }
  }
}
