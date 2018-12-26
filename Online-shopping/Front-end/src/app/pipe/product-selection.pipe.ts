import { Pipe, PipeTransform } from '@angular/core';
import {MobileProductPipe} from './mobile-product-selection.pipe';
import { WatchProductPipe } from './watch-product-selection.pipe';

@Pipe({
  name: 'productSelection'
})
export class ProductSelectionPipe implements PipeTransform {
  constructor(
    private mobileProduct: MobileProductPipe,
    private watchProduct: WatchProductPipe
    ) {}

  transform(totalProduct, productType, typeSelection, selectedProduct, priceSort, priceSelection) {
    if (productType === 'mobile') {
     return this.mobileProduct.transform(totalProduct, typeSelection, selectedProduct, priceSort, priceSelection);
    } else if (productType === 'Watches') {
      // console.log('inside product selection');
      return this.watchProduct.transform(totalProduct, typeSelection, selectedProduct, priceSort, priceSelection);
    } else {
      return null;
    }

  }
}
