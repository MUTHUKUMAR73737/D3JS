import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  _url = 'http://172.16.144.166:3000/product';

  private options = { headers: new HttpHeaders().set('content-Type', 'application/json; charset=utf-8') };

  getProductDetails() {
    return this.http.get<Product[]>(this._url + '/getTotalProduct');
  }

  getProduct(productName) {
    return this.http.post<Product[]>(this._url + '/getProduct', productName);
  }

  getProductDetailsByType(productType) {
    return this.http.post<Product[]>(this._url + '/getProductType', productType);
  }

}
