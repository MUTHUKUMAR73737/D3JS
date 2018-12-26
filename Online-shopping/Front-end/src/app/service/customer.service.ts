import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  _url = 'http://172.16.144.166:3000/customer';

  _userAuthenticatedToken: String = localStorage.getItem('currentUser');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this._userAuthenticatedToken}`
    })
  };
  private options = { headers: new HttpHeaders().set('content-Type', 'application/json; charset=utf-8') };

  getRegistration(obj) {
      return this.http.post(this._url + '/registration', obj, this.options);
  }

  getLogin(obj: Product) {
    return this.http.post(this._url + '/login', obj, this.options);
  }

  sendOTP(obj) {
    return this.http.post(this._url + '/changePassword/verifyEmail', obj, this.options);
  }

  changePassword(obj) {
    return this.http.post(this._url + '/changePassword', obj, this.options);
  }

  registrationSendOTP(obj) {
    return this.http.post(this._url + '/registration/verifyEmail', obj, this.options);
  }

  getOrderProduct(obj) {
    return this.http.post(this._url + '/getOrderProduct', obj, this.httpOptions);
  }


  getAdminDetails() {
    return this.http.get(this._url +  '/getAdminDetails');
  }

  changeUserDetails(obj) {
    return this.http.post(this._url + '/updateUserDetail', obj, this.options);
  }


  deleteUserDetail(obj) {
    return this.http.post(this._url + '/deleteUserDetail', obj, this.options);
  }
}
