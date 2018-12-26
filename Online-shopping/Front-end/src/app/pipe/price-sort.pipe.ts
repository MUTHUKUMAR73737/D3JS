import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'priceHighToLow'
})
export class HighToLowSortPipe implements PipeTransform {

  transform(productList: any, args?: any): any {
    console.log('Price - High to Low is called');
     for (let product1 = 0; product1 < productList.length; product1++) {
        for (let product2 = product1 + 1; product2 < productList.length; product2++) {
            if ( (productList[product1]['productPrice']) < (productList[product2]['productPrice'])) {
               const obj1 = productList[product1];
               productList[product1] = productList[product2];
               productList[product2] = obj1;
            }
        }
      }

      // for (let i = 0; i < productList.length; i++) {
      //   console.log('High to low - ' + productList[i].productPrice);
      // }
      return productList;
  }

}


@Pipe({
  name: 'priceLowToHigh'
})
export class LowToHighSortPipe implements PipeTransform {


  transform(productList: any, args?: any): any {
    console.log('Price - Low to High is called' + productList.length);
     for (let product1 = 0; product1 < productList.length; product1++) {
        for (let product2 = product1 + 1; product2 < productList.length; product2++) {
            if ( (productList[product1]['productPrice']) > (productList[product2]['productPrice'])) {
               const obj1 = productList[product1];
               productList[product1] = productList[product2];
               productList[product2] = obj1;

            }
        }
      }

      // for (let i = 0; i < productList.length; i++) {
      //   console.log('Low to high - ' + productList[i].productPrice);
      // }
      return productList;
  }

}
