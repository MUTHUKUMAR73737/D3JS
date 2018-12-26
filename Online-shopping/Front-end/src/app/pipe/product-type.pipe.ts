import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobileType'
})
export class MobileProductTypePipe implements PipeTransform {
  transform(totalProduct, value?) {
    if (totalProduct !== undefined) {
      return totalProduct.filter(product => {
        if (product.productType === 'mobile') {
          return product;
        }
      });
    } else {
      return null;
    }
  }
}

@Pipe({
  name: 'watchType'
})
export class WatchProductTypePipe implements PipeTransform {
  transform(totalProduct, value?) {
    const watchProduct = new Array();
    if (totalProduct !== undefined) {
      for (let product = 0; product < totalProduct.length; product++) {
        if (totalProduct[product].productType === 'Watches') {
          watchProduct.push(totalProduct[product]);
          // console.log('Watch - ', +  product + totalProduct[product]);
        }
      }
      return watchProduct;
    } else {
      return null;
    }
  }
}
