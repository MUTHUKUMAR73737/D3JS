import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'generalSearch'
})
export class GeneralSearchPipe implements PipeTransform {
  transform(totalProduct: any, search: any): any {
    const filteredProduct = new Array();
    if (search === undefined) {
      return totalProduct;
    } else {
      for (let product = 0; product < totalProduct.length; product++) {
        if (totalProduct[product]['productName'] !== undefined) {
          const searchItem = search.toLowerCase();
          if ( (totalProduct[product]['productName'].toLowerCase().indexOf(searchItem) > -1) ||
          (totalProduct[product]['productType'].toLowerCase().indexOf(searchItem) > -1)
          ) {
            filteredProduct.push(totalProduct[product]);
          }
        } else {
          console.log('Name is undefined');
        }
      }
      return filteredProduct;
    }
  }
}

