import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private http: HttpClient) {}

  _url = 'http://172.16.144.166:3000/order';

  _userAuthenticatedToken: String = localStorage.getItem('currentUser');

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this._userAuthenticatedToken}`
    })
  };


  getCartDetails(obj) {
    console.log(obj);
    return this.http.post<Product[]>(this._url + '/getCart', obj,  this.httpOptions);
  }

  addToCart(obj) {
    return this.http.post<Product[]>(this._url + '/addToCart', obj, this.httpOptions);
  }

  deleteFromCart(obj) {
    return this.http.post<Product[]>(this._url + '/deleteFromCart', obj, this.httpOptions);
  }

  getOrderItem(obj) {
    return this.http.post<Product[]>(this._url + '/addToPurchase', obj, this.httpOptions);
  }

  deleteOrderItem(obj) {
    return this.http.post<Product[]>(this._url + '/deleteFromPurchase', obj, this.httpOptions);
  }
}
