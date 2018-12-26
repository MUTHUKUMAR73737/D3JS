import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[eShoppingPrice]'
})
export class CartPriceDirective {
  @Input() price: number;

  @Input() discount: number;

  @Output() discountPrice: EventEmitter<Number> = new EventEmitter();
  @Output() totalPrice: EventEmitter<Number> = new EventEmitter();

  totalAmount: number;
  discountAmount: number;


  @HostListener('change') onchange() {
    console.log(this.price);
    console.log(this.discount);

    this.discountAmount = this.price * (this.discount / 100);
    this.totalAmount = this.price - this.discountAmount;

    // console.log('Discount amount - ', this.discountAmount);
    // console.log('Total amount - ', this.totalAmount);
    this.discountPrice.emit(this.discountAmount);
    this.totalPrice.emit(this.totalAmount);
  }

  getOriginalPrice() {
    console.log(this.price);
    console.log(this.discount);

    this.discountAmount = this.price * (this.discount / 100);
    this.totalAmount = this.price - this.discountAmount;

    // console.log('Discount amount - ', this.discountAmount);
    // console.log('Total amount - ', this.totalAmount);
    this.discountPrice.emit(this.discountAmount);
    this.totalPrice.emit(this.totalAmount);
  }
}
