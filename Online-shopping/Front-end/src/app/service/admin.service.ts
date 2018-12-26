import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../Model/product';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  _order_url = 'http://172.16.144.166:3000/order';
  _customer_url = 'http://172.16.144.166:3000/customer';
  _product_url = 'http://172.16.144.166:3000/product';
  _adminID = localStorage.getItem('userId');
  _reqObj: Object;
  _userAuthenticatedToken: String = localStorage.getItem('currentUser');

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this._userAuthenticatedToken}`
    })
  };

  formData = new FormData();

  getOrderSummary() {
    return this.http.get<any[]>(this._order_url + '/getOrderSummarySuperAdmin', this.httpOptions);
  }

  getOrderSummaryCount() {
    return this.http.get<any[]>(this._order_url + '/getOrderCountSuperAdmin', this.httpOptions);
  }

  getCustomerCount() {
    return this.http.get<any[]>(this._customer_url + '/getCustomerCount', this.httpOptions);
  }

  getProductRegistration(productObject, imageObject, specification, offer) {

    this.formData.append('product', JSON.stringify(productObject));
    this.formData.append('offer', JSON.stringify(offer));
    this.formData.append('specification', JSON.stringify(specification));
    this.formData.append('admin', this._adminID);
    this.formData.append('image_normal', imageObject[0], imageObject[0].name);
    this.formData.append('image_list', imageObject[1], imageObject[1].name);
    this.formData.append('image_left', imageObject[2], imageObject[2].name);
    this.formData.append('image_right', imageObject[3], imageObject[3].name);
    this.formData.append('image_back', imageObject[4], imageObject[4].name);
    this.formData.append('image_others', imageObject[5], imageObject[5].name);

    return this.http.post(this._product_url + '/registration', this.formData, this.httpOptions);
  }


  getTotalAdminProduct(obj) {
    return this.http.post<any[]>(this._product_url + '/getTotalAdminProduct' , obj, this.httpOptions);
  }

  getAdminProduct(obj) {
    return this.http.post<any[]>(this._product_url + '/getAdminProduct' , obj, this.httpOptions);
  }

  updateProduct(product, specification, offer) {

    this._reqObj = {
        product: product,
        specification: specification,
        offer: offer,
        admin: this._adminID
    };
    // this.formData.append('product', JSON.stringify(product));
    // this.formData.append('offer', JSON.stringify(offer));
    // this.formData.append('specification', JSON.stringify(specification));
    // this.formData.append('admin', this._adminID);
    return this.http.post(this._product_url + '/update', this._reqObj, this.httpOptions);
  }


  deleteProduct(productName) {
    this._reqObj = {
      productName: productName,
      admin: this._adminID
    };
    return this.http.post(this._product_url + '/delete', this._reqObj, this.httpOptions);
  }



}
