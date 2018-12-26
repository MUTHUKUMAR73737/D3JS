import { PipeTransform, Pipe } from '@angular/core';
import { HighToLowSortPipe, LowToHighSortPipe } from './price-sort.pipe';
import { DefaultPipe } from './default.pipe';


@Pipe({
    name: 'MemorySearch'
})
export class MobileRAMPipe implements PipeTransform {
  constructor(private priceHighToLow: HighToLowSortPipe, private priceLowToHigh: LowToHighSortPipe, private defaultPipe: DefaultPipe) {}

  transform(productList: any, searchItem: any, pricePipe: any) {
    const filteredBrandProduct = new Array();
    for (let product = 0; product < productList.length; product++) {
      for (let item = 0; item < searchItem.length; item++) {
        if (productList[product]['specification']['RAM'] === searchItem[item]) {
          filteredBrandProduct.push(productList[product]);
        }
      }

    }
    if (pricePipe === 'priceLowToHigh') {
      return this.priceLowToHigh.transform(filteredBrandProduct);
    } else if ((pricePipe === 'priceHighToLow') ) {
      return this.priceHighToLow.transform(filteredBrandProduct);
    } else if ((pricePipe === 'default')) {
      return this.defaultPipe.transform(filteredBrandProduct);
    } else {
      return filteredBrandProduct;
    }
  }

}



@Pipe({
  name: 'brandSearch'
})
export class MobileBrandPipe implements PipeTransform {
  constructor(
    private priceHighToLow: HighToLowSortPipe,
    private priceLowToHigh: LowToHighSortPipe,
    private defaultPipe: DefaultPipe,
    private memoryPipe: MobileRAMPipe
  ) {}

transform(productList: any, searchItem: any, pricePipe: any, typeSelection?: any) {
 const filteredBrandProduct = new Array();
  for (let product = 0; product < productList.length; product++) {
    for (let item = 0; item < searchItem.length; item++) {
      if (productList[product]['productBrand'] === searchItem[item]) {
        filteredBrandProduct.push(productList[product]);
      }
    }
  }

  if (typeSelection === undefined) {
    if (pricePipe === 'priceLowToHigh') {
      return this.priceLowToHigh.transform(filteredBrandProduct);
    } else if ((pricePipe === 'priceHighToLow') ) {
      return this.priceHighToLow.transform(filteredBrandProduct);
    } else if ((pricePipe === 'default')) {
      return this.defaultPipe.transform(filteredBrandProduct);
    } else {
      return filteredBrandProduct;
    }
  } else {
    if (typeSelection.size > 1) {
      if (typeSelection.has('MemorySearch')) {
        if (pricePipe === 'priceLowToHigh') {
          return this.priceLowToHigh.transform(this.memoryPipe.transform(filteredBrandProduct, searchItem, pricePipe));
        } else if ((pricePipe === 'priceHighToLow') ) {
          return this.priceHighToLow.transform( this.memoryPipe.transform(filteredBrandProduct, searchItem, pricePipe));
        } else if ((pricePipe === 'default')) {
          return this.defaultPipe.transform(this.memoryPipe.transform(filteredBrandProduct, searchItem, pricePipe));
        } else {
          return filteredBrandProduct;
        }
      }
    } else {
      if (pricePipe === 'priceLowToHigh') {
        return this.priceLowToHigh.transform(filteredBrandProduct);
      } else if ((pricePipe === 'priceHighToLow') ) {
        return this.priceHighToLow.transform(filteredBrandProduct);
      } else if ((pricePipe === 'default')) {
        return this.defaultPipe.transform(filteredBrandProduct);
      } else {
        return filteredBrandProduct;
      }
    }
  }
}

}

