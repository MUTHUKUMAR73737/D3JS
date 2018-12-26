import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
  name: 'priceSelection'
})
export class PriceSelectionPipe implements PipeTransform {

  transform(totalProduct: any, priceSelection: number[]) {
    const filteredProduct = new Array();
    if (totalProduct === undefined) {
      return totalProduct;
    } else {
      for (let product = 0 ; product < totalProduct.length; product++) {
        if ((totalProduct[product].productPrice >= priceSelection[0]) && (totalProduct[product].productPrice <= priceSelection[1])) {
            filteredProduct.push(totalProduct[product]);
        }
      }
      return filteredProduct;
    }

  }

}
