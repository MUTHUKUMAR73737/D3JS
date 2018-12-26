import { Pipe, PipeTransform } from '@angular/core';
import {
  MobileBrandPipe,
  MobileRAMPipe
} from './mobile-product';
import { DynamicPipe } from './dynamic.pipe';
import { PriceSelectionPipe } from './price-selection.pipe';

@Pipe({
  name: 'mobileProductSearch'
})
export class MobileProductPipe implements PipeTransform {
  constructor(
    private dynamic: DynamicPipe,
    private priceSelection: PriceSelectionPipe,
    private mobileBrand: MobileBrandPipe,
    private mobileRAM: MobileRAMPipe
  ) {}

  transform(mobileProduct, typeSelection, selectedProduct, priceSort, priceSelection) {
    // const filteredProduct = new Array();

    if (mobileProduct !== undefined) {
      // filteredProduct.push();
      // console.log('After price filtering - ', filteredProduct );
    }

    if (typeSelection.size === 0) {
        return this.dynamic.transform(this.priceSelection.transform(mobileProduct, priceSelection), priceSort);
    } else {
      for (let iterate = typeSelection.values(), val = null; (val = iterate.next().value);) {
        if (typeSelection.size === 1) {
          console.log('Pipe size 1');
          if (val === 'brandName') {
            return this.mobileBrand.transform(mobileProduct, selectedProduct, priceSort);
          } else if (val === 'MemorySearch') {
            return this.mobileRAM.transform(mobileProduct, selectedProduct, priceSort);
          }
        } else if (typeSelection.size > 1) {
          console.log('Pipe size 2');
          if (val === 'brandName') {
            return this.mobileBrand.transform(mobileProduct, selectedProduct, priceSort, typeSelection);
          } else if (val === 'MemorySearch') {
            return this.mobileRAM.transform(mobileProduct, selectedProduct, typeSelection);
          }
        }
      }
    }
  }
}
