import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { OrderService } from '../../service/order.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'e-shopping-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
  providers: [MessageService]
})
export class PlaceOrderComponent implements OnInit {
  orderAddressForm: FormGroup;
  orderForm: FormGroup;
  paymentForm: FormGroup;
  productItems: FormArray;

  getCartRequestObject: Object;
  cartResponseObject: any[];
  arrayObj: any[];
  selectedItems: any[];
  userEmail: String;
  orderProductName: String;
  orderProductResponse: any;
  orderProductObj: Object;
  enableRemoveItem: Boolean = false;
  deleteFromCartRequest: Object;
  deleteFromCartResponse: any;
  orderObject: Object;

  myData:  number = 0;
  val2: string = 'cashOnDelivery';
  index: number = 0;
  items: any[] = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 }
  ];
  debitCardExpiryYear: any[] = [
    { label: '2018', value: '2018' },
    { label: '2019', value: '2019' },
    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' }
  ];
  debitCardExpiryMonth: any[] = [
    { label: 'Jan', value: '01' },
    { label: 'Feb', value: '02' },
    { label: 'Mar', value: '03' },
    { label: 'Apr', value: '04' },
    { label: 'May', value: '05' },
    { label: 'Jun', value: '06' },
    { label: 'Jul', value: '07' },
    { label: 'Aug', value: '08' },
    { label: 'Sep', value: '09' },
    { label: 'Oct', value: '10' },
    { label: 'Nov', value: '11' },
    { label: 'Dec', value: '12' }
  ];
  deliveryState: any[] = [
    { label: 'Tamilnadu', value: 'Tamilnadu' },
    { label: 'Kerala', value: 'Kerala' }
  ];
  deliveryDistrict: any[];
  deliveryType: any[] = [
    { label: 'Home', value: 'Home' },
    { label: 'Office', value: 'Office' }
  ];
  tnObj: any[] = [
    { label: 'Chennai', value: 'Chennai' },
    { label: 'Coimbatore', value: 'Coimbatore' },
    { label: 'Salem', value: 'Salem' },
    { label: 'Madurai', value: 'Madurai' }
  ];
  klObj: any[] = [
    { label: 'Palakkad', value: 'Palakkad' },
    { label: '	Alappuzha', value: 'Alappuzha' },
    { label: 'Kozhikode', value: 'Kozhikode' },
    { label: 'Malappuram', value: 'Malappuram' }
  ];

  sampleArray: any[] = [
    {productName: '', item: '',  price: ''}
  ];
  orderResponse: any;
  discountAmount: number;
  totalAmount: number;
  enableCaptchaSubmit: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: CustomerService,
    private orderService: OrderService,
    private messageService: MessageService,
    private activatesRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatesRoute.queryParams.subscribe(parameter => {
      this.orderProductName = parameter['name'];
    });

    // Order Items from User Cart
    if (this.orderProductName === undefined) {
      this.getCartRequestObject = {
        email: localStorage.getItem('email')
      };
      this.userEmail = localStorage.getItem('email');
      this.orderService.getCartDetails(this.getCartRequestObject).subscribe(
        response => {
          this.cartResponseObject = response;
        },
        error => {
          console.log('Error at order item from cart');
        }
      );
    } else {
      // Order Item from description
      this.orderProductObj = {
        productName: this.orderProductName
      };

      this.userService
        .getOrderProduct(this.orderProductObj)
        .subscribe(response => {
          this.orderProductResponse = response;
          this.enableRemoveItem = true;
          if (!this.orderProductResponse.message) {
            this.cartResponseObject = this.orderProductResponse;
            console.log(this.cartResponseObject);
          } else if (this.orderProductResponse.message) {
            this.messageService.add({
              severity: 'error',
              detail: 'Product does not exist',
              summary: 'Product Not Exist'
            });
          }
        });
    }
    this.orderAddressForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(3), Validators.maxLength(40)]],
      phone: ['', [Validators.required, Validators.pattern('[9876]{1}[0-9]{9}')]],
      pinCode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      address: ['', Validators.required],
      landMark: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      alternatePhone: ['', [Validators.pattern('[9876]{1}[0-9]{9}')]],
      district: ['', [Validators.required]],
      state: ['', [Validators.required]],
      type: ['', Validators.required]
    });

    this.orderForm = this.formBuilder.group({
      item: ['']
      // item: ['', Validators.required],
      // amount: new FormControl(
      //   { value: null, disabled: true },
      //   Validators.required
      // ),
      // productItems: this.formBuilder.array([])
    });

    this.paymentForm = this.formBuilder.group({
      debitCard: [''],
      cvv: [''],
      expiryYear: [''],
      expiryMonth: ['']
    });
  }


  // get orderFormData() {
  //   return this.orderForm.get('productItems') as FormArray;
  // }

  // addTeam() {
  //   const member = this.formBuilder.group({
  //     item: ['', Validators.required]
  //   });
  //   this.orderFormData.push(member);
  // }

  // createItem(): FormGroup {
  //   return this.formBuilder.group({
  //     item: ['', Validators.required]
  //   });
  // }
  // addItem(): void {
  //   this.productItems = this.orderForm.get('items') as FormArray;
  //   this.items.push(this.createItem());
  // }

  paymentSelection(event) {
    console.log('Index - ', event.index);

    if (event.index === 0) {
      this.enableCaptchaSubmit = false;

      this.paymentForm = this.formBuilder.group({
        debitCard: [''],
        cvv: [''],
        expiryYear: [''],
        expiryMonth: ['']
      });
    } else if (event.index === 1) {
      this.paymentForm = this.formBuilder.group({
        debitCard: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
        cvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
        expiryYear: ['', [Validators.required]],
        expiryMonth: ['', [Validators.required]]
      });
      this.enableCaptchaSubmit = true;
    }
  }

  captchaResponse(event) {
    this.enableCaptchaSubmit = true;
    console.log(event);
  }

  reloadCaptcha(event) {
    console.log(event);
  }

  getOrder() {
    if (this.enableCaptchaSubmit) {
      for (const product of this.cartResponseObject) {
        console.log(this.orderForm.value);
        console.log(this.orderForm.get('item').value);
        this.orderObject = {
          productName: product.productName,
          email: localStorage.getItem('email'),
          phone: localStorage.getItem('phone'),
          deliveryAddress: this.orderAddressForm.value,
          items: this.orderForm.get('item').value
        };

        this.orderService.getOrderItem(this.orderObject).subscribe(
          response => {
            this.orderResponse = response;
            console.log(this.orderResponse);
            if (this.orderResponse.message === 'success') {
              Swal(
                'Order Success',
                'You have successfully order your items',
                'success'
              );
              this.router.navigate(['/home']);
            } else if (this.orderResponse.message === 'exist') {
              Swal('Order Failed', 'You have already ordered this item', 'info');
            }
          },
          error => {
            console.log('Error at order', error);
          }
        );
      }
    } else {
      Swal('Info', 'Please enable captcha for order', 'warning');
    }
  }

  getSelectItem(event, price, discount, name, index) {

    if (event) {
      console.log('Length ---- ', this.sampleArray.length);
        // for (let t = 0; t < this.sampleArray.length; t++) {
              // const check = name.toLowerCase().indexOf(this.sampleArray[t].productName.toLowerCase());
              // console.log('Name - ' + name.toLowerCase());
              // console.log('Array - product name = ' + this.sampleArray[t].productName.toLowerCase());
              // console.log('CHECK --- ', check);
              // if (name.toLowerCase() === this.sampleArray[t].productName.toLowerCase()) {
                // console.log('CHECK IF--- ', check);
                // this.sampleArray[t].price = price;
                // this.sampleArray[t].item = event.value;
                // this.sampleArray[t].productName = name;
            // } else {
              // console.log('CHECK ELSE--- ', check);
              // this.sampleArray.push({productName: name, item: event.value,  price: price});
          //  }
        // }
    }
    // console.log('Length ---- ', this.sampleArray.length);
    // console.log('Array - ', this.sampleArray);

    if (event) {
      this.totalAmount = event.value * price;
      this.discountAmount = price * ((discount * event.value) / 100);
      console.log(this.totalAmount);
    }
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
          this.orderService.getCartDetails(this.getCartRequestObject).subscribe(
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

  getSelectDeliveryState(event) {
    if (event.value === 'Tamilnadu') {
      this.deliveryDistrict = this.tnObj.slice(0);
    } else if (event.value === 'Kerala') {
      this.deliveryDistrict = this.klObj.slice(0);
    }
  }

  // Validation

  validateUsername() {
    if (this.orderAddressForm.get('name').hasError('pattern')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Invalid username - Username must contains alphabets'
      });
    } else if (this.orderAddressForm.get('name').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Username must be required'
      });
    }
  }

  validatePhone() {
    if (this.orderAddressForm.get('phone').hasError('pattern')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Phone number must be 10 numerical digit.'
      });
    } else if (this.orderAddressForm.get('phone').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Phone number must be required'
      });
    }
  }

  validateDeliveryLandMark() {
    if (this.orderAddressForm.get('landMark').hasError('pattern')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Landmark specification - (Alphabets, space & numbers)'
      });
    } else if (this.orderAddressForm.get('landMark').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Landmark must be required'
      });
    }
  }

  validateAddress() {
    if (this.orderAddressForm.get('address').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Delivery Address must be required '
      });
    }
  }

  validateDeliveryPinCode() {
    if (this.orderAddressForm.get('pinCode').hasError('pattern')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Postal code must contain 6 digit numeric number'
      });
    } else if (this.orderAddressForm.get('pinCode').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Postal code must be required'
      });
    }
  }

  validateDeliveryState() {
    if (this.orderAddressForm.get('state').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Delivery State must be required'
      });
    }
  }

  validateDeliveryDistrict() {
    if (this.orderAddressForm.get('district').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Delivery District must be required'
      });
    }
  }

  validateDeliveryType() {
    if (this.orderAddressForm.get('type').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Delivery Type must be required'
      });
    }
  }
  ///////////

  validateDebitCard() {
    if (this.orderAddressForm.get('debitCard').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Debit card number is required'
      });
    } else if (this.orderAddressForm.get('debitCard').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Debit card number must contain 16 digit numeric number'
      });
    }
  }

  validateCVV() {
    if (this.orderAddressForm.get('cvv').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'CVV number must be required'
      });
    } else if (this.orderAddressForm.get('cvv').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'CVV number must contain 3 digit numeric number'
      });
    }
  }

  validateExpiryYear() {
    if (this.orderAddressForm.get('expiryYear').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'You must provide Card Expiry year'
      });
    }
  }

  validateExpiryMonth() {
    if (this.orderAddressForm.get('expiryMonth').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'You must procide Card Expiry month'
      });
    }
  }
}
