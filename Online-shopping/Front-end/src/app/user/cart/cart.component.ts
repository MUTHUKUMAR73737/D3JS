import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../service/order.service';
import { Product } from 'src/app/Model/product';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'e-shopping-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService]
})
export class CartComponent implements OnInit {
  cartRequestObject: Object;
  cartResponseObject: any;
  cartResponseLength: number = 0;
  arrayObj: any[];
  selectedItems: any[];
  discountAmount: number;
  totalAmount: number;
  items: any[] = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 }
  ];
  // items1: any[] = [
  //   { label: '1', value: 1 },
  //   { label: '2', value: 2 },
  //   { label: '3', value: 3 },
  //   { label: '4', value: 4 },
  //   { label: '5', value: 5 }
  // ];

  userEmail: String;
  deleteFromCartRequest: Object;
  deleteFromCartResponse: any;
  amountChange: number = 0;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.cartRequestObject = {
      email: localStorage.getItem('email')
    };
    this.userEmail = localStorage.getItem('email');
    this.orderService.getCartDetails(this.cartRequestObject).subscribe(
      response => {
        this.cartResponseObject = response;
        console.log(this.cartResponseObject);
      },
      error => {
        console.log('Error');
      }
    );
  }

  getSelectItem(event, price, discount) {
    if (event) {
      this.totalAmount = event.value * price;
      this.discountAmount = this.totalAmount * ((discount * event.value) / 100);
      this.totalAmount = this.totalAmount - this.discountAmount;
      // this.amountChange = this.amountChange + this.totalAmount;
      // console.log(this.amountChange);
    }
  }

  getClick(event) {
    console.log('Click event - ', event);
  }

  // Remove Item from cart
  deleteFromCart(productName) {
    this.deleteFromCartRequest = {
      productName: productName,
      email: this.userEmail
    };
    this.orderService.deleteFromCart(this.deleteFromCartRequest).subscribe(
      response => {
        this.deleteFromCartResponse = response;
        // console.log(this.deleteFromCartResponse);
        if (this.deleteFromCartResponse.message === 'success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Cart Deletion',
            detail: 'You have successfully deleted from cart'
          });
          // Reload page after deletion
          this.orderService.getCartDetails(this.cartRequestObject).subscribe(
            response1 => {
              this.cartResponseObject = response1;
            },
            error => {
              console.log('Error');
            }
          );
        }
      },
      error => {
        console.log('Error at delete from cart');
      }
    );
  }
}
